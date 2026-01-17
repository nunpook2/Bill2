
export enum BillType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY'
}

export interface BillConfig {
  type: BillType;
  startTable: number;
  totalTables: number;
  startBillNumber: number;
  count: number;
}
