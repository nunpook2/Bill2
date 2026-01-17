
import React, { useState, useMemo } from 'react';
import { BillType, BillConfig } from './types';
import { UtensilsIcon, ShoppingBagIcon, PrinterIcon } from './components/Icons';

// Inline simple components for stability if they fail to load from components/
const BillDineIn: React.FC<{ tableNumber: number }> = ({ tableNumber }) => (
  <div className="bill-box border-[1.5pt] border-blue-900 bg-white rounded-lg relative overflow-hidden shadow-sm flex flex-col h-full">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
      <div className="text-7xl font-black text-blue-900 -rotate-45 uppercase tracking-widest">DINE-IN</div>
    </div>
    <div className="text-center border-b-[1.5pt] border-blue-100 p-3 pb-1 mb-1 z-10">
      <h1 className="text-[20px] font-extrabold text-blue-950 leading-tight">ร้านผัดไทยโบราณหญิงเรือง</h1>
      <div className="flex justify-between items-center mt-2">
        <span className="text-[11px] bg-blue-900 text-white px-3 py-1 rounded font-extrabold tracking-wide uppercase">ทานที่ร้าน</span>
        <span className="text-[20px] font-black text-blue-950 border-b-[2pt] border-blue-950 px-3">โต๊ะที่: {tableNumber}</span>
      </div>
    </div>
    <div className="flex-grow flex flex-col px-3 z-10">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border-b border-dotted border-blue-300 h-[30px]"></div>
      ))}
    </div>
    <div className="mt-auto pt-1 border-t-[1.2pt] border-blue-200 flex justify-between items-end p-3 z-10 bg-white">
      <div className="text-[10px] text-gray-500 font-bold italic">ขอบคุณที่ใช้บริการค่ะ</div>
      <div className="text-right">
        <div className="text-[14px] font-extrabold text-blue-950 bg-blue-50 px-3 py-1.5 rounded-md border-[1pt] border-blue-200">
          ยอดรวม: ................... บาท
        </div>
      </div>
    </div>
  </div>
);

