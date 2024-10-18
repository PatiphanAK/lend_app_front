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
});
// ใช้ watchEffect เพื่อตรวจสอบการเปลี่ยนแปลงใน categoriesStore
watchEffect(() => {
    categories.value = categoriesStore.categories; // อัปเดต categories โดยอัตโนมัติเมื่อมีการเปลี่ยนแปลง
});
</script>

<template>
    <div>
        <h1>Add Item</h1>
        <goBackBtn />
        <div>
            <label for="itemName">Item Name:</label>
            <input id="itemName" type="text" v-model="itemName" required />
        </div>
        <div>
            <label for="itemDescription">Item Description:</label>
            <input id="itemDescription" type="text" v-model="itemDescription" required />
        </div>
        <div v-for="category in categories" :key="category.id">
            <input type="checkbox" :id="`category-${category.id}`" :value="category.id" v-model="selectedCategories" />
            <label :for="`category-${category.id}`">{{ category.name }}</label>
        </div>
        <div>
            <label for="itemImage">Item Image:</label>
            <input id="itemImage" type="file" @change="event => itemImage.value = event.target.files[0]" required />
        </div>
        <button @click="addItem">Submit</button>
    </div>
</template>