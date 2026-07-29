import { auth } from "@/auth"

export async function requireAdmin() {
    const session = await auth()

    if (!session) {
        return {
            succes: false,
            status: 401,
            message: "необходимо войти"
        }
    }

    if (session.user.role !== "ADMIN") {
        return {
            succes: false,
            status: 403,
            message: "недостаточно прав"
        }
    }

    return {
        succes: true,
        session
    }
}