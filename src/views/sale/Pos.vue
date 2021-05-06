
<template>
  <div>
    <!-- Wrapper Start -->
    <div class="wrapper">
      <SideBar />
      <div id="content-page" class="content-page">
        <div class="container-fluid">
          <div class="row content-body" style="margin-top: 0px"></div>
          <div class="row">
            <div class="col-md-5">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-left">
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </thead>
                  <tbody class="text-left" v-if="booked_products != ''">
                    <tr v-bind:key="n" v-for="(r, n) in booked_products">
                      <td>{{ n+1 }}</td>
                      <td>{{ r.name }}</td>
                      <td>{{ r.qty }}</td>
                      <td>{{ r.price }}</td>
                      <td>{{ r.total }}</td>
                      <td>
                        <div class="d-flex align-items-center list-user-action">
                          <button
                            class="iq-bg-danger"
                            @click="delete_product(n)"
                          >
                            <i class="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody class="text-left" v-else>
                    <tr>
                      <p>No Records</p>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="subtotal"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>VAT</th>
                      <td>
                        <input class="form-control" type="text" v-model="vat" />
                      </td>
                    </tr>
                    <tr>
                      <th>Discount</th>
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="discount"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>
                        <input
                          class="form-control"
                          type="text"
                          v-model="total"
                          disabled
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <button
                    class="btn btn-success btn-rounded w-100 mb-10"
                    @click="place_order"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-7 mb-10">
              <div class="row" id="productHolder">
                <div class="col-md-12 mt-4">
                  <form class="mr-3 position-relative">
                    <div class="form-group mb-6 mt-0">
                      <input
                        type="text"
                        v-model="search_clause"
                        @keyup="search_product"
                        class="form-control"
                        placeholder="Type to Search Products..."
                        aria-controls="user-list-table"
                      />
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-4"
                  v-bind:key="n"
                  v-for="(r, n) in product_list"
                >
                  <div
                    class="iq-card iq-card-height-third"
                    @click="prompt_add(r)"
                  >
                    <div class="iq-card-body">
                      <div class="row">
                        <div class="col-md-12 text-center position-relative">
                          <img src="images/plate.png" v-if="!r.avatar" width="70">
                                      <img :src="`${$api_website}/products/${r.avatar}`" v-else width="70">
                          <!-- <div
                            class="icon avatar-70 m-auto bg-success iq-border-success rounded-circle line-height-7 text-center"
                          >
                            <i class="ri-check-line"></i>
                          </div> -->
                        </div>
                        <div class="col-md-12 mt-3 text-center">
                          <h5>{{ r.name }}</h5>
                          <h6>₦ {{ r.price }}</h6>
                        </div>
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

            <!-- add modal -->
            <div class="col-md-12">
              <div v-if="showAddModal">
                <transition name="modal">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Sell Product</h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span
                                aria-hidden="true"
                                @click="showAddModal = false"
                                >&times;</span
                              >
                            </button>
                          </div>
                          <div class="modal-body text-left">
                            <form
                              @submit.prevent="add_product"
                              class="row text-left"
                            >
                              <div class="form-group col-md-9">
                                <label class="mb-0">Name <span>*</span></label>
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="current_product.name"
                                  required
                                  readonly
                                />
                              </div>

                              <div class="form-group col-md-3">
                                <label class="mb-0">Qty <span>*</span></label>
                                <input
                                  @keyup="calc_p_total"
                                  @change="calc_p_total"
                                  class="form-control"
                                  type="number"
                                  v-model="current_product.qty"
                                  required
                                />
                              </div>

                              <div class="form-group col-md-12">
                                <label class="mb-0">Description <span>*</span></label>
                                <input
                                  class="form-control"
                                  type="text"
                                  v-model="current_product.description"
                                  required
                                  readonly
                                />
                              </div>

                              <div class="form-group col-md-6">
                                <label class="mb-0">Unit Price</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  v-model="current_product.price"
                                  required
                                  readonly
                                />
                              </div>

                              <div class="form-group col-md-6">
                                <label class="mb-0">Total Price</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  v-model="current_product.total"
                                  required
                                  readonly
                                />
                              </div>

                              <div class="form-group col-md-12">
                                <button type="submit" class="btn btn-primary">
                                  Add Product
                                </button>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              @click="showAddModal = false"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <!-- end add modal -->
          </div>
        </div>
      </div>
      <TopBar title="Make Sales" :staff_name="staff.name"/>
    </div>
    <!-- Wrapper END -->
  </div>
</template>

<script>
import SideBar from "@/views/sale/SideBar.vue";
import TopBar from "@/views/sale/TopBar.vue";
import axios from "axios";

