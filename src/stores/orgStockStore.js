// stores/orgStockStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL ='http://127.0.0.1:8000/';
export const useOrgStockStore = defineStore('orgStock', {
    state: () => ({
        items: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchStocks() {
            this.loading = true; // เริ่มโหลดข้อมูล
            this.error = null; // รีเซ็ตข้อผิดพลาด

            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await axios.get(`${BASE_URL}organization-stocks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                this.items = response.data; // เก็บข้อมูลที่ได้จาก API
            } catch (error) {
                this.error = error.response?.data?.message || error.message; // จัดการข้อผิดพลาด
                console.error('Error fetching stocks:', this.error);
            } finally {
                this.loading = false; // สิ้นสุดการโหลดข้อมูล
            }
        }
    }
});
