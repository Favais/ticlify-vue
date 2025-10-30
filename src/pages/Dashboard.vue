<template>
  <div class="min-h-screen bg-background">
    <DashHeader />
    <main class="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
      <div class="mb-12">
        <h1 class="mb-2">Dashboard</h1>
        <p class="text-muted-foreground">
          Overview of your ticket management system
        </p>
      </div>

      <!-- Summary Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Tickets -->
        <Card class="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                <Ticket class="w-6 h-6 text-gray-700" />
              </div>
              <div class="text-right">
                <div class="text-3xl">{{ total }}</div>
              </div>
            </div>
            <h4 class="text-gray-700">Total Tickets</h4>
            <p class="text-sm text-gray-600 mt-1">All time</p>
          </CardContent>
        </Card>

        <!-- Open Tickets -->
        <Card class="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-sky-50 to-sky-100">
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-sky-200 rounded-xl flex items-center justify-center">
                <CheckCircle2 class="w-6 h-6 text-sky-700" />
              </div>
              <div class="text-right">
                <div class="text-3xl">{{ open }}</div>
              </div>
            </div>
            <h4 class="text-sky-700">Open Tickets</h4>
            <p class="text-sm text-sky-600 mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <!-- In Progress Tickets -->
        <Card class="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
                <Clock class="w-6 h-6 text-amber-700" />
              </div>
              <div class="text-right">
                <div class="text-3xl">{{ progress }}</div>
              </div>
            </div>
            <h4 class="text-amber-700">In Progress</h4>
            <p class="text-sm text-amber-600 mt-1">Being worked on</p>
          </CardContent>
        </Card>

        <!-- Closed Tickets -->
        <Card class="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-slate-50 to-slate-100">
          <CardContent class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                <XCircle class="w-6 h-6 text-slate-700" />
              </div>
              <div class="text-right">
                <div class="text-3xl">{{ closed }}</div>
              </div>
            </div>
            <h4 class="text-slate-700">Closed Tickets</h4>
            <p class="text-sm text-slate-600 mt-1">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="mt-12 p-8 bg-gradient-to-br from-sky-50 to-amber-50 rounded-2xl">
        <h3 class="mb-4">Quick Actions</h3>
        <p class="text-muted-foreground mb-6">
          Navigate to the Tickets page to create, edit, or manage your support tickets.
        </p>
        <button
          @click="goToTickets"
          class="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
        >
          Go to Tickets
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useTicketStore } from "@/stores/tickets" // ✅ Pinia store import

// Components
import DashHeader from "@/components/DashHeader.vue"
import Card from "@/components/ui/card/Card.vue"
import CardContent from "@/components/ui/card/CardContent.vue"

// Icons (lucide-vue-next)
import { Ticket, CheckCircle2, Clock, XCircle } from "lucide-vue-next"

const router = useRouter()
const ticketStore = useTicketStore() // ✅ Access store instance
onMounted(() => {
  ticketStore.fetchTickets()
})
// Derived/computed state
const total = computed(() => ticketStore.tickets.length)
const open = computed(() => ticketStore.tickets.filter(t => t.status === "open").length)
const progress = computed(() => ticketStore.tickets.filter(t => t.status === "in_progress").length)
const closed = computed(() => ticketStore.tickets.filter(t => t.status === "closed").length)

function goToTickets() {
  router.push("/tickets")
}
</script>
