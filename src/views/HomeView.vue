<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMeStore } from '@/stores/meStore'; // นำเข้า useMeStore

const meStore = useMeStore(); // ใช้ meStore

const loading = ref(true); // สถานะโหลดข้อมูล
const isAuthenticated = computed(() => Object.keys(meStore.me).length > 0); // ตรวจสอบการเข้าสู่ระบบจากข้อมูลผู้ใช้
const user = computed(() => meStore.me); // ดึงข้อมูลผู้ใช้จาก meStore

onMounted(async () => {
  try {
    await meStore.fetchMe(); // ดึงข้อมูลผู้ใช้เมื่อ component ถูก mounted
  } catch (error) {
    console.error('Fetch user failed:', error);
  } finally {
    loading.value = false; // อัปเดตสถานะโหลดเมื่อทำงานเสร็จ
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-4 text-gray-700">Welcome to the Home Page</h1>
      <div v-if="loading" class="text-center">
        <p class="text-gray-500">Loading...</p> <!-- แสดงข้อความโหลด -->
      </div>
      <div v-else>
        <div v-if="isAuthenticated">
          <p class="text-lg text-gray-800 mb-2">Hi there, <span class="font-semibold">{{ user?.username }}</span>!</p>
          <p class="text-gray-600">You are logged in.</p>
        </div>
        <div v-else>
          <p class="text-gray-600">You are not logged in.</p>
        </div>
      </div>
    </div>
  </div>
</template>
