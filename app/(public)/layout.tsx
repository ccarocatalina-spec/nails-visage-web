import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import WhatsAppFloat from '@/components/public/WhatsAppFloat'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
