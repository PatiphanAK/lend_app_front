<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useMeStore } from '@/stores/meStore';

const items = ref([]);
const selectedItemId = ref(null);
const quantity = ref(1);
const BASE_URL = 'http://127.0.0.1:8000/';
const isLoading = ref(false);
const meStore = useMeStore(); // เปลี่ยนชื่อเป็น meStore

// ฟังก์ชันสำหรับดึงข้อมูล Items จาก API
const fetchItems = async () => {
    isLoading.value = true; // เริ่มโหลดข้อมูล
    try {
        const response = await axios.get(`${BASE_URL}items/`); // ปรับให้ตรงกับ endpoint ที่ใช้งาน
        items.value = response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        isLoading.value = false; // เสร็จสิ้นการโหลดข้อมูล
    }
};

// ฟังก์ชันสำหรับการ Assign Item
const assignItem = async () => {
    const organizationId = meStore.me.organization; // ดึง organization_id ที่ถูกต้อง

    const data = {
        quantity: quantity.value,
        item_id: selectedItemId.value,
        organization_id: organizationId,
    };

    try {
        await axios.post(`${BASE_URL}equipment-stocks/assign/`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        alert('Item assigned successfully!');
    } catch (error) {
        console.error('Error assigning item:', error);
        alert('Failed to assign item.');
    }
};

// ดึงข้อมูล Items เมื่อ component ถูก mount
onMounted(fetchItems);
</script>

<template>
    <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <goBackBtn class="mb-4" />
        <h1 class="text-2xl font-semibold mb-6">Assign Item to Stock</h1>

        <div class="mb-4">
            <label for="itemSelect" class="block text-sm font-medium text-gray-700">Select Item:</label>
            <select id="itemSelect" v-model="selectedItemId" class="select select-bordered w-full mt-2">
                <option v-for="item in items" :key="item.id" :value="item.id">
                    {{ item.name }}
                </option>
            </select>
        </div>

        <div class="mb-4">
            <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity:</label>
            <input id="quantity" type="number" v-model="quantity" min="1" required
                class="input input-bordered w-full mt-2" />
        </div>

        <button @click="assignItem" class="btn btn-primary w-full">Assign</button>
    </div>
</template>
