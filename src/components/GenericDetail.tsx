import { ChevronLeft, BarChart2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface GenericDetailProps {
  onBack: () => void;
  data: any;
}

const chartData = [
  { name: 'T2', value: 400 },
  { name: 'T3', value: 300 },
  { name: 'T4', value: 550 },
  { name: 'T5', value: 200 },
  { name: 'T6', value: 450 },
  { name: 'T7', value: 150 },
  { name: 'CN', value: 100 },
];

const listItems = [
  { id: 1, title: 'Báo cáo tổng kết tuần 3', date: 'Hôm nay, 09:30', status: 'Chờ duyệt' },
  { id: 2, title: 'Kế hoạch giảng dạy khối 10', date: 'Hôm qua, 14:15', status: 'Đã duyệt' },
  { id: 3, title: 'Đề xuất mua sắm thiết bị', date: '28/05/2026', status: 'Cần bổ sung' },
  { id: 4, title: 'Danh sách khen thưởng tháng 5', date: '27/05/2026', status: 'Đã duyệt' },
  { id: 5, title: 'Báo cáo hoạt động ngoại khóa', date: '25/05/2026', status: 'Đã duyệt' },
];

export default function GenericDetail({ onBack, data }: GenericDetailProps) {
  const title = data?.title || 'Chi tiết';

  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1e3a8a]">{title}</h1>
      </div>

      {/* Summary Metrics */}
      <div className="px-4 py-6 bg-white shadow-sm mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100">
            <div className="flex items-center gap-2 text-teal-700 mb-2">
              <BarChart2 size={16} />
              <span className="text-xs font-medium uppercase">Tổng cộng</span>
            </div>
            <div className="text-2xl font-bold text-teal-900">2,150</div>
            <div className="text-xs text-teal-600 font-medium mt-1 flex items-center gap-1">
              +12% với tuần trước
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-700 mb-2">
              <Calendar size={16} />
              <span className="text-xs font-medium uppercase">Hôm nay</span>
            </div>
            <div className="text-2xl font-bold text-indigo-900">145</div>
            <div className="text-xs font-medium mt-1 flex items-center gap-1">
              <TrendingDown size={12} className="text-red-600" />
              <span className="text-red-600">20 lượt</span>
              <span className="text-indigo-600">với hôm qua</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="bg-white px-4 py-6 mb-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Thống kê trong tuần</h2>
        <motion.div 
          className="h-64 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* List Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Danh sách chi tiết</h2>
          <button className="text-xs font-medium text-teal-600 hover:text-teal-700">Xem tất cả</button>
        </div>

        <div className="space-y-3">
          {listItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  item.status === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'Đã duyệt' ? 'bg-teal-100 text-teal-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
