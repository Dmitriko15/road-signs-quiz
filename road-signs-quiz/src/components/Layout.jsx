import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Header />
            <main className="mx-auto max-w-3xl p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout