<template>
   
    <div style="margin-top: 5%">
      <div class="page-header">
  <h1>Login</h1>
</div>
    <b-form @submit="login" @reset="onReset" v-if="show" class="col-md-5 mx-auto" style="margin-top: 5%">
      <b-form-group id="usernameLabel"
                    label="Username:"
                    label-for="exampleInput1"
                   >
        <b-form-input id="usernameInput"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordLabel"
                    label="Password:"
                    label-for="exampleInput2">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <br>
    <div class="col-md-5 mx-auto"><p>Don't have an account. <a href="#/signup">Click here to Signup</a></p></div>
    <div class="col-md-6 mx-auto"><hr></div>
    <div class="col-md-5 mx-auto">
      <!--<b-button :size="lg" :variant="secondary" block>
                Login Via last.fm
            </b-button>-->
            <button type="button" class="btn btn-primary btn-block" v-on:click="loginViaLastFm()">Button 1</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Authenticated',
  data () {
    return {
      form: {
        username: '',
        password: ''
        // confirmPassword:''
        // checked: []
      },
      show: true
    }
  },
  updated () {
    if (localStorage.token) {
      this.$router.replace('/profile')
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.username = '';
      this.form.password = '';
      // this.form.confirmPassword = '';
      // this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
     login () {
      // evt.preventDefault();
      console.log("Inside login");
      Vue.http.post('http://34.211.60.64:8085/login', { username: this.form.username, password: this.form.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      console.log(req);
      if (!req.body.data.access_token) {
        this.loginFailed()
        return
      }
      this.error = false
      console.log(req.body, req.body.data, req.body.data.access_token);
      localStorage.token = req.body.data.access_token
      localStorage.usn = req.body.data.username
      this.$router.replace(this.$route.query.redirect || '/profile')
    },
    loginFailed () {
      this.error = 'Login failed!'
      delete localStorage.token
    },
    loginViaLastFm () {
      // evt.preventDefault();
      console.log("Inside login");
      Vue.http.post('http://34.211.60.64:8085/login_via_last_fm', { })
        .then(request =>{
          console.log(request.body.data);
          window.location.href=request.body.data.url;
        })
        .catch(() => this.loginFailed())
    },
  },
   beforeMount(){
    console.log("Inside beforeMount  " + this.$route.query.token);
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
