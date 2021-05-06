
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
                  <div class="col-md-12" v-if="sale_records">
                    <h4>Name: {{staff.name.toUpperCase()}}</h4>
                    <h4>Role: {{staff.role.toUpperCase()}}</h4>
                  </div>
                  <div v-else>
                    <p>No Records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopBar :title="`Profile For ${staff.name}`" :staff_name="staff.name" />
    </div>
    <!-- Wrapper END -->
  </div>
</template>

<script>
import SideBar from "@/views/sale/SideBar.vue";
import TopBar from "@/views/sale/TopBar.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "SaleProfile",
  data() {
    return {
      staff: [],
      sale_records: [],
      showPromptModal: false,
      showLoadingModal: false,
      current_record: {},
    };
  },
  components: {
    SideBar,
    TopBar,
  },

  mounted: function () {
    if (
      localStorage.getItem("jwt") == null ||
      localStorage.getItem("jwt") == ""
    ) {
      this.$router.replace({ name: "Sale.Login" });
    } 

    this.get_records();

  },
  created: function () {
  },
  methods: {
    d_day: function(d){
      return moment(String(d)).format(
        "dddd DD/MMM/YYYY hh:mm A"
      );
    },
    get_records: function () {
      this.showLoadingModal = true;
      const url = `${this.$api_host}/login/staff/validate?api_token=${this.$api_key}`;
      axios
        .post(url, {
          jwt: localStorage.getItem("jwt"),
        })
        .then((response) => {
          if (response.data.success) {
            this.staff = response.data.response;
            const url1 = `${this.$api_host}/sales/staff/${this.staff.id}?api_token=${this.$api_key}`;
            axios
              .get(url1)
              .then((response) => {
                if (response.data.success) {
                  this.sale_records = response.data.response;
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));

      this.showLoadingModal = false;
    },
    print_record: function (r) {
      var strWindowFeatures = "location=yes,width=310,scrollbars=yes,status=yes";

      let p = this.$router.resolve({
        name: "Sale.Receipt",
        params: { sale_id: r.id },
      });

      window.open(p.href, "_blank", strWindowFeatures);
      
    },
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