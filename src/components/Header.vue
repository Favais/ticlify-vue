<template>
  <div class="flex items-center justify-between w-full z-50">
    <img src="/src/assets/logo.png" alt="Logo" width="100" />
    <div class="border rounded-b-full border-blue-400 py-3 px-12">
      <ul class="flex gap-20 text-white font-medium">
        <li>Home</li>
        <li>Dashboard</li>
        <li>Tickets</li>
      </ul>
    </div>
    <div class="flex gap-3">
      <router-link to="/login">
        <Button class="hover:bg-sky-800 hover:text-white bg-skyblue text-white" variant="outline">
          Login
        </Button>
      </router-link>
      <Button class="hover:bg-gray-200 hover:text-white" variant="outline">
        Get Started
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/ui/button/Button.vue'
</script>