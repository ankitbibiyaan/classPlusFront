<template>
  <div class="container">
    <div class="page-header" style="margin-top:5%">
  <h1>User Profile</h1>
</div>
    <div class="row left-text">
      <div class="col-md-7 mx-auto">
        <div class="col-md-5 mx-auto"  v-if="busy==true">
        <p class="mx-auto">Fetching Data from Last.FM</p>
        </div>
        <button type="button" class="btn btn-primary btn-block" style="margin-top:2.5%;" v-on:click="connectLastFm()" v-else-if="is_last_fm_account_connected==false">Connect to last.fm</button>
        <div class="panel panel-default" v-else-if="show==true">


          <div class="panel-body">
            <div class="box box-info">

              <div class="box-body ">
                <div class="col-sm-6 mx-auto">
                  <div align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                      id="profile-image1" class="img-circle img-responsive">

                    <!--Upload Image Js And Css-->
                  </div>
                  <br>

                  <!-- /input-group -->
                </div>
                <div class="col-md-6 col-sm-6 mx-auto">
                  <h4 class="center-text" style="color:#00b1b1;">{{name}} </h4>
                  <!--<span><p>Aspirant</p></span>-->
                </div>
                <div class="clearfix"></div>
                <hr style="margin:5px 0 5px 0;">

                <div class="row mx-auto">
                <div class="col-md-6 col-sm-5 col-xs-6 tital">Username:</div>
                <div class="col-md-6 col-sm-7 col-xs-6 " > {{name}}</div>
                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital mx-auto">Gender: </div>
                <div class="col-md-6 col-sm-7"> {{gender}}</div>
                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital ">Age: </div>
                <div class="col-md-6 col-sm-7"> {{age}}</div>
                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital ">Country: </div>
                <div class="col-md-6 col-sm-7"> {{country}}</div>

                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital ">Subscribers: </div>
                <div class="col-md-6 col-sm-7"> {{subscriber}}</div>

                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital ">Playcount: </div>
                <div class="col-md-6 col-sm-7"> {{playcount}}</div>

                <div class="clearfix"></div>
                <div class="bot-border"></div>

                <div class="col-md-6 col-sm-5 col-xs-6 tital ">Last.FM Profile URL: </div>
                <div class="col-md-6 col-sm-7">{{url}}</div>
                </div>

                <!-- /.box-body -->
              </div>
              <!-- /.box -->

            </div>


          </div>
        
        </div>
        <p v-else-if="show==false && busy==false">Unable to fetch data from Last.FM</p>
      </div>
    </div>
  </div>
</template>

<script>
var self = this;
export default {
  name: 'UserProfile',
  data () {
    return {
      msg: 'User Profile',
      name : 'a',
      gender : '',
      url : '',
      subscriber : '',
      country : '',
      playcount : '',
      age : '',
      show : false,
      is_last_fm_account_connected : true,
      busy: true
    }
  },
  methods :{
    connectLastFm () {
      // evt.preventDefault();
      console.log("Inside connectLastFm");
      Vue.http.post(('http://localhost:8085/login_via_last_fm/'), {usn : localStorage.usn, token: localStorage.token})
        .then(request =>{
          console.log(request.body.data);
          window.location.href=request.body.data.url;
        })
        .catch(() => this.loginFailed())
    }
  },
  mounted(){

    // this.show = false;
    console.log("Inside beforeMount  " + localStorage.token);
    if(this.$route.query.token) {
      console.log("Quering backend");
      Vue.http.post('http://localhost:8085/authenticated_from_fm', { token: this.$route.query.token,usn : localStorage.usn})
        .then(request => {
          console.log(request.body, request.body.status);
          if(request.body.status == 200) {
            console.log("inside auth if")
            localStorage.token = request.body.data.access_token
            // this.$router.push("");
            var result = request.body.data;
            // this.is_last_fm_account_connected = result.is_last_fm_account_connected;
           
            this.name = result.name;
            this.age = result.age;
            this.country = result.country;
            this.subscriber = result.subscriber;
            this.gender = result.gender;
            this.url = result.url;
            this.playcount = result.playcount;
            this.show=true;
            
            
          }
          else {
            this.is_last_fm_account_connected = false
          }

          this.busy=false;
        })
        .catch(() => {})
    }
    else {
      console.log("token not present else part");
      Vue.http.post('http://localhost:8085/get_user_info', { access_token: localStorage.token})
        .then(request => {
          if(request.body.status == 200) {
            var result = request.body.data.data;
            this.is_last_fm_account_connected = result.is_last_fm_account_connected;
            if(result.is_last_fm_account_connected) {
            this.name = result.name;
            this.age = result.age;
            this.country = result.country;
            this.subscriber = result.subscriber;
            this.gender = result.gender;
            this.url = result.url;
            this.playcount = result.playcount;
            this.show=true;
            }
          }
          else {
            this.is_last_fm_account_connected = false;
            this.show=false;
          }

          this.busy=false;
        })
        .catch(() => {
          this.busy=false;
        })
    }
    
   

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
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

  input.hidden {
    position: absolute;
    left: -9999px;
  }

  #profile-image1 {
    cursor: pointer;

    width: 100px;
    height: 100px;
    border: 2px solid #03b1ce;
  }

  .tital {
    font-size: 16px;
    font-weight: 500;
    text-align: right
  }

  .bot-border {
    border-bottom: 1px #f8f8f8 solid;
    margin: 5px 0 5px 0
  }

.left-text {
  text-align : left;
}

.right-text {
  text-align: right;
}

.center-text {
  text-align: center;
}

.panel-body {
  margin-top:7.5%;
}

.panel-heading {
  margin-top : 7.5%;
}
</style>
