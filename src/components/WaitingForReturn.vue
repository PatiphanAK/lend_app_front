<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const borrowRequests = ref([]);
const BASE_URL = "http://127.0.0.1:8000/";

onMounted(async () => {
  try {
    const response = await axios.get(`${BASE_URL}borrow-requests/waiting-for-return/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    borrowRequests.value = response.data;
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
  }
});

const confirmReturn = async (requestId) => {
  try {
    await axios.patch(`${BASE_URL}confirm-return/${requestId}/`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    borrowRequests.value = borrowRequests.value.filter(request => request.id !== requestId);
    alert('Return confirmed successfully!');
  } catch (error) {
    console.error('Error confirming return:', error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Waiting for Return</h1>
    <div v-if="borrowRequests.length === 0">
      <p>No items waiting for return.</p>
    </div>
    <div v-else>
      <div v-for="request in borrowRequests" :key="request.id" class="border p-4 mb-4">
        <p><strong>Stock ID:</strong> {{ request.equipment_stock }}</p>
        <p><strong>Borrower:</strong> {{ request.borrower }}</p>
        <p><strong>Quantity:</strong> {{ request.quantity }}</p>
        <p><strong>Expected Return Date:</strong> {{ request.expected_return_date }}</p>
        <button class="btn btn-success" @click="confirmReturn(request.id)">Confirm Return</button>
      </div>
    </div>
  </div>
</template>
