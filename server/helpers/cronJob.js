const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    appId: process.env.appId
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

module.exports = function () {
    db.collection('hacktivChat').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                db.collection('hacktivChat')
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                        console.log('delete firebase success')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
}