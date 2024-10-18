<template>
    <button @click="goBack">Go Back</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

// สร้าง instance ของ router
const router = useRouter();

// ฟังก์ชันสำหรับกลับไปยังหน้า Approver Dashboard
const goBack = () => {
    router.push('/approver-dashboard');
};
</script>
