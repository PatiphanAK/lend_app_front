<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const goTo = (route) => {
  router.push({ name: route });
};

const performSearch = () => {
  // Implement search logic here
  console.log(`Searching for: ${searchQuery.value}`);
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/6 bg-gray-100 text-gray-800 p-4 shadow-lg">
      <ul>
        <li class="mb-4">
          <button @click="goTo('EquipmentList')" class="btn btn-outline w-full">Equipment Stocks List</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('BorrowHistory')" class="btn btn-outline w-full">Borrow History</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('PendingRequest')" class="btn btn-outline w-full">Pending Request</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('CreateRequest')" class="btn btn-outline w-full">Create Request</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('FilterStock')" class="btn btn-outline w-full">Filter Stock</button>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="w-5/6 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>