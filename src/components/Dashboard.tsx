import { 
  TrendingUp,
  Globe,
  Smartphone,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Edit3,
  GraduationCap,
  User,
  Users,
  CheckCircle2,
  BarChart2,
  FileText,
  ClipboardEdit,
  BookMarked
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const currentDate = format(new Date(), 'dd/MM/yyyy', { locale: vi });

  return (
    <div className="pb-4 bg-[#f4f4f5] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 rounded-t-3xl border-b border-gray-100">
        <h1 className="text-[22px] font-bold text-[#1e3a8a] tracking-wide uppercase">
          BÁO CÁO HIỆU TRƯỞNG
        </h1>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Cập nhật ngày: {currentDate}
        </div>
      </div>

      {/* Widgets Container */}
      <div className="px-4 py-4 space-y-4 relative z-20">
        
        {/* 1. ĐIỂM DANH HÔM NAY */}
        <button 
          onClick={() => onNavigate('attendance')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md flex items-center justify-between group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle2 size={16} className="text-[#1e3a8a]" />
              <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">ĐIỂM DANH HÔM NAY</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[40px] font-bold text-gray-900 leading-none">1,152</span>
              <span className="text-xl font-medium text-gray-500">/ 1,280</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-500 text-[15px] font-medium mt-2.5">
              <TrendingUp size={18} />
              <span>90.0% hiện diện</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-[76px] h-[76px] flex items-center justify-center">
              <svg className="w-[76px] h-[76px] transform -rotate-90">
                <circle cx="38" cy="38" r="32" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-gray-100" />
                <motion.circle 
                  cx="38" cy="38" r="32" stroke="currentColor" strokeWidth="5" fill="transparent" 
                  strokeDasharray="201" 
                  initial={{ strokeDashoffset: 201 }}
                  animate={{ strokeDashoffset: 201 - (201 * 0.90) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-emerald-500" strokeLinecap="round" 
                />
              </svg>
              <span className="absolute text-[17px] font-bold text-gray-900">90%</span>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-gray-500 transition-colors" size={20} />
          </div>
        </button>

        {/* 2. LƯỢT TRUY CẬP */}
        <button 
          onClick={() => onNavigate('login')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md flex flex-col group"
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-3">
                <BarChart2 size={16} className="text-[#1e3a8a]" />
                <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">LƯỢT TRUY CẬP</h3>
              </div>
              <span className="text-[40px] font-bold text-[#0f172a] leading-none mb-2">5,918</span>
              <div className="flex items-center gap-1.5 text-[#10b981] text-[14px] font-medium">
                <TrendingUp size={18} />
                <span>+ 245 hôm nay</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[140px] mt-5">
              {/* Học sinh */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-500 w-5">HS</span>
                <GraduationCap size={16} className="text-[#3b82f6] shrink-0" />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#3b82f6] rounded-full"
                  />
                </div>
              </div>
              {/* Giáo viên */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-500 w-5">GV</span>
                <User size={16} className="text-[#a855f7] shrink-0" />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '15%' }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-[#a855f7] rounded-full"
                  />
                </div>
              </div>
              {/* Phụ huynh */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-500 w-5">PH</span>
                <Users size={16} className="text-[#f97316] shrink-0" />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '25%' }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-[#f97316] rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex w-full border-t border-gray-100 pt-4 relative">
            <div className="flex-1 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#1e3a8a]">
                <Globe size={20} />
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] text-gray-500 font-bold uppercase mb-0.5">WEB</div>
                <div className="text-[20px] font-bold text-[#0f172a] leading-none">3,245</div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-100 absolute left-1/2 top-4"></div>
            <div className="flex-1 flex items-center gap-3 pl-5">
              <div className="w-11 h-11 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#1e3a8a]">
                <Smartphone size={20} />
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] text-gray-500 font-bold uppercase mb-0.5">APP</div>
                <div className="text-[20px] font-bold text-[#0f172a] leading-none">2,673</div>
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 mt-2">
              <ChevronRight className="text-gray-300 group-hover:text-gray-500 transition-colors" size={20} />
            </div>
          </div>
        </button>

        {/* 3. HỒ SƠ ĐIỆN TỬ */}
        <button 
          onClick={() => onNavigate('electronic-records')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md flex flex-col group"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <FileText size={16} className="text-[#1e3a8a]" />
            <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">HỒ SƠ ĐIỆN TỬ</h3>
          </div>
          
          <div className="flex gap-3 mb-4 w-full">
            <div className="flex-1 bg-[#fff5f5] rounded-xl relative overflow-hidden py-3 px-4 pl-5">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e11d48]"></div>
              <div className="text-[11px] text-[#e11d48] font-bold uppercase mb-1">CẦN KÝ HÔM NAY</div>
              <div className="text-[36px] font-bold text-[#be123c] leading-none">08</div>
            </div>
            <div className="flex-1 bg-[#f8f9fa] rounded-xl relative py-3 px-4">
              <div className="text-[11px] text-[#1e3a8a] font-bold uppercase mb-1">TRONG TUẦN NÀY</div>
              <div className="text-[36px] font-bold text-[#0f172a] leading-none">24</div>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-gray-500 transition-colors" size={20} />
            </div>
          </div>
          
          <div className="flex items-center justify-center w-full gap-1.5 text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide">
            XEM DANH SÁCH <ArrowRight size={16} />
          </div>
        </button>

        {/* 4. HỌC LIỆU SỐ */}
        <button 
          onClick={() => onNavigate('digital-materials')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md flex flex-col group"
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <BookOpen size={16} className="text-[#1e3a8a]" />
            <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">HỌC LIỆU SỐ</h3>
          </div>
          
          <div className="flex items-end justify-between w-full mb-3">
            <div className="flex flex-col">
              <div className="text-[11px] text-gray-500 font-bold uppercase mb-0.5">TÀI LIỆU MỚI HÔM NAY</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-bold text-[#0284c7] leading-none">+ 12</span>
              </div>
            </div>
            
            {/* Biểu đồ cột mini (Sparkline) */}
            <div className="flex items-end gap-[5px] h-10 mb-1">
              <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} transition={{ duration: 0.5, delay: 0.1 }} className="w-2.5 bg-[#e0f2fe] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} transition={{ duration: 0.5, delay: 0.15 }} className="w-2.5 bg-[#bae6fd] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ duration: 0.5, delay: 0.2 }} className="w-2.5 bg-[#bae6fd] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '70%' }} transition={{ duration: 0.5, delay: 0.25 }} className="w-2.5 bg-[#7dd3fc] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} transition={{ duration: 0.5, delay: 0.3 }} className="w-2.5 bg-[#38bdf8] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ duration: 0.5, delay: 0.35 }} className="w-2.5 bg-[#0ea5e9] rounded-full"></motion.div>
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.5, delay: 0.4 }} className="w-2.5 bg-[#0284c7] rounded-full relative">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="absolute -top-[3px] -right-[3px] w-2.5 h-2.5 bg-[#ef4444] rounded-full border border-white"></motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="flex w-full border-t border-gray-100 pt-3 items-center justify-between">
            <div className="text-[11px] text-gray-500 font-bold uppercase">CẬP NHẬT TUẦN NÀY</div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-gray-900 leading-none">85</span>
              <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={16} />
            </div>
          </div>
        </button>

        {/* 5. SỔ GHI ĐIỂM */}
        <button 
          onClick={() => onNavigate('gradebook')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md flex flex-col group"
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <ClipboardEdit size={16} className="text-[#1e3a8a]" />
            <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">SỔ GHI ĐIỂM</h3>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 border-[2.5px] border-[#1e3a8a] rounded-xl flex items-center justify-center shrink-0">
              <span className="text-[28px] font-bold text-[#1e3a8a]">27</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[13px] text-gray-800 leading-snug">
                Còn <span className="font-bold text-[#1e3a8a]">27 ngày</span> đến đợt nhập điểm tiếp theo:
                <br />
                <span className="font-bold text-gray-700">Cuối HKII</span> <span className="text-gray-500 font-medium">(Dự kiến: 28/04/2026)</span>
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase mt-1.5">
                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                <span className="text-gray-500">Hiện tại:</span>
                <span className="text-[#0284c7]">Đợt nhập điểm Giữa HKII</span>
              </div>
            </div>
          </div>
          
          <div className="flex w-full border-t border-gray-100 pt-3 items-center relative">
            <div className="w-full text-center text-[11px] text-gray-700 font-bold uppercase tracking-wide">Xem chi tiết báo cáo</div>
            <ChevronRight className="absolute right-0 text-gray-500 group-hover:text-gray-700 transition-colors" size={16} />
          </div>
        </button>

        {/* 6. SỔ ĐĂNG BỘ */}
        <button 
          onClick={() => onNavigate('register')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm border border-blue-100 text-left transition-all active:scale-[0.98] hover:shadow-md group relative"
        >
          <div className="flex items-center gap-1.5 mb-4">
            <BookMarked size={16} className="text-[#1e3a8a]" />
            <h3 className="text-[13px] font-bold text-[#1e3a8a] tracking-wide uppercase">SỔ ĐĂNG BỘ</h3>
          </div>
          
          <div className="mb-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Trạng thái:
                  </span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md border border-emerald-100 shadow-sm leading-tight uppercase">
                    Đã hoàn thành đồng bộ dữ liệu
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#1e3a8a] ml-2">5/7</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((step, index) => (
                  <motion.div 
                    key={step} 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`h-2 flex-1 rounded-full origin-left ${
                      step <= 5 
                        ? (step <= 4 ? 'bg-[#1e3a8a]' : 'bg-amber-500') 
                        : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" size={16} />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 text-sm text-gray-900 border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              <Edit3 size={18} className="text-[#1e3a8a]" />
            </div>
            <span className="text-[12px] leading-tight flex-1">
              <span className="font-bold text-gray-500">Bước tiếp theo:</span> <br />
              <span className="text-[#1e3a8a] font-semibold">Sau ngày 31/5 Hiệu trưởng ký duyệt</span>
            </span>
          </div>
        </button>

        {/* Footer */}
        <div className="flex justify-center items-center py-6">
          <a 
            href="#" 
            className="text-[11px] text-gray-400 font-bold tracking-widest uppercase hover:text-[#1e3a8a] transition-colors flex items-center gap-2"
            onClick={(e) => e.preventDefault()}
          >
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            HỖ TRỢ LIÊN HỆ: VIETNAMAISOFT
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          </a>
        </div>

      </div>
    </div>
  );
}
