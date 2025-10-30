<template>
  <div class="min-h-screen absolute bg-linear-to-br from-sky-200 via-white to-sky-50 flex items-center justify-center p-6 relative overflow-hidden">
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-200 rounded-full opacity-30 blur-3xl" />
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200 rounded-full opacity-20 blur-3xl" />

    <Card class="w-full max-w-md rounded-2xl shadow-2xl border-0 relative z-10">
      <CardHeader class="space-y-2 text-center pb-6">
        <button @click="router.push('/')" class="text-2xl mb-2 hover:opacity-70 transition-opacity">
          Ticlify
        </button>
        <CardTitle>Create an account</CardTitle>
        <p class="text-muted-foreground">Sign up to start managing tickets</p>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" v-model="name" placeholder="Your name" class="rounded-xl" />
            <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="email" placeholder="you@example.com" class="rounded-xl" />
            <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="password" placeholder="••••••••" class="rounded-xl" />
            <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
          </div>

          <Button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6">
            Create account
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-muted-foreground">
            Already have an account?
            <button @click="router.push('/auth/login')" class="text-sky-600 hover:text-sky-700 hover:underline">
              Login
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

// UI Components
import Button from '@/components/ui/Button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref<any>({})
const router = useRouter()

function validateForm() {
  const newErrors: any = {}
  if (!name.value) newErrors.name = 'Name is required'
  if (!email.value) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(email.value)) newErrors.email = 'Invalid email format'
  if (!password.value) newErrors.password = 'Password is required'
  else if (password.value.length < 6) newErrors.password = 'Password must be at least 6 characters'
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

async function handleSubmit() {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  try {
    const base = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
    const res = await axios.post(`${base}/user`, {
      name: name.value,
      email: email.value,
      password: password.value
    })

    const created = res.data
    if (created) {
      // Save session
      localStorage.setItem('ticketapp_session', JSON.stringify(created))
      toast.success('Account created — welcome!')
      router.push('/dashboard')
    } else {
      toast.error('Failed to create account')
    }
  } catch (err) {
    console.error(err)
    toast.error('Server error — please try again later.')
  }
}
</script>
