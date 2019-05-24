const {
    OAuth2Client
} = require('google-auth-library')
const User = require('../models/user')
const Tag  = require('../models/tag')

const {
    comparePassword
} = require('../helpers/hash')
const jwt = require('../helpers/jwt')
const axios = require('axios')
const linkedinRequestAuth = `https://www.linkedin.com/oauth/v2/accessToken`
const kue = require('kue'),
    queue = kue.createQueue()
const mailer = require('../helpers/sendEmail')
queue.process('welcome-email', function (job, done) {
    console.log('processing kue ---\n', job.data);
    mailer(job.data, done);
});

class AuthController {
    static currentUser(req, res) {
        User.findOne({
                _id: req.user._id
            })
            .populate('tags')
            .populate('questions')
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(401).json('Invalid user ID. Please login using the correct ID')
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static register(req, res) {
        if (!req.body.image) {
            req.body.image = process.env.USER_AVATAR;
        }

        User.create({
                ...req.body
            })
            .then(created => {
                queue.create('welcome-email', {
                    title: `Welcome to HacktivOverflow, ${created.firstname}!`,
                    email: created.email.trim(),
                    firstname: created.firstname
                }).attempts(2).save();

                res.status(201).json(created)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static googleSignIn(req, res) {
        let access_token;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const email = payload['email'];
            const firstname = payload['name'].split(' ')[0]
            const lastname = payload['name'].split(' ')[1] ? payload['name'].split(' ')[1] : payload['name']

            User.findOne({
                    email: email
                })
                .then(found => {
                    if (found) {
                        access_token = jwt.sign({
                            firstname: found.firstname,
                            lastname: found.lastname,
                            email: found.email,
                            role: found.role,
                            _id: found._id
                        })

                        res.status(200).json({
                            access_token: access_token,
                            user: found
                        })
                    } else {
                        return User.create({
                            email: email,
                            password: process.env.DEFAULT_PWD,
                            firstname: firstname,
                            lastname: lastname
                        })
                    }
                })
                .then(function (created) {
                    if (created) {
                        access_token = jwt.sign({
                            email: created.email,
                            firstname: created.firstname,
                            lastname: created.lastname,
                            role: created.role
                        })
                        res.status(200).json({
                            access_token: access_token,
                            user: created
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
        verify().catch(err => {
            cb(err)
        });
    }

    static linkedinRedirect(req, res) {
        let signinCode = req.query.code,
            email, firstname, lastname, access_token, linkedin_access_token
        axios({
                method: 'GET',
                url: linkedinRequestAuth + `/?grant_type=authorization_code&code=${signinCode}&redirect_uri=http://localhost:8080/login&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_SECRET}`
            })
            .then(({
                data
            }) => {
                linkedin_access_token = data.access_token
                //after getting access token, get: 1. email addresspersonal, 2. first and last name
                axios({
                        method: 'GET',
                        url: `https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
                        headers: {
                            'Authorization': `Bearer ${linkedin_access_token}`
                        }
                    })
                    .then(({
                        data
                    }) => {
                        console.log(data);
                        let elements = data.elements
                        elements.forEach(x => {
                            if (x.type === 'EMAIL') {
                                email = x['handle~'].emailAddress
                            }
                        })

                        //get firstname & lastname
                        axios({
                                method: 'GET',
                                url: `https://api.linkedin.com/v2/me`,
                                headers: {
                                    'Authorization': `Bearer ${linkedin_access_token}`
                                }
                            })
                            .then(({
                                data
                            }) => {
                                firstname = data.localizedFirstName
                                lastname = data.localizedLastName


                                //all data gathered, so we send our app access_token to client
                                User.findOne({
                                        email: email
                                    })
                                    .then(found => {
                                        if (found) {
                                            access_token = jwt.sign({
                                                firstname: found.firstname,
                                                lastname: found.lastname,
                                                email: found.email,
                                                role: found.role,
                                                _id: found._id
                                            })
                                            res.status(200).json({
                                                access_token: access_token,
                                                user: found
                                            })
                                            return
                                        } else {
                                            return User.create({
                                                email: email,
                                                password: process.env.DEFAULT_PWD,
                                                firstname: firstname,
                                                lastname: lastname
                                            })
                                        }
                                    })
                                    .then((created) => {
                                        if (created) {
                                            access_token = jwt.sign({
                                                email: created.email,
                                                firstname: created.firstname,
                                                lastname: created.lastname,
                                                role: created.role
                                            })
                                            res.status(200).json({
                                                access_token: access_token,
                                                user: created
                                            })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json(err.message)
                                    })

                            })
                            .catch(({
                                response
                            }) => {
                                console.log(response.data);
                            })
                    })
                    .catch(({
                        response
                    }) => {
                        console.log(response.data);
                    })
            })
            .catch(err => {
                res.status(500).json(err.response.data.error_description)
            })
    }

    static login(req, res) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let access_token = jwt.sign({
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            role: user.role
                        })
                        res.status(200).json({
                            access_token: access_token,
                            user: user
                        })
                    } else {
                        res.status(401).json(`Incorrect password`)
                    }
                } else {
                    res.status(401).json(`Email not existed`)
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }

    static github(req, res) {
        let code = req.body.code;
        let access_token, token_type, app_token, githubData;
        axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`)
            .then(({
                data
            }) => {
                access_token = data.substring(data.indexOf('=')+1, data.indexOf('&'));
                axios.get(`https://api.github.com/user`, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    })
                    .then(({
                        data
                    }) => {
                        githubData = data

                        githubData.firstname = githubData.name.split(' ')[0]
                        githubData.lastname = githubData.name.split(' ')[1] ? githubData.name.split(' ')[1] : githubData.firstname;
                        axios.get(`https://api.github.com/user/emails`, {
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        })
                        .then(({ data }) => {
                            githubData.email = data[0].email;

                            User.findOne({
                                email: githubData.email
                            })
                            .then(found => {
                                if (found) {
                                    access_token = jwt.sign({
                                        firstname: found.firstname,
                                        lastname: found.lastname,
                                        email: found.email,
                                        role: found.role,
                                        _id: found._id
                                    })

                                    res.status(200).json({
                                        access_token: access_token,
                                        user: found
                                    })
                                } else {
                                    return User.create({
                                        email: githubData.email,
                                        password: process.env.DEFAULT_PWD,
                                        firstname: githubData.firstname,
                                        lastname: githubData.lastname,
                                        image: githubData.avatar_url,
                                    })
                                }
                            })
                            .then(function (created) {
                                if (created) {
                                    access_token = jwt.sign({
                                        email: created.email,
                                        firstname: created.firstname,
                                        lastname: created.lastname,
                                        role: created.role,
                                        _id: created._id
                                    })
                                    res.status(200).json({
                                        access_token: access_token,
                                        user: created
                                    })
                                }
                            })
                            .catch(err => {
                                res.status(500).json(err.message)
                            })
                        })
                        .catch(({ response }) => {
                            console.log(response.data);
                            res.status(500).json(response.data);
                        })

                    })
                    .catch(({ response }) => {
                        console.log(response.data);
                        res.status(500).json(response.data);
                    })
            })
            .catch(({
                response
            }) => {
                console.log(response.data);
            })
    }
    static update(req, res) {
        let user = req.body;
        console.log(user);

        User.findOneAndUpdate({
                _id: req.user._id
            }, user, {
                new: true
            })
            .then(found => {
                res.status(200).json(found);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }

    static updatePicture(req, res) {
        let newImage;

        if (req.file) {
            newImage = req.file.location
            User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                    image: newImage
                }, {
                    new: true
                })
                .then(found => {
                    res.status(200).json(found);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err.message)
                })
        } else {
            res.status(500).json('Error updating image')
        }
    }

    static addWatchTag(req, res) {
        let tagname = req.params.name

        Tag.findOne({name: tagname})
            .then(found => {
                User.findOneAndUpdate({_id: req.user._id}, {$push: {tags: found._id}}, {new: true})
                    .populate('tags')
                    .then(user => {
                        res.status(200).json(found)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.message);
                    })
            })

    }
    static removeWatchTag(req, res) {
        Tag.findOne({name: req.params.name})
            .then(found => {
                User.findOneAndUpdate({_id: req.user._id}, {$pull: {tags: found._id}}, {new: true})
                    .populate('tags')
                    .then(user => {
                        res.status(200).json(found)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.message);
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err.message);
                })              
    }
}

module.exports = AuthController