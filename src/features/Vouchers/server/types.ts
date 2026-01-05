export interface Voucher {
  _id: string;
  code: string;
  name?: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount?: number;
  limitPerUser?: number;
  type?: string;
  trigger?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isUsed?: boolean;
}

export interface UserVoucher {
  _id: string;
  voucher: Voucher;
  assignedAt: string;
  isUsed: boolean;
}

export interface ApplyVoucherRequest {
  voucherCode: string;
  orderAmount: number;
}

export interface ApplyVoucherResponse {
  success: boolean;
  isValid?: boolean;
  voucher?: Voucher;
  discountAmount?: number | null;
  finalAmount?: number;
  message?: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
}
