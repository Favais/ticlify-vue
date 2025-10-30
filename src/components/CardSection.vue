<template>
  <div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
      <div class="grid md:grid-cols-3 gap-8">
        <Card class="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent class="p-8">
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <Ticket class="w-7 h-7 text-emerald-600" />
            </div>
            <h3 class="mb-4">Easy Ticket Management</h3>
            <p class="text-muted-foreground">
              Create, track, and resolve tickets with an intuitive interface designed for speed and efficiency.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent class="p-8">
            <div class="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Zap class="w-7 h-7 text-amber-600" />
            </div>
            <h3 class="mb-4">Real-time Updates</h3>
            <p class="text-muted-foreground">
              Stay informed with instant notifications and live status updates across your entire team.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent class="p-8">
            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Shield class="w-7 h-7 text-blue-600" />
            </div>
            <h3 class="mb-4">Secure & Reliable</h3>
            <p class="text-muted-foreground">
              Enterprise-grade security ensures your data is protected with industry-standard encryption.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Shield, Ticket, Zap } from 'lucide-vue-next'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
</script>