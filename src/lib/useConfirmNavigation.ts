"use client"

import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export function useConfirmNavigation() {
    const router = useRouter()

    const confirmAndNavigate = async (path: string, message?: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: message || "You will be redirected to another page.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, go",
            cancelButtonText: "Cancel",
        })

        if (result.isConfirmed) {
            router.push(path)
        }
    }

    return { confirmAndNavigate }
}