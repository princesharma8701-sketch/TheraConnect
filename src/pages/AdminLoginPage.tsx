import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { TheraConnectStore } from '../services/store';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState('admin@theraconnect.com');
  const [password, setPassword] = useState('theraconnect2026');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = TheraConnectStore.adminLogin(email, password);
      setLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@theraconnect.com');
    setPassword('theraconnect2026');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#D1DDD0] p-8 sm:p-10 shadow-lg space-y-6">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#173D35] text-[#DFC9A0] flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
            Clinical Management Portal
          </h2>
          <p className="text-xs text-[#5C6764]">
            Authorized administrative & therapist access
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-3 bg-[#EFEDE4]/80 border border-[#D1DDD0] rounded-lg text-xs text-[#242B29] flex items-center justify-between">
          <div>
            <span className="font-semibold text-[#173D35] block">Demo Access Credentials</span>
            <span className="font-mono text-[11px] text-[#5C6764]">admin@theraconnect.com · theraconnect2026</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 bg-white border border-[#D1DDD0] hover:bg-[#EFEDE4] text-[#173D35] text-[11px] font-medium rounded transition-colors"
          >
            Autofill
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Therapist / Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@theraconnect.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Portal Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100">
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs text-[#5C6764] hover:text-[#173D35]"
          >
            ← Return to Public Homepage
          </button>
        </div>

      </div>
    </div>
  );
};
