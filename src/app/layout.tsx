import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baijamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijamjuree',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baijamjuree.variable} bg-slate-100 font-sans  text-gray-100 grid grid-cols-2 flex-row`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
