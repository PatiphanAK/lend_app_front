<script setup>
import goBackBtn from './goBackBtn.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const selectedItemId = ref(null);
const quantity = ref(1);
const BASE_URL = 'http://127.0.0.1:8000/';
const isLoading = ref(false);
// ฟังก์ชันสำหรับดึงข้อมูล Items จาก API
const fetchItems = async () => {
    isLoading.value = true; // เริ่มโหลดข้อมูล
    try {
        const response = await axios.get(`${BASE_URL}items/`); // ปรับให้ตรงกับ endpoint ที่ใช้งาน
        items.value = response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

// ฟังก์ชันสำหรับการ Assign Item
const assignItem = async () => {
    const organizationId = 1; // เปลี่ยนเป็น organization_id ที่เหมาะสม

    const data = {
        quantity: quantity.value,
        item_id: selectedItemId.value,
        organization_id: organizationId,
    };

    try {
        await axios.post(`${BASE_URL}equipment-stocks/assign/`, data ,{
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
    <goBackBtn /><br>
    <div>
        <h1>Assign Item to Stock</h1>
        <div>
            <label for="itemSelect">Select Item:</label>
            <select id="itemSelect" v-model="selectedItemId">
                <option v-for="item in items" :key="item.id" :value="item.id">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <div>
            <label for="quantity">Quantity:</label>
            <input id="quantity" type="number" v-model="quantity" min="1" required />
        </div>
        <button @click="assignItem">Assign</button>
    </div>
</template>