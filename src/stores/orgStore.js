// src/stores/orgStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/';

export const useOrgStore = defineStore('org', {
    state: () => ({
        org: {},
        loading: false,
        errorMessage: '',
    }),
    actions: {
        async fetchOrg() {
            if (Object.keys(this.org).length > 0) {
                console.log("Organization data already fetched:", this.org);
                return;
            }

            this.loading = true;
            this.errorMessage = '';
            try {
                const response = await axios.get(`${BASE_URL}registed-organizations/`);
                this.org = response.data;
                console.log("Org:", this.org);
            } catch (error) {
                console.error('Fetch org failed:', error);
                this.errorMessage = 'Failed to fetch org';
                throw error;
            } finally {
                this.loading = false;
            }
        },
        clearOrg() {
            this.org = {};
        }
    },
});
