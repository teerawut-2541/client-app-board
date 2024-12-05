import Layouts from "@/components/layouts"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <Layouts>{children}</Layouts>
}
