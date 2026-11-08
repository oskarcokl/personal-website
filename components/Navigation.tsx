'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
    { href: "/", label: "Home", isActive: (pathname: string) => pathname === "/" },
    { href: "/blog", label: "Blog", isActive: (pathname: string) => pathname === "/blog" },
    { href: "/now", label: "Now", isActive: (pathname: string) => pathname === "/now" },
    { href: "/cv", label: "CV", isActive: (pathname: string) => pathname.startsWith("/cv") },
]

export default function Navigation() {
    const pathname = usePathname()

    return (
        <nav aria-label="Main" className="flex gap-3 justify-center no-print mt-3">
            {LINKS.map(({ href, label, isActive }) =>
                isActive(pathname) ? (
                    <span key={href} aria-current="page" className="text-black cursor-default">
                        {label}
                    </span>
                ) : (
                    <Link key={href} href={href}>{label}</Link>
                )
            )}
        </nav>
    )
}
