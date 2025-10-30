<template>
  <DashHeader/>
  <main class="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
      <div>
        <h1 class="mb-2">Ticket Management</h1>
        <p class="text-muted-foreground">Create, view, and manage support tickets</p>
      </div>
      <Button
        @click="openCreateModal"
        class="bg-sky-600 hover:bg-sky-700 text-white rounded-xl"
      >
        <Plus class="w-4 h-4 mr-2" />
        Create New Ticket
      </Button>
    </div>

    <!-- Tickets Grid -->
    <div v-if="ticketStore.tickets.length === 0">
      <Card class="rounded-2xl shadow-lg border-0 p-12 text-center">
        <p class="text-muted-foreground mb-4">No tickets yet</p>
        <Button @click="openCreateModal" variant="outline" class="rounded-xl">
          Create your first ticket
        </Button>
      </Card>
    </div>

    <div v-else class="grid gap-6">
      <Card
        v-for="ticket in ticketStore.tickets"
        :key="ticket.id"
        class="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow"
      >
        <CardContent class="p-6">
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-start gap-4 mb-3">
                <h3 class="flex-1">{{ ticket.title }}</h3>
                <Badge :class="getStatusBadgeClass(ticket.status)" class="rounded-lg px-3 py-1">
                  {{ getStatusLabel(ticket.status) }}
                </Badge>
              </div>
              <p class="text-muted-foreground mb-3">{{ ticket.description }}</p>
              <p class="text-sm text-muted-foreground">
                Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <div class="flex lg:flex-col gap-2">
              <Button
                @click="openEditModal(ticket)"
                variant="outline"
                size="sm"
                class="rounded-xl flex-1 lg:flex-none"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                @click="openDeleteDialog(ticket.id)"
                variant="outline"
                size="sm"
                class="rounded-xl text-destructive hover:bg-destructive hover:text-white flex-1 lg:flex-none"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Create/Edit Modal -->
    <Dialog :open="isCreateModalOpen || isEditModalOpen" @update:open="closeModals">
      <DialogContent class="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {{ isCreateModalOpen ? 'Create New Ticket' : 'Edit Ticket' }}
          </DialogTitle>
          <DialogDescription>
            {{ isCreateModalOpen ? 'Fill in the details to create a new support ticket' : 'Update the ticket information' }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleSubmit" class="space-y-6 py-4">
          <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input
              id="title"
              v-model="formData.title"
              placeholder="Brief description of the issue"
              :class="{ 'border-destructive': errors.title }"
              class="rounded-xl"
            />
            <p v-if="errors.title" class="text-sm text-destructive">{{ errors.title }}</p>
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Provide detailed information about the issue"
              :class="{ 'border-destructive': errors.description }"
              class="rounded-xl min-h-[120px]"
            />
            <p v-if="errors.description" class="text-sm text-destructive">{{ errors.description }}</p>
          </div>

          <div class="space-y-2">
            <Label for="status">Status</Label>
            <select v-model="formData.status" class="w-full h-9 rounded-xl border px-3">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="closeModals"
              class="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            >
              {{ isCreateModalOpen ? 'Create Ticket' : 'Save Changes' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Dialog -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="closeDeleteDialog">
      <AlertDialogContent class="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="rounded-xl" @click="closeDeleteDialog">Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDelete"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Edit, Plus, Trash2 } from 'lucide-vue-next'
import { useTicketStore, type Ticket, type TicketStatus } from '@/stores/tickets'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue'
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue'
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue'
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue'
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue'
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue'
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue'
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue'
import DashHeader from '../components/DashHeader.vue'
import { toast } from 'vue-sonner'

const ticketStore = useTicketStore()
onMounted(() => {
  ticketStore.fetchTickets()
})
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const ticketToDelete = ref<string | null>(null)
const editingTicketId = ref<string | null>(null)

const formData = reactive({
  title: '',
  description: '',
  status: 'open' as TicketStatus
})

const errors = reactive({
  title: '',
  description: ''
})

const openCreateModal = () => {
  resetForm()
  isCreateModalOpen.value = true
}

const openEditModal = (ticket: Ticket) => {
  formData.title = ticket.title
  formData.description = ticket.description
  formData.status = ticket.status
  editingTicketId.value = ticket.id
  isEditModalOpen.value = true
}

const openDeleteDialog = (id: string) => {
  ticketToDelete.value = id
  isDeleteDialogOpen.value = true
}

const closeModals = () => {
  isCreateModalOpen.value = false
  isEditModalOpen.value = false
  resetForm()
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  ticketToDelete.value = null
}

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.status = 'open'
  errors.title = ''
  errors.description = ''
  editingTicketId.value = null
}

const validateForm = () => {
  errors.title = ''
  errors.description = ''

  if (!formData.title) {
    errors.title = 'Title is required'
  } else if (formData.title.length < 3) {
    errors.title = 'Title must be at least 3 characters'
  }

  // Description is optional per task spec; if provided, validate length
  if (formData.description && formData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters'
  }

  // Validate status explicitly
  const allowedStatuses: TicketStatus[] = ['open', 'in_progress', 'closed']
  if (!allowedStatuses.includes(formData.status)) {
    // fallback to open and surface error
    errors.description = errors.description || ''
    toast.error('Invalid status selected')
    formData.status = 'open'
  }

  return !errors.title && !errors.description
}

const handleSubmit = () => {
  if (!validateForm()) return

  if (isCreateModalOpen.value) {
    const newTicket: Ticket = {
      id: String(ticketStore.tickets.length + 1),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString()
    }
    ticketStore.addTicket(newTicket)
        toast.success("Ticket created successfully! 🎉")
  } else if (isEditModalOpen.value && editingTicketId.value) {
    ticketStore.editTicket(editingTicketId.value, {
      title: formData.title,
      description: formData.description,
      status: formData.status
    })
        toast.success("Ticket updated successfully")

  }

  closeModals()
}

const confirmDelete = async () => {
  if (!ticketToDelete.value) {
    closeDeleteDialog()
    return
  }

  const id = ticketToDelete.value
  // call store which performs an optimistic delete and returns success/failure
  const ok = await ticketStore.deleteTicket(id)
  if (ok) {
    toast.success('Ticket deleted')
  } else {
    toast.error('Failed to delete ticket. Please try again.')
  }

  closeDeleteDialog()
}

const getStatusBadgeClass = (status: TicketStatus) => {
  const classes: Record<TicketStatus, string> = {
    open: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
    in_progress: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
    closed: 'bg-slate-100 text-slate-700 hover:bg-slate-100'
  }
  return classes[status]
}

const getStatusLabel = (status: TicketStatus) => {
  const labels: Record<TicketStatus, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed'
  }
  return labels[status]
}
</script>