const BillTakeaway: React.FC<{ billNumber: string }> = ({ billNumber }) => (
  <div className="bill-box border-[1.5pt] border-red-700 bg-white rounded-lg relative overflow-hidden flex flex-col gap-0 shadow-sm h-full">
    <div className="h-[28%] bg-red-50/70 border-b-[2pt] border-dashed border-red-500 p-3 relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[16px] font-extrabold text-red-950 leading-tight">ผัดไทยโบราณหญิงเรือง</h2>
          <span className="text-[11px] bg-red-700 text-white px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wide">บัตรคิวลูกค้า</span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-red-600 font-black uppercase leading-none tracking-tighter">QUEUE NO.</div>
          <div className="text-[34px] font-black text-red-800 leading-none">#{billNumber}</div>
        </div>
      </div>
      <div className="absolute bottom-1 w-full text-center left-0">
        <span className="text-[10px] text-red-400 font-black tracking-widest">-----------------✂️ ตัดให้ลูกค้า ✂️-----------------</span>
      </div>
    </div>
    <div className="flex-grow p-3 flex flex-col bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-1 pb-1 border-b-[1.2pt] border-red-100">
        <span className="text-[12px] font-extrabold text-red-950 flex items-center gap-1.5 uppercase">
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full shadow-sm"></span> ใบสั่ง (กลับบ้าน)
        </span>
        <span className="text-[22px] font-black text-red-800">คิว: #{billNumber}</span>
      </div>
      <div className="flex-grow flex flex-col">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-b border-dotted border-red-200 h-[24px]"></div>
        ))}
      </div>
      <div className="mt-auto flex justify-between items-end border-t-[1pt] border-red-100 pt-2">
        <div className="text-[10px] font-bold text-gray-500">หมายเหตุ: .........................</div>
        <div className="text-[14px] font-extrabold text-red-950 bg-red-50 px-3 py-1.5 rounded-md border-[1pt] border-red-100 shadow-sm">
          รวม: ............ บ.
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [config, setConfig] = useState<BillConfig>({
    type: BillType.TAKEAWAY,
    startTable: 1,
    totalTables: 10,
    startBillNumber: 1,
    count: 120, // Set to 120 as per user request
  });

  const handlePrint = () => {
    window.print();
  };

  const bills = useMemo(() => {
    const items = [];
    if (config.type === BillType.DINE_IN) {
      for (let i = 0; i < config.count; i++) {
        const tableIdx = (i % config.totalTables) + config.startTable;
        items.push({ id: `dine-${i}`, table: tableIdx });
      }
    } else {
      for (let i = 0; i < config.count; i++) {
        const billNo = config.startBillNumber + i;
        items.push({ id: `takeaway-${i}`, billNo: billNo.toString().padStart(3, '0') });
      }
    }
    return items;
  }, [config]);

  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < bills.length; i += 6) {
      p.push(bills.slice(i, i + 6));
    }
    return p;
  }, [bills]);

  return (
    <div className="min-h-screen pb-10">
      <header className="no-print bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-red-700 text-white p-2.5 rounded-xl shadow-md">
              <UtensilsIcon />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">หญิงเรือง - พิมพ์บิล</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Pad Thai Order System</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-gray-100 p-1.5 rounded-xl shadow-inner border border-gray-200">
              <button
                onClick={() => setConfig({ ...config, type: BillType.DINE_IN })}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all font-black text-sm ${
                  config.type === BillType.DINE_IN ? 'bg-blue-700 text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <UtensilsIcon /> ทานที่ร้าน
              </button>
              <button
                onClick={() => setConfig({ ...config, type: BillType.TAKEAWAY })}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all font-black text-sm ${
                  config.type === BillType.TAKEAWAY ? 'bg-red-700 text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ShoppingBagIcon /> กลับบ้าน
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-gray-200 shadow-sm">
              <label className="text-[11px] font-black text-gray-400 uppercase">จำนวนบิล:</label>
              <input
                type="number"
                min="6"
                step="6"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 6 })}
                className="w-20 focus:outline-none text-base font-black text-gray-900"
              />
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-3 px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-black shadow-lg transition-all active:scale-95"
            >
              <PrinterIcon />
              <span>พิมพ์คิว 1 - {config.count}</span>
            </button>
          </div>
        </div>

        {config.type === BillType.TAKEAWAY && (
          <div className="max-w-5xl mx-auto mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
              <label className="text-[11px] font-black text-red-900 uppercase bg-red-100 px-3 py-1 rounded-md">เลขบิลเริ่มต้น:</label>
              <input
                type="number"
                min="1"
                value={config.startBillNumber}
                onChange={(e) => setConfig({ ...config, startBillNumber: parseInt(e.target.value) || 1 })}
                className="w-24 px-3 py-1.5 border-b-4 border-red-200 focus:border-red-600 text-xl font-black text-red-800 focus:outline-none bg-transparent"
              />
            </div>
            <p className="text-[12px] text-red-700 font-extrabold italic bg-red-50 px-4 py-2 rounded-lg border border-red-100">
              รองรับการพิมพ์ต่อเนื่อง {config.count} คิวต่อรอบ ({pages.length} หน้า A4)
            </p>
          </div>
        )}
      </header>

      <main className="mt-10">
        {pages.map((pageBills, pageIdx) => (
          <div key={pageIdx} className="a4-container page-break shadow-2xl relative">
            <div className="bill-grid">
              {pageBills.map((bill: any) => (
                <div key={bill.id}>
                  {config.type === BillType.DINE_IN ? (
                    <BillDineIn tableNumber={bill.table} />
                  ) : (
                    <BillTakeaway billNumber={bill.billNo} />
                  )}
                </div>
              ))}
              {pageBills.length < 6 && [...Array(6 - pageBills.length)].map((_, i) => (
                <div key={`empty-${i}`} className="bill-box border-[1pt] border-dashed border-gray-200 opacity-20 flex items-center justify-center">
                  <span className="text-gray-300 font-black uppercase tracking-widest text-[10px]">Slot {i + pageBills.length + 1}</span>
                </div>
              ))}
            </div>
            <div className="no-print absolute -top-8 left-0 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              A4 Page {pageIdx + 1}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
