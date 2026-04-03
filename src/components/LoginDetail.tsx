import { ChevronLeft, BarChart2, TrendingUp, TrendingDown, Calendar, Globe, Smartphone, User, Users, GraduationCap, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

interface LoginDetailProps {
  onBack: () => void;
}

const chartData = [
  { name: 'T2', value: 400 },
  { name: 'T3', value: 300 },
  { name: 'T4', value: 550 },
  { name: 'T5', value: 200 },
  { name: 'T6', value: 450 },
  { name: 'T7', value: 0 },
  { name: 'CN', value: 0 },
];

const loginEvents = [
  { id: 1, user: 'Nguyễn Văn An', role: 'Học sinh', platform: 'App', time: '08:30 AM', status: 'Thành công' },
  { id: 2, user: 'Trần Thị Bình', role: 'Giáo viên', platform: 'Web', time: '08:25 AM', status: 'Thành công' },
  { id: 3, user: 'Lê Văn Cường', role: 'Phụ huynh', platform: 'App', time: '08:15 AM', status: 'Thành công' },
  { id: 4, user: 'Phạm Thị Dung', role: 'Học sinh', platform: 'App', time: '08:10 AM', status: 'Thành công' },
  { id: 5, user: 'Hoàng Văn Em', role: 'Học sinh', platform: 'Web', time: '08:05 AM', status: 'Thành công' },
];

export default function LoginDetail({ onBack }: LoginDetailProps) {
  return (
    <div className="pb-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 shadow-sm flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a]">Lượt truy cập</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <BarChart2 size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">TỔNG CỘNG</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">5,918</div>
            <div className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
              +12% với tuần trước
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Calendar size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">HÔM NAY</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">245</div>
            <div className="text-[11px] font-bold mt-1 flex items-center gap-1">
              <TrendingDown size={12} className="text-red-500" />
              <span className="text-red-500">20 lượt</span>
              <span className="text-blue-500">với hôm qua</span>
            </div>
          </div>
        </div>

        {/* Breakdown Section - HS, GV, PH */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide mb-4">Phân loại đối tượng</h2>
          <div className="space-y-4">
            {/* Học sinh */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap size={16} className="text-blue-500" />
                  <span>Học sinh</span>
                </div>
                <span className="text-blue-600">60% (3,550)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
            {/* Giáo viên */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={16} className="text-purple-500" />
                  <span>Giáo viên</span>
                </div>
                <span className="text-purple-600">15% (887)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '15%' }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="h-full bg-purple-500 rounded-full"
                />
              </div>
            </div>
            {/* Phụ huynh */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} className="text-orange-500" />
                  <span>Phụ huynh</span>
                </div>
                <span className="text-orange-600">25% (1,481)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '25%' }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-orange-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Section - Web, App */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide mb-4">Nền tảng truy cập</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">web hoccungai.vn</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-[18px] font-bold text-gray-900">3,245</div>
                  <div className="text-[11px] font-medium text-emerald-600">+ 124 lượt truy cập hôm nay</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Smartphone size={20} />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">app học cùng ai</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-[18px] font-bold text-gray-900">2,673</div>
                  <div className="text-[11px] font-medium text-emerald-600">+ 89 lượt truy cập hôm nay</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">THỐNG KÊ TUẦN NÀY</h2>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14} />
                +9 với tuần trước
              </div>
            </div>
            <span className="text-[11px] font-bold text-gray-500">Hôm nay: Thứ 6 ngày 03/04/2026</span>
          </div>
          <motion.div 
            className="h-56 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32} isAnimationActive={true}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#0d9488' : '#2dd4bf'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Danh sách chi tiết</h2>
            <button className="text-[12px] font-bold text-teal-600 uppercase">Xem tất cả</button>
          </div>

          <div className="space-y-2.5">
            {loginEvents.map((event) => (
              <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    event.role === 'Học sinh' ? 'bg-blue-50 text-blue-600' :
                    event.role === 'Giáo viên' ? 'bg-purple-50 text-purple-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {event.role === 'Học sinh' ? <GraduationCap size={20} /> :
                     event.role === 'Giáo viên' ? <User size={20} /> :
                     <Users size={20} />}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-gray-900 leading-tight">
                      {event.role === 'Phụ huynh' ? `PH: ${event.user}` : event.user}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-gray-500">{event.role}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-[11px] font-medium text-gray-500">{event.platform}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-bold text-gray-900">{event.time}</div>
                  <div className="text-[10px] font-bold text-emerald-500 uppercase mt-0.5">{event.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
