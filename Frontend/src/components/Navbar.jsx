import { useEffect, useRef, useState } from "react"
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router-dom"

 const Navbar = ({ user, onLogout , interviewId}) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef()
    const {  getResumePdf } = useInterview()
    const navigate=useNavigate();
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U'

    return (
 <nav className="sticky top-0 z-50 glass-card border-x-0 border-t-0 px-6 py-4 flex items-center justify-between">
                <div  onClick={()=>navigate('/')} className="flex items-center gap-3">
                    <div  className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/30">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <div>
                        <h2 className="text-[15px] font-extrabold tracking-tight m-0">PrepPulse</h2>
       
                    </div>
                </div>

                 <div className="flex gap-4">

                    <button 
                    onClick={() =>  getResumePdf(interviewId)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-[12px] font-bold hover:bg-zinc-200 transition-colors cursor-pointer border-none"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    Resume PDF
                </button>

                 <div className='relative' ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(p => !p)}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all duration-200
                            ${open
                                ? 'bg-violet-600/15 border-violet-500/40'
                                : 'bg-white/[0.03] border-white/10 hover:bg-violet-600/10 hover:border-violet-500/30'
                            }`}
                        aria-label="Profile menu"
                    >
                        <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-violet-900/50 shrink-0'>
                            {initials}
                        </div>
                        <span className='hidden sm:block text-xs font-medium text-slate-300 max-w-[100px] truncate'>
                            {user?.name?.split(' ')[0] || 'User'}
                        </span>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                            className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className='absolute right-0 mt-2 w-52'>
                            <div className='bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden'>
                                {/* User info */}
                                <div className='px-4 py-3 border-b border-white/[0.06]'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0'>
                                            {initials}
                                        </div>
                                        <div className='min-w-0'>
                                            <p className='text-xs font-semibold text-white truncate'>{user?.name || 'User'}</p>
                                            <p className='text-[11px] text-slate-500 truncate'>{user?.email || ''}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Logout button */}
                                <div className='p-1.5'>
                                    <button
                                        onClick={() => { setOpen(false); onLogout?.() }}
                                        className='w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150'
                                    >
                                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className='shrink-0'>
                                            <path d="M5.25 12.25H2.917A.917.917 0 0 1 2 11.333V2.667A.917.917 0 0 1 2.917 1.75H5.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9.333 10.083 12.25 7l-2.917-3.083" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.25 7H5.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>  

                </div>
               
            </nav>
    )
}

export default Navbar