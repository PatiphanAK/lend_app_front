import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        errorMessage: '', // For error messages
    }),
    actions: {
        async fetchCategories() {
            this.errorMessage = ''; // Clear previous error message
            try {
                const response = await axios.get(`${BASE_URL}/categories/`);
                this.categories = response.data;
                console.log("Categories:", this.categories);
            } catch (error) {
                console.error('Fetch categories failed:', error);
                this.errorMessage = 'Failed to fetch categories'; // Set error message
                throw error;
            }
        },
    },
});
