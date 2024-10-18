<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goTo = (path) => {
  router.push({ name: path });
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/6 bg-gray-100 text-gray-800 p-4 shadow-lg">
      <ul>
        <li class="mb-4">
          <button @click="goTo('ApprovalHistory')" class="btn btn-outline w-full">Approve History</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('AddItem')" class="btn btn-outline w-full">Add Item</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('AssignItem')" class="btn btn-outline w-full">Assign Item</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('WaitingForApproval')" class="btn btn-outline w-full">Waiting for Approve</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('orgEquipmentStock')" class="btn btn-outline w-full">Organization Equipment Stock</button>
        </li>
        <li class="mb-4">
          <button @click="goTo('orgApproveHistory')" class="btn btn-outline w-full">Organization Approve History</button>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="w-5/6 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>