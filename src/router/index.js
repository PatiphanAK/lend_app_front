import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import BorrowerDashboard from "@/views/BorrowerDashboard.vue";
import ApproverDashboard from "@/views/ApproverDashboard.vue";
import AddItem from "@/views/AddItem.vue";
import { useAuthStore } from "@/stores/auth";
import ProfileView from "@/views/ProfileView.vue";
import AssignItemToStock from "@/components/AssignItemToStock.vue";
import WaitingForApproval from "@/components/WaitingForApprovel.vue";
import RegisterView from "@/views/RegisterView.vue";
import OrgStock from "@/components/OrgStock.vue";
import EquipmentList from "@/components/EquipmentList.vue";
import BorrowHistory from "@/components/Search.vue";
import PendingRequest from "@/components/PendingRequest.vue";
import CreateRequest from "@/components/CreateRequest.vue";
import WaitingForReturn from "@/components/WaitingForReturn.vue";
import ApprovalHistory from "@/components/ApprovalHistory.vue";
import OrgApproveHistory from "@/components/OrgApproveHistory.vue";
import Filter from "@/components/Filter.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login/", name: "Login", component: LoginView },
  {
    path: "/borrower-dashboard/",
    name: "BorrowerDashboard",
    component: BorrowerDashboard,
    meta: { requiresAuth: true },
    children: [
    {
      path: "equipment-list",
      name: "EquipmentList",
      component: EquipmentList,
    },
    {
      path: "borrow-history",
      name: "BorrowHistory",
      component: BorrowHistory,
    },
    {
      path:"pending-request",
      name:"PendingRequest",
      component: PendingRequest
    },
    {
      path: "create-request",
      name: "CreateRequest",
      component: CreateRequest
    },
    {
      path:"filter",
      name:"FilterStock",
      component: Filter
    }
    ],
  },
  {
    path: "/profile/",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/approver-dashboard/",
    name: "ApproverDashboard",
    component: ApproverDashboard,
    meta: { requiresAuth: true },
    children: [ // แก้ไขจาก childern เป็น children
      {
        path: "add-item", 
        name: "AddItem",
        component: AddItem,
        meta: { requiresAuth: true },
      },
      {
        path: "assign-item", 
        name: "AssignItem",
        component: AssignItemToStock,
        meta: { requiresAuth: true },
      },
      {
        path: "waiting-for-approval", 
        name: "WaitingForApproval",
        component: WaitingForApproval,
        meta: { requiresAuth: true },
      },
      {
        path: "org-stock", 
        name: "OrganizationStock",
        component: OrgStock,
        meta: { requiresAuth: true },
      },
      {
        path: "waiting-for-return", 
        name: "WaitingForReturn",
        component: WaitingForReturn,
      },
      {
        path: "approval-history",
        name: "ApprovalHistory",
        component: ApprovalHistory,
      },
      {
        path: "org-approve-history",
        name: "OrgApproveHistory",
        component: OrgApproveHistory
      }
    ],
  },
  { path: "/register/", name: "Register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
