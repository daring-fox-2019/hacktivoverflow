<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-name" label="Your Name:" label-for="username">
        <b-form-input id="username" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="password:" label-for="Password">
        <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
      </b-form-group>

      <b-form-file
        v-model="form.image"
        :state="Boolean(form.image)"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
        accept="image/*"
        @change="onFileChange"
      ></b-form-file>
      <div class="mt-3">
        <!-- Selected image: {{ form.image ? form.image.name : '' }} -->
        <!-- image keys: {{ form.image ? Object.keys(form.image) : '' }} -->
      </div>
      <div v-if="form.image">
        <b-img size="sm" :src="form.image" center fluid block thumbnail alt="Responsive image"></b-img>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
import server from "@/api/api";
import swal from "sweetalert2";

export default {
  data() {
    return {
      form: {}
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.registerNewUser(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
      this.show = false;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let self = this;
      reader.onload = e => {
        // self.hasImage = true;
        self.form.image = e.target.result;
        // console.log(self.form.image)
      };
      reader.readAsDataURL(file);
    },
    async registerNewUser(newUser) {
      console.log(`registering and later log  the new user in`);
      try {
        let response = await server.post(`/auth/register`, newUser);
        if (response.status == 201) {
          swal.fire(
            "thank you",
            "thank you for registering, we've logged you in....",
            "success"
          );
          this.$store.commit("setUser", response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `${error.response.data.message}`,
              "question"
            );
          } else {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `check the log`,
              "question"
            );
          }
        } else if (error.request) {
          swal.fire("Server Unreachable", "check your internet", "warning");
          console.log(error.request);
        } else {
          swal.fire("application error", "check log", "error");
          console.log(error);
        }
      } finally {
        this.$router.replace("home");
      }
    }
  }
};
</script>