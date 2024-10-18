// src/stores/orgStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/';

export const useOrgStore = defineStore('org', {
    state: () => ({
        org: [], // เปลี่ยนจาก object เป็น array
        loading: false,
        errorMessage: '',
    }),
    actions: {
        async fetchOrg() {
            // ตรวจสอบว่าถ้า org เป็น empty array ถึงจะทำ request ใหม่
            if (Array.isArray(this.org) && this.org.length === 0) {
                this.loading = true;  // เริ่มต้นการโหลด
                this.errorMessage = ''; // รีเซ็ตข้อความข้อผิดพลาด
                try {
                    const response = await axios.get(`${BASE_URL}registed-organizations/`);
                    this.org = response.data; // เก็บข้อมูลองค์กรใน state
                    console.log("Org:", this.org);
                } catch (error) {
                    console.error('Fetch org failed:', error);
                    this.errorMessage = 'Failed to fetch org'; // เก็บข้อความข้อผิดพลาด
                    throw error;
                } finally {
                    this.loading = false; // ปิดสถานะการโหลด
                }
            }
        },
        clearOrg() {
            this.org = [];
        }
    },
});
