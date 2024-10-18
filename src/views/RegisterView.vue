<script setup>
import { ref, watch, onMounted } from 'vue';
import { useOrgStore } from '@/stores/orgStore';

const orgStore = useOrgStore();
const isApprover = ref(false);
const BASE_URL = 'http://localhost:8000/';
const formDataRef = ref({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    description: '',
    organization: '',
    profile_image: null, // Field for image upload
});

// Watcher to reset form data based on the approver role
watch(isApprover, (newValue) => {
    if (newValue) {
        formDataRef.value = {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            organization: '',
            description: '',
            profile_image: null,
        };
    } else {
        formDataRef.value = {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            description: '',
            profile_image: null,
        };
    }
});

// Handle file upload
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        formDataRef.value.profile_image = file;
    }
};

// Fetch organizations when component is mounted
onMounted(async () => {
    await orgStore.fetchOrg();
});

// Function to submit the form
const submitForm = async () => {
    loading.value = true;
    try {
        const url = isApprover.value ? `${BASE_URL}approvers/` : `${BASE_URL}borrowers/`;

        const formDataToSubmit = new FormData();
        for (const [key, value] of Object.entries(formDataRef.value)) {
            formDataToSubmit.append(key, value);
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formDataToSubmit,
        });

        if (response.ok) {
            alert('ลงทะเบียนสำเร็จ');
        } else {
            const errorData = await response.json();
            alert(`การลงทะเบียนล้มเหลว: ${errorData.message || 'กรุณาลองใหม่อีกครั้ง.'}`);
        }
    } catch (error) {
        console.error('การลงทะเบียนล้มเหลว:', error);
        alert('การลงทะเบียนล้มเหลว กรุณาลองใหม่อีกครั้ง.');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold mb-6">Register</h1>

        <label class="swap swap-flip mb-4">
            <input type="checkbox" v-model="isApprover" />
            <div class="swap-on">Register as Approver</div>
            <div class="swap-off">Register as Borrower</div>
        </label>

        <form @submit.prevent="submitForm" class="w-full max-w-md">
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" v-model="formDataRef.username" class="input input-bordered" required />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" v-model="formDataRef.email" class="input input-bordered" required />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">First Name</span>
                </label>
                <input type="text" v-model="formDataRef.first_name" class="input input-bordered" required />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Last Name</span>
                </label>
                <input type="text" v-model="formDataRef.last_name" class="input input-bordered" required />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" v-model="formDataRef.password" class="input input-bordered" required />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Description</span>
                </label>
                <textarea v-model="formDataRef.description" class="textarea textarea-bordered" required></textarea>
            </div>

            <div v-if="isApprover">
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Organization ID</span>
                    </label>
                    <select v-model="formDataRef.organization" class="select select-bordered" required>
                        <option value="" disabled>Select Organization</option>
                        <option v-for="org in orgStore.org" :key="org.id" :value="org.id">
                            {{ org.name }} <!-- ใช้ชื่อองค์กรที่ต้องการแสดง -->
                        </option>
                    </select>
                </div>
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Profile Image</span>
                </label>
                <input type="file" @change="handleFileUpload" class="input input-bordered" accept="image/*" />
            </div>

            <button type="submit" class="btn btn-primary w-full">
                Register
            </button>
        </form>
    </div>
</template>
