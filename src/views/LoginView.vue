<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // เพิ่มการ import useAuthStore

const router = useRouter();
const authStore = useAuthStore();

const userType = ref('borrower');
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const changeUserType = () => {
  userType.value = userType.value === 'borrower' ? 'approver' : 'borrower';
};

const goRegister = () => {
  router.push('/register');
};

const goForgetPassword = () => {
  router.push('/forget-password');
};

const login = async () => {
  errorMessage.value = '';
  try {
    await authStore.login(username.value, password.value);
    if (userType.value === 'borrower') {
      localStorage.setItem('userType', 'borrower');
      router.push('/borrower-dashboard');
    } else {
      localStorage.setItem('userType', 'approver');
      router.push('/approver-dashboard');
    }
  } catch (error) {
    errorMessage.value = authStore.errorMessage; // แสดงข้อความแสดงข้อผิดพลาด
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('https://source.unsplash.com/1600x900/?nature,water');">
    <div class="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username:</label>
          <input id="username" v-model="username" type="text" required class="input input-bordered w-full" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input id="password" v-model="password" type="password" required class="input input-bordered w-full" />
        </div>
        <div class="mb-4">
          <label for="userType" class="block text-gray-700">User Type:</label>
          <select id="userType" v-model="userType" class="select select-bordered w-full">
            <option value="borrower">Borrower</option>
            <option value="approver">Approver</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-full">Login</button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
      <div class="flex justify-between mt-4">
        <button @click="goRegister" class="btn btn-secondary">Register</button>
        <button @click="goForgetPassword" class="btn btn-link">Forget Password</button>
      </div>
    </div>
  </div>
</template>
