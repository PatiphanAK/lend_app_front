<script setup>
import { computed, onMounted } from 'vue';
import StockCard from './StockCard.vue';
import { useOrgStockStore } from '@/stores/orgStockStore';

const orgStockStore = useOrgStockStore();

// เรียกใช้งาน fetchStocks เมื่อ component ถูก mount
onMounted(() => {
    orgStockStore.fetchStocks();
});

// คำนวณค่าจาก store
const stocks = computed(() => orgStockStore.items);
const loading = computed(() => orgStockStore.loading);
const error = computed(() => orgStockStore.error);
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <StockCard
            v-for="(stock, index) in stocks"
            :key="index"
            :item="stock.item"
            :quantity="stock.quantity"
            :available="stock.available"
        />
    </div>
</template>
<style scoped>
.flex {
    display: flex;
}
</style>

