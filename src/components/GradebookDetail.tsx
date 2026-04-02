import { useState } from 'react';
import { ChevronLeft, Calendar, Users, AlertTriangle, TrendingUp, TrendingDown, BookOpen, UserCheck, UserX, Award, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface GradebookDetailProps {
  onBack: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // Xuất sắc, Tốt, Hoàn thành, Chưa hoàn thành

const overallStats = [
  { name: 'Xuất sắc', value: 450, percentage: 30 },
  { name: 'Tốt', value: 600, percentage: 40 },
  { name: 'Hoàn thành', value: 375, percentage: 25 },
  { name: 'Chưa hoàn thành', value: 75, percentage: 5 },
];

const gradeData = [
  { 
    id: 1,
    name: 'Khối 10', 
    total: 500,
    stats: [
      { label: 'Xuất sắc', value: 150, color: 'bg-emerald-500' },
      { label: 'Tốt', value: 200, color: 'bg-blue-500' },
      { label: 'Hoàn thành', value: 130, color: 'bg-amber-500' },
      { label: 'Chưa HT', value: 20, color: 'bg-red-500' }
    ],
    warnings: [
      { id: 2, class: '10A5', subject: 'Vật lý', issue: 'Điểm trung bình giảm so với kỳ trước', teacher: 'Cô Trần Thị B' }
    ]
  },
  { 
    id: 2,
    name: 'Khối 11', 
    total: 500,
    stats: [
      { label: 'Xuất sắc', value: 160, color: 'bg-emerald-500' },
      { label: 'Tốt', value: 210, color: 'bg-blue-500' },
      { label: 'Hoàn thành', value: 110, color: 'bg-amber-500' },
      { label: 'Chưa HT', value: 20, color: 'bg-red-500' }
    ],
    warnings: [
      { id: 3, class: '11A3', subject: 'Hóa học', issue: 'Chưa nhập đủ điểm giữa kỳ', teacher: 'Thầy Lê Văn C' }
    ]
  },
  { 
    id: 3,
    name: 'Khối 12', 
    total: 500,
    stats: [
      { label: 'Xuất sắc', value: 140, color: 'bg-emerald-500' },
      { label: 'Tốt', value: 190, color: 'bg-blue-500' },
      { label: 'Hoàn thành', value: 135, color: 'bg-amber-500' },
      { label: 'Chưa HT', value: 35, color: 'bg-red-500' }
    ],
    warnings: [
      { id: 1, class: '12A1', subject: 'Toán', issue: 'Tỷ lệ chưa hoàn thành cao (15%)', teacher: 'Thầy Nguyễn Văn A' }
    ]
  },
];

const teacherPerformance = [
  { id: 1, name: 'Cô Phạm Thị D', subject: 'Ngữ văn', status: 'excellent', description: '100% học sinh hoàn thành tốt' },
  { id: 2, name: 'Thầy Hoàng Văn E', subject: 'Tiếng Anh', status: 'good', description: 'Tỷ lệ khá giỏi tăng 10%' },
  { id: 3, name: 'Cô Vũ Thị F', subject: 'Lịch sử', status: 'needs_improvement', description: 'Nhiều học sinh điểm dưới trung bình' },
];

export default function GradebookDetail({ onBack }: GradebookDetailProps) {
  const totalStudents = overallStats.reduce((acc, curr) => acc + curr.value, 0);
  const [expandedGrades, setExpandedGrades] = useState<number[]>([]);

  const toggleGrade = (id: number) => {
    setExpandedGrades(prev => 
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-8 bg-[#f4f4f5] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1 text-[#1e3a8a]">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a]">Sổ ghi điểm</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Period */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Thời điểm hiện tại</div>
            <div className="text-[14px] font-bold text-[#1e3a8a]">Đợt nhập điểm giữa học kỳ 2</div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 size={18} className="text-[#1e3a8a]" />
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Tổng quan học lực</h2>
          </div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-[120px] h-[120px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={true}
                  >
                    {overallStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#1e3a8a' }}
                    formatter={(value: number, name: string, props: any) => [`${value} (${props.payload.percentage}%)`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Tổng</span>
                <span className="text-[18px] font-bold text-[#1e3a8a] leading-none mt-0.5">{totalStudents}</span>
              </div>
            </div>

            <div className="flex-1 pl-4 space-y-2.5">
              {overallStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{stat.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-bold text-gray-900">{stat.value}</span>
                    <span className="text-[10px] font-bold text-gray-500 w-7 text-right">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Class Situation */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-[#1e3a8a]" />
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Tình hình theo khối lớp</h2>
          </div>

          {/* Common Legend */}
          <div className="flex items-center justify-between gap-2 mb-5 px-1">
            {gradeData[0].stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                <span className="text-[10px] font-bold text-gray-600 uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            {gradeData.map((grade) => {
              const isExpanded = expandedGrades.includes(grade.id);
              
              return (
                <div key={grade.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => toggleGrade(grade.id)}
                    className="w-full p-4 flex flex-col gap-2 bg-gray-50/30 hover:bg-gray-50/80 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-bold text-gray-900">{grade.name}</h3>
                        <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{grade.total} học sinh</span>
                      </div>
                      {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                    </div>
                    
                    {/* Summary when collapsed */}
                    {!isExpanded && (
                      <div className="flex items-center justify-between w-full mt-1">
                        <div className="flex items-center gap-3">
                          {grade.stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${stat.color}`} />
                              <span className="text-[11px] font-bold text-gray-700">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                        {grade.warnings.length > 0 && (
                          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-600">
                            <AlertTriangle size={10} />
                            <span className="text-[10px] font-bold">{grade.warnings.length}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 bg-gray-50/30 border-t border-gray-100">
                          {/* Vertical Bar Chart */}
                          <div className="flex items-end justify-around h-32 mt-4 mb-2 px-2">
                            {grade.stats.map((stat, idx) => {
                              const maxVal = Math.max(...grade.stats.map(s => s.value));
                              const heightPercent = maxVal > 0 ? (stat.value / maxVal) * 100 : 0;
                              const realPercent = Math.round((stat.value / grade.total) * 100);
                              return (
                                <div key={idx} className="flex flex-col items-center gap-1.5 w-14">
                                  <span className="text-[10px] font-bold text-gray-500">{realPercent}%</span>
                                  <div className="w-10 h-20 bg-gray-100 rounded-t-md flex items-end overflow-hidden">
                                    <motion.div 
                                      className={`w-full rounded-t-md ${stat.color}`} 
                                      initial={{ height: 0 }}
                                      animate={{ height: `${heightPercent}%` }}
                                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                    />
                                  </div>
                                  <span className="text-[12px] font-bold text-gray-900">{stat.value}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Warnings for this grade */}
                        {grade.warnings.length > 0 && (
                          <div className="p-3 bg-red-50/50 border-t border-red-100">
                            <div className="flex items-center gap-1.5 mb-2">
                              <AlertTriangle size={12} className="text-red-500" />
                              <span className="text-[10px] font-bold text-red-600 uppercase">Cảnh báo</span>
                            </div>
                            <div className="space-y-2">
                              {grade.warnings.map(warning => (
                                <div key={warning.id} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                  <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="text-[12px] font-bold text-gray-900">Lớp {warning.class}</span>
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white text-gray-600 rounded-md border border-red-100">{warning.subject}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-700">{warning.issue}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Teacher Performance */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-[#1e3a8a]" />
            <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Hiệu suất giáo viên</h2>
          </div>
          
          <div className="space-y-3">
            {teacherPerformance.map(teacher => (
              <div key={teacher.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  teacher.status === 'excellent' ? 'bg-emerald-100 text-emerald-600' :
                  teacher.status === 'good' ? 'bg-blue-100 text-blue-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {teacher.status === 'excellent' ? <TrendingUp size={20} /> :
                   teacher.status === 'good' ? <UserCheck size={20} /> :
                   <TrendingDown size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-[13px] font-bold text-gray-900 truncate">{teacher.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      teacher.status === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                      teacher.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {teacher.status === 'excellent' ? 'Xuất sắc' :
                       teacher.status === 'good' ? 'Tốt' :
                       'Cần cải thiện'}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-500 mb-1">{teacher.subject}</div>
                  <p className="text-[12px] text-gray-700">{teacher.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
