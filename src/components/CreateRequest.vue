<script setup>
import { ref } from 'vue';
import axios from 'axios';
const stockId = ref('');
const quantity = ref(1);
const returnDate = ref('');

const BASE_URL = "http://127.0.0.1:8000/"; // URL base สำหรับ API

// ฟังก์ชันสำหรับส่งข้อมูล
const submitRequest = async () => {
  const requestData = {
    equipment_stock: stockId.value,
    quantity: quantity.value,
    expected_return_date: returnDate.value
  };
  
  console.log('Request Data:', requestData);
  console.log('Token:', localStorage.getItem('accessToken')); // แสดง token ที่เก็บไว้ใน localStorage
  try {
    // ส่งข้อมูลไปยัง borrow-requests/
    const response = await axios.post(`${BASE_URL}borrow-requests/`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // ส่ง token ไปด้วย
      }
    });
    console.log('Response:', response.data); // แสดงข้อมูลที่ได้จาก API
    // แสดงข้อความหรือทำการ redirect หลังจากส่งข้อมูลสำเร็จ
  } catch (error) {
    console.error('Error submitting request:', error);
    // คุณสามารถจัดการข้อผิดพลาดที่เกิดขึ้นได้ที่นี่
  }
};
</script>
<template>
    <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Create Request</h2>
      <form @submit.prevent="submitRequest">
        <div class="mb-4">
          <label for="stockId" class="block text-sm font-medium text-gray-700">Stock ID</label>
          <input
            type="text"
            id="stockId"
            v-model="stockId"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            v-model="quantity"
            required
            min="1"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="mb-4">
          <label for="returnDate" class="block text-sm font-medium text-gray-700">Expected Return Date</label>
          <input
            type="date"
            id="returnDate"
            v-model="returnDate"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  </template>
