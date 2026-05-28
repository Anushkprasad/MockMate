// src/components/interview/ResultReport.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart2, Star } from 'lucide-react';
import type { InterviewReport } from '../../context/interview/InterviewContext';

interface ResultReportProps {
  report: InterviewReport;
}

export const ResultReport: React.FC<ResultReportProps> = ({ report }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 max-w-4xl w-full text-slate-800 shadow-[0_10px_40px_rgba(124,58,237,0.08)] border border-violet-500/15"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900 flex items-center">
            <Star className="w-6 h-6 text-amber-500 mr-2 animate-pulse-glow" />
            Interview Analysis – {report.companyName}
          </h2>
          <p className="text-xs text-slate-500 mt-1">Session standard: <span className="text-violet-650 font-bold bg-violet-50 border border-violet-100 rounded px-1.5 py-0.5 ml-1">{report.performanceLevel || 'Beginner'}</span></p>
          <div className="flex flex-wrap gap-2 mt-3">
            {(report.performanceTags || []).map((tag, idx) => (
              <span key={idx} className="badge-violet">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-2.5 rounded-full hover:bg-emerald-50 border border-transparent hover:border-emerald-250 transition-all duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
        </button>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ScoreCard title="Overall" value={report.overallScore} icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} />
        <ScoreCard title="Confidence" value={report.confidenceScore} icon={<BarChart2 className="w-5 h-5 text-violet-600" />} />
        <ScoreCard title="Communication" value={report.communicationScore} icon={<BarChart2 className="w-5 h-5 text-sky-600" />} />
        <ScoreCard title="Technical" value={report.technicalScore} icon={<BarChart2 className="w-5 h-5 text-fuchsia-600" />} />
      </div>

      {/* Question Summary */}
      <h3 className="text-sm uppercase font-black text-slate-500 tracking-wider mb-3">Question Summary</h3>
      <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-hide">
        {report.transcriptSummary.map((item, idx) => (
          <div key={idx} className="border-b border-slate-100 pb-4 space-y-1">
            <p className="font-bold text-slate-900">Q: {item.question}</p>
            <p className="italic text-sm text-slate-600 pl-2">Your Answer: {item.answer}</p>
            <p className="text-sm text-slate-600 pl-2">Feedback: {item.feedback}</p>
            {item.expectedAnswer && (
              <p className="text-sm text-emerald-700 pl-2 font-medium">
                <span className="text-[10px] text-emerald-700 font-mono font-bold block uppercase tracking-wider">Expected Answer:</span>
                "{item.expectedAnswer}"
              </p>
            )}
            <p className="text-sm font-semibold text-violet-600 pl-2">Score: {item.score}%</p>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <h3 className="text-sm uppercase font-black text-slate-500 tracking-wider mb-2">Improvement Suggestions</h3>
      <ul className="list-disc list-inside space-y-1 mb-4 text-sm text-slate-700 font-semibold">
        {report.suggestions.map((s, i) => (
          <li key={i} className="opacity-90 leading-relaxed">
            {s}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

interface ScoreCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, value, icon }) => (
  <div className="flex items-center bg-slate-50/80 border border-slate-200/50 rounded-2xl p-4 shadow-sm">
    <div className="mr-3 p-2 bg-white rounded-xl shadow-sm border border-slate-100">{icon}</div>
    <div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{title}</p>
      <p className="text-lg font-black text-slate-900">{value}%</p>
    </div>
  </div>
);
