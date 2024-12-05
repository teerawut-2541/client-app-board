import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in",
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <div>{children}</div>
}
