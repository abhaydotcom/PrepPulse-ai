import React, { useState, useRef } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import Navbar from '../components/Navbar.jsx';
import { 
  FileText, 
  UploadCloud, 
  User, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGenerateReport = async () => {
    const file = resumeInputRef.current?.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile: file });
    navigate(`/interview/${data._id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
      const dt = new DataTransfer();
      dt.items.add(file);
      resumeInputRef.current.files = dt.files;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const canGenerate = jobDescription.trim() && (resumeFile || selfDescription.trim());

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white'>
        <div className='relative flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full border-4 border-violet-500/10' />
          <div className='absolute w-20 h-20 rounded-full border-4 border-violet-500 border-t-transparent animate-spin' />
          <Sparkles className="absolute text-violet-400 animate-pulse" size={24} />
        </div>
        <div className='mt-8 text-center'>
          <h2 className='text-xl font-bold bg-gradient-to-r from-violet-200 to-violet-500 bg-clip-text text-transparent animate-pulse'>
            Analyzing Opportunities
          </h2>
          <p className='text-slate-500 text-sm mt-2'>Our AI is tailoring your interview strategy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#050508] text-slate-200 font-sans selection:bg-violet-500/30'>

      <div className="fixed top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

      <Navbar user={user} onLogout={handleLogout} />

      <main className='max-w-7xl mx-auto px-6 py-12'>
        
        <header className='mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-4'>
            <Sparkles size={14} />
            Next-Gen Interview Prep
          </div>
          <h1 className='text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4'>
            Master your next <span className="text-violet-500">interview.</span>
          </h1>
          <p className='text-slate-400 text-lg max-w-2xl'>
            Leverage AI to analyze job requirements and align your experience 
            for a perfect pitch.
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          
        
          <div className='lg:col-span-8 space-y-6'>
            <div className='bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl p-8 transition-all hover:border-white/10'>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Job Description Side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <FileText size={18} className="text-violet-400" />
                    <h3>Target Role</h3>
                  </div>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder='Paste the job description here...'
                    className='w-full h-64 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 outline-none transition-all resize-none'
                  />
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Character Count</span>
                    <span className={`text-xs ${jobDescription.length > 4500 ? 'text-orange-400' : 'text-slate-400'}`}>
                      {jobDescription.length}/5000
                    </span>
                  </div>
                </div>

            
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <User size={18} className="text-violet-400" />
                    <h3>Your Credentials</h3>
                  </div>
                  
            
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => resumeInputRef.current.click()}
                    className={`group relative h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer
                      ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 hover:border-violet-500/40 hover:bg-white/[0.02]'}
                      ${resumeFile ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}
                  >
                    <input ref={resumeInputRef} type='file' hidden accept='.pdf,.docx' onChange={handleFileChange} />
                    {resumeFile ? (
                      <>
                        <CheckCircle2 className="text-emerald-400 mb-2" size={32} />
                        <p className="text-sm font-medium text-emerald-100">{resumeFile.name}</p>
                        <p className="text-xs text-slate-500 mt-1">Click to change</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-slate-500 group-hover:text-violet-400 transition-colors mb-2" size={32} />
                        <p className="text-sm font-medium text-slate-300">Upload Resume</p>
                        <p className="text-xs text-slate-500">PDF or DOCX (Max 3MB)</p>
                      </>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0f1a] px-2 text-slate-500 font-bold">Or manual entry</span></div>
                  </div>

                  <textarea
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder='Briefly describe your key achievements...'
                    className='w-full h-28 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 outline-none transition-all resize-none'
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={!canGenerate}
                className='mt-8 w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:grayscale text-white font-bold rounded-2xl shadow-xl shadow-violet-900/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 group'
              >
                Generate Interview Strategy
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

       
          <div className='lg:col-span-4 space-y-6'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                <Clock size={18} className="text-violet-400" />
                Recent History
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">
                {reports.length} Reports
              </span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {reports.length > 0 ? (
                reports.map(report => (
                  <div
                    key={report._id}
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className='group p-4 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-violet-500/5 hover:border-violet-500/30 transition-all'
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Match Score</span>
                        <p className="text-lg font-bold text-white">{report.matchScore}%</p>
                      </div>
                    </div>
                    <h3 className='text-sm font-semibold text-slate-200 line-clamp-1 mb-1'>
                      {report.title || 'Analysis Report'}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-violet-400 transition-colors" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-6 border border-dashed border-white/5 rounded-3xl">
                  <p className="text-slate-500 text-sm">No reports generated yet. Start by pasting a job description!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;