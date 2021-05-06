
<template>
    <div>
      <!-- Sidebar  -->
         <div class="iq-sidebar">
            <div class="iq-sidebar-logo d-flex justify-content-between">
               <a href="#" class="header-logo">
                  <img src="images/logo.png" class="img-fluid rounded-normal" alt="">
                  <div class="logo-title">
                     <span class="text-danger text-uppercase">AST<span class="text-primary ml-1 text-uppercase">POS</span></span>
                  </div>
               </a>
               <div class="iq-menu-bt-sidebar">
                  <div class="iq-menu-bt align-self-center">
                     <div class="wrapper-menu">
                        <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
                        <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="sidebar-scrollbar">
               <nav class="iq-sidebar-menu">
                  <ul id="iq-sidebar-toggle" class="iq-menu">
                     <li>
                        <router-link :to="{ name: 'Admin.Dashboard' }" class="iq-waves-effect"><i class="fa fa-home iq-arrow-left"></i><span>Dashboard</span></router-link> 
                     </li>
                     <li>
                        <router-link :to="{ name: 'Admin.Staffs' }" class="iq-waves-effect"><i class="fa fa-users iq-arrow-left"></i><span>Staffs</span></router-link> 
                     </li>
                     <li>
                        <router-link :to="{ name: 'Admin.Products' }" class="iq-waves-effect"><i class="fa fa-cart-plus iq-arrow-left"></i><span>Products</span></router-link> 
                     </li>
                     <li>
                        <router-link :to="{ name: 'Admin.Sales' }" class="iq-waves-effect"><i class="fa fa-calculator iq-arrow-left"></i><span>Sales</span></router-link> 
                     </li>
                     <li>
                        <router-link :to="{ name: 'Admin.Profile' }" class="iq-waves-effect"><i class="fa fa-lock iq-arrow-left"></i><span>Change Password</span></router-link> 
                     </li>
                     <li>
                        <router-link :to="{ name: 'Admin.Login' }" class="iq-waves-effect"><i class="ri-login-box-line iq-arrow-left"></i><span>Log Out</span></router-link> 
                     </li>
                  </ul>
               </nav>
               <div id="sidebar-bottom" class="p-3 position-relative">
                  
               </div>
            </div>
         </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'SideBar',
  components: {
    // HelloWorld
  }
}
</script>
