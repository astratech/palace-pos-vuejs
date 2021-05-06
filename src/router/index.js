import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2'
import Multiselect from 'vue-multiselect'
import PincodeInput from 'vue-pincode-input'
import VueSession from 'vue-session'

import Home from '../views/Home.vue'
import Staffs from '../views/admin/Staffs.vue'
import Products from '../views/admin/Products.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminSales from '../views/admin/Sales.vue'
import AdminProfile from '../views/admin/Profile.vue'

import SalePos from '../views/sale/Pos.vue'
import SaleLogin from '../views/sale/Login.vue'
import SaleReceipt from '../views/sale/Receipt.vue'
import SaleHistory from '../views/sale/History.vue'
import SaleProfile from '../views/sale/Profile.vue'

Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(VueSession)
Vue.component('PincodeInput', PincodeInput)
Vue.component('multiselect', Multiselect)

const routes = [
  { path: '/admin', redirect: {name: 'Admin.Login'} },
  { path: '/admin/login', name: 'Admin', component: Home },
  { path: '/admin/staffs', name: 'Admin.Staffs', component: Staffs },
  { path: '/admin/dashboard', name: 'Admin.Dashboard', component: AdminDashboard },
  { path: '/admin/products', name: 'Admin.Products', component: Products },
  { path: '/admin/sales', name: 'Admin.Sales', component: AdminSales },
  { path: '/admin/profile', name: 'Admin.Profile', component: AdminProfile },
  { path: '/sales', name: 'Sale', component: SaleLogin },
  { path: '/sales/login', name: 'Sale.Login', component: SaleLogin },
  { path: '/sales/pos', name: 'Sale.Pos', component: SalePos },
  { path: '/sales/history', name: 'Sale.History', component: SaleHistory },
  { path: '/sales/profile', name: 'Sale.Profile', component: SaleProfile },
  { path: '/sales/receipt/:sale_id', name: 'Sale.Receipt', component: SaleReceipt },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'catchAll',
    component: SaleLogin
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
