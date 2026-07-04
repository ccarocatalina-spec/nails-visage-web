import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()

  // Login page doesn't need the sidebar
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {session && <AdminSidebar />}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
