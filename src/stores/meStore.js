import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export const useMeStore = defineStore('me', {
    state: () => ({
        me: {}, // ใช้ object แทน null
        loading: false, // สถานะการโหลด
        errorMessage: '', // สำหรับข้อความแสดงข้อผิดพลาด
    }),
    actions: {
        async fetchMe() {
            // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
            if (Object.keys(this.me).length > 0) {
                console.log("User data already fetched:", this.me);
                return; // ถ้ามีข้อมูลแล้ว ไม่ต้อง fetch ใหม่
            }

            this.loading = true; // ตั้งค่าสถานะโหลดเป็น true
            this.errorMessage = ''; // เคลียร์ข้อความแสดงข้อผิดพลาดก่อนหน้า
            try {
                const response = await axios.get(`${BASE_URL}me/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                this.me = response.data; // เก็บข้อมูลผู้ใช้
                console.log("Me:", this.me);
            } catch (error) {
                console.error('Fetch me failed:', error);
                this.errorMessage = 'Failed to fetch me'; // ตั้งค่าข้อความแสดงข้อผิดพลาด
                throw error;
            } finally {
                this.loading = false; // ตั้งค่าสถานะโหลดเป็น false
            }
        },
        clearProfile() {
            this.me = {}; // เคลียร์ข้อมูลโปรไฟล์
        }
    },
});
