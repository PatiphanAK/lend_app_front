<script setup>
import { useWaitingForApprovalStore } from '@/stores/waitingforapproval';
import { onMounted } from 'vue';
import goBackBtn from './goBackBtn.vue';
const store = useWaitingForApprovalStore();
onMounted(async () => {
    try {
        await store.fetchItems();
    } catch (error) {
        console.error('Error during fetch:', error);
    }
});

</script>
<template>
    <goBackBtn />
    <div>
        <h1>Waiting for Approval</h1>
        <div>
            <div v-for="item in store.waitingForApprovalRequest" :key="item.id">
                <div>
                    <h2> Request ID: {{ item.id }} </h2> 
                    <div> Borrow_Date: {{ item.borrow_date }}</div>
                    <div> Return_Date: {{ item.return_date }}</div>
                    <div> Equipment_stock ID: {{ item.equipment_stock }}</div>
                    <div> Status: {{ item.status }}</div>
                    <div> Quantity: {{ item.quantity }}</div>
                    <div> Borrower ID: {{ item.borrower }}</div>
                    <button @click="borrowRequestInfo">Read Info</button>
                </div>
            </div>
        </div>
    </div>
</template>
