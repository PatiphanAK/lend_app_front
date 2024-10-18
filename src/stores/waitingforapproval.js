import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const useWaitingForApprovalStore = defineStore('waitingforapproval', {
    state: () => ({
        waitingForApprovalRequest: [],
        errorMessage: '',
    }),
    actions: {
        async fetchItems() {
            this.errorMessage = ''; // เคลียร์ข้อความผิดพลาดก่อนทำการเรียกข้อมูล
            const token = localStorage.getItem('accessToken'); // ดึง token ภายในฟังก์ชัน
            console.log('Token:', token); // แสดง token ใน console
            if (!token) {
                console.error('No access token found');
                this.errorMessage = 'No access token found';
                return; // จบการทำงานถ้าไม่มี token
            }

            try {
                const response = await axios.get(`${BASE_URL}borrow-requests/waiting-for-approvel/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                this.waitingForApprovalRequest = response.data; // เก็บข้อมูลใน state
            } catch (error) {
                console.error('Fetch items failed:', error); // แสดงข้อความผิดพลาดใน console
                this.errorMessage = 'Failed to fetch items'; // ตั้งค่าข้อความผิดพลาด
                throw error; // โยนข้อผิดพลาดเพื่อให้ component จัดการต่อ
            }
        }
    }
});
