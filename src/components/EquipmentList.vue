<script setup>
import { ref, onMounted } from 'vue';
import EquipmentStockCard from '@/components/EquipmentStockCard.vue';
import axios from 'axios';

// สร้าง state สำหรับข้อมูลอุปกรณ์และสถานะการโหลด
const equipmentStocks = ref([]);
const loading = ref(true); // ตัวแปรสำหรับสถานะการโหลด

const BASE_URL = "http://127.0.0.1:8000/";

onMounted(async () => {
  // ดึงข้อมูลอุปกรณ์จาก API
  try {
    const response = await axios.get(`${BASE_URL}equipment-stocks/`); // ใช้ await เพื่อรอการดึงข้อมูล
    equipmentStocks.value = response.data; // เข้าถึงข้อมูลที่ได้จาก API
  } catch (error) {
    console.error('Error fetching equipment stocks:', error);
  } finally {
    loading.value = false; // ตั้งค่า loading เป็น false เสร็จสิ้นการโหลด
  }
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- วนลูปแสดงข้อมูลอุปกรณ์ -->
    <EquipmentStockCard v-for="item in equipmentStocks" :key="item.id" :item="item" />
  </div>
</template>
