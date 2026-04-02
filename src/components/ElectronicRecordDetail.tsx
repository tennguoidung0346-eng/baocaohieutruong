import { useState } from 'react';
import { ChevronLeft, FileText, User, Clock, CheckCircle2, Calendar, AlertCircle, Search, Filter, X, ArrowRightCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ElectronicRecordDetailProps {
  onBack: () => void;
}

const records = [
  {
    id: 1,
    bookName: 'Sổ đăng bộ khối 10 - Năm học 2025-2026',
    signerName: 'Nguyễn Thị Minh Thu',
    signerPosition: 'Văn thư',
    submissionTime: '08:30 AM - Hôm nay',
    isToday: true,
    status: 'pending',
    workflow: [
      { name: 'Nguyễn Thị Minh Thu', position: 'Văn thư', status: 'completed', time: '08:30 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Sở Giáo dục', position: 'Cơ quan quản lý', status: 'next', time: '' }
    ]
  },
  {
    id: 2,
    bookName: 'Sổ gọi tên và ghi điểm - Lớp 12A1',
    signerName: 'Trần Văn Hùng',
    signerPosition: 'Giáo viên chủ nhiệm',
    submissionTime: '09:15 AM - Hôm nay',
    isToday: true,
    status: 'pending',
    workflow: [
      { name: 'Trần Văn Hùng', position: 'GVCN', status: 'completed', time: '09:15 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Lưu trữ', position: 'Văn phòng', status: 'next', time: '' }
    ]
  },
  {
    id: 3,
    bookName: 'Hồ sơ giáo dục đối với học sinh khuyết tật',
    signerName: 'Lê Thị Lan',
    signerPosition: 'Giáo viên bộ môn',
    submissionTime: '10:05 AM - Hôm nay',
    isToday: true,
    status: 'pending',
    workflow: [
      { name: 'Lê Thị Lan', position: 'GV Bộ môn', status: 'completed', time: '10:05 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Phụ huynh', position: 'Xác nhận', status: 'next', time: '' }
    ]
  },
  {
    id: 4,
    bookName: 'Sổ theo dõi và đánh giá học sinh - Khối 11',
    signerName: 'Phạm Văn Đức',
    signerPosition: 'Phó hiệu trưởng',
    submissionTime: '02:30 PM - Hôm qua',
    isToday: false,
    status: 'pending',
    workflow: [
      { name: 'Phạm Văn Đức', position: 'Phó hiệu trưởng', status: 'completed', time: '02:30 PM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Văn phòng', position: 'Lưu trữ', status: 'next', time: '' }
    ]
  },
  {
    id: 5,
    bookName: 'Kế hoạch giáo dục của nhà trường',
    signerName: 'Nguyễn Văn An',
    signerPosition: 'Tổ trưởng chuyên môn',
    submissionTime: '11:20 AM - 30/03/2026',
    isToday: false,
    status: 'pending',
    workflow: [
      { name: 'Nguyễn Văn An', position: 'Tổ trưởng', status: 'completed', time: '11:20 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Hội đồng trường', position: 'Phê duyệt', status: 'next', time: '' }
    ]
  },
  {
    id: 6,
    bookName: 'Sổ quản lý cấp phát văn bằng, chứng chỉ',
    signerName: 'Đặng Thị Bình',
    signerPosition: 'Văn thư',
    submissionTime: '04:45 PM - 29/03/2026',
    isToday: false,
    status: 'pending',
    workflow: [
      { name: 'Đặng Thị Bình', position: 'Văn thư', status: 'completed', time: '04:45 PM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'current', time: '' },
      { name: 'Sở Giáo dục', position: 'Báo cáo', status: 'next', time: '' }
    ]
  }
];

const signedRecords = [
  {
    id: 101,
    bookName: 'Sổ nghị quyết của nhà trường - Tháng 3',
    signerName: 'Hiệu trưởng',
    signerPosition: 'Đã ký duyệt',
    submissionTime: 'Đã ký: 31/03/2026',
    status: 'completed',
    workflow: [
      { name: 'Thư ký hội đồng', position: 'Thư ký', status: 'completed', time: '08:00 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'completed', time: '02:00 PM' }
    ]
  },
  {
    id: 102,
    bookName: 'Báo cáo tài chính quý 1',
    signerName: 'Hiệu trưởng',
    signerPosition: 'Đã ký duyệt',
    submissionTime: 'Đã ký: 30/03/2026',
    status: 'completed',
    workflow: [
      { name: 'Kế toán trưởng', position: 'Kế toán', status: 'completed', time: '09:00 AM' },
      { name: 'Hiệu trưởng', position: 'Hiệu trưởng', status: 'completed', time: '11:30 AM' }
    ]
  }
];

const RecordCard = ({ record, onViewDetail, isSigned = false, showDot = false }: { record: any, onViewDetail: (record: any) => void, isSigned?: boolean, showDot?: boolean }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 active:scale-[0.98] transition-all hover:shadow-md">
    <div className="flex items-start gap-3">
      <div className="relative shrink-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSigned ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
          <FileText size={20} />
        </div>
        {showDot && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
          {record.bookName}
        </h3>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-gray-600">
            <User size={14} className="text-gray-400" />
            <span className="text-[12px] font-medium">
              <span className="text-gray-900">{record.signerName}</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500 italic">{record.signerPosition}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock size={14} className="text-gray-400" />
            <span className="text-[11px] font-medium">{record.submissionTime}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
      <div className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${isSigned ? 'text-emerald-600' : 'text-amber-600'}`}>
        {isSigned ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
        {isSigned ? 'Đã ký duyệt' : 'Chờ ký duyệt'}
      </div>
      <button 
        onClick={() => onViewDetail(record)}
        className="px-4 py-1.5 bg-[#1e3a8a] text-white text-[12px] font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
      >
        Xem chi tiết
      </button>
    </div>
  </div>
);

export default function ElectronicRecordDetail({ onBack }: ElectronicRecordDetailProps) {
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['today']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const filteredRecords = records.filter(r => 
    r.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSignedRecords = signedRecords.filter(r => 
    r.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayRecords = filteredRecords.filter(r => r.isToday);
  const weekRecords = filteredRecords.filter(r => !r.isToday);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const SectionHeader = ({ id, title, count, colorClass, bgColorClass }: { id: string, title: string, count: number, colorClass: string, bgColorClass: string }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="flex items-center gap-2 px-1 w-full text-left"
    >
      <div className={`w-1.5 h-4 ${colorClass} rounded-full`}></div>
      <h2 className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-wide">{title}</h2>
      <span className={`ml-auto ${bgColorClass} ${colorClass.replace('bg-', 'text-')} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
        {count}
      </span>
      <motion.div
        animate={{ rotate: expandedSections.includes(id) ? 180 : 0 }}
        className="text-gray-400"
      >
        <ChevronLeft size={16} className="-rotate-90" />
      </motion.div>
    </button>
  );

  return (
    <div className="pb-8 bg-[#f8fafc] min-h-screen relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        {!isSearching ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <h1 className="text-[18px] font-bold text-[#1e3a8a]">Hồ sơ điện tử</h1>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsSearching(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
              <Search size={18} className="text-gray-400" />
              <input 
                autoFocus
                type="text"
                placeholder="Tìm kiếm tên hồ sơ..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
            <button 
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
              className="text-sm font-bold text-[#1e3a8a]"
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-red-500 shadow-sm">
            <div className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1">Cần ký hôm nay</div>
            <div className="text-2xl font-bold text-red-600">{todayRecords.length} <span className="text-sm font-medium text-gray-400">hồ sơ</span></div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
            <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Trong tuần này</div>
            <div className="text-2xl font-bold text-gray-900">{records.length} <span className="text-sm font-medium text-gray-400">hồ sơ</span></div>
          </div>
        </div>

        {/* Today Section */}
        <div className="space-y-3">
          <SectionHeader id="today" title="Cần ký hôm nay" count={todayRecords.length} colorClass="bg-red-500" bgColorClass="bg-red-100" />
          <AnimatePresence initial={false}>
            {expandedSections.includes('today') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pt-1">
                  {todayRecords.map(record => (
                    <div key={record.id}>
                      <RecordCard record={record} onViewDetail={setSelectedRecord} showDot={true} />
                    </div>
                  ))}
                  {todayRecords.length === 0 && searchQuery && (
                    <div className="text-center py-4 text-gray-400 text-sm italic">Không tìm thấy hồ sơ phù hợp</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* This Week Section */}
        <div className="space-y-3">
          <SectionHeader id="week" title="Trong tuần này" count={weekRecords.length} colorClass="bg-indigo-500" bgColorClass="bg-indigo-100" />
          <AnimatePresence initial={false}>
            {expandedSections.includes('week') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pt-1">
                  {weekRecords.map(record => (
                    <div key={record.id}>
                      <RecordCard record={record} onViewDetail={setSelectedRecord} />
                    </div>
                  ))}
                  {weekRecords.length === 0 && searchQuery && (
                    <div className="text-center py-4 text-gray-400 text-sm italic">Không tìm thấy hồ sơ phù hợp</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Signed Section */}
        <div className="space-y-3">
          <SectionHeader id="signed" title="Hồ sơ đã ký duyệt" count={filteredSignedRecords.length} colorClass="bg-emerald-500" bgColorClass="bg-emerald-100" />
          <AnimatePresence initial={false}>
            {expandedSections.includes('signed') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pt-1">
                  {filteredSignedRecords.map(record => (
                    <div key={record.id}>
                      <RecordCard record={record} onViewDetail={setSelectedRecord} isSigned={true} />
                    </div>
                  ))}
                  {filteredSignedRecords.length === 0 && searchQuery && (
                    <div className="text-center py-4 text-gray-400 text-sm italic">Không tìm thấy hồ sơ phù hợp</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 mt-4">
          <Info className="text-blue-600 shrink-0" size={20} />
          <p className="text-[13px] text-blue-800 font-medium leading-relaxed">
            Thầy cô vui lòng xem và ký duyệt hồ sơ trên trang <span className="font-bold underline">hoccungai.vn</span> mục hồ sơ diện tử.
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[32px] z-[101] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1e3a8a]">Chi tiết quy trình ký</h2>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-tight">
                  {selectedRecord.bookName}
                </h3>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
                  <Clock size={14} />
                  Trình ký lúc: {selectedRecord.submissionTime}
                </div>
              </div>

              {/* Workflow Diagram */}
              <div className="space-y-0 mb-8 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100"></div>
                
                {selectedRecord.workflow.map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      step.status === 'current' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                       step.status === 'current' ? <User size={20} /> : 
                       <Clock size={20} />}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[14px] font-bold ${
                          step.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {step.name}
                        </span>
                        {step.time && <span className="text-[11px] text-gray-400 font-medium">{step.time}</span>}
                      </div>
                      <div className="text-[12px] text-gray-500 font-medium italic">
                        {step.position}
                      </div>
                      {step.status === 'current' && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wider">
                          <ArrowRightCircle size={12} />
                          Bước hiện tại
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notice in Modal */}
              <div className={`${selectedRecord.status === 'completed' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'} border rounded-2xl p-4 flex gap-3 mb-6`}>
                <Info className={`${selectedRecord.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'} shrink-0`} size={20} />
                <p className={`text-[13px] ${selectedRecord.status === 'completed' ? 'text-emerald-800' : 'text-amber-800'} font-medium leading-relaxed`}>
                  {selectedRecord.status === 'completed' 
                    ? "Hồ sơ đã hoàn thành ký duyệt và được lưu trữ tại mục Hồ sơ điện tử"
                    : <>Thầy cô vui lòng xem và ký duyệt hồ sơ trên trang <span className="font-bold underline">hoccungai.vn</span> mục hồ sơ diện tử.</>
                  }
                </p>
              </div>

              <button 
                onClick={() => setSelectedRecord(null)}
                className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl active:scale-[0.98] transition-transform"
              >
                Đóng
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
