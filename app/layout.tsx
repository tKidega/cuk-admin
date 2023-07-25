import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jemi',
  description: "E-commerce app for SME's",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    < ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
  