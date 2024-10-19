<script setup>
import { ref } from 'vue';
import axios from 'axios';
import EquipmentStockCard from '@/components/EquipmentStockCard.vue';

const itemQuery = ref('');
const organizationQuery = ref('');
const items = ref([]);
const loading = ref(false);

const BASE_URL = "http://127.0.0.1:8000/";

const search = async () => {
  loading.value = true;
  items.value = []; // Clear previous items
  
  try {
    const response = await axios.get(`${BASE_URL}items/search/`, {
      params: {
        item: itemQuery.value,
        organization: organizationQuery.value,
      },
    });
    items.value = response.data; // Set the fetched data
  } catch (error) {
    console.error('Error fetching items:', error);
  } finally {
    loading.value = false; // Set loading to false after request
  }
};
</script>

<template>
    <div class="p-4">
      <h2 class="text-2xl mb-4">Search Equipment Stock</h2>
      
      <div class="mb-4">
        <input
          v-model="itemQuery"
          type="text"
          placeholder="Search for item"
          class="input"
        />
        <input
          v-model="organizationQuery"
          type="text"
          placeholder="Search for organization"
          class="input"
        />
        <button @click="search" class="btn">Search</button>
      </div>
  
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="items.length === 0" class="text-center">No items found.</div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EquipmentStockCard
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </template>