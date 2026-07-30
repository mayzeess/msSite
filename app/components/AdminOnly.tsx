import { auth } from "@/auth"

export default async function AdminOnly({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (session?.user?.role !== "ADMIN") {
        return null
    }

    return <>{children}</>
}