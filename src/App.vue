<script setup>
import {RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue'; // นำเข้า component Navbar
</script>

<template>
  <div>
    <header>
      <Navbar /> <!-- Navbar จะแสดงทุกหน้า -->
    </header>
    <main>
      <RouterView /> <!-- จะแสดง component ของหน้านั้นๆ -->
    </main>
  </div>
</template>

