<template>
 <div class="col-md-8 mx-auto" style="text-align:center;margin-top:2.5%">
   <div class="page-header">
  <h1>Top Artists</h1>
</div>
   <!--<b-table striped hover :items="items" style="margin-top: 5%" v-if="show==true"	></b-table>-->
   <b-table :fields="fields" :items="items" striped v-if="show===true" :current-page="currentPage" :per-page="perPage" no-provider-paging="no-provider-paging">
    <!-- A virtual column -->
    <template slot="index" slot-scope="data">
      {{data.index + 1}}
    </template>
    <!-- A custom formatted column -->
    <template slot="name" slot-scope="data">
      {{data.item.name}}
    </template>
    <!-- A virtual composite column -->
    <template slot="playcount" slot-scope="data">
      {{data.item.playcount}}
    </template>
  </b-table>
   <p v-else-if="show===false && busy==false">No Top Artists to show.</p>
    <p v-if="busy==true">Fetching Data from Last.FM</p>
     <b-row>
      <b-col md="5" class="my-1 mx-auto"  v-show="show===true">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
 </div>

</template>

<script>
const items = []

export default {
  name: 'TopArtists',
  data () {
    return {
      msg: 'Top Artists',
      items : items,
      show : false,
      fields: [
        // A virtual column that doesn't exist in items
        {key :'index', label: 'S.No.'},
        // A column that needs custom formatting
        { key: 'name', label: 'Name' },
        { key: 'playcount', label: 'Playcount' },
      ],
      currentPage: 1,
      perPage: 8,
      totalRows: items.length,
      "no-provider-paging" : true,
      "busy" : true
    }
  },
  mounted(){

    // this.show = false;
    console.log("Inside beforeMount  " + localStorage.token);
    Vue.http.post('http://localhost:8085/top_artists', { access_token: localStorage.token})
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

          this.busy = false;
        })
        .catch(() => {
          this.busy = false;
        })
   

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
