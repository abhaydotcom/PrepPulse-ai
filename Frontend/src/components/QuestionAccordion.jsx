
import { useState } from "react";
import { Badge } from "./Badge";

export const QuestionAccordion = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`glass-card rounded-2xl mb-3 overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-violet-500/50' : ''}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-start gap-4 text-left bg-transparent border-none cursor-pointer"
            >
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[12px] font-bold text-zinc-500 shrink-0">
                    {index + 1}
                </div>
                <p className="flex-1 text-[14px] font-medium leading-relaxed text-zinc-200 pr-4">{item.question}</p>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-white/5">
                    <div>
                        <Badge variant="violet">Strategy</Badge>
                        <p className="mt-2 text-[13px] text-zinc-400 leading-relaxed italic">"{item.intention}"</p>
                    </div>
                    <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                        <Badge variant="emerald">Suggested Answer</Badge>
                        <p className="mt-2 text-[13.5px] text-zinc-300 leading-relaxed font-light">{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}