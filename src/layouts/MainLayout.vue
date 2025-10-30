<template>
  <div class="min-h-screen flex flex-col items-center">
    <Header />
    <main class="grow w-full max-w-[1440px] absolute">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>