import React from 'react';
import { Check, X, ShieldAlert, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { ROOM_TIERS, OTA_COMPARISON } from '../data/hotelData';

interface TariffComparisonTableProps {
  onBookDirect: (roomId: string) => void;
}

export const TariffComparisonTable: React.FC<TariffComparisonTableProps> = ({ onBookDirect }) => {
  return (
    <section className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden relative max-w-full">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Zero Commission Guarantee</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Why Book Direct With SG GRAND?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Third-party portals (MakeMyTrip, Goibibo, Agoda) charge hotels a 15% to 22% middleman fee. When you book directly with us, we pass 100% of these savings back to you along with exclusive VIP perks.
        </p>
      </div>

      {/* Room Tiers Price Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-8 relative z-10">
        {ROOM_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-[#C5A880]/60 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white truncate">{tier.name}</span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded shrink-0">
                  Save ₹{tier.savingsPerNight}/nt
                </span>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400">Direct Rate:</span>
                  <span className="text-lg font-bold text-[#C5A880] font-sans">
                    ₹{tier.directPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-400">/nt</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-slate-400">
                  <span>OTA / MMT Rate:</span>
                  <span className="line-through">₹{tier.otaPrice.toLocaleString('en-IN')}/nt</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-400">
                  <span>OTA Convenience Fee:</span>
                  <span className="text-rose-400">+₹200–₹350 extra</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onBookDirect(tier.id)}
              className="mt-4 w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-[#C5A880] hover:bg-[#d8bf9b] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow active:scale-95"
            >
              <span>Lock Direct Rate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Card List View (Visible on Mobile) */}
      <div className="block lg:hidden space-y-3 relative z-10 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Direct Booking Perks vs OTAs:
        </h3>
        {OTA_COMPARISON.map((row, idx) => (
          <div
            key={idx}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs"
          >
            <div className="font-bold text-white text-sm">{row.feature}</div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/50">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">SG GRAND Direct</div>
                <div className="font-semibold text-emerald-300 mt-0.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{row.direct}</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">MakeMyTrip / OTAs</div>
                <div className="text-slate-400 mt-0.5 flex items-center gap-1">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{row.ota}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Feature-by-Feature Table (Visible on Desktop) */}
      <div className="hidden lg:block relative z-10 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-800/90 text-slate-300 font-semibold border-b border-slate-700">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Benefit / Feature</th>
              <th className="py-3.5 px-4 sm:px-6 text-[#C5A880] bg-slate-800/60">
                SG GRAND Direct Booking
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-slate-400">
                MakeMyTrip / Goibibo / OTAs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {OTA_COMPARISON.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-3 px-4 sm:px-6 font-medium text-white">{row.feature}</td>
                <td className="py-3 px-4 sm:px-6 font-semibold text-emerald-400 bg-slate-800/30">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{row.direct}</span>
                  </div>
                </td>
                <td className="py-3 px-4 sm:px-6 text-slate-400">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400/80 shrink-0" />
                    <span>{row.ota}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trust Callout */}
      <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>Need help? Call front desk: <strong>+91 94418 65555</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">WhatsApp Concierge ready 24/7</span>
        </div>
      </div>
    </section>
  );
};
