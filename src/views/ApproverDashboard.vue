<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const addItemPath = () => {
    router.push('/add-item');
};
const assignItemPath = () => {
    router.push('/assign-item');
};

const waitingForApprove = () => {
    router.push('/waiting-for-approval');
};

</script>
<template>
    <div>
        <h1>Approver Dashboard</h1>
        <main>
            <div>Approve Request</div>
            <div>Approve History</div>
            <div>
                <button @click="addItemPath">Add Item</button>
            </div>
            <div>
                <button @click="assignItemPath">Assign Item</button>
            </div>
            <div>
                <button @click="waitingForApprove">Waiting for Approve</button>
            </div>
        </main>
    </div>
</template>