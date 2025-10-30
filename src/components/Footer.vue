<template>
  <footer class="flex justify-between py-10 px-7 bg-white">
    <p>© 2025 Tickly. All rights reserved.</p>
    <div class="space-x-4">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/terms">Terms of Service</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
