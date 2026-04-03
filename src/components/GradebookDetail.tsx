import { useState } from 'react';
import { ChevronLeft, Calendar, Users, AlertTriangle, TrendingUp, TrendingDown, BookOpen, UserCheck, UserX, Award, BarChart2, ChevronDown, ChevronUp, Clock, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface GradebookDetailProps {
  onBack: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // Xuất sắc, Tốt, Hoàn thành, Chưa hoàn thành

const PERIODS = ['Giữa HKI', 'Cuối HKI', 'Giữa HKII', 'Cuối năm'];

const mockDataByPeriod: Record<string, any> = {
  'Giữa HKI': {
    type: 'intermediate',
    subjectEvaluation: [
      { subject: 'Toán', htt: 45, ht: 40, cht: 15 },
      { subject: 'Tiếng Việt', htt: 50, ht: 45, cht: 5 },
      { subject: 'Tiếng Anh', htt: 30, ht: 50, cht: 20 },
      { subject: 'Tự nhiên và Xã hội', htt: 40, ht: 45, cht: 15 },
      { subject: 'Đạo đức', htt: 35, ht: 55, cht: 10 },
    ],
    entryProgress: [
      { 
        id: 1, grade: 'Khối 1', subjectMissing: 2, competenceMissing: 5, 
        missingClasses: [
          { className: '1A1', missingSubjects: ['Toán'], missingPCNL: true },
          { className: '1A2', missingSubjects: [], missingPCNL: true },
          { className: '1A3', missingSubjects: ['Tiếng Việt'], missingPCNL: true },
          { className: '1A4', missingSubjects: [], missingPCNL: true },
          { className: '1A5', missingSubjects: [], missingPCNL: true }
        ] 
      },
      { 
        id: 2, grade: 'Khối 2', subjectMissing: 0, competenceMissing: 3, 
        missingClasses: [
          { className: '2A2', missingSubjects: [], missingPCNL: true },
          { className: '2A4', missingSubjects: [], missingPCNL: true },
          { className: '2A5', missingSubjects: [], missingPCNL: true }
        ] 
      },
      { 
        id: 3, grade: 'Khối 3', subjectMissing: 1, competenceMissing: 1, 
        missingClasses: [
          { className: '3A1', missingSubjects: ['Tự nhiên và Xã hội'], missingPCNL: true }
        ] 
      },
    ],
    attentionNeeded: {
      studentsToSupport: [
        { name: 'Nguyễn Văn A', class: '1A1', reason: 'Điểm Toán, Tiếng Việt dưới trung bình' },
        { name: 'Trần Thị B', class: '2A2', reason: 'Nghỉ học nhiều, hổng kiến thức' }
      ],
      outstandingStudents: [
        { name: 'Lê Hoàng C', class: '3A1', achievement: 'Đạt giải Nhất HSG cấp Tỉnh' }
      ],
      subjectsToWatch: [
        { subject: 'Tiếng Anh 1', issue: 'Tỷ lệ chưa hoàn thành cao (20%)' }
      ]
    }
  },
  'Cuối HKI': {
    type: 'intermediate',
    subjectEvaluation: [
      { subject: 'Toán', htt: 55, ht: 35, cht: 10 },
      { subject: 'Tiếng Việt', htt: 60, ht: 35, cht: 5 },
      { subject: 'Tiếng Anh', htt: 40, ht: 45, cht: 15 },
      { subject: 'Khoa học', htt: 50, ht: 40, cht: 10 },
      { subject: 'Lịch sử và Địa lý', htt: 45, ht: 50, cht: 5 },
    ],
    entryProgress: [
      { 
        id: 1, grade: 'Khối 4', subjectMissing: 0, competenceMissing: 1, 
        missingClasses: [
          { className: '4A5', missingSubjects: [], missingPCNL: true }
        ] 
      },
      { id: 2, grade: 'Khối 5', subjectMissing: 0, competenceMissing: 0, missingClasses: [] },
      { id: 3, grade: 'Khối 1', subjectMissing: 0, competenceMissing: 0, missingClasses: [] },
    ],
    attentionNeeded: {
      studentsToSupport: [
        { name: 'Phạm Văn D', class: '4A3', reason: 'Chưa hoàn thành môn Tiếng Anh' },
        { name: 'Nguyễn Thị L', class: '5A2', reason: 'Điểm trung bình các môn giảm sút' },
        { name: 'Lê Hoàng M', class: '1A4', reason: 'Thường xuyên không nộp bài tập' }
      ],
      outstandingStudents: [
        { name: 'Vũ Thị E', class: '4A1', achievement: 'Tiến bộ vượt bậc môn Toán' },
        { name: 'Trần Đức N', class: '5A1', achievement: 'Đạt điểm 10 môn Khoa học' }
      ],
      subjectsToWatch: [
        { subject: 'Khoa học 4', issue: 'Điểm trung bình giảm so với giữa kỳ' },
        { subject: 'Lịch sử và Địa lý 5', issue: 'Nhiều học sinh chưa hoàn thành bài kiểm tra' }
      ]
    }
  },
  'Giữa HKII': {
    type: 'intermediate',
    subjectEvaluation: [
      { subject: 'Toán', htt: 60, ht: 30, cht: 10 },
      { subject: 'Tiếng Việt', htt: 65, ht: 30, cht: 5 },
      { subject: 'Tiếng Anh', htt: 50, ht: 40, cht: 10 },
      { subject: 'Tự nhiên và Xã hội', htt: 55, ht: 35, cht: 10 },
      { subject: 'Đạo đức', htt: 50, ht: 45, cht: 5 },
    ],
    entryProgress: [
      { 
        id: 1, grade: 'Khối 1', subjectMissing: 3, competenceMissing: 4, 
        missingClasses: [
          { className: '1A1', missingSubjects: [], missingPCNL: true },
          { className: '1A2', missingSubjects: ['Toán', 'Tự nhiên và Xã hội'], missingPCNL: true },
          { className: '1A4', missingSubjects: ['Tiếng Việt'], missingPCNL: true },
          { className: '1A5', missingSubjects: ['Tiếng Anh', 'Đạo đức'], missingPCNL: true }
        ] 
      },
      { 
        id: 2, grade: 'Khối 2', subjectMissing: 1, competenceMissing: 2, 
        missingClasses: [
          { className: '2A1', missingSubjects: [], missingPCNL: true },
          { className: '2A3', missingSubjects: ['Toán'], missingPCNL: true }
        ] 
      },
      { 
        id: 3, grade: 'Khối 3', subjectMissing: 0, competenceMissing: 1, 
        missingClasses: [
          { className: '3A2', missingSubjects: [], missingPCNL: true }
        ] 
      },
    ],
    attentionNeeded: {
      studentsToSupport: [
        { name: 'Hoàng Văn F', class: '3A5', reason: 'Nguy cơ ở lại lớp môn Toán' },
        { name: 'Lê Thị H', class: '1A2', reason: 'Điểm kiểm tra các môn liên tục dưới 5' },
        { name: 'Trần Văn K', class: '2A3', reason: 'Thường xuyên vắng học không phép' },
        { name: 'Phạm Thu M', class: '1A5', reason: 'Kết quả học tập sa sút đột ngột' },
        { name: 'Nguyễn Hải N', class: '3A1', reason: 'Điểm thi thử môn Tiếng Anh thấp' }
      ],
      outstandingStudents: [
        { name: 'Ngô Thị G', class: '1A1', achievement: 'Đạt điểm tối đa 3 môn học' },
        { name: 'Bùi Văn P', class: '2A1', achievement: 'Đạt giải Nhất kỳ thi Vở sạch chữ đẹp' },
        { name: 'Đặng Thu Q', class: '3A2', achievement: 'Điểm trung bình các môn đạt 9.5' },
        { name: 'Lý Hải R', class: '1A3', achievement: 'Có tiến bộ vượt bậc trong học kỳ này' }
      ],
      subjectsToWatch: [
        { subject: 'Đạo đức 3', issue: 'Nhiều học sinh điểm dưới trung bình' },
        { subject: 'Tiếng Anh 1', issue: 'Tỷ lệ chưa hoàn thành tăng 15% so với kỳ trước' },
        { subject: 'Tự nhiên và Xã hội 2', issue: 'Phổ điểm tập trung ở mức 5-6, ít điểm giỏi' }
      ]
    }
  },
  'Cuối năm': {
    type: 'final',
    overallStats: [
      { name: 'Xuất sắc', value: 500, percentage: 33 },
      { name: 'Tốt', value: 650, percentage: 43 },
      { name: 'Hoàn thành', value: 300, percentage: 20 },
      { name: 'Chưa hoàn thành', value: 50, percentage: 4 },
    ],
    gradeData: [
      { 
        id: 1, name: 'Khối 1', total: 500,
        stats: [
          { label: 'Xuất sắc', value: 170, color: 'bg-emerald-500' },
          { label: 'Tốt', value: 220, color: 'bg-blue-500' },
          { label: 'Hoàn thành', value: 100, color: 'bg-amber-500' },
          { label: 'Chưa HT', value: 10, color: 'bg-red-500' }
        ],
        warnings: []
      },
      { 
        id: 2, name: 'Khối 2', total: 500,
        stats: [
          { label: 'Xuất sắc', value: 180, color: 'bg-emerald-500' },
          { label: 'Tốt', value: 230, color: 'bg-blue-500' },
          { label: 'Hoàn thành', value: 80, color: 'bg-amber-500' },
          { label: 'Chưa HT', value: 10, color: 'bg-red-500' }
        ],
        warnings: []
      },
      { 
        id: 3, name: 'Khối 3', total: 500,
        stats: [
          { label: 'Xuất sắc', value: 150, color: 'bg-emerald-500' },
          { label: 'Tốt', value: 200, color: 'bg-blue-500' },
          { label: 'Hoàn thành', value: 120, color: 'bg-amber-500' },
          { label: 'Chưa HT', value: 30, color: 'bg-red-500' }
        ],
        warnings: []
      },
    ],
    teacherPerformance: [
      { id: 1, name: 'Cô Phạm Thị D', subject: 'Tiếng Việt', status: 'excellent', description: '100% học sinh hoàn thành tốt' },
      { id: 2, name: 'Thầy Hoàng Văn E', subject: 'Tiếng Anh', status: 'excellent', description: 'Thành tích xuất sắc' },
    ]
  }
};

export default function GradebookDetail({ onBack }: GradebookDetailProps) {
  const [currentPeriod, setCurrentPeriod] = useState('Giữa HKII');
  const [expandedGrades, setExpandedGrades] = useState<number[]>([]);
  const [expandedProgress, setExpandedProgress] = useState<number[]>([]);

  const periodData = mockDataByPeriod[currentPeriod];
  const isFinal = periodData.type === 'final';

  const toggleGrade = (id: number) => {
    setExpandedGrades(prev => 
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    );
  };

  const toggleProgress = (id: number) => {
    setExpandedProgress(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-8 bg-[#f4f4f5] min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 py-3.5 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1 text-[#1e3a8a]">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a]">Sổ ghi điểm Tiểu học (Thông tư 27)</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Period */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-[11px] font-bold text-[#1e3a8a] uppercase tracking-wide">Thời điểm hiện tại</div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1e3a8a] text-[12px] font-bold px-2.5 py-1 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                {currentPeriod.toUpperCase()}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5 shrink-0">
            <div className="text-[10px] font-extrabold text-amber-600/80 uppercase tracking-wider mb-0.5">Đợt tiếp theo</div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-amber-600" />
              <span className="text-[12px] font-bold text-amber-700">Còn 27 ngày</span>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="grid grid-cols-4 gap-2">
          {PERIODS.map(period => (
            <button
              key={period}
              onClick={() => setCurrentPeriod(period)}
              className={`py-2.5 px-1 rounded-xl text-[11px] font-bold text-center transition-colors ${
                currentPeriod === period 
                  ? 'bg-[#1e3a8a] text-white shadow-md' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {isFinal ? (
          <>
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
                        data={periodData.overallStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={55}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={true}
                      >
                        {periodData.overallStats.map((entry: any, index: number) => (
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
                    <span className="text-[18px] font-bold text-[#1e3a8a] leading-none mt-0.5">
                      {periodData.overallStats.reduce((acc: number, curr: any) => acc + curr.value, 0)}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pl-4 space-y-2.5">
                  {periodData.overallStats.map((stat: any, index: number) => (
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
                {periodData.gradeData[0].stats.map((stat: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                    <span className="text-[10px] font-bold text-gray-600 uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {periodData.gradeData.map((grade: any) => {
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
                              {grade.stats.map((stat: any, idx: number) => (
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
                                {grade.stats.map((stat: any, idx: number) => {
                                  const maxVal = Math.max(...grade.stats.map((s: any) => s.value));
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
                                  {grade.warnings.map((warning: any) => (
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
                {periodData.teacherPerformance.map((teacher: any) => (
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
          </>
        ) : (
          <>
            {/* Intermediate Period Content */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-[#1e3a8a]" />
                <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Tiến độ nhập điểm, đánh giá</h2>
              </div>
              
              <div className="space-y-3">
                {periodData.entryProgress.map((progress: any) => {
                  const isExpanded = expandedProgress.includes(progress.id);
                  const hasMissing = progress.subjectMissing > 0 || progress.competenceMissing > 0;
                  
                  return (
                    <div key={progress.id} className="border border-gray-100 rounded-xl bg-gray-50/50 overflow-hidden">
                      <button 
                        onClick={() => hasMissing && toggleProgress(progress.id)}
                        className={`w-full flex items-center justify-between p-3 ${hasMissing ? 'cursor-pointer hover:bg-gray-100/50' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-gray-900">{progress.grade}</span>
                          {hasMissing && (
                            isExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex gap-3">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-500">Môn học</span>
                            <span className={`text-[12px] font-bold ${progress.subjectMissing > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                              {progress.subjectMissing > 0 ? `Thiếu ${progress.subjectMissing} lớp` : 'Đã xong'}
                            </span>
                          </div>
                          <div className="w-px bg-gray-200"></div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-500">PCNL</span>
                            <span className={`text-[12px] font-bold ${progress.competenceMissing > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                              {progress.competenceMissing > 0 ? `Thiếu ${progress.competenceMissing} lớp` : 'Đã xong'}
                            </span>
                          </div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && hasMissing && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 bg-white border-t border-gray-100 space-y-3">
                              {progress.missingClasses.map((cls: any, idx: number) => (
                                <div key={idx} className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                  <div className="font-bold text-[12px] text-gray-900 mb-1.5">Lớp {cls.className}</div>
                                  <div className="space-y-1.5">
                                    {cls.missingSubjects.length > 0 && (
                                      <div className="flex items-start gap-2">
                                        <span className="text-[11px] text-gray-500 w-16 shrink-0">Môn học:</span>
                                        <div className="flex flex-wrap gap-1">
                                          {cls.missingSubjects.map((sub: string, sIdx: number) => (
                                            <span key={sIdx} className="text-[10px] font-medium px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">
                                              {sub}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    {cls.missingPCNL && (
                                      <div className="flex items-start gap-2">
                                        <span className="text-[11px] text-gray-500 w-16 shrink-0">PCNL:</span>
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">
                                          Chưa nhập
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={18} className="text-[#1e3a8a]" />
                <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">Thống kê đánh giá môn học</h2>
              </div>

              {/* Common Legend */}
              <div className="flex items-center gap-4 mb-5 px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Hoàn thành Tốt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Hoàn thành</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Chưa hoàn thành</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {periodData.subjectEvaluation.map((subject: any, idx: number) => {
                  const total = subject.htt + subject.ht + subject.cht;
                  const httPct = Math.round((subject.htt / total) * 100);
                  const htPct = Math.round((subject.ht / total) * 100);
                  const chtPct = Math.round((subject.cht / total) * 100);
                  
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-bold text-gray-900">{subject.subject}</span>
                        <span className="text-[11px] font-medium text-gray-500">{total} HS</span>
                      </div>
                      <div className="h-2.5 flex rounded-full overflow-hidden bg-gray-100">
                        <div style={{ width: `${httPct}%` }} className="bg-blue-500" title={`Hoàn thành tốt: ${subject.htt}`} />
                        <div style={{ width: `${htPct}%` }} className="bg-emerald-400" title={`Hoàn thành: ${subject.ht}`} />
                        <div style={{ width: `${chtPct}%` }} className="bg-amber-400" title={`Chưa hoàn thành: ${subject.cht}`} />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold px-1">
                        <span className="text-blue-600">{httPct}%</span>
                        <span className="text-emerald-600">{htPct}%</span>
                        <span className="text-amber-600">{chtPct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 text-center">
                <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 hover:underline">
                  Xem tất cả các môn
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
