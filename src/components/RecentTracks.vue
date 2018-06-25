<template>
 <div class="col-md-9 mx-auto" style="text-align:center;margin-top:2.5%">
   <div class="page-header">
  <h1>Recent Tracks</h1>
</div>
   <!--<b-table striped hover :items="items" style="margin-top: 5%" v-if="show===true" selectable @select="selected">
     <span slot="Like_Dislike" slot-scope="data" v-html="data.value"> </span>
   </b-table>
   <p v-else>No Recent Tracks to show.</p>-->
   <b-table :fields="fields" :items="items" striped  :current-page="currentPage" :per-page="perPage" no-provider-paging="no-provider-paging"	v-if="show==true">
    <!-- A virtual column -->
    <!--<template slot="index" slot-scope="data">
      {{data.index + 1}}
    </template>-->
    <!-- A custom formatted column -->
    <template slot="name" slot-scope="data">
      {{data.item.name}}
    </template>
    <!-- A virtual composite column -->
    <template slot="album" slot-scope="data">
      {{data.item.album}}
    </template>
    <template slot="artist" slot-scope="data">
      {{data.item.artist}}
    </template>
    <template slot="actions" slot-scope="cell">
      <b-button variant="danger" size="sm" @click.stop="DisLike(cell.item)" v-if="cell.item.is_liked===true">Dislike</b-button>
      <b-button variant="primary" size="sm" @click.stop="Like(cell.item)" v-else>Like</b-button>
    </template>
  </b-table>
  <p v-else-if="show===false && busy==false">No Top Albums to show.</p>
   <p v-if="busy===true">Fetching Data from Last.FM</p>
  <b-row>
      <b-col md="5" class="my-1 mx-auto" v-if="show===true">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>

    </b-row>
 </div>

</template>

<script>
let items = [];
// function Like(track_name) {
//      console.log(track_name)
//      return false;
//    }

export default {
  name: 'RecentTracks',
  data () {
    return {
      msg: 'Recent Tracks',
      items : items,
      show : false,
      fields: [
        // A virtual column that doesn't exist in items
        // {key :'index', label: 'S.No.'},
        // A column that needs custom formatting
        { key: 'name', label: 'Name' },
        { key: 'album', label: 'Album' },
        { key: 'artist', label: 'Artist' },
        'actions'
      ],
      currentPage: 1,
      perPage: 8,
      totalRows: items.length,
      "no-provider-paging" : true,
      busy : true
   }
    
  },
  mounted(){

    this.show = false;
    console.log( Vue.config, Vue.prototype.SERVER_URL);
    console.log("Inside beforeMount  " + localStorage.token);
    // Vue.http.post('http://localhost:8085/recent_tracks', { access_token: localStorage.token})
    //     .then(request => {
    //       if(request.body.status == 200) {
    //         var result = request.body.data.data;
    //         console.log("---",result);
    //         this.items = result;
    //         if(this.items.length) {
    //           this.show=true
    //         }
    //         else {
    //           this.show=false;
    //         }
    //       }
    //       else {
    //         this.show = false;
    //       }
    //     })
    //     .catch(() => {})
   this.getData();

 },
 methods : {
   Like(dataObject) {
    //  this.show=false;
     console.log(dataObject.name);
     Vue.http.post('http://localhost:8085/add_favourite', { access_token: localStorage.token, track_name : dataObject.name})
        .then(request => {
            console.log("---",result);
          if(request.body.status == 200) {
            var result = request.body.data;
            dataObject.is_liked = true;
            dataObject.fav_id = result.fav_id;
            // this.$forceUpdate();
            // vm.$forceUpdate();
            // this.$nextTick()
            // this.$router.push("/recent-tracks");
            
          }

          // this.getData();
        })
        .catch(() => {this.show=true})
    //  e.preventDefault();
   },
   DisLike(dataObject) {
    //  console.log(track_name)
     console.log(dataObject, dataObject.fav_id);
     Vue.http.post('http://localhost:8085/remove_favourite', { access_token: localStorage.token, fav_id : dataObject.fav_id})
        .then(request => {
            console.log("---",result);
          if(request.body.status == 200) {
            var result = request.body.data;
            dataObject.is_liked = false;
            dataObject.fav_id = null;
            // this.$router.push("/recent-tracks");
            
          }
         
        })
        .catch(() => {})
    //  e.preventDefault();
   },
  getData () {
    console.log("inside get data");
    Vue.http.post('http://localhost:8085/recent_tracks', { access_token: localStorage.token})
        .then(request => {
          if(request.body.status == 200) {
            var result = request.body.data.data;
            console.log("---",result);
            this.items = result;
            this.totalRows = this.items.length;
            if(this.items.length) {
              this.show=true
            }
            else {
              this.show=false;
            }
          }
          else {
            this.show = false;
          }

          this.busy=false;
        })
        .catch(() => {
          this.busy=false;
        })

  // perform any items processing needed

  // Must return an array
  
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

th {
  text-align: left!important;
}
</style>
