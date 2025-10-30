<template>
  <div class="flex absolute min-h-screen overflow-hidden bg-linear-to-br from-[#0384c8] to-blue-600">
    <svg class="absolute w-full h-full inset-0" viewBox="0 0 1440 500" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#0384c8" stop-opacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        fill="url(#waveGradient)"
        class="animate-pulse"
      />
    </svg>

    <CircularDecor class="z-0 absolute right-16" height="100" width="100" />
    <CircularDecor class="z-0 absolute right-14 top-7" height="100" width="100" />
    <CircularDecor class="z-0 absolute right-12 top-8" height="100" width="100" />

    <div class="grid grid-cols-2 p-8 items-center justify-center">
      <div class="flex flex-col gap-5 w-full p-10">
        <h1 class="text-7xl text-white">Ticlify</h1>
        <p class="text-2xl text-white">Manage Tickets Effortlessly — Across Teams and Projects.</p>
        <div class="flex gap-6">
          <router-link to="/auth/login">
            <Button size="lg" class="bg-skyblue">Get Started</Button>
          </router-link>
          <Button size="lg" variant="outline">Login</Button>
        </div>
      </div>
      <div class="relative">
        <div class="relative mx-auto max-w-md">
          <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1593823004803-3aad2497ac44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8d2F2eSUyMGJsdWUlMjBncmFkaWVudHxlbnwxfDB8fHwxNzYxMzg2MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Modern app interface"
              class="w-full h-64 object-cover rounded-2xl mb-4"
              loading="eager"
            />
            <div class="space-y-3">
              <div class="h-4 bg-white/20 rounded-full w-3/4"></div>
              <div class="h-4 bg-white/20 rounded-full w-1/2"></div>
              <div class="h-4 bg-white/20 rounded-full w-2/3"></div>
            </div>
          </div>
          <div class="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-lg"></div>
          <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-white/15 rounded-full blur-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import CircularDecor from '@/components/CircularDecor.vue'
</script>