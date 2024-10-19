<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const borrowRequests = ref([]);
const loading = ref(true);

const BASE_URL = "http://127.0.0.1:8000/";

onMounted(async () => {
  // ดึงข้อมูลการขอยืมจาก API
  try {
    const response = await axios.get(`${BASE_URL}borrow-requests/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // ส่ง token ไปด้วย
      }
    });
    borrowRequests.value = response.data; // เข้าถึงข้อมูลที่ได้จาก API
    console.log('Borrow Requests:', borrowRequests.value);
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
  } finally {
    loading.value = false; // ตั้งค่า loading เป็น false เสร็จสิ้นการโหลด
  }
});

// ฟังก์ชันสำหรับกำหนด class ของสถานะ
const getStatusClass = (status) => {
  switch (status) {
    case 'PENDING':
      return 'badge badge-warning';
    case 'APPROVED':
      return 'badge badge-success';
    case 'DENIED':
      return 'badge badge-error';
    default:
      return '';
  }
};
</script>

<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Borrow Requests</h1>
      <div v-if="loading" class="text-lg">Loading...</div>
      <div v-else>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Borrower</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Borrow Date</th>
              <th>Expected Return Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in borrowRequests" :key="request.id">
              <td>{{ request.id }}</td>
              <td>{{ request.borrower }}</td>
              <td>{{ request.quantity }}</td>
              <td>
                <span :class="getStatusClass(request.status)">{{ request.status }}</span>
              </td>
              <td>{{ request.borrow_date }}</td>
              <td>{{ request.expected_return_date }}</td>
              <td>{{ request.return_date || 'Not returned yet' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  

  
  <style scoped>
  /* คุณสามารถปรับแต่งสไตล์ได้ที่นี่ */
  </style>
  