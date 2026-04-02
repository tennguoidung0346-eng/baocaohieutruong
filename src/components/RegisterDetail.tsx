import { ChevronLeft, CheckCircle2, Clock, Edit3, ArrowRight, Calendar, User, ShieldCheck, FileCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface RegisterDetailProps {
  onBack: () => void;
}

const enrollmentSteps = [
  {
    id: 1,
    phase: 'early',
    phaseLabel: 'Đầu năm học',
    name: 'Khởi tạo sổ đăng bộ',
    position: 'Học vụ',
    person: 'Nguyễn Thị Minh Thu',
    date: '05/09/2025',
    status: 'completed'
  },
  {
    id: 2,
    phase: 'early',
    phaseLabel: 'Đầu năm học',
    name: 'Ký duyệt ban hành',
    position: 'Hiệu trưởng',
    person: 'Trần Văn Hùng',
    date: '10/09/2025',
    status: 'completed'
  },
  {
    id: 3,
    phase: 'early',
    phaseLabel: 'Đầu năm học',
    name: 'Đóng dấu ban hành',
    position: 'Văn thư',
    person: 'Lê Thị Lan',
    date: '12/09/2025',
    status: 'completed'
  },
  {
    id: 4,
    phase: 'early',
    phaseLabel: 'Đầu năm học',
    name: 'Cấp mã số đăng bộ',
    position: 'Học vụ',
    person: 'Nguyễn Thị Minh Thu',
    date: '15/09/2025',
    status: 'completed'
  },
  {
    id: 5,
    phase: 'late',
    phaseLabel: 'Cuối năm học',
    name: 'Đồng bộ dữ liệu',
    position: 'Học vụ',
    person: 'Nguyễn Thị Minh Thu',
    date: '20/05/2026',
    status: 'completed'
  },
  {
    id: 6,
    phase: 'late',
    phaseLabel: 'Cuối năm học',
    name: 'Ký duyệt dữ liệu',
    position: 'Hiệu trưởng',
    person: 'Trần Văn Hùng',
    date: 'Dự kiến: 31/05/2026',
    status: 'current'
  },
  {
    id: 7,
    phase: 'late',
    phaseLabel: 'Cuối năm học',
    name: 'Đóng đấu chốt sổ',
    position: 'Văn thư',
    person: 'Lê Thị Lan',
    date: 'Chưa thực hiện',
    status: 'pending'
  }
];

export default function RegisterDetail({ onBack }: RegisterDetailProps) {
  const completedCount = enrollmentSteps.filter(s => s.status === 'completed').length;
  const totalSteps = enrollmentSteps.length;

  return (
    <div className="pb-12 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-[18px] font-bold text-[#1e3a8a]">Sổ đăng bộ</h1>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Current Status Card (Dashboard Style) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-[#1e3a8a]" />
            <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">TRẠNG THÁI HIỆN TẠI</h3>
          </div>
          
          <div className="mb-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></div>
                  <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                    Trạng thái hiện tại:
                  </span>
                </div>
                <div className="inline-flex">
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[14px] font-bold rounded-lg border border-emerald-100 shadow-sm leading-tight">
                    Đã hoàn thành đồng bộ dữ liệu
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#1e3a8a] ml-2">{completedCount}/{totalSteps}</span>
            </div>
            <div className="flex gap-1.5">
              {enrollmentSteps.map((step) => (
                <div 
                  key={step.id} 
                  className={`h-2.5 flex-1 rounded-full ${
                    step.status === 'completed' 
                      ? (step.id <= 4 ? 'bg-[#1e3a8a]' : 'bg-emerald-500') 
                      : step.status === 'current' ? 'bg-amber-500' : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4 text-sm text-gray-900 border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <Edit3 size={20} className="text-[#1e3a8a]" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">Bước tiếp theo</div>
              <div className="text-[14px] text-[#1e3a8a] font-bold leading-tight">
                Sau ngày 31/5 Hiệu trưởng ký duyệt dữ liệu
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">Quy trình thực hiện</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-[#1e3a8a] rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Đầu năm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Cuối năm</span>
              </div>
            </div>
          </div>

          <div className="relative space-y-4">
            {/* Vertical Line */}
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gray-100"></div>

            {enrollmentSteps.map((step, idx) => (
              <div key={step.id} className="relative pl-12">
                {/* Step Marker */}
                <div className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-[#f8fafc] ${
                  step.status === 'completed' ? (step.phase === 'early' ? 'bg-[#1e3a8a] text-white' : 'bg-emerald-500 text-white') :
                  step.status === 'current' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' :
                  'bg-white text-gray-300 border-gray-100'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                   step.status === 'current' ? <Clock size={20} className="animate-spin-slow" /> : 
                   <span className="text-sm font-bold">{step.id}</span>}
                </div>

                {/* Step Content */}
                <div className={`bg-white p-3 rounded-xl border transition-all ${
                  step.status === 'current' ? 'border-amber-200 shadow-md ring-1 ring-amber-50' : 
                  step.status === 'completed' ? 'border-gray-100 shadow-sm' : 'border-gray-100 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                      step.phase === 'early' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {step.phaseLabel}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1 shrink-0">
                      <Calendar size={10} />
                      {step.date}
                    </span>
                  </div>

                  <h3 className={`text-[14px] font-bold mb-2 ${
                    step.status === 'current' ? 'text-amber-700' : 'text-gray-900'
                  }`}>
                    {step.id}. {step.name}
                  </h3>

                  <div className="flex items-center gap-x-4 gap-y-1 flex-wrap pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ShieldCheck size={12} className="text-gray-400 shrink-0" />
                      <span className="text-[11px] font-bold text-gray-600 truncate">{step.position}</span>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <User size={12} className="text-gray-400 shrink-0" />
                      <span className="text-[11px] font-bold text-gray-600 truncate">{step.person}</span>
                    </div>
                  </div>

                  {step.status === 'current' && (
                    <div className="mt-3 flex items-center justify-center bg-amber-50 rounded-lg p-2 border border-amber-100">
                      <span className="text-[11px] font-bold text-amber-700">Đang chờ xử lý...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
