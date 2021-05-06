
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
                class="iq-card iq-card-block iq-card-stretch iq-card-height text-left"
              >
                <div class="iq-card-body row">
                  <div class="col-md-12" v-if="sale_records != ''">
                    <div class="table-responsive">
                      <!-- <h3>{{ staff.id }}</h3> -->
                      <table class="table table-bordered">
                        <thead class="text-left">
                          <th>S/N</th>
                          <th>Date</th>
                          <th>#ID</th>
                          <th>Staff</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Action</th>
                        </thead>
                        <tbody class="text-left">
                          <tr :key="n" v-for="(r, n) in sale_records">
                            <td>{{ n + 1 }}</td>
                            <td>{{ d_day(r.created_at) }}</td>
                            <td>{{ r.id }}</td>
                            <td>{{ r.staff_name }}</td>
                            <td>
                              <span
                                :key="i"
                                v-for="(p, i) in JSON.parse(r.products)"
                                style="text-transform: capitalize"
                              >
                                {{ p.name }}({{ p.total }}),
                              </span>
                            </td>
                            <td>{{ Number(r.total).toLocaleString() }}</td>
                            <td>
                              <div
                                class="d-flex align-items-center list-user-action"
                              >
                                <button
                                  class="iq-bg-primary"
                                  @click="print_record(r)"
                                >
                                  <i class="fa fa-print"></i>
                                </button>

                                <button
                                  class="iq-bg-danger ml-2"
                                  @click="delete_record(r)"
                                >
                                  <i class="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-else>
                    <p class="ml-4">No Records</p>
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

              <!-- delete modal -->
              <div class="col-md-12">
                <div v-if="showPromptModal">
                  <transition name="modal">
                    <div class="modal-mask">
                      <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">Delete Sale Record</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" @click="showPromptModal = false">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body text-left">
                              <p>Are you sure?</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" @click="showPromptModal = false">Cancel</button>
                              <button type="button" class="btn btn-primary" @click="do_delete">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <!-- end delete modal -->
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
import moment from "moment";

export default {
  name: "AdminSales",
  data() {
    return {
      sale_records: null,
      showLoadingModal: false,
      showPromptModal: false,
      current: null,
    };
  },
  components: {
    SideBar,
    TopBar,
  },
  methods: {
    d_day: function (d) {
      return moment(String(d)).format("dddd DD/MMM/YYYY hh:mm A");
    },
    delete_record: function(r){
      this.current = {};
      this.current.id = r.id
      this.showPromptModal = true;
    },
    do_delete: function(){
      this.showPromptModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/sales/delete/${this.current.id}?api_token=${this.$api_key}`;
      axios.post(url)
        .then(response => {
          if(response.data.success){
            this.current = {};
            this.get_sales();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "Sale Record Deleted",
            });
          }
          else{
            this.showLoadingModal = false;
            this.$swal({
              icon: "warning",
              text: response.data.response,
            });
          }
        })
        .catch(error => console.log(error));
    },
    print_record: function (r) {
      var strWindowFeatures = "location=yes,width=310,scrollbars=yes,status=yes";

      let p = this.$router.resolve({
        name: "Sale.Receipt",
        params: { sale_id: r.id },
      });

      window.open(p.href, "_blank", strWindowFeatures);
      
    },
    get_sales: function () {
      this.showLoadingModal = true;
      const url = `${this.$api_host}/sales/all?api_token=${this.$api_key}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            this.showLoadingModal = false;
            this.sale_records = response.data.response;
          } else {
            this.showLoadingModal = false;
            this.$swal({
              icon: "error",
              text: response.data.response,
            });
          }
        })
        .catch((error) => console.log(error));
    },
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
  },
  created: function () {
    this.get_sales();
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