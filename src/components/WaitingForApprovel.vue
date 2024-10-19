<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Waiting for Approval</h1>
      <div v-if="loading" class="text-lg">Loading...</div>
      <div v-else>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Borrower</th>
              <th>Quantity</th>
              <th>Borrow Date</th>
              <th>Expected Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in borrowRequests" :key="request.id">
              <td>{{ request.id }}</td>
              <td>{{ request.borrower }}</td>
              <td>{{ request.quantity }}</td>
              <td>{{ request.borrow_date }}</td>
              <td>{{ request.expected_return_date }}</td>
              <td>
                <button 
                  class="btn btn-success mr-2" 
                  @click="approveRequest(request.id)">
                  Approve
                </button>
                <button 
                  class="btn btn-error" 
                  @click="rejectRequest(request.id)">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const borrowRequests = ref([]);
  const loading = ref(true);
  
  const BASE_URL = "http://127.0.0.1:8000/";
  
  onMounted(async () => {
    // ดึงข้อมูลการขอยืมที่รอการอนุมัติจาก API
    try {
      const response = await axios.get(`${BASE_URL}borrow-requests/waiting-for-approvel/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // ส่ง token ไปด้วย
        }
      });
      borrowRequests.value = response.data; // เข้าถึงข้อมูลที่ได้จาก API
      console.log('Borrow Requests Waiting for Approval:', borrowRequests.value);
    } catch (error) {
      console.error('Error fetching waiting for approval requests:', error);
    } finally {
      loading.value = false; // ตั้งค่า loading เป็น false เสร็จสิ้นการโหลด
    }
  });
  
  // ฟังก์ชันสำหรับอนุมัติคำขอ
  const approveRequest = async (requestId) => {
    try {
      await axios.patch(`${BASE_URL}approval/${requestId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // ส่ง token ไปด้วย
        }
      });
      console.log(`Request ${requestId} approved successfully.`);
      // เรียกใช้งานใหม่เพื่อดึงข้อมูลล่าสุด
      await fetchBorrowRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
  
  // ฟังก์ชันสำหรับปฏิเสธคำขอ
  const rejectRequest = async (requestId) => {
    try {
      await axios.patch(`${BASE_URL}rejection/${requestId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // ส่ง token ไปด้วย
        }
      });
      console.log(`Request ${requestId} rejected successfully.`);
      // เรียกใช้งานใหม่เพื่อดึงข้อมูลล่าสุด
      await fetchBorrowRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  
  // ฟังก์ชันดึงข้อมูลคำขออีกครั้งหลังจากทำการอนุมัติหรือปฏิเสธ
  const fetchBorrowRequests = async () => {
    loading.value = true; // ตั้งค่า loading เป็น true
    await onMounted(); // เรียกฟังก์ชันดึงข้อมูลใหม่
  };
  </script>
  
  <style scoped>
  /* คุณสามารถปรับแต่งสไตล์ได้ที่นี่ */
  </style>
  