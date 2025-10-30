import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    const user = ref<any>(null)
    const router = useRouter()

    function setUser(data: any) {
        user.value = data
        // Save user session in localStorage (optional but good for persistence)
        localStorage.setItem('ticketapp_session', JSON.stringify(data))
    }

    function loadUser() {
        const storedUser = localStorage.getItem('ticketapp_session')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        }
    }

    function logOut() {
        user.value = null
        localStorage.removeItem('ticketapp_session') // ✅ remove session from localStorage
        router.push('/auth/login')
    }

    return {
        user,
        setUser,
        loadUser,
        logOut,
    }
})