export default {
  name: "SalePos",
  data() {
    return {
      product_list: [],
      booked_products: [],
      search_clause: null,
      showPromptModal: false,
      showEditModal: false,
      showAddModal: false,
      subtotal: 0,
      vat: 0,
      discount: 0,
      total: 0,
      showLoadingModal: false,
      current_product: {},
      staff: []
    };
  },
  components: {
    SideBar,
    TopBar,
  },
  methods: {
    get_products: function () {
      
      const url = `${this.$api_host}/products/list?api_token=${this.$api_key}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.response.data);
          if (response.data.success) {
            this.product_list = response.data.response;
          } else {
            console.log(response.data.response);
          }
        })
        .catch((error) => console.log(error));

        
    },
    prompt_add: function (r) {
      this.current_product = {
        name: r.name,
        qty: "1",
        price: r.price,
        description: r.description,
        total: r.price,
      };
      this.showAddModal = true;
    },
    calc_p_total: function () {
      if (this.current_product.qty < 1) {
        this.current_product.qty = 1;
      } else {
        this.current_product.total =
          parseInt(this.current_product.qty) *
          parseInt(this.current_product.price);
      }
    },
    calc_subtotal: function () {
      var s = 0;
      this.booked_products.map(function (value) {
        s = s + parseInt(value.total);
      });
      this.subtotal = s;
    },
    calc_g_total: function () {
      if (this.vat < 0 || this.vat == "") {
        this.vat = 0;
      }

      if (this.discount < 0 || this.discount == "") {
        this.discount = 0;
      }

      if (this.subtotal < 0 || this.subtotal == "") {
        this.subtotal = 0;
      }

      var c = parseInt(this.subtotal) + parseInt(this.vat);
      if (this.discount > c) {
        this.discount = 0;
      }

      this.total =
        parseInt(this.subtotal) + parseInt(this.vat) - parseInt(this.discount);
    },
    add_product: function () {
      this.booked_products.push(this.current_product);
      this.current_product = {};
      this.calc_subtotal();
      this.showAddModal = false;
    },
    delete_product: function (n) {
      this.$delete(this.booked_products, n);
      this.current_product = {};
    },
    place_order: function () {
      if (this.total == "" || this.booked_products == "") {
        this.$swal({
          icon: "warning",
          text: "Order is Empty",
        });
      } else {
        this.showLoadingModal = true;

        var order_data = {
          staff_id: this.staff.id,
          customer: "customer",
          subtotal: this.subtotal,
          vat: this.vat,
          discount: this.discount,
          total: this.total,
          products: JSON.stringify(this.booked_products),
        };

        const url = `${this.$api_host}/sales/create?api_token=${this.$api_key}`;
        axios
          .post(url, order_data)
          .then((response) => {
            if (response.data.success) {
              this.showLoadingModal = false;
              this.booked_products = [];
              this.calc_g_total();
              this.$swal({
                icon: "success",
                text: "Order is Successful",
              });
              var strWindowFeatures =
                "location=yes,width=310,scrollbars=yes,status=yes";

              let p = this.$router.resolve({
                name: "Sale.Receipt",
                params: { sale_id: response.data.response.id },
              });
              // window.open(p.href, '_self');
              window.open(p.href, "_blank", strWindowFeatures);
            } else {
              this.showLoadingModal = false;
              this.$swal({
                icon: "warning",
                text: response.data.success,
              });
            }
          })
          .catch((error) => console.log(error));
      }
    },
    search_product: function () {
      const url = `${this.$api_host}/products/search?api_token=${this.$api_key}`;

      if (this.search_clause == "") {
        this.get_products();
      } else {
        axios
          .post(url, {
            clause: this.search_clause,
          })
          .then((response) => {
            // console.log(response.data.response)
            if (response.data.success) {
              this.product_list = response.data.response;
            }
            // else{
            //     console.log(response.data.response);
            // }
          })
          .catch((error) => console.log(error));
      }
    },
  },
  mounted() {
   
  },
  created: function () {
     if (
      localStorage.getItem("jwt") == null ||
      localStorage.getItem("jwt") == ""
    ) {
      this.$router.replace({ name: "Sale.Login" });
    } else {
      const url = `${this.$api_host}/login/staff/validate?api_token=${this.$api_key}`;
      axios
        .post(url, {
          jwt: localStorage.getItem("jwt"),
        })
        .then((response) => {
          if (!response.data.success) {
            this.$router.replace({ name: "Sale.Login" });
          } else {
            this.staff = response.data.response;
          }
        })
        .catch((error) => console.log(error));
    }
    this.get_products();
  },
  updated: function () {
    this.calc_subtotal();
    this.calc_g_total();
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

#productHolder {
  max-height: 450px;
  overflow: scroll;
  border: 1px solid #dee2e6;
}
</style>