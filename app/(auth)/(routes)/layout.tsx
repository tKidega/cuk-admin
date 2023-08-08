import { Inter } from 'next/font/google'
import '@/app/globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashbord',
  description: "Admin  dashbord to manage all your shop and product settings",
}

export default function AuthLayout({
    children
}: {
    children:React.ReactNode
}) {
    return(
        <div className="flex items-center justify-center h-full">
            <div className="flex-1 space-y-4 p-6 pt-5">
                <h1 className="text text-center text-4xl text-slate-600">
                    Admin - layout</h1>
                {children}
            </div>  
        </div>
    )
}
