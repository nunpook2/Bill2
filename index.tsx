
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// --- Types ---
enum BillType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY'
}

interface BillConfig {
  type: BillType;
  startTable: number;
  totalTables: number;
  startBillNumber: number;
  count: number;
}

// --- Icons ---
const UtensilsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const PrinterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

// --- Sub-components ---
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
        <div key={i} className="border-b border-dotted border-blue-300 h-[26px]"></div>
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
    {/* Customer Part */}
    <div className="h-[28%] bg-red-50/70 border-b-[2pt] border-dashed border-red-500 p-3 relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[16px] font-extrabold text-red-950 leading-tight">ผัดไทยโบราณหญิงเรือง</h2>
          <span className="text-[11px] bg-red-700 text-white px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wide">บัตรคิวลูกค้า</span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-red-600 font-black uppercase leading-none tracking-tighter">QUEUE NO.</div>
          <div className="text-[32px] font-black text-red-800 leading-none tracking-tight">#{billNumber}</div>
        </div>
      </div>
      <div className="absolute bottom-1 w-full text-center left-0">
        <span className="text-[10px] text-red-400 font-black tracking-widest">-----------------✂️ ตัดให้ลูกค้า ✂️-----------------</span>
      </div>
    </div>
    {/* Kitchen Part */}
    <div className="flex-grow p-3 flex flex-col bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-1 pb-1 border-b-[1.2pt] border-red-100">
        <span className="text-[12px] font-extrabold text-red-950 flex items-center gap-1.5 uppercase">
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full shadow-sm"></span> ใบสั่ง (กลับบ้าน)
        </span>
        <span className="text-[20px] font-black text-red-800">คิว: #{billNumber}</span>
      </div>
      <div className="flex-grow flex flex-col">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-b border-dotted border-red-200 h-[22px]"></div>
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

// --- Main App ---
const App: React.FC = () => {
  const [config, setConfig] = useState<BillConfig>({
    type: BillType.TAKEAWAY,
    startTable: 1,
    totalTables: 10,
    startBillNumber: 1,
    count: 120,
  });

  const bills = useMemo(() => {
    const items = [];
    if (config.type === BillType.DINE_IN) {
      for (let i = 0; i < config.count; i++) {
        const tableIdx = (i % config.totalTables) + config.startTable;
        items.push({ id: `dine-${i}`, val: tableIdx });
      }
    } else {
      for (let i = 0; i < config.count; i++) {
        const billNo = config.startBillNumber + i;
        items.push({ id: `takeaway-${i}`, val: billNo.toString().padStart(3, '0') });
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

  const handleNextBatch = () => {
    setConfig(prev => ({
      ...prev,
      startBillNumber: prev.startBillNumber + prev.count
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const endBillNumber = config.startBillNumber + config.count - 1;

  return (
    <div className="min-h-screen">
      {/* Header UI */}
      <header className="no-print bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-red-700 text-white p-2.5 rounded-xl shadow-lg"><UtensilsIcon /></div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">ระบบบิลร้านหญิงเรือง</h1>
              <p className="text-[11px] text-gray-500 font-extrabold uppercase tracking-[0.2em]">High Quality Bill Generator</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
              <button
                onClick={() => setConfig({ ...config, type: BillType.DINE_IN })}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-black ${config.type === BillType.DINE_IN ? 'bg-blue-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <UtensilsIcon /> ทานที่ร้าน
              </button>
              <button
                onClick={() => setConfig({ ...config, type: BillType.TAKEAWAY })}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-black ${config.type === BillType.TAKEAWAY ? 'bg-red-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ShoppingBagIcon /> กลับบ้าน
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white border-2 border-gray-200 px-4 py-2 rounded-xl shadow-sm focus-within:border-blue-500 transition-colors">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">จำนวน:</label>
              <input
                type="number"
                min="6"
                step="6"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 6 })}
                className="w-20 focus:outline-none text-base font-black text-gray-800"
              />
              <span className="text-[11px] font-bold text-gray-400">ใบ</span>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-3 px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-extrabold shadow-xl hover:shadow-2xl transition-all active:scale-95 text-base border-2 border-transparent hover:border-gray-800"
            >
              <PrinterIcon /> สั่งพิมพ์
            </button>
          </div>
        </div>

        {config.type === BillType.TAKEAWAY && (
          <div className="max-w-6xl mx-auto mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                <label className="text-[11px] font-black text-red-900 uppercase">เริ่มเลขคิวที่:</label>
                <input
                    type="number"
                    value={config.startBillNumber}
                    onChange={(e) => setConfig({ ...config, startBillNumber: parseInt(e.target.value) || 1 })}
                    className="w-24 border-b-2 border-red-200 bg-transparent focus:outline-none focus:border-red-600 text-xl font-black text-red-800 text-center"
                />
                </div>
                <div className="text-gray-600 font-bold text-sm">
                    ถึง <span className="text-red-700 font-black text-lg">{endBillNumber}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <p className="text-[12px] text-red-400 font-bold hidden md:block">
                  ({pages.length} หน้า)
                </p>
                <button 
                    onClick={handleNextBatch}
                    className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-red-100 text-red-700 hover:bg-red-50 hover:border-red-200 rounded-lg font-extrabold transition-all active:scale-95 shadow-sm"
                >
                    <span>ชุดถัดไป</span>
                    <span className="text-[10px] bg-red-100 px-1.5 py-0.5 rounded text-red-800">
                        {endBillNumber + 1} - {endBillNumber + config.count}
                    </span>
                    <ArrowRightIcon />
                </button>
            </div>
          </div>
        )}
      </header>

      {/* Print View */}
      <main className="py-8 bg-gray-100 no-print:px-4">
        {pages.map((pageBills, pageIdx) => (
          <div key={pageIdx} className="a4-container page-break shadow-2xl mb-12 relative">
            <div className="bill-grid">
              {pageBills.map((bill: any) => (
                <div key={bill.id}>
                  {config.type === BillType.DINE_IN ? (
                    <BillDineIn tableNumber={bill.val} />
                  ) : (
                    <BillTakeaway billNumber={bill.val} />
                  )}
                </div>
              ))}
              {/* Fill empty slots */}
              {pageBills.length < 6 && [...Array(6 - pageBills.length)].map((_, i) => (
                <div key={`empty-${i}`} className="bill-box border-dashed border-gray-300 opacity-30 flex items-center justify-center">
                  <span className="text-gray-400 font-black text-xs uppercase tracking-widest">ว่าง</span>
                </div>
              ))}
            </div>
            {/* Page info in preview only */}
            <div className="no-print absolute -top-8 left-0 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              A4 Page {pageIdx + 1} / {pages.length}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

// Render
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
