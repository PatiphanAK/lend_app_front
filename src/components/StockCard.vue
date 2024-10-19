<!-- StockCard.vue -->
<template>
    <div class="card bg-base-100 shadow-xl">
        <figure>
            <img :src="item.item_image || 'default-image-url.jpg'" alt="Item Image" class="w-full h-48 object-cover" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ item.name }}</h2>
            <p>{{ item.description }}</p>
            <div class="flex flex-col"> <!-- ใช้ flex-col เพื่อจัดเรียงแนวตั้ง -->
                <span>Quantity: {{ quantity }}</span>
                <span>Available: {{ available }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        available: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 300px;
}
</style>
