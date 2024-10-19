<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img
        :src="item.item.item_image || 'default-image-url.jpg'"
        alt="Item Image"
        class="w-full h-48 object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ item.item.name }}</h2>
      <p>Stock ID: {{ item.id }}</p>
      <p>{{ item.item.description }}</p>
      <div class="flex justify-between">
        <span>Quantity: {{ item.quantity }}</span>
        <span>Available: {{ item.available }}</span>
      </div>
      <span>Organization: {{ item.organization }}</span>
      <span>Categories: {{ formattedCategories }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

// รับ props จาก parent component
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// คำนวณค่าหมวดหมู่
const formattedCategories = computed(() => {
  return props.item.item.categories.join(', '); // แสดงหมวดหมู่ในรูปแบบที่อ่านง่าย
});
</script>

<style scoped>
.card {
  max-width: 300px;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>