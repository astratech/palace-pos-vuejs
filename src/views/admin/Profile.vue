
<template>
    <div>
      <!-- Wrapper Start -->
      <div class="wrapper">
        <SideBar />
        <div id="content-page" class="content-page">
            <div class="container-fluid">
               <div class="row content-body" style="margin-top: 0px;">
                
                <div class="col-md-12">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height text-left">
                      <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                            <h4 class="card-title">Change Password</h4>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center">
                            
                        </div>
                      </div>
                      <div class="iq-card-body row">
                       
                        <div class="col-md-12" >
                          
                          <form @submit.prevent="change_password" class="row text-left">
                            
                                  <div class="form-group col-md-9">
                                    <label class="mb-0">New Password <span>*</span></label>
                                    <input class="form-control" type="password" v-model="password" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Change Password</button>
                                  </div>
                                </form>
                        </div>
                       
                      </div>
                  </div>
                </div>

                <!-- loading modal -->
                <div class="col-md-12">
                  <div v-if="showLoadingModal">
                    <transition name="modal">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Loading...</h5>
                                
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <!-- end loading modal -->

               </div>
            </div>
        </div>
        <TopBar title=""/>
      </div>
      <!-- Wrapper END -->
    </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/views/admin/SideBar.vue'
import TopBar from '@/views/admin/TopBar.vue'
import axios from "axios"

export default {
  name: 'AdminProfile',
  data(){
    return{
      password: '',
      showLoadingModal: false,
    }
  },
  components: {
      SideBar,
      TopBar,
  },
  methods: {
    change_password: function(){
        const url = `${this.$api_host}/login/validate?api_token=${this.$api_key}`;
        axios.post(
        url,
        {
          jwt: localStorage.getItem("jwt"),
        }
        )
        .then(response => {
          if(response.data.success){
            const url1 = `${this.$api_host}/admin/update/${response.data.response.id}?api_token=${this.$api_key}`;
            axios.post(
                url1,
                {
                    password: this.password,
                }
                )
                .then(response => {
                    if(response.data.success){
                        this.password = "";
                        this.$swal({
                            icon: "success",
                            text: "password updated",
                        });
                    }
                    else{
                        this.$swal({
                            icon: "error",
                            text: response.data.response,
                        });
                    }
                
                })
                .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error))
        
    }
  },
  mounted() {
    if(localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == ""){
      this.$router.replace({ name: "Admin.Login" });
    }
    else{
      const url = `${this.$api_host}/login/validate?api_token=${this.$api_key}`;
      axios.post(
        url,
        {
          jwt: localStorage.getItem("jwt"),
        }
        )
        .then(response => {
          if(!response.data.success){
            this.$router.replace({ name: "Admin.Login" });
          }
        })
        .catch(error => console.log(error));
    }
  },
  created: function() {
  }
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>