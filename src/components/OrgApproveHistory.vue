<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Approval History</h1>
      <div v-if="loading" class="text-lg">Loading...</div>
      <div v-else-if="!borrowRequests.length" class="text-lg">No approval history found.</div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 p-2">Request ID</th>
                <th class="border border-gray-300 p-2">Borrower</th>
                <th class="border border-gray-300 p-2">Quantity</th>
                <th class="border border-gray-300 p-2">Status</th>
                <th class="border border-gray-300 p-2">Borrow Date</th>
                <th class="border border-gray-300 p-2">Expected Return Date</th>
                <th class="border border-gray-300 p-2">Approver</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in borrowRequests" :key="request.id">
                <td class="border border-gray-300 p-2">{{ request.id }}</td>
                <td class="border border-gray-300 p-2">{{ request.borrower }}</td>
                <td class="border border-gray-300 p-2">{{ request.quantity }}</td>
                <td class="border border-gray-300 p-2">{{ request.status }}</td>
                <td class="border border-gray-300 p-2">{{ request.borrow_date }}</td>
                <td class="border border-gray-300 p-2">{{ request.expected_return_date }}</td>
                <td class="border border-gray-300 p-2">{{ request.approver }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const borrowRequests = ref([]);
  const loading = ref(true);
  const BASE_URL = "http://127.0.0.1:8000/";
  
  onMounted(async () => {
    try {
      const response = await axios.get(`${BASE_URL}org-approve-history/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      borrowRequests.value = response.data;
    } catch (error) {
      console.error('Error fetching borrow requests:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  