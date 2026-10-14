import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function navClass({ isActive }) {
    return isActive
        ? 'font-semibold text-blue-600'
        : 'text-slate-600 hover:text-blue-600'
}

function Header() {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    function onLogout() {
        handleLogout()
        navigate('/')
    }

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 p-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 font-bold text-white">
                        BD
                    </div>
                    <span className="text-lg font-semibold text-slate-800">BestDrive</span>
                </Link>

                <nav className="flex flex-wrap items-center gap-4">
                    <NavLink to="/" end className={navClass}>Home</NavLink>
                    <NavLink to="/about" className={navClass}>About</NavLink>
                    <NavLink to="/contact" className={navClass}>Contact</NavLink>

                    {user ? (
                        <>
                            <NavLink to="/account" className={navClass}>Account</NavLink>
                            <button onClick={onLogout} className="rounded border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100">
                                Logout
                            </button>
                        </>
                    ):(
                        <>
                            <Link to="/login" className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
                                Log In
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header