import { useState, useMemo } from 'react';
import { ChevronLeft, Search, Filter, BookOpen, User, Clock, CheckCircle2, AlertCircle, BarChart2, Video, FileText, Image as ImageIcon, Music, ChevronDown, ChevronRight, Archive, X, Calendar, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, PieChart, Pie } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface DigitalMaterialDetailProps {
  onBack: () => void;
}

const topTeachers = [
  { name: 'Thầy An', count: 45, color: '#0ea5e9' },
  { name: 'Cô Bình', count: 38, color: '#8b5cf6' },
  { name: 'Thầy Cường', count: 32, color: '#f59e0b' },
  { name: 'Cô Dung', count: 28, color: '#10b981' },
  { name: 'Thầy Em', count: 25, color: '#f43f5e' },
];

const materialsToday = [
  { id: 1, name: 'Bài giảng Giải tích 12 - Chương 3', subject: 'Toán học', creator: 'Thầy Nguyễn Văn An', type: 'video', status: 'approved', time: '08:30 AM' },
  { id: 2, name: 'Đề cương ôn tập Tiếng Anh HKII', subject: 'Tiếng Anh', creator: 'Cô Trần Thị Bình', type: 'document', status: 'pending', time: '09:15 AM' },
  { id: 3, name: 'Sơ đồ tư duy Lịch sử thế giới', subject: 'Lịch sử', creator: 'Thầy Lê Văn Cường', type: 'image', status: 'approved', time: '10:05 AM' },
];

const materialsThisWeek = [
  { id: 4, name: 'Thí nghiệm Vật lý: Khúc xạ ánh sáng', subject: 'Vật lý', creator: 'Thầy Phạm Văn Đức', type: 'video', status: 'approved', date: '31/03' },
  { id: 5, name: 'Bài nghe Unit 10: Eco-tourism', subject: 'Tiếng Anh', creator: 'Cô Đặng Thị Lan', type: 'audio', status: 'approved', date: '30/03' },
  { id: 6, name: 'Tổng hợp công thức Hóa hữu cơ', subject: 'Hóa học', creator: 'Cô Hoàng Thị Mai', type: 'document', status: 'pending', date: '29/03' },
];

const allMaterials = [
  ...materialsToday,
  ...materialsThisWeek,
  { id: 7, name: 'Văn mẫu: Nghị luận xã hội', subject: 'Ngữ văn', creator: 'Cô Vũ Thị Phượng', type: 'document', status: 'approved', grade: 'Khối 12' },
  { id: 8, name: 'Bộ ảnh Địa lý tự nhiên Việt Nam', subject: 'Địa lý', creator: 'Thầy Đặng Văn Giang', type: 'image', status: 'approved', grade: 'Khối 10' },
  { id: 9, name: 'Video hướng dẫn giải bài tập Sinh học', subject: 'Sinh học', creator: 'Cô Bùi Thị Hoa', type: 'video', status: 'approved', grade: 'Khối 11' },
];

const TypeIcon = ({ type, size = 16 }: { type: string, size?: number }) => {
  switch (type) {
    case 'video': return <Video size={size} className="text-red-500" />;
    case 'document': return <FileText size={size} className="text-blue-500" />;
    case 'image': return <ImageIcon size={size} className="text-emerald-500" />;
    case 'audio': return <Music size={size} className="text-purple-500" />;
    default: return <FileText size={size} className="text-gray-500" />;
  }
};

