<template>
   
    <div style="margin-top: 5%">
      <div class="page-header">
  <h1>Login</h1>
</div>
<div class="col-md-5 mx-auto" style="margin-top:0.5%;color:red" v-if="error"><p>{{error}}</p></div>
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
      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <br>
    <div class="col-md-5 mx-auto"><p>Don't have an account. <a href="/signup">Click here to Signup</a></p></div>
    <div class="col-md-6 mx-auto"><hr></div>
    <div class="col-md-5 mx-auto">
      <!--<b-button :size="lg" :variant="secondary" block>
                Login Via last.fm
            </b-button>-->
            <button type="button" class="btn btn-primary btn-block" v-on:click="loginViaLastFm()">Login via last.fm</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
        // confirmPassword:''
        // checked: []
      },
      show: false,
      error : null
    }
  },
  updated () {
    if (localStorage.token) {
      this.$router.replace('/profile')
    }
  },
  methods: {
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
      this.error = null;
    },
     login (evt) {
      evt.preventDefault();
      console.log("Inside login");
      Vue.http.post('http://52.35.111.71:8085/login', { username: this.form.username, password: this.form.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      console.log(req);
      if (!req.body.data.access_token) {
        this.loginFailed()
        return
      }

      if(req.body.status == 200) {
          this.error = false
      console.log("--",req.body, req.body.data, req.body.data.access_token,req.body.data.usn);
      localStorage.token = req.body.data.access_token
      localStorage.usn = req.body.data.usn;
      this.$router.push('profile');
      }
      else {
        this.error = req.body.data.msg;
      }
      
    },
    loginFailed () {
      this.error = 'Login failed!'
      delete localStorage.token
      delete localStorage.usn
    },
    loginViaLastFm () {
      // evt.preventDefault();
      console.log("Inside login");
      this.error = false;
      Vue.http.post('http://52.35.111.71:8085/login_via_last_fm', { })
        .then(request =>{
          console.log(request.body.data);
          window.location.href=request.body.data.url;
        })
        .catch(() => this.loginFailed())
    }
  },
  beforeMount(){

    this.show = false;
    console.log("Inside beforeMount  " + this.$route.query.token);
    if(this.$route.query.token) {
      console.log("Quering backend");
      Vue.http.post('http://52.35.111.71:8085/authenticated_from_fm', { token: this.$route.query.token})
        .then(request => {
          console.log(request.body, request.body.status);
          if(request.body.status == 200) {
            localStorage.token = request.body.data.access_token
            this.$router.push("profile")
          
          }
        })
        .catch(() => this.loginFailed())
    }
    else {
        this.show = true;
    }

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
