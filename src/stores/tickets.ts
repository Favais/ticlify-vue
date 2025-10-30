import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export type TicketStatus = 'open' | 'in_progress' | 'closed'

export interface Ticket {
    id: string
    title: string
    description: string
    status: TicketStatus
    createdAt: string
}

export const useTicketStore = defineStore('tickets', () => {
    const tickets = ref<Ticket[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const apiUrl = 'http://localhost:5000'

    const fetchTickets = async () => {
        try {
            loading.value = true
            const res = await axios.get(`${apiUrl}/tickets`)
            // keep tickets ordered newest-first by createdAt
            tickets.value = (res.data as Ticket[]).slice().sort((a, b) => {
                const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0
                const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0
                return tb - ta
            })
        } catch (err: any) {
            error.value = err.message || 'Failed to load tickets'
        } finally {
            loading.value = false
        }
    }

    const addTicket = async (ticket: Ticket) => {
        try {
            const res = await axios.post(`${apiUrl}/tickets`, ticket)
            // new tickets should appear first (newest-first ordering)
            tickets.value.unshift(res.data)
        } catch (err: any) {
            console.error('Failed to add ticket:', err)
        }
    }

    const editTicket = async (id: string, updatedTicket: Partial<Ticket>) => {
        try {
            const res = await axios.patch(`${apiUrl}/tickets/${id}`, updatedTicket)
            const index = tickets.value.findIndex(t => t.id === id)
            if (index !== -1) tickets.value[index] = res.data
        } catch (err: any) {
            console.error('Failed to edit ticket:', err)
        }
    }

    /**
     * Delete a ticket by id. Performs an optimistic update (removes locally first),
     * attempts an API delete, and restores the item on failure.
     * Returns true on success, false on failure.
     */
    const deleteTicket = async (id: string): Promise<boolean> => {
        const prev = tickets.value.slice()
        // optimistic remove (compare as strings)
        tickets.value = tickets.value.filter(t => String(t.id) !== String(id))

        try {
            // encode id to be safe
            await axios.delete(`${apiUrl}/tickets/${encodeURIComponent(String(id))}`)
            return true
        } catch (err: any) {
            console.error('Failed to delete ticket:', err)
            // restore previous state
            tickets.value = prev
            return false
        }
    }

    return {
        tickets,
        loading,
        error,
        fetchTickets,
        addTicket,
        editTicket,
        deleteTicket
    }
})
