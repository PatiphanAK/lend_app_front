<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import axios from 'axios';
import goBackBtn from '@/components/goBackBtn.vue';

const BASE_URL = 'http://127.0.0.1:8000/';
const router = useRouter();
const categoriesStore = useCategoryStore();
const selectedCategories = ref([]);
const itemName = ref('');
const itemDescription = ref('');
const itemImage = ref();
const categories = categoriesStore.categories;

// ฟังก์ชันสำหรับการเพิ่ม Item
const addItem = async () => {
    try {
        const formData = new FormData();
        formData.append('name', itemName.value);
        formData.append('description', itemDescription.value);
        formData.append('image_item', itemImage.value);
        selectedCategories.value.forEach(id => formData.append('categories', id)); // ส่ง ID ของ Categories ที่เลือก

        const accessToken = localStorage.getItem('accessToken');
        // ส่งข้อมูลไปยัง API
        await axios.post(`${BASE_URL}items/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        alert('Item submitted successfully!');
        goBack(); // กลับไปที่หน้า Approver Dashboard หลังจากส่งข้อมูลสำเร็จ
    } catch (error) {
        console.error('Error submitting item:', error);
        alert('Failed to submit item.');
    }
};

// ดึงข้อมูล Categories เมื่อ component ถูก mount
onMounted(async () => {
    await categoriesStore.fetchCategories();
    categories.value = categoriesStore.categories; // อัปเดต categories ที่เก็บไว้
});
// ใช้ watchEffect เพื่อตรวจสอบการเปลี่ยนแปลงใน categoriesStore
watchEffect(() => {
    categories.value = categoriesStore.categories; // อัปเดต categories โดยอัตโนมัติเมื่อมีการเปลี่ยนแปลง
});
</script>

<template>
    <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6">Add Item</h1>
      <goBackBtn class="mb-4" />
      
      <div class="mb-4">
        <label for="itemName" class="block text-sm font-medium text-gray-700">Item Name:</label>
        <input
          id="itemName"
          type="text"
          v-model="itemName"
          required
          class="input input-bordered w-full mt-2"
        />
      </div>
      
      <div class="mb-4">
        <label for="itemDescription" class="block text-sm font-medium text-gray-700">Item Description:</label>
        <input
          id="itemDescription"
          type="text"
          v-model="itemDescription"
          required
          class="input input-bordered w-full mt-2"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Categories:</label>
        <div v-for="category in categories" :key="category.id" class="flex items-center mb-2">
          <input
            type="checkbox"
            :id="`category-${category.id}`"
            :value="category.id"
            v-model="selectedCategories"
            class="checkbox"
          />
          <label :for="`category-${category.id}`" class="ml-2">{{ category.name }}</label>
        </div>
      </div>
      
      <div class="mb-4">
        <label for="itemImage" class="block text-sm font-medium text-gray-700">Item Image:</label>
        <input
          id="itemImage"
          type="file"
          @change="event => itemImage.value = event.target.files[0]"
          required
          class="file-input w-full mt-2"
        />
      </div>
      
      <button @click="addItem" class="btn btn-primary w-full">Submit</button>
    </div>
  </template>