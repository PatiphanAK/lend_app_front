<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const approvalHistory = ref([]);
const loading = ref(true);
const BASE_URL = "http://127.0.0.1:8000/";

onMounted(async () => {
  try {
    const response = await axios.get(`${BASE_URL}approval-history/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    approvalHistory.value = response.data;
  } catch (error) {
    console.error('Error fetching approval history:', error);
  } finally {
    loading.value = false;
  }
});
</script>
<template>
    <div>
      <h1 class="text-xl font-bold mb-4">Approval History</h1>
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else>
        <table class="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Borrower</th>
              <th class="border border-gray-300 p-2">Quantity</th>
              <th class="border border-gray-300 p-2">Status</th>
              <th class="border border-gray-300 p-2">Borrow Date</th>
              <th class="border border-gray-300 p-2">Expected Return Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in approvalHistory" :key="request.id">
              <td class="border border-gray-300 p-2">{{ request.borrower }}</td>
              <td class="border border-gray-300 p-2">{{ request.quantity }}</td>
              <td class="border border-gray-300 p-2">{{ request.status }}</td>
              <td class="border border-gray-300 p-2">{{ request.borrow_date }}</td>
              <td class="border border-gray-300 p-2">{{ request.expected_return_date }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="approvalHistory.length === 0" class="text-center mt-4">
          <p>No approval history found.</p>
        </div>
      </div>
    </div>
  </template>
  

  