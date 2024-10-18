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

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login/", name: "Login", component: LoginView },
  {
    path: "/borrower-dashboard/",
    name: "BorrowerDashboard",
    component: BorrowerDashboard,
    meta: { requiresAuth: true },
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
        path: "add-item", // ทำให้เส้นทางเป็นเส้นทางสัมพัทธ์
        name: "AddItem",
        component: AddItem,
        meta: { requiresAuth: true },
      },
      {
        path: "assign-item", // ทำให้เส้นทางเป็นเส้นทางสัมพัทธ์
        name: "AssignItem",
        component: AssignItemToStock,
        meta: { requiresAuth: true },
      },
      {
        path: "waiting-for-approval", // ทำให้เส้นทางเป็นเส้นทางสัมพัทธ์
        name: "WaitingForApproval",
        component: WaitingForApproval,
        meta: { requiresAuth: true },
      },
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
