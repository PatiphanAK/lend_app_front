import { defineStore } from "pinia";
import axios from "axios";
import { useMeStore } from "@/stores/meStore";
const BASE_URL = "http://127.0.0.1:8000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userType: localStorage.getItem("userType") || null,
    user: null,
    accessToken: null,
    isAuthenticated: false,
    errorMessage: "", // For error messages
  }),
  actions: {
    async login(username, password) {
      this.errorMessage = ""; // Clear previous error message
      try {
        const response = await axios.post(`${BASE_URL}/api/token/`, {
          username,
          password,
        });
        this.accessToken = response.data.access;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Local Storage:", localStorage.getItem("accessToken"));
        console.log("Local Storage:", localStorage.getItem("refreshToken"));
        console.log("User Type:", localStorage.getItem("userType"));

        // ดึงข้อมูลของผู้ใช้ที่ล็อกอินอยู่ในครั้งเดียว
        const meStore = useMeStore();
        await meStore.fetchMe();
      } catch (error) {
        console.error("Login failed:", error);
        this.errorMessage = "Invalid username or password"; // Set error message
        throw error;
      }
    },
    async loginWithToken(token) {
      this.accessToken = token;
      this.isAuthenticated = true;
      localStorage.setItem("accessToken", token); // บันทึก token ใน localStorage

      try {
        // ดึงข้อมูลผู้ใช้โดยใช้ token
        const response = await axios.get(`${BASE_URL}/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data; // เก็บข้อมูลผู้ใช้ใน state
      } catch (error) {
        console.error("Failed to fetch user data with token:", error);
        this.isAuthenticated = false; // หากไม่สามารถดึงข้อมูลได้ ให้ออกจากสถานะเข้าสู่ระบบ
      }
    },
    logout() {
      this.accessToken = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken"); // Clear refresh token as well
      localStorage.removeItem("userType");

      // เคลียร์ข้อมูลโปรไฟล์ใน meStore
      const meStore = useMeStore();
      meStore.clearProfile(); // เคลียร์ข้อมูลโปรไฟล์เมื่อ logout
    },
  },
});
