
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
                            <h4 class="card-title">Products</h4>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center">
                            
                        </div>
                      </div>
                      <div class="iq-card-body row">
                        <div class="col-sm-8 col-md-5 mb-4">
                            <form class="mr-3 position-relative">
                                <div class="form-group mb-0">
                                  <input type="text" class="form-control" v-model="search_clause" @keyup="search_records" placeholder="Search" aria-controls="user-list-table">
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-3 col-md-6 mb-4 text-right">
                          <button type="submit" class="btn btn-primary" @click="showAddModal = true">Add Product</button>
                        </div>
                        <div class="col-md-12" v-if="product_records">
                          <div class="table-responsive">
                            <table class="table table-bordered">
                              <thead class="text-left">
                                <!-- <th>S/N</th> -->
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Categories</th>
                                <th>Action</th>
                              </thead>
                              <tbody class="text-left">

                                <tr v-bind:key="n" v-for="(r, n) in product_records.data">
                                  <td>
                                    <p>
                                      <img src="images/plate.png" v-if="!r.avatar" width="70">
                                      <img :src="`${$api_website}/products/${r.avatar}`" v-else width="70">

                                      <br/>
                                      <a href="#" @click.prevent="upload(r)">Upload Image</a>
                                    </p>
                                  </td>
                                  <td>{{r.name}}</td>
                                  <td>{{r.price}}</td>
                                  <td>{{r.description}}</td>
                                  <td>{{r.categories}}</td>
                                  
                                  <td>
                                    <div class="d-flex align-items-center list-user-action">
                                      <button class="iq-bg-primary"  @click="edit_record(r)"><i class="ri-pencil-line"></i></button>
                                      <button class="iq-bg-primary"  @click="delete_record(r)"><i class="ri-delete-bin-line"></i></button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="row justify-content-between mt-3" >
                              <div id="user-list-page-info" class="col-md-6">
                                 <span>Showing {{ product_records.current_page }} to {{ product_records.to }} of {{ product_records.total }}  records</span>
                              </div>
                              <div class="col-md-6">
                                 <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-end mb-0">
                                       
                                       <li class="page-item" v-if="product_records.first_page_url != null"><a class="page-link" @click="reload_staff_records(product_records, 'first')">First</a></li>
                                       <li class="page-item" v-if="product_records.prev_page_url != null"><a class="page-link" @click="reload_staff_records(product_records, 'prev')">Prev</a></li>
                                       <li class="page-item" v-if="product_records.next_page_url != null"><a class="page-link" @click="reload_staff_records(product_records, 'next')">Next</a></li>
                                       <li class="page-item" v-if="product_records.last_page_url != null"><a class="page-link" @click="reload_staff_records(product_records, 'last')">Last</a></li>
                                       
                                    </ul>
                                 </nav>
                              </div>
                           </div>
                        </div>
                        <div v-else>
                          <p>No Records</p>
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

                <!-- delete modal -->
                <div class="col-md-12">
                  <div v-if="showPromptModal">
                    <transition name="modal">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Delete Product</h5>
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

                <!-- edit modal -->
                <div class="col-md-12">
                  <div v-if="showEditModal">
                    <transition name="modal">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Edit Product</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" @click="showEditModal = false">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body text-left">
                                <form @submit.prevent="do_edit" class="row text-left">
                            
                                  <div class="form-group col-md-9">
                                    <label class="mb-0">Name <span>*</span></label>
                                    <input class="form-control" type="text" v-model="current_product.name" required>
                                  </div>

                                  <div class="form-group col-md-3">
                                    <label class="mb-0">Price <span>*</span></label>
                                    <input class="form-control" type="number" v-model="current_product.price" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Description</label>
                                    <input class="form-control" type="text" v-model="current_product.description">
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Categories</label>
                                    <input class="form-control" type="text" v-model="current_product.categories">
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Update Record</button>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showEditModal = false">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <!-- end edit modal -->

                <!-- add modal -->
                <div class="col-md-12">
                  <div v-if="showAddModal">
                    <transition name="modal">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Add New Product</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" @click="showAddModal = false">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body text-left">
                                <form @submit.prevent="add_record" class="row text-left">
                            
                                  <div class="form-group col-md-9">
                                    <label class="mb-0">Name <span>*</span></label>
                                    <input class="form-control" type="text" v-model="current_product.name" required>
                                  </div>

                                  <div class="form-group col-md-3">
                                    <label class="mb-0">Price <span>*</span></label>
                                    <input class="form-control" type="number" v-model="current_product.price" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Description</label>
                                    <input class="form-control" type="text" v-model="current_product.description">
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Categories</label>
                                    <input class="form-control" type="text" v-model="current_product.categories">
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Add Product</button>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showAddModal = false">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <!-- end add modal -->

                <!-- upload modal -->
                <div class="col-md-12">
                  <div v-if="showUploadModal">
                    <transition name="modal">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Upload Product Picture</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" @click="showUploadModal = false">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body text-left">
                                <form @submit.prevent="do_upload" class="row text-left">
                            
                                  <div class="form-group col-md-3">
                                    <label class="mb-0">Product</label>
                                    <input class="form-control" v-model="current_product.name" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Picture</label>
                                    <input class="form-control" type="file" id="file" ref="file" v-on:change="handleFileUpload()" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Upload</button>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showUploadModal = false">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <!-- end upload modal -->
               </div>
            </div>
        </div>
        <TopBar title="Products List"/>
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
  name: 'Products',
  data(){
    return{
      file: '',
      value: null,
      category_list: [],
      product_records: null,
      search_clause: null,
      showPromptModal: false,
      showEditModal: false,
      showAddModal: false,
      showUploadModal: false,
      showLoadingModal: false,
      current_product : {}
    }
  },
  components: {
      SideBar,
      TopBar,
  },
  methods: {
    search_records: function(){
      const url = `${this.$api_host}/products/search?api_token=${this.$api_key}`;

      if(this.search_clause == ""){
        this.get_product_records();
      }
      else{
        axios.post(
        url,
        {
          clause: this.search_clause,
        }
        )
        .then(response => {
          // console.log(response.data.response)
          if(response.data.success){
            this.product_records.data = response.data.response;
          }
          // else{
          //   console.log(response.data.response)
          //   // this.$swal({
          //   //   icon: "warning",
          //   //   text: response.data.response,
          //   // });
          // }
        })
        .catch(error => console.log(error));
      }
      
    },
    get_product_records: function(){
      this.showLoadingModal = true;
      const url = `${this.$api_host}/products?api_token=${this.$api_key}`;
      axios.get(url)
        .then(response => {
          if(response.data.success){
            this.showLoadingModal = false;
            this.product_records = response.data.response;
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
        
    },
    reload_staff_records: function(page, type){
      var url = `${page.first_page_url}&api_token=${this.$api_key}`;
      if(type == "first"){
         url = `${page.first_page_url}&api_token=${this.$api_key}`;
      }
      else if(type == "prev"){
         url = `${page.prev_page_url}&api_token=${this.$api_key}`;
      }
      else if(type == "next"){
         url = `${page.next_page_url}&api_token=${this.$api_key}`;
      }
      else if(type == "last"){
         url = `${page.last_page_url}&api_token=${this.$api_key}`;
      }
      else{
         url = `${page.first_page_url}&api_token=${this.$api_key}`;
      }

      axios.get(url)
        .then(response => {
          if(response.data.success){
            this.product_records = response.data.response;
          }
          else{
            console.log(response.data.response);
          }
        })
        .catch(error => console.log(error));
    },
    add_record: function(){
      this.showAddModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/products/create?api_token=${this.$api_key}`;
      axios.post(
        url,
        {
          name: this.current_product.name,
          price: this.current_product.price,
          categories: this.current_product.categories,
          description: this.current_product.description,
        }
        )
        .then(response => {
          if(response.data.success){
            this.current_product = {};
            this.get_product_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "product added",
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
    },
    delete_record: function(r){
      this.current_product = {};
      this.current_product.id = r.id
      this.showPromptModal = true;
    },
    do_delete: function(){
      this.showPromptModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/products/delete/${this.current_product.id}?api_token=${this.$api_key}`;
      axios.post(url)
        .then(response => {
          if(response.data.success){
            this.current_product = {};
            this.get_product_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "Product Deleted",
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
    edit_record: function(r){
      this.current_product = {};

      this.current_product = r;
      this.showEditModal = true;
    },
    do_edit: function(){
      this.showEditModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/products/${this.current_product.id}?api_token=${this.$api_key}`;
      axios.post(
        url,
        {
          name: this.current_product.name,
          price: this.current_product.price,
          categories: this.current_product.categories,
          description: this.current_product.description,
        }
        )
        .then(response => {
          if(response.data.success){
            this.current_product = {};
            this.get_product_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "record updated",
            });
          }
          else{
            this.showLoadingModal = false;
            this.get_product_records();
            this.$swal({
              icon: "error",
              text: response.data.response,
            });
          }
         
        })
        .catch(error => console.log(error));
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    upload: function(r){
      this.current_product = {};

      this.current_product = r;
      this.showUploadModal = true;
    },
    do_upload: function(){
      this.showUploadModal = false;
      this.showLoadingModal = true;
      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('id', this.current_product.id);

      const url = `${this.$api_host}/products/upload/${this.current_product.id}?api_token=${this.$api_key}`;
      axios.post(
        url,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
        )
        .then(response => {
          if(response.data.success){
            this.current_product = {};
            this.get_product_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "Upload Successful",
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
          // console.log(response.data.response)
          if(!response.data.success){
            // alert("wrong login");
            this.$router.replace({ name: "Admin.Login" });
          }
        })
        .catch(error => console.log(error));
    }
  },
  created: function() {
    this.get_product_records();
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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