export default function DigitalMaterialDetail({ onBack }: DigitalMaterialDetailProps) {
  const [expandedToday, setExpandedToday] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(false);
  const [showRepository, setShowRepository] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('Tất cả');
  const [gradeFilter, setGradeFilter] = useState('Tất cả');
  const [showAllContributors, setShowAllContributors] = useState(false);
  const [chartType, setChartType] = useState<'grade' | 'subject' | 'type'>('grade');

  const chartData = useMemo(() => {
    const dataMap: Record<string, number> = {};
    allMaterials.forEach(m => {
      let key = '';
      if (chartType === 'grade') {
        key = (m as any).grade || 'Khác';
      } else if (chartType === 'subject') {
        key = m.subject;
      } else if (chartType === 'type') {
        switch(m.type) {
          case 'video': key = 'Video'; break;
          case 'document': key = 'Tài liệu'; break;
          case 'image': key = 'Hình ảnh'; break;
          case 'audio': key = 'Âm thanh'; break;
          default: key = 'Khác';
        }
      }
      dataMap[key] = (dataMap[key] || 0) + 1;
    });
    
    const total = allMaterials.length;
    return Object.entries(dataMap).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100)
    })).sort((a, b) => b.value - a.value);
  }, [chartType]);

  const CHART_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#64748b'];

  const allContributors = [
    ...topTeachers,
    { name: 'Cô Lan', count: 22, color: '#f97316' },
    { name: 'Thầy Đức', count: 20, color: '#14b8a6' },
    { name: 'Cô Mai', count: 18, color: '#ec4899' },
    { name: 'Thầy Hùng', count: 15, color: '#6366f1' },
    { name: 'Cô Phượng', count: 12, color: '#84cc16' },
  ];

  const filteredMaterials = useMemo(() => {
    return allMaterials.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = subjectFilter === 'Tất cả' || m.subject === subjectFilter;
      const matchesGrade = gradeFilter === 'Tất cả' || (m as any).grade === gradeFilter;
      return matchesSearch && matchesSubject && matchesGrade;
    });
  }, [searchQuery, subjectFilter, gradeFilter]);

  const subjects = ['Tất cả', ...Array.from(new Set(allMaterials.map(m => m.subject)))];
  const grades = ['Tất cả', 'Khối 10', 'Khối 11', 'Khối 12'];

  if (showRepository) {
    return (
      <div className="pb-8 bg-[#f4f4f5] min-h-screen">
        <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => setShowRepository(false)} className="p-1 -ml-1 text-[#1e3a8a]">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-[18px] font-bold text-[#1e3a8a]">Kho học liệu trường</h1>
        </div>

        <div className="p-4 space-y-4">
          {/* Analysis Chart */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide mb-4">Phân tích học liệu</h2>
            
            <div className="flex bg-gray-50 p-1 rounded-xl mb-4">
              <button 
                onClick={() => setChartType('grade')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${chartType === 'grade' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Khối lớp
              </button>
              <button 
                onClick={() => setChartType('subject')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${chartType === 'subject' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Môn học
              </button>
              <button 
                onClick={() => setChartType('type')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${chartType === 'type' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Loại
              </button>
            </div>

            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-[120px] h-[120px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#1e3a8a' }}
                      formatter={(value: number, name: string, props: any) => [`${value} (${props.payload.percentage}%)`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 pl-4 space-y-2">
                {chartData.slice(0, 4).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                      <span className="text-gray-600 font-medium truncate">{entry.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 shrink-0">{entry.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm tên học liệu..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <select 
                  className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 appearance-none outline-none"
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                >
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
              <div className="flex-1 relative">
                <select 
                  className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 appearance-none outline-none"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {filteredMaterials.map(m => (
              <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <TypeIcon type={m.type} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-gray-900 truncate">{m.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase">{m.subject}</span>
                    <span className="text-[11px] text-gray-500 font-medium truncate">Bởi {m.creator}</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredMaterials.length === 0 && (
              <div className="text-center py-10 text-gray-400">Không tìm thấy học liệu phù hợp</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 bg-[#f4f4f5] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1 text-[#1e3a8a]">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a]">Học liệu số</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* 1. Summary Stats */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-[#1e3a8a]" />
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Tổng học liệu trường</h2>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-[40px] font-bold text-[#0284c7] leading-none">1,248</div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                <ArrowUpRight size={14} />
                <span>12 hôm nay</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top Contributors Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-[#1e3a8a]" />
              <h2 className="text-[15px] font-bold text-[#1e3a8a] uppercase tracking-wide">Thầy cô đóng góp nhiều nhất</h2>
            </div>
          </div>
          <motion.div 
            className="h-48 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={topTeachers} 
                layout="vertical" 
                margin={{ left: 5, right: 35, top: 0, bottom: 0 }}
                barGap={8}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={90}
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#475569' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={true}>
                  {topTeachers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="count" 
                    position="right" 
                    style={{ fill: '#1e3a8a', fontSize: 12, fontWeight: 800 }} 
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <button 
            onClick={() => setShowAllContributors(true)}
            className="w-full mt-4 py-2.5 bg-gray-50 text-[#1e3a8a] text-[12px] font-bold rounded-xl border border-gray-100 active:scale-[0.98] transition-transform"
          >
            XEM TẤT CẢ
          </button>
        </div>

        {/* Contributors Modal */}
        <AnimatePresence>
          {showAllContributors && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllContributors(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              >
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <h3 className="text-[16px] font-bold text-[#1e3a8a]">Thống kê đóng góp học liệu</h3>
                  <button onClick={() => setShowAllContributors(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="p-5 overflow-y-auto no-scrollbar flex-1">
                  <div className="space-y-4">
                    {allContributors.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold bg-gray-100 text-gray-500 shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[14px] font-bold text-gray-800">{t.name}</span>
                            <span className="text-[14px] font-bold text-[#1e3a8a]">{t.count}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(t.count / allContributors[0].count) * 100}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: t.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. Materials List */}
        <div className="space-y-3">
          {/* Today Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setExpandedToday(!expandedToday)}
              className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/50"
            >
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                <span className="text-[14px] font-bold text-gray-800 uppercase tracking-wide">Học liệu mới hôm nay</span>
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
              </div>
              <ChevronDown className={`text-gray-400 transition-transform ${expandedToday ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence>
              {expandedToday && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    {materialsToday.map(m => (
                      <div key={m.id} className="flex gap-3 p-3 bg-white border border-gray-50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <TypeIcon type={m.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-gray-900 truncate">{m.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-blue-600 uppercase">{m.subject}</span>
                            <span className="text-[10px] text-gray-400">•</span>
                            <span className="text-[10px] text-gray-500 truncate">{m.creator}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Clock size={10} />
                              {m.time}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {m.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* This Week Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setExpandedWeek(!expandedWeek)}
              className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/50"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-purple-600" />
                <span className="text-[14px] font-bold text-gray-800 uppercase tracking-wide">Học liệu trong tuần</span>
                <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">85</span>
              </div>
              <ChevronDown className={`text-gray-400 transition-transform ${expandedWeek ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence>
              {expandedWeek && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    {materialsThisWeek.map(m => (
                      <div key={m.id} className="flex gap-3 p-3 bg-white border border-gray-50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <TypeIcon type={m.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-gray-900 truncate">{m.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-purple-600 uppercase">{m.subject}</span>
                            <span className="text-[10px] text-gray-400">•</span>
                            <span className="text-[10px] text-gray-500 truncate">{m.creator}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-gray-400 font-medium">{m.date}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {m.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Repository Button */}
        <button 
          onClick={() => setShowRepository(true)}
          className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-transform"
        >
          <Archive size={20} />
          <span>KHO HỌC LIỆU CỦA TRƯỜNG</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
