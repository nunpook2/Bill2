
import React from 'react';

interface Props {
  tableNumber: number;
}

const BillDineIn: React.FC<Props> = ({ tableNumber }) => {
  return (
    <div className="bill-box border-[1.5pt] border-blue-900 bg-white rounded-lg relative overflow-hidden shadow-sm flex flex-col h-full">
      {/* Background Watermark - slightly more visible but still subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <div className="text-7xl font-extrabold text-blue-900 -rotate-45 uppercase tracking-widest">DINE-IN</div>
      </div>

      {/* Header */}
      <div className="text-center mb-1 z-10 p-3 pb-0">
        <h1 className="text-[20px] font-extrabold text-blue-950 leading-tight">ร้านผัดไทยโบราณหญิงเรือง</h1>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] bg-blue-900 text-white px-3 py-1 rounded font-bold tracking-wide">ทานที่ร้าน</span>
          <span className="text-[18px] font-black text-blue-950 border-b-[2pt] border-blue-950 px-3">โต๊ะที่: {tableNumber}</span>
        </div>
      </div>

      {/* Blank Writing Area with Sharp Dotted Lines */}
      <div className="flex-grow flex flex-col px-3 z-10 overflow-hidden mt-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-b border-dotted border-blue-300 h-7"></div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto p-3 pt-1 border-t-[1pt] border-blue-200 flex justify-between items-end z-10 bg-white">
        <div className="text-[10px] text-gray-500 font-medium italic">ขอบคุณที่แวะมาทานนะคะ</div>
        <div className="text-right">
          <div className="text-[14px] font-bold text-blue-950 bg-blue-50 px-3 py-1.5 rounded-md border-[1pt] border-blue-200">
            ยอดรวม: ................... บาท
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDineIn;
