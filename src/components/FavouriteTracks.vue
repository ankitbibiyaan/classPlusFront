<template>
 <div class="col-md-8 mx-auto" style="text-align:center;margin-top:2.5%">
   <div class="page-header">
  <h1>Recent Tracks</h1>
</div>
   <b-table striped hover :items="items" style="margin-top: 5%" v-if="show===true"></b-table>
   <p v-else>No Recent Tracks to show.</p>
 </div>

</template>

<script>
const items = [];

export default {
  name: 'RecentTracks',
  data () {
    return {
      msg: 'Recent Tracks',
      items : items,
      show : true
    }
  },
  mounted(){

    // this.show = false;
    console.log("Inside beforeMount  " + localStorage.token);
    Vue.http.post('http://34.211.60.64:8085/recent_tracks', { access_token: localStorage.token})
        .then(request => {
          if(request.body.status == 200) {
            var result = request.body.data.data;
            console.log("---",result);
            this.items = result;
            if(items.length) {
              this.show=true
            }
            else {
              this.show=false;
            }
          }
        })
        .catch(() => {})
   

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

th {
  text-align: left!important;
}
</style>
