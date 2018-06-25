<template>
    <div style="margin-top: 5%">
      <div class="page-header">
  <h1>Signup</h1>
</div>
<div class="col-md-5 mx-auto" style="margin-top:0.5%;color:red" v-if="error"><p>{{error}}</p></div>
    <b-form @submit="signupRequest" @reset="onReset" v-if="show" class="col-md-5 mx-auto" style="margin-top:3.5%">
      <b-form-group id="usernameLabel"
                    label="Username:"
                    label-for="exampleInput1"
                   >
        <b-form-input id="usernameInput"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter username" @keydown.space.native="keyDown">
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
      <b-form-group id="passwordLabel2"
                    label="Confirm Password:"
                    label-for="exampleInput3">
        <b-form-input id="passwordInput2"
                      type="password"
                      required
                      placeholder="Confirm Password"
                      v-model="form.confirmPassword">
        </b-form-input>
      </b-form-group>
      <!--<b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>-->
      <b-button type="submit" variant="primary">Sign Up</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!--<div class="col-md-6 mx-auto"><hr></div>
    <br>
    <div class="col-md-5 mx-auto">
      <b-button :size="lg" :variant="secondary" block>
                Login Via last.fm
            </b-button>
    </div>-->
    <!--<hr>-->
  </div>
</template>

<script>


export default {
  name: 'SignUp',
  data () {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword:''
        // checked: []
      },
      show: true,
      error : null
    }
  },
  methods: {
    keyDown: function(e) {
    // console.log("keyyyy", e.which);
    if (e.which === 32)
      e.preventDefault();
  },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.username = '';
      this.form.password = '';
      this.form.confirmPassword = '';
      // this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.error = null;
      this.$nextTick(() => { this.show = true });
    },
    signupRequest(evt) {
      evt.preventDefault();
      console.log("Inside Signup");
      if(this.form.password.length <5) {
          this.error = "Password length should be minimum of 5";
          return;
      }
      else if(this.form.password !== this.form.confirmPassword) {
        this.error = "Password and confirm password not same";
        return
      }
      this.error = null;
      Vue.http.post('http://localhost:8085/signup', { username: this.form.username, password: this.form.password })
        .then(request => this.signupSuccessful(request))
        .catch((ex) => this.signupFailed())
    },
    signupSuccessful (req) {
      console.log(req, req.body.status);
      
      if (req.body.status != 200) {
        this.signupFailed()
        return
      }
      this.error = false
      console.log("###")
      console.log(req.body, req.body.data, req.body.data.access_token);
      this.$router.push("/")
      return;
      // localStorage.token = req.body.data.access_token
      // localStorage.usn = req.body.data.username
      // this.$router.replace(this.$route.query.redirect || '/login')
    },
    signupFailed () {
      this.error = 'Signup failed!'
      delete localStorage.token
      delete localStorage.usn
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
