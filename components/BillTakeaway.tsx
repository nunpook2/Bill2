
import React from 'react';

interface Props {
  billNumber: string;
}

const BillTakeaway: React.FC<Props> = ({ billNumber }) => {
  return (
    <div className="bill-box border-[1.5pt] border-red-700 bg-white rounded-lg relative overflow-hidden flex flex-col gap-0 shadow-sm h-full">
      
      {/* TOP SECTION: CUSTOMER COPY (Ticket) */}
      <div className="flex-shrink-0 h-[28%] border-b-[2pt] border-dashed border-red-500 p-3 relative bg-red-50/70">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[16px] font-extrabold text-red-950 leading-tight">ผัดไทยโบราณหญิงเรือง</h2>
            <div className="inline-block mt-1 bg-red-700 text-white text-[11px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide">
              บัตรคิวลูกค้า
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-red-600 font-bold uppercase tracking-tighter leading-none">Ticket No.</div>
            <div className="text-[32px] font-black text-red-800 leading-none">#{billNumber}</div>
          </div>
        </div>
        <div className="absolute bottom-1 w-full text-center left-0">
          <span className="text-[10px] text-red-400 font-bold tracking-widest">-----------------✂️ ตัดให้ลูกค้า ✂️-----------------</span>
        </div>
      </div>

      {/* BOTTOM SECTION: KITCHEN COPY (Order Sheet) */}
      <div className="flex-grow p-3 pb-2 flex flex-col bg-white overflow-hidden">
        <div className="flex justify-between items-center mb-1 pb-1 border-b-[1pt] border-red-100">
          <span className="text-[12px] font-extrabold text-red-950 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full shadow-sm"></span> ใบสั่ง (กลับบ้าน)
          </span>
          <span className="text-[20px] font-black text-red-800">ลำดับ: #{billNumber}</span>
        </div>

        {/* Blank Writing Area with Sharp Dotted Lines */}
        <div className="flex-grow flex flex-col overflow-hidden mt-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="border-b border-dotted border-red-200 h-6"></div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-auto flex justify-between items-end border-t-[1pt] border-red-100 pt-2">
           <div className="text-[10px] font-medium text-gray-500">หมายเหตุ: ..............................</div>
           <div className="text-[14px] font-bold text-red-950 bg-red-50 px-3 py-1 rounded-md border-[1pt] border-red-100 shadow-sm">
             รวม: ............ บ.
           </div>
        </div>
      </div>
    </div>
  );
};

export default BillTakeaway;
