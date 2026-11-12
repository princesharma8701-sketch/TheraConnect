import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, CreditCard, Smartphone, Building2, Lock } from 'lucide-react';
import { TheraConnectStore } from '../services/store';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  orderReference: string;
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  onSuccess: (paymentDetails: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    method: string;
  }) => void;
  onFailure: (errorMessage: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency = 'INR',
  orderReference,
  clientName,
  clientEmail,
  serviceTitle,
  onSuccess,
  onFailure
}) => {
  const [method, setMethod] = useState<'card' | 'upi' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const settings = TheraConnectStore.getSettings();

  const handlePay = () => {
    setProcessing(true);
    setError(null);

    // Simulate network processing and signature generation
    setTimeout(() => {
      setProcessing(false);
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const mockPaymentId = `pay_rzp_${Date.now()}_${randomSuffix}`;
      const mockOrderId = `order_${orderReference.replace(/[^a-zA-Z0-9]/g, '')}_${randomSuffix}`;
      const mockSignature = `sig_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

      onSuccess({
        razorpayOrderId: mockOrderId,
        razorpayPaymentId: mockPaymentId,
        razorpaySignature: mockSignature,
        method: method === 'card' ? 'Card (Visa/Mastercard)' : method === 'upi' ? `UPI (${upiId})` : 'Net Banking (HDFC/ICICI)'
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Razorpay Header Bar */}
        <div className="bg-[#173D35] px-6 py-4 text-white flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-xl font-bold tracking-tight">TheraConnect</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#A8B9A3]/20 text-[#DFC9A0] rounded">
                Razorpay Checkout
              </span>
            </div>
            <p className="text-xs text-[#DCE5D9] truncate max-w-xs">{serviceTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
            title="Cancel transaction"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Order Summary */}
        <div className="bg-[#EFEDE4]/50 px-6 py-3.5 border-b border-[#EFEDE4] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#5C6764]">Consultation Fee:</div>
            <div className="text-xl font-bold font-mono-numbers text-[#173D35]">
              ₹{amount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">INR</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-[#5C6764]">Ref Code</div>
            <div className="text-xs font-mono font-medium text-[#242B29]">{orderReference}</div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-5">
          {/* Method tabs */}
          <div className="grid grid-cols-3 gap-2 bg-[#EFEDE4]/60 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMethod('upi')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition-colors ${
                method === 'upi' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>UPI / QR</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition-colors ${
                method === 'card' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Card</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('netbanking')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition-colors ${
                method === 'netbanking' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>NetBanking</span>
            </button>
          </div>

          {/* Method Details */}
          {method === 'upi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okhdfcbank"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                />
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-md flex items-start gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Simulated instant UPI intent. Supports Google Pay, PhonePe, Paytm, and BHIM.</span>
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-700">Select Bank</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((b, i) => (
                  <button
                    key={b}
                    type="button"
                    className={`p-2.5 border rounded text-left transition-colors ${
                      i === 0 ? 'border-[#173D35] bg-[#173D35]/5 font-medium text-[#173D35]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Pay Button */}
          <button
            type="button"
            disabled={processing}
            onClick={handlePay}
            className="w-full py-3 bg-[#173D35] hover:bg-[#0E2722] active:scale-[0.99] disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authorizing with Bank...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#DFC9A0]" />
                <span>Pay ₹{amount.toLocaleString('en-IN')} Securely</span>
              </>
            )}
          </button>

          {/* Security badge & Test Mode notice */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-bit TLS Encrypted
            </span>
            <span className="text-slate-400">
              {settings.demoPaymentMode ? 'Sandbox / Test Mode' : 'Live Gateway'}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
