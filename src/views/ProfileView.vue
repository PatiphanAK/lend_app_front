<script setup>
import { onMounted, computed, ref } from 'vue';
import { useMeStore } from '@/stores/meStore'; // นำเข้า meStore แทน authStore

const meStore = useMeStore(); // นำเข้า meStore
const loading = ref(true); // สถานะโหลดข้อมูล

// Computed properties
const isAuthenticated = computed(() => meStore.me && Object.keys(meStore.me).length > 0);
const user = computed(() => meStore.me); // ใช้ข้อมูลจาก meStore

onMounted(async () => {
  try {
    await meStore.fetchMe(); // ดึงข้อมูลผู้ใช้เมื่อ component ถูก mounted
  } catch (error) {
    console.error('Fetch user failed:', error);
    alert('Failed to fetch user data.'); // แสดงข้อความแจ้งเตือน
  } finally {
    loading.value = false; // อัปเดตสถานะโหลดเมื่อทำงานเสร็จ
  }
});
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    <h1 class="text-4xl font-bold mb-6">Profile</h1>
    <div v-if="loading">
      <p class="text-lg">Loading...</p> <!-- แสดงข้อความโหลดข้อมูล -->
    </div>
    <div v-else-if="isAuthenticated" class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div v-if="user.profile_image" class="mb-4">
        <h3 class="text-2xl font-semibold mb-2">Profile Image</h3>
        <img :src="user.profile_image" alt="Profile Image" class="rounded-full h-32 w-32 object-cover" />
      </div>
  
      <div v-for="(value, key) in user" :key="key" class="mb-2">
        <div v-if="typeof value === 'object' && value !== null">
          <h3 class="text-xl font-semibold mt-4">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</h3>
          <div v-for="(subValue, subKey) in value" :key="subKey">
            <p class="text-gray-600">{{ subKey.charAt(0).toUpperCase() + subKey.slice(1) }}: {{ subValue }}</p>
          </div>
        </div>
        <div v-else-if="key !== 'profile_image'"> <!-- ตรวจสอบให้ไม่แสดง profile_image -->
          <p class="text-gray-600">{{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-lg text-gray-600">Please log in to view your profile.</p>
    </div>
  </div>
</template>
