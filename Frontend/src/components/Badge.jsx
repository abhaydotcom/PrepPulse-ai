export const Badge = ({ children, variant = 'default' }) => {
    const variants = {
        default: 'bg-white/10 text-white/70',
        violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    }
    return <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${variants[variant]}`}>{children}</span>
}