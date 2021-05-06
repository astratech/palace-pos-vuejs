
<template>
  <div>
    <!-- Wrapper Start -->
    <div class="wrapper">
      <div style="width: 200px; border: 0px solid #000; padding: 3px; overflow: hidden; font-size: 10px; color: #000;!important">
        <div style="text-align: center">
          <h5>Palace Treats</h5>
          <br />
          <span>Bodija, Ibadan</span>
          <p>
            **************************************
            <br />
            Receipt
            <br />
            **************************************
          </p>
        </div>
        <div>
          <p style="margin-top: -28px">
            Time: {{ d_day }} #{{ sale_records.id }}
            <br />
            Cashier: {{ sale_records.staff_name.toUpperCase() }}
            <br />
            ===========================
          </p>
        </div>
        <div>
          <table style="width: 100%; margin-bottom: -25px; margin-top: -13px">
            <thead>
              <!-- <th>#</th> -->
              <th>Qty</th>
              <th>Item</th>
              <th style="text-align: right">Price</th>
              <th style="text-align: right">Amount</th>
            </thead>
            <tbody>
              <tr
                v-bind:key="n"
                v-for="(r, n) in JSON.parse(sale_records.products)"
                style="text-align: right"
              >
                <!-- <td>{{ n+1 }}</td> -->
                <td style="text-align: left">{{ r.qty }}</td>
                <td style="text-align: left">{{ r.name }}</td>
                <td>{{ r.price }}.00</td>
                <td>{{ Number(r.total).toLocaleString() }}.00</td>
              </tr>
            </tbody>
          </table>
          <br />
          ===========================
        </div>
        <div>
          <table style="width: 100%">
            <tbody style="text-align: right">
              <tr>
                <td>Subtotal</td>
                <td>{{ Number(sale_records.subtotal).toLocaleString() }}.00</td>
              </tr>
              <tr>
                <td>VAT</td>
                <td>{{ Number(sale_records.vat).toLocaleString() }}.00</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{{ Number(sale_records.discount).toLocaleString() }}.00</td>
              </tr>
              <tr>
                <td><strong> Total</strong></td>
                <td>
                  <strong>
                    {{ Number(sale_records.total).toLocaleString() }}.00
                  </strong>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <p><br/>Thanks for the patronage<br/>Designed By AstraTech NG 08093894657</p>
      </div>
    </div>
    <!-- Wrapper END -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "SaleReceipt",
  data() {
    return {
      sale_records: [],
      sale_id: this.$route.params.sale_id,
    };
  },
  methods: {
    get_records: function () {
      const url = `${this.$api_host}/sales/${this.sale_id}?api_token=${this.$api_key}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.response.data);
          if (response.data.success) {
            this.sale_records = response.data.response;
          } else {
            this.$swal({
              icon: "warning",
              text: response.data.response,
            });
          }
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    d_day: function () {
      return moment(String(this.sale_records.created_at)).format(
        "dddd DD/MMM/YYYY hh:mm A"
      );
    },
  },
  mounted() {
    
  },
  created: function () {
    this.get_records();
    
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