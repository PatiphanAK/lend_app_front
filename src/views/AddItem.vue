<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';
const router = useRouter();
const categoriesStore = useCategoryStore();
const selectedCategories = ref([]);
const itemName = ref('');
const itemDescription = ref('');
const itemImage = ref(null);
const categories = ref([]); // ประกาศ categories เป็น reactive

const HandleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        itemImage.value = file;
    }
};

const addItem = async () => {
    try {
        const formData = new FormData();
        formData.append('name', itemName.value);
        formData.append('description', itemDescription.value);
        formData.append('item_image', itemImage.value);
        selectedCategories.value.forEach(id => formData.append('categories', id));

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        const accessToken = localStorage.getItem('accessToken');

        // ส่งข้อมูลไปยัง API
        const response = await axios.post(`${BASE_URL}items/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // ตรวจสอบสถานะการตอบกลับจาก API
        if (response.status === 201) { // 201 สำหรับการสร้างรายการใหม่
            alert('Item submitted successfully!');
            router.go(-1); // กลับไปที่หน้า Approver Dashboard หลังจากส่งข้อมูลสำเร็จ
        } else {
            alert('Failed to submit item: ' + response.data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error submitting item:', error);
        alert('Failed to submit item: ' + (error.response?.data?.message || error.message));
    }
};

// ดึงข้อมูล Categories เมื่อ component ถูก mount
onMounted(async () => {
    try {
        await categoriesStore.fetchCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories: ' + error.message);
    }
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
            @change="HandleFileUpload"
            required
            class="file-input w-full mt-2"
        />
    </div>
      
      <button @click="addItem" class="btn btn-primary w-full">Submit</button>
    </div>
  </template>