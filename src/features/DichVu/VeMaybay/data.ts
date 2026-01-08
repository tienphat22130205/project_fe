import type { IconType } from 'react-icons';
import { FaDollarSign, FaLock, FaComments, FaExchangeAlt } from 'react-icons/fa';

export type Flight = {
  id: number;
  airline: string;
  flightNo: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  price: number;
  seats: string;
  aircraft: string;
};

export type BenefitItem = {
  title: string;
  desc: string;
  icon: IconType;
};

export const flights: Flight[] = [
  {
    id: 1,
    airline: 'Vietnam Airlines',
    flightNo: 'VN 201',
    from: 'TP.HCM (SGN)',
    to: 'Hà Nội (HAN)',
    departTime: '06:00',
    arriveTime: '08:15',
    duration: '2h15m',
    price: 2350000,
    seats: 'Còn 8 chỗ',
    aircraft: 'Airbus A321',
  },
  {
    id: 2,
    airline: 'VietJet Air',
    flightNo: 'VJ 301',
    from: 'TP.HCM (SGN)',
    to: 'Hà Nội (HAN)',
    departTime: '08:30',
    arriveTime: '10:45',
    duration: '2h15m',
    price: 1890000,
    seats: 'Còn 12 chỗ',
    aircraft: 'Airbus A320',
  },
  {
    id: 3,
    airline: 'Bamboo Airways',
    flightNo: 'QH 101',
    from: 'TP.HCM (SGN)',
    to: 'Hà Nội (HAN)',
    departTime: '10:00',
    arriveTime: '12:15',
    duration: '2h15m',
    price: 2150000,
    seats: 'Còn 5 chỗ',
    aircraft: 'Airbus A321',
  },
  {
    id: 4,
    airline: 'Vietnam Airlines',
    flightNo: 'VN 203',
    from: 'TP.HCM (SGN)',
    to: 'Hà Nội (HAN)',
    departTime: '14:00',
    arriveTime: '16:15',
    duration: '2h15m',
    price: 2450000,
    seats: 'Còn 15 chỗ',
    aircraft: 'Boeing 787',
  },
  {
    id: 5,
    airline: 'VietJet Air',
    flightNo: 'VJ 303',
    from: 'TP.HCM (SGN)',
    to: 'Hà Nội (HAN)',
    departTime: '18:00',
    arriveTime: '20:15',
    duration: '2h15m',
    price: 1990000,
    seats: 'Còn 20 chỗ',
    aircraft: 'Airbus A320',
  },
];

export const flightBenefits: BenefitItem[] = [
  { title: 'Giá tốt nhất', desc: 'So sánh giá từ nhiều hãng hàng không', icon: FaDollarSign },
  { title: 'Thanh toán an toàn', desc: 'Bảo mật thông tin thanh toán', icon: FaLock },
  { title: 'Hỗ trợ 24/7', desc: 'Tư vấn và hỗ trợ mọi lúc mọi nơi', icon: FaComments },
  { title: 'Đổi trả linh hoạt', desc: 'Chính sách đổi trả vé linh hoạt', icon: FaExchangeAlt },
];
