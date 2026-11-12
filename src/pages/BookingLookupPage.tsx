import React, { useState } from 'react';
import { Search, Calendar, Clock, Video, MapPin, CheckCircle2, AlertCircle, Download, ArrowLeft } from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { Appointment } from '../types';

interface BookingLookupPageProps {
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
}

export const BookingLookupPage: React.FC<BookingLookupPageProps> = ({ onNavigateHome, onNavigateBooking }) => {
  const [searchCode, setSearchCode] = useState('TC-2026-4081');
  const [searchedAppointment, setSearchedAppointment] = useState<Appointment | null>(
    TheraConnectStore.getAppointmentById('TC-2026-4081') || null
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!searchCode.trim()) return;

    const apt = TheraConnectStore.getAppointmentById(searchCode.trim());
    if (apt) {
      setSearchedAppointment(apt);
    } else {
      setSearchedAppointment(null);
      setMessage(`No appointment found matching reference "${searchCode.trim()}". Try TC-2026-4081 or TC-2026-5120.`);
    }
  };

  const handleDownloadCalendar = () => {
    if (!searchedAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TheraConnect//Clinical Appointments//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:TheraConnect: ${searchedAppointment.serviceTitle} with ${searchedAppointment.therapistName}
DESCRIPTION:Reference Code: ${searchedAppointment.referenceCode}\\nModality: ${searchedAppointment.modality}
STATUS:${searchedAppointment.status}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${searchedAppointment.referenceCode}-TheraConnect.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-10">
      
      <div className="text-center space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Patient Services
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35] tracking-tight">
          Appointment Confirmation & Status
        </h1>
        <p className="text-sm text-[#5C6764]">
          Enter your reference booking code (e.g. <span className="font-mono text-[#173D35]">TC-2026-4081</span>) to view meeting details or download session documents.
        </p>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-4">
          <input
            type="text"
            required
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="e.g. TC-2026-4081"
            className="flex-1 px-4 py-2.5 text-xs font-mono uppercase bg-white border border-[#D1DDD0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </form>

        {message && (
          <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded max-w-md mx-auto">{message}</p>
        )}
      </div>

      {searchedAppointment && (
        <div className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs space-y-6">
          
          <div className="bg-[#173D35] px-6 py-4 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#DFC9A0] block">
                Booking Reference
              </span>
              <span className="text-xl font-mono font-bold">{searchedAppointment.referenceCode}</span>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded ${
                searchedAppointment.status === 'CONFIRMED' ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-800 text-amber-100'
              }`}>
                {searchedAppointment.status}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#EFEDE4]/50 rounded-lg space-y-1">
                <span className="text-[#5C6764]">Client Name</span>
                <div className="text-sm font-semibold text-[#173D35]">{searchedAppointment.clientName}</div>
                <div className="text-[#5C6764]">{searchedAppointment.clientEmail}</div>
              </div>

              <div className="p-4 bg-[#EFEDE4]/50 rounded-lg space-y-1">
                <span className="text-[#5C6764]">Clinical Psychologist</span>
                <div className="text-sm font-semibold text-[#173D35]">{searchedAppointment.therapistName}</div>
                <div className="text-[#5C6764]">{searchedAppointment.serviceTitle}</div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-[#242B29]">
              <div className="flex items-center justify-between">
                <span className="text-[#5C6764] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#173D35]" /> Date:
                </span>
                <span className="font-mono-numbers font-semibold">{searchedAppointment.scheduledDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5C6764] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#173D35]" /> Time Slot:
                </span>
                <span className="font-mono-numbers font-semibold">{searchedAppointment.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5C6764]">Session Modality:</span>
                <span className="font-medium">{searchedAppointment.modality}</span>
              </div>

              {searchedAppointment.videoMeetingUrl && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                  <span className="text-xs font-semibold text-emerald-900 block flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-emerald-700" />
                    Encrypted Telehealth Session Room:
                  </span>
                  <a
                    href={searchedAppointment.videoMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-emerald-800 underline break-all"
                  >
                    {searchedAppointment.videoMeetingUrl}
                  </a>
                </div>
              )}

              {searchedAppointment.clinicRoom && (
                <div className="p-4 bg-[#EFEDE4] border border-[#D1DDD0] rounded-lg space-y-1">
                  <span className="text-xs font-semibold text-[#173D35] block flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#173D35]" />
                    In-Person Suite:
                  </span>
                  <span className="text-xs text-[#5C6764]">{searchedAppointment.clinicRoom}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="px-4 py-2 bg-[#EFEDE4] hover:bg-[#D1DDD0] text-[#173D35] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Calendar .ICS</span>
              </button>
              <button
                onClick={onNavigateBooking}
                className="text-xs text-[#173D35] font-semibold hover:underline"
              >
                Need to reschedule? Book a new consultation →
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
