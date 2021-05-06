
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
                            <h4 class="card-title">Staffs</h4>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center">
                            
                        </div>
                      </div>
                      <div class="iq-card-body row">
                        <div class="col-sm-8 col-md-5 mb-4">
                            <form class="mr-3 position-relative">
                                <div class="form-group mb-0">
                                  <input type="text" class="form-control" v-model="search_clause" @keyup="search_staff_records" placeholder="Search" aria-controls="user-list-table">
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-3 col-md-6 mb-4 text-right">
                          <button type="submit" class="btn btn-primary" @click="showAddModal = true">Add Staff</button>
                        </div>
                        <div class="col-md-12" v-if="staffs_record">
                          <div class="table-responsive">
                            <table class="table table-bordered">
                              <thead class="text-left">
                                <th>S/N</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Action</th>
                              </thead>
                              <tbody class="text-left">
                                <!-- <tr>
                                  <td>100</td>
                                  <td>Mr</td>
                                  <td>Ajasi</td>
                                  <td>Bus</td>
                                  <td>
                                    <div class="d-flex align-items-center list-user-action">
                                      <a class="iq-bg-primary" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" href="#"><i class="ri-pencil-line"></i></a>
                                      <a class="iq-bg-primary" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" href="#"><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                  </td>
                                </tr> -->

                                <tr v-bind:key="n" v-for="(r, n) in staffs_record.data">
                                  <td>#</td>
                                  <td>{{r.title}}</td>
                                  <td>{{r.name}}</td>
                                  <td>{{r.role}}</td>
                                  <td>
                                    <div class="d-flex align-items-center list-user-action">
                                      <button class="iq-bg-primary"  @click="edit_staff(r)"><i class="ri-pencil-line"></i></button>
                                      <button class="iq-bg-primary"  @click="delete_staff(r)"><i class="ri-delete-bin-line"></i></button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="row justify-content-between mt-3" >
                              <div id="user-list-page-info" class="col-md-6">
                                 <span>Showing {{ staffs_record.current_page }} to {{ staffs_record.to }} of {{ staffs_record.total }}  records</span>
                              </div>
                              <div class="col-md-6">
                                 <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-end mb-0">
                                       
                                       <li class="page-item" v-if="staffs_record.first_page_url != null"><a class="page-link" @click="reload_staff_records(staffs_record, 'first')">First</a></li>
                                       <li class="page-item" v-if="staffs_record.prev_page_url != null"><a class="page-link" @click="reload_staff_records(staffs_record, 'prev')">Prev</a></li>
                                       <li class="page-item" v-if="staffs_record.next_page_url != null"><a class="page-link" @click="reload_staff_records(staffs_record, 'next')">Next</a></li>
                                       <li class="page-item" v-if="staffs_record.last_page_url != null"><a class="page-link" @click="reload_staff_records(staffs_record, 'last')">Last</a></li>
                                       
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
                                <h5 class="modal-title">Delete Staff</h5>
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
                                <h5 class="modal-title">Edit Staff</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" @click="showEditModal = false">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body text-left">
                                <form @submit.prevent="do_edit" class="row text-left">
                            
                                  <div class="form-group col-md-3">
                                    <label class="mb-0">Title</label>
                                    <input class="form-control" v-model="current_staff.title" required>
                                  </div>

                                  <div class="form-group col-md-9">
                                    <label class="mb-0">Name</label>
                                    <input class="form-control" v-model="current_staff.name" required>
                                  </div>

                                  <div class="form-group col-md-6">
                                    <label class="mb-0">Role</label>
                                    <input class="form-control" v-model="current_staff.role" required>
                                  </div>

                                  <div class="form-group col-md-6">
                                    <label class="mb-0">Pin(4 Digits Only)</label>
                                    <input class="form-control" v-model="current_staff.pin_code">
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Update Staff</button>
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
                                <h5 class="modal-title">Add New Staff</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" @click="showAddModal = false">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body text-left">
                                <form @submit.prevent="add_staff" class="row text-left">
                            
                                  <div class="form-group col-md-3">
                                    <label class="mb-0">Title</label>
                                    <input class="form-control" v-model="current_staff.title" required>
                                  </div>

                                  <div class="form-group col-md-9">
                                    <label class="mb-0">Name</label>
                                    <input class="form-control" v-model="current_staff.name" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label class="mb-0">Role</label>
                                    <input class="form-control" v-model="current_staff.role" required>
                                  </div>

                                  <div class="form-group col-md-12">
                                    <button type="submit" class="btn btn-primary">Add Staff</button>
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
               </div>
            </div>
        </div>
        <TopBar title="Staff List"/>
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
  name: 'Staffs',
  data(){
    return{
      staffs_record: null,
      search_clause: null,
      showPromptModal: false,
      showEditModal: false,
      showAddModal: false,
      showLoadingModal: false,
      current_staff : {
        title: null,
        name: null,
        role: null,
        pin_code: null,
      }
    }
  },
  components: {
      SideBar,
      TopBar,
  },
  methods: {
    search_staff_records: function(){
      const url = `${this.$api_host}/staffs/search?api_token=${this.$api_key}`;

      if(this.search_clause == ""){
        this.get_staff_records();
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
            this.staffs_record.data = response.data.response;
          }
          else{
            console.log(response.data.response);
          }
        })
        .catch(error => console.log(error));
      }
      
    },
    get_staff_records: function(){
      this.showLoadingModal = true;
      const url = `${this.$api_host}/staffs?api_token=${this.$api_key}`;
      axios.get(url)
        .then(response => {
          if(response.data.success){
            this.showLoadingModal = false;
            this.staffs_record = response.data.response;
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
            this.staffs_record = response.data.response;
          }
          else{
            // alert(response.data.response);
          }
        })
        .catch(error => console.log(error));
    },
    add_staff: function(){
      this.showAddModal = false;
      this.showLoadingModal = true;
      
      const url = `${this.$api_host}/staffs/create?api_token=${this.$api_key}`;
      axios.post(
        url,
        {
          title: this.current_staff.title,
          name: this.current_staff.name,
          role: this.current_staff.role
        }
        )
        .then(response => {
          if(response.data.success){
            this.current_staff = {};
            this.get_staff_records();
            this.showLoadingModal = false;
          }
          else{
            this.showLoadingModal = false;
            this.$swal({
              icon: "error",
              text: response.data.response,
            });
          }
          this.showAddModal = false;
          this.$swal('Operation Successful', '', 'OK');
        })
        .catch(error => console.log(error));
    },
    delete_staff: function(r){
      this.current_staff = {};
      this.current_staff.id = r.id
      this.showPromptModal = true;
    },
    do_delete: function(){
      this.showPromptModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/staffs/delete/${this.current_staff.id}?api_token=${this.$api_key}`;
      axios.post(url)
        .then(response => {
          if(response.data.success){
            this.current_staff = {};
            this.get_staff_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "record deleted",
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
    },
    edit_staff: function(r){
      this.current_staff = {};

      this.current_staff = r;
      this.showEditModal = true;
    },
    do_edit: function(){
      this.showEditModal = false;
      this.showLoadingModal = true;
      const url = `${this.$api_host}/staffs/${this.current_staff.id}?api_token=${this.$api_key}`;
      axios.post(
        url,
        {
          title: this.current_staff.title,
          name: this.current_staff.name,
          role: this.current_staff.role,
          pin_code: this.current_staff.pin_code
        }
        )
        .then(response => {
          if(response.data.success){
            this.current_staff = {};
            this.get_staff_records();
            this.showLoadingModal = false;
            this.$swal({
              icon: "success",
              text: "record updated",
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
    this.get_staff_records();
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