
<template>
  <div>
    <!-- Wrapper Start -->
    <div class="wrapper">
      <SideBar />
      <div id="content-page" class="content-page">
        <div class="container-fluid">
          <div class="row content-body" style="margin-top: 0px">
            <div class="col-md-12">
              <div
                class="iq-card iq-card-block iq-card-stretch iq-card-height iq-bg-danger"
              >
                <div class="iq-card-body box iq-box-relative">
                  <div class="box-image float-right">
                    <img
                      class="rounded img-fluid"
                      src="images/page-img/37.png"
                      alt="profile"
                    />
                  </div>
                  <h4 class="d-block mb-3 text-black">
                    Welcome back Administrator
                  </h4>
                  <p class="d-inline-block welcome-text text-black">
                    Keep track of your sales with real-time data
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div class="iq-card-body">
                  <div
                    class="icon iq-icon-box iq-bg-primary rounded"
                    data-wow-delay="0.2s"
                  >
                    <i class="ri-cpu-line"></i>
                  </div>
                  <div class="mt-4">
                    <h5 class="text-black text-uppercase">Total Sales</h5>
                    <h3 class="d-flex text-primary">
                      {{stats.total_sales}}
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div
                      class="iq-progress-bar-linear d-inline-block mt-1 w-100"
                    >
                      <div class="iq-progress-bar">
                        <span
                          class="bg-primary"
                          data-percent="100"
                          style="transition: width 2s ease 0s; width: 100%"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div class="iq-card-body">
                  <div
                    class="icon iq-icon-box iq-bg-primary rounded"
                    data-wow-delay="0.2s"
                  >
                    <i class="ri-cpu-line"></i>
                  </div>
                  <div class="mt-4">
                    <h5 class="text-black text-uppercase">Total Sales Amount</h5>
                    <h3 class="d-flex text-primary">
                      ₦{{ Number(stats.total_sales_amount).toLocaleString()}}
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div
                      class="iq-progress-bar-linear d-inline-block mt-1 w-100"
                    >
                      <div class="iq-progress-bar">
                        <span
                          class="bg-primary"
                          data-percent="100"
                          style="transition: width 2s ease 0s; width: 100%"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div class="iq-card-body">
                  <div
                    class="icon iq-icon-box iq-bg-primary rounded"
                    data-wow-delay="0.2s"
                  >
                    <i class="ri-cpu-line"></i>
                  </div>
                  <div class="mt-4">
                    <h5 class="text-black text-uppercase">Total Staffs</h5>
                    <h3 class="d-flex text-primary">
                      {{stats.total_staff}}
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div
                      class="iq-progress-bar-linear d-inline-block mt-1 w-100"
                    >
                      <div class="iq-progress-bar">
                        <span
                          class="bg-primary"
                          data-percent="100"
                          style="transition: width 2s ease 0s; width: 100%"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div class="iq-card-body">
                  <div
                    class="icon iq-icon-box iq-bg-primary rounded"
                    data-wow-delay="0.2s"
                  >
                    <i class="ri-cpu-line"></i>
                  </div>
                  <div class="mt-4">
                    <h5 class="text-black text-uppercase">Total Products</h5>
                    <h3 class="d-flex text-primary">
                      {{stats.total_products}}
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div
                      class="iq-progress-bar-linear d-inline-block mt-1 w-100"
                    >
                      <div class="iq-progress-bar">
                        <span
                          class="bg-primary"
                          data-percent="100"
                          style="transition: width 2s ease 0s; width: 100%"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
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
      <TopBar />
    </div>
    <!-- Wrapper END -->
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/views/admin/SideBar.vue";
import TopBar from "@/views/admin/TopBar.vue";
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      stats: [],
      showLoadingModal: false,
    };
  },
  components: {
    SideBar,
    TopBar,
  },
  methods: {
    get_stats: function () {
      const url = `${this.$api_host}/stats?api_token=${this.$api_key}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            this.stats = response.data.response;
          } else {
            console.log(response.data.response);
          }
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    if (
      localStorage.getItem("jwt") == null ||
      localStorage.getItem("jwt") == ""
    ) {
      this.$router.replace({ name: "Admin.Login" });
    } else {
      const url = `${this.$api_host}/login/validate?api_token=${this.$api_key}`;
      axios
        .post(url, {
          jwt: localStorage.getItem("jwt"),
        })
        .then((response) => {
          if (!response.data.success) {
            this.$router.replace({ name: "Admin.Login" });
          }
        })
        .catch((error) => console.log(error));
    }

    this.get_stats();
  },
  created: function () {
    
  },
};
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