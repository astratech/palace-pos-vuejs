<template>
  <div>
    <!-- Sign in Start -->
        <section class="sign-in-page">
          <div class="container p-0" id="sign-in-page-box">
                
                <div class="bg-white form-container sign-in-container">
                    <div class="sign-in-page-data">
                      <div class="sign-in-from w-100 m-auto">
                          <h1 class="mb-3 text-center">Sign in</h1>
                          <p class="text-center text-dark">Enter your email address and password to access admin panel.</p>
                          <form class="mt-4" @submit.prevent="login">
                              <div class="form-group">
                                  <label for="exampleInputEmail2">Email address</label>
                                  <input required v-model="email" type="email" class="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email">
                              </div>
                              <div class="form-group">
                                  <label for="exampleInputPassword2">Password</label>
                                  <a href="#" class="float-right">Forgot password?</a>
                                  <input required v-model="password" type="password" class="form-control mb-0" id="exampleInputPassword2" placeholder="Password">
                              </div>
                              <div class="d-inline-block w-100">
                                  <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                      <input type="checkbox" class="custom-control-input" id="customCheck2">
                                      <label class="custom-control-label" for="customCheck1">Remember Me</label>
                                  </div>
                              </div>
                              <div class="sign-info">
                                  <button type="submit" class="btn btn-primary mb-2">Sign in</button>
                                  <!-- <span class="text-dark dark-color d-block line-height-2">Don't have an account? <a href="#">Sign up</a></span> -->
                              </div>
                          </form>
                      </div>
                  </div>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        
                        <div class="overlay-panel overlay-right">
                            <a class="sign-in-logo mb-5" href="#"><img src="images/logo-full.png" class="img-fluid" alt="logo"></a>
                            <p>Enter your personal details and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Sign in END -->

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
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from "axios"

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){
    return{
      email: null,
      password: null,
      showLoadingModal: false,
    }
  },
  methods: {
    login: function(){
      this.showLoadingModal = true;
      if(this.email == "" && this.password == ""){
        console.log();
      }
      else{
        const url = `${this.$api_host}/login?api_token=${this.$api_key}`;
        axios.post(
          url,
          {
            email: this.email,
            password: this.password,
          }
          )
          .then(response => {
            // console.log(response.data.response)
            if(response.data.success){
              this.showLoadingModal = false;
              localStorage.setItem('jwt', response.data.response);
              this.$router.push({ name: "Admin.Dashboard" });

              this.$swal({
                icon: "success",
                text: "Login Successfull",
              });
            }
            else{
              this.showLoadingModal = false;
              this.$swal({
                icon: "error",
                text: response.data.response,
              });
            }
          })
          .catch(error => console.log(error));
      }
    }
  },
  mounted() {
    // if(localStorage.getItem("jwt") == null){
    //   console.log("empty");
    // }
    // else{
    //   console.log("not empty");
    // }
    localStorage.removeItem("jwt");
    // localStorage.clear();
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
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>