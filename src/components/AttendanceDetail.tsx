import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, Search, Filter, Users, CheckCircle2, AlertCircle, XCircle, BarChart2, User, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface AttendanceDetailProps {
  onBack: () => void;
}

const studentData = [
  { name: 'Có mặt', value: 1152, color: '#0d9488' }, // teal-600
  { name: 'Vắng phép', value: 80, color: '#f59e0b' }, // amber-500
  { name: 'Vắng không phép', value: 48, color: '#ef4444' }, // red-500
];

const gradeData = [
  { name: 'Khối 1', percentage: 92, present: 235, total: 256 },
  { name: 'Khối 2', percentage: 90, present: 230, total: 256 },
  { name: 'Khối 3', percentage: 89, present: 228, total: 256 },
  { name: 'Khối 4', percentage: 91, present: 232, total: 256 },
  { name: 'Khối 5', percentage: 89, present: 227, total: 256 },
];

const classAttendance = [
  { id: 1, name: 'Lớp 1A1', grade: 'Khối 1', present: 30, total: 30, status: 'good' },
  { id: 2, name: 'Lớp 2A1', grade: 'Khối 2', present: 28, total: 30, status: 'warning' },
  { id: 3, name: 'Lớp 3A1', grade: 'Khối 3', present: 29, total: 30, status: 'good' },
  { id: 4, name: 'Lớp 4A1', grade: 'Khối 4', present: 25, total: 30, status: 'alert' },
  { id: 5, name: 'Lớp 5A1', grade: 'Khối 5', present: 30, total: 30, status: 'good' },
];

const mockStudents = [
  { id: 1, name: 'Nguyễn Văn An', status: 'present', time: '07:15 AM' },
  { id: 2, name: 'Trần Thị Bình', status: 'absent_excused', time: '-' },
  { id: 3, name: 'Lê Văn Cường', status: 'present', time: '07:20 AM' },
  { id: 4, name: 'Phạm Thị Dung', status: 'absent_unexcused', time: '-' },
  { id: 5, name: 'Hoàng Văn Em', status: 'present', time: '07:25 AM' },
  { id: 6, name: 'Vũ Thị Phượng', status: 'absent_excused', time: '-' },
  { id: 7, name: 'Đặng Văn Giang', status: 'present', time: '07:10 AM' },
  { id: 8, name: 'Bùi Thị Hoa', status: 'present', time: '07:18 AM' },
];

