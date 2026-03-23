import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import Navbar from '../components/Navbar.jsx'
import { Styles } from '../../../backend/src/config/style.jsx'
import { QuestionAccordion } from '../components/QuestionAccordion.jsx'
import { Badge } from '../components/Badge.jsx'
import { useAuth } from '../hooks/useAuth.js'





const NavButton = ({ item, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-none cursor-pointer
        ${active ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'bg-transparent text-zinc-400 hover:text-white'}`}
    >
        <span className={active ? 'text-white' : 'text-zinc-500'}>{item.icon}</span>
        <span className="text-[13px] font-bold">{item.label}</span>
    </button>
)




const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById,loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
     const { user, logout } = useAuth()
     const navigate=useNavigate();
      const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    useEffect(() => { if (interviewId) getReportById(interviewId) }, [interviewId])

    if (!report || loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Initializing...</div>

    const NAV_ITEMS = [
        { id: 'technical', label: 'Technical', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></svg> },
        { id: 'behavioral', label: 'Behavioral', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
        { id: 'roadmap', label: 'Road Map', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> }
    ]

    return (
        <div className="min-h-screen pb-24 md:pb-8">
            <Styles />
            
           <Navbar user={user} onLogout={handleLogout}  interviewId={ interviewId} getResumePdf={getResumePdf} />

            <main className="max-w-7xl mx-auto px-6 pt-8">
        
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="md:col-span-2 glass-card p-6 rounded-3xl flex flex-col justify-between overflow-hidden relative">
                        <div className="relative z-10">
                            <Badge variant="violet">{report.role || 'Career Analysis'}</Badge>
                            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tighter leading-tight max-w-md">
                                {report.title || "Your Preparation Strategy"}
                            </h1>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full" />
                    </div>
                    
                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between border-violet-500/20">
                        <div>
                            <p className="text-zinc-500 text-[12px] font-bold uppercase mb-1">Match Score</p>
                            <h3 className="text-5xl font-black text-white">{report.matchScore}%</h3>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-pulse" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ── Left Navigation (Sticky) ── */}
                    <aside className="lg:w-64 shrink-0">
                        <div className="sticky top-28 flex flex-col gap-2">
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4 mb-2">Sections</p>
                            {NAV_ITEMS.map(item => (
                                <NavButton 
                                    key={item.id} 
                                    item={item} 
                                    active={activeNav === item.id} 
                                    onClick={() => setActiveNav(item.id)} 
                                />
                            ))}
                        </div>
                    </aside>

                 
                    <section className="flex-1 animate-slide">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h2 className="text-xl font-bold capitalize">{activeNav} Phase</h2>
                            <span className="text-zinc-500 text-[13px] font-mono">
                                {activeNav === 'roadmap' ? `${report.preparationPlan.length} Steps` : `${(activeNav === 'technical' ? report.technicalQuestions : report.behavioralQuestions).length} Queries`}
                            </span>
                        </div>

                        {activeNav !== 'roadmap' ? (
                            <div className="space-y-4">
                                {(activeNav === 'technical' ? report.technicalQuestions : report.behavioralQuestions).map((q, i) => (
                                    <QuestionAccordion key={i} item={q} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {report.preparationPlan.map((step, i) => (
                                    <div key={i} className="flex gap-6 relative">
                                        {i !== report.preparationPlan.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-zinc-800" />}
                                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-violet-500/40 flex items-center justify-center shrink-0 z-10 text-[12px] font-bold">
                                            {i + 1}
                                        </div>
                                        <div className="glass-card p-6 rounded-2xl flex-1 mb-4">
                                            <h4 className="font-bold text-violet-400 mb-2">{step.focus}</h4>
                                            <ul className="space-y-2">
                                                {step.tasks.map((task, j) => (
                                                    <li key={j} className="text-[13px] text-zinc-400 flex items-center gap-2">
                                                        <div className="w-1 h-1 bg-zinc-600 rounded-full" /> {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
 
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-[60] glass-card p-2 rounded-2xl flex justify-around items-center border-white/10">
                {NAV_ITEMS.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={`p-3 rounded-xl transition-colors border-none cursor-pointer ${activeNav === item.id ? 'bg-violet-600 text-white' : 'bg-transparent text-zinc-500'}`}
                    >
                        {item.icon}
                    </button>
                ))}
                <div className="w-px h-6 bg-white/10" />
                <button className="p-3 text-zinc-300 bg-transparent border-none cursor-pointer" onClick={() => getResumePdf(interviewId)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                </button>
            </div>
        </div>
    )
}

export default Interview