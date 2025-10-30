<template>
  <header class="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img :src="logo" alt="logo" width="100" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            to="/dashboard"
            class="hover:text-sky-700 transition-colors"
          >
            Dashboard
          </RouterLink>

          <RouterLink
            to="/tickets"
            class="hover:text-sky-700 transition-colors"
          >
            Tickets
          </RouterLink>

          <Button variant="outline" class="rounded-xl" @click="handleLogout">
            <LogOut class="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2">
          <component :is="mobileMenuOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav
        v-if="mobileMenuOpen"
        class="md:hidden py-4 space-y-4 border-t border-border"
      >
        <button
          @click="goTo('dashboard')"
          :class="[
            'block w-full text-left px-4 py-2 rounded-lg transition-colors',
            currentPage === '/dashboard'
              ? 'bg-sky-50 text-sky-700'
              : 'text-muted-foreground hover:bg-muted'
          ]"
        >
          Dashboard
        </button>

        <button
          @click="goTo('tickets')"
          :class="[
            'block w-full text-left px-4 py-2 rounded-lg transition-colors',
            currentPage === '/tickets'
              ? 'bg-sky-50 text-sky-700'
              : 'text-muted-foreground hover:bg-muted'
          ]"
        >
          Tickets
        </button>

        <Button
          variant="outline"
          class="w-full rounded-xl"
          @click="handleLogout"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Logout
        </Button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { LogOut, Menu, X } from 'lucide-vue-next'
import logo from '@/assets/logo.png'
import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/userStore' // 👈 if you have a user or auth store

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const mobileMenuOpen = ref(false)
const currentPage = computed(() => route.path)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const goTo = (path: string) => {
  router.push(`/${path}`)
  mobileMenuOpen.value = false
}

const handleLogout = () => {
  userStore.logOut()
  router.push('/auth/login')
}
</script>
