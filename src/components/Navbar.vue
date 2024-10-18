<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useMeStore } from '@/stores/meStore';

const meStore = useMeStore(); // เปลี่ยนชื่อจาก useMeStore เป็น meStore
const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => authStore.isAuthenticated);
const isApprover = computed(() => {
  // ตรวจสอบว่า organization มีอยู่ใน me หรือไม่
  return meStore.me && meStore.me.organization !== undefined;
}); 

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/login/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const goToLogin = () => {
  router.push('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
};
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Go to Home</RouterLink>
    </div>
    <div class="flex-none">
      <div v-if="isLoggedIn" class="flex items-center space-x-4">
        <RouterLink to="/profile" class="hover:text-gray-700">Go to Profile</RouterLink>
        <div v-if="isApprover">
          <RouterLink to="/approver-dashboard" class="hover:text-gray-700">Go to Approver Dashboard</RouterLink>
        </div>
        <div v-else>
          <RouterLink to="/borrower-dashboard" class="hover:text-gray-700">Go to Borrower Dashboard</RouterLink>
        </div>
        <button @click="logout" class="btn">Logout</button>
      </div>
      <button v-else @click="goToLogin" class="btn">Login</button>
    </div>
  </div>
</template>