export default function AttendanceDetail({ onBack }: AttendanceDetailProps) {
  const [selectedClass, setSelectedClass] = useState<typeof classAttendance[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Force scroll to top whenever the view changes
  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    
    // Double check after a short delay to handle late rendering or browser "helpfulness"
    const timer = setTimeout(scrollToTop, 0);
    const timerLong = setTimeout(scrollToTop, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timerLong);
    };
  }, [selectedClass]);

  const total = studentData.reduce((sum, item) => sum + item.value, 0);
  const presentCount = studentData[0].value;
  const percentage = Math.round((presentCount / total) * 100);

  const filteredClasses = useMemo(() => {
    return classAttendance.filter(cls => !gradeFilter || cls.grade === gradeFilter);
  }, [gradeFilter]);

  const filteredStudents = useMemo(() => {
    const students = mockStudents.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort: absent first
    return [...students].sort((a, b) => {
      const aIsAbsent = a.status.startsWith('absent');
      const bIsAbsent = b.status.startsWith('absent');
      if (aIsAbsent && !bIsAbsent) return -1;
      if (!aIsAbsent && bIsAbsent) return 1;
      return 0;
    });
  }, [searchQuery]);

  const handleClassSelect = (cls: typeof classAttendance[0]) => {
    setSelectedClass(cls);
  };

  const handleBack = () => {
    if (selectedClass) {
      setSelectedClass(null);
      setSearchQuery('');
      setIsSearching(false);
    } else {
      onBack();
    }
  };

  return (
    <div key={selectedClass ? `class-${selectedClass.id}` : 'overview'} ref={containerRef} className="pb-8 bg-[#f4f4f5] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={handleBack}
          className="p-1 -ml-1 text-[#1e3a8a] active:scale-90 transition-transform"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a] tracking-wide truncate">
          {selectedClass ? selectedClass.name : 'Điểm danh hôm nay'}
        </h1>
      </div>

      {!selectedClass ? (
        <>
          {/* Summary Card */}
          <div className="px-4 pt-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-[#1e3a8a]" />
                <h2 className="text-[16px] font-bold text-[#1e3a8a] tracking-wide uppercase">Tổng quan học sinh</h2>
              </div>
              
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="w-32 h-32 relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={true}
                      >
                        {studentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-[#1e3a8a]">{percentage}%</span>
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Hiện diện</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2.5">
                  {studentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-[12px] font-medium text-gray-500">{item.name}</span>
                      </div>
                      <span className="text-[13px] font-bold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[12px] font-bold text-gray-400 uppercase">Tổng số</span>
                    <span className="text-[13px] font-black text-[#1e3a8a]">{total}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Grade Attendance Section */}
          <div className="px-4 py-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <BarChart2 size={18} className="text-[#1e3a8a]" />
                <h2 className="text-[16px] font-bold text-[#1e3a8a] tracking-wide uppercase">Điểm danh theo khối</h2>
              </div>
              
              <div className="space-y-5">
                {gradeData.map((grade, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-[13px] font-bold text-gray-700">{grade.name}</span>
                      <div className="text-right">
                        <span className="text-[14px] font-black text-[#1e3a8a]">{grade.percentage}%</span>
                        <span className="text-[10px] text-gray-400 font-bold ml-1.5 tracking-tighter">
                          ({grade.present}/{grade.total})
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <motion.div 
                        className="h-full bg-[#1e3a8a] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${grade.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1e3a8a]"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Tỷ lệ hiện diện</span>
                </div>
                <span className="text-[11px] font-bold text-[#1e3a8a] italic">Cập nhật: 08:10 AM</span>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="px-4 space-y-4">
            <div className="flex items-center justify-between px-1 relative">
              <h2 className="text-[16px] font-bold text-[#1e3a8a] tracking-wide uppercase">Chi tiết theo lớp</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    // Toggle search mode or just focus if we had a global search
                    // For now, let's just make it look like the user can search
                    // If they click search, we could show a global search input
                    setIsSearching(!isSearching);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-sm transition-colors ${
                    isSearching ? 'bg-[#1e3a8a] text-white' : 'bg-white text-gray-400'
                  }`}
                >
                  <Search size={16} />
                </button>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-sm transition-colors ${
                    gradeFilter ? 'bg-[#1e3a8a] text-white' : 'bg-white text-gray-400'
                  }`}
                >
                  <Filter size={16} />
                </button>
              </div>

              {showFilters && (
                <div className="absolute top-10 right-0 z-40 bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-40 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1 mb-1">Lọc theo khối</div>
                  <button 
                    onClick={() => { setGradeFilter(null); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium ${!gradeFilter ? 'bg-blue-50 text-[#1e3a8a]' : 'text-gray-600'}`}
                  >
                    Tất cả
                  </button>
                  {gradeData.map(g => (
                    <button 
                      key={g.name}
                      onClick={() => { setGradeFilter(g.name); setShowFilters(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium ${gradeFilter === g.name ? 'bg-blue-50 text-[#1e3a8a]' : 'text-gray-600'}`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isSearching && !selectedClass && (
              <div className="relative animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 px-3 py-2">
                  <Search size={14} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Tìm nhanh lớp..." 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-[13px]"
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div className="grid gap-3">
              {filteredClasses.map((cls) => (
                <button 
                  key={cls.id} 
                  onClick={() => handleClassSelect(cls)}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-transparent active:scale-[0.98] transition-all flex items-center justify-between text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      cls.status === 'good' ? 'bg-emerald-50 text-emerald-600' : 
                      cls.status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {cls.status === 'good' ? <CheckCircle2 size={20} /> : 
                       cls.status === 'warning' ? <AlertCircle size={20} /> : <XCircle size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-[15px]">{cls.name}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Sĩ số: {cls.total}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[18px] font-black text-[#1e3a8a] leading-none">
                      {cls.present}<span className="text-[12px] text-gray-300 font-bold">/{cls.total}</span>
                    </div>
                    <div className={`text-[10px] font-bold uppercase mt-1 tracking-tighter ${
                      cls.status === 'good' ? 'text-emerald-500' : 
                      cls.status === 'warning' ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {cls.status === 'good' ? 'Đủ sĩ số' : 
                       cls.status === 'warning' ? `Vắng ${cls.total - cls.present}` : 
                       `Vắng nhiều (${cls.total - cls.present})`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 pt-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className={`flex items-center bg-white rounded-2xl shadow-sm border transition-all ${isSearching ? 'border-[#1e3a8a] ring-2 ring-blue-50' : 'border-transparent'}`}>
              <div className="pl-4 text-gray-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm tên học sinh..." 
                className="w-full bg-transparent border-none focus:ring-0 px-3 py-3.5 text-[14px] font-medium text-gray-700 placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="pr-4 text-gray-300 hover:text-gray-500"
                >
                  <XCircle size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Student List Header */}
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[16px] font-bold text-[#1e3a8a] tracking-wide uppercase">Danh sách học sinh</h2>
            <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredStudents.length} học sinh
            </span>
          </div>

          {/* Student List */}
          <div className="grid gap-3 pb-10">
            {filteredStudents.map((student) => (
              <div 
                key={student.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    student.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 
                    student.status === 'absent_excused' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-[14px]">{student.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <Clock size={12} />
                      <span>{student.time}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                    student.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 
                    student.status === 'absent_excused' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {student.status === 'present' ? 'Có mặt' : 
                     student.status === 'absent_excused' ? 'Vắng phép' : 'Vắng K.Phép'}
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="py-20 text-center space-y-2">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search size={32} />
                </div>
                <p className="text-gray-400 text-[14px] font-medium">Không tìm thấy học sinh nào</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


