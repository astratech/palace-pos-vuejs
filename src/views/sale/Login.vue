<template>
  <div>
    <!-- Sign in Start -->
    <section class="sign-in-page">
      <div class="container p-0" id="sign-in-page-box">
        <div class="bg-white form-container sign-in-container text-left">
          <div class="sign-in-page-data">
            <div class="sign-in-from w-100 m-auto">
              <h1 class="mb-3 text-center">Enter Pincode</h1>
              <form class="mt-4" @submit.prevent="login">
                <div class="form-group">
                  <div class="input-wrapper">
                    <PincodeInput v-model="code" placeholder="0" />
                  </div>
                </div>

                <div class="sign-info">
                  <button type="submit" class="btn btn-primary mb-2">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <a class="sign-in-logo mb-5" href="#"
                ><img src="images/logo-full.png" class="img-fluid" alt="logo"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

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
    <!-- Sign in END -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SaleLogin",
  data() {
    return {
      code: "----",
      showLoadingModal: false,
    };
  },
  methods: {
    login: function () {
      this.showLoadingModal = true;
      if (this.code == "") {
        this.showLoadingModal = false;
        this.$swal({
          icon: "error",
          text: "Pin Code Empty",
        });
      } else {
        
        const url = `${this.$api_host}/login/staff?api_token=${this.$api_key}`;
        axios
          .post(url, {
            code: this.code,
          })
          .then((response) => {
            if (response.data.success) {
              localStorage.setItem("jwt", response.data.response);
              this.$router.push({ name: "Sale.Pos" });
              this.showLoadingModal = false;
              this.$swal({
                icon: "success",
                text: "Login Successfull",
              });
            } else {
              this.showLoadingModal = false;
              this.$swal({
                icon: "error",
                text: response.data.response,
              });
            }
          })
          .catch((error) => console.log(error));
      }
    },
  },
  mounted() {
    localStorage.removeItem("jwt");
  },
};
</script>

<style>
input.vue-pincode-input {
  height: 50px;
  border: 1px solid #888;
  box-shadow: none;
}

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
