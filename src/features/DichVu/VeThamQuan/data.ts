import type { IconType } from 'react-icons';
import {
  FaBullseye,
  FaTicketAlt,
  FaLandmark,
  FaTree,
  FaBook,
  FaBolt,
  FaDollarSign,
  FaExchangeAlt,
  FaComments,
} from 'react-icons/fa';

export type Category = {
  id: string;
  name: string;
  icon: IconType;
};

export type Ticket = {
  id: number;
  title: string;
  location: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
};

export type BenefitItem = {
  title: string;
  desc: string;
  icon: IconType;
};

export const categories: Category[] = [
  { id: 'all', name: 'Tất cả', icon: FaBullseye },
  { id: 'sunworld', name: 'Sun World', icon: FaTicketAlt },
  { id: 'vinwonders', name: 'VinWonders', icon: FaTicketAlt },
  { id: 'museum', name: 'Bảo tàng', icon: FaLandmark },
  { id: 'nature', name: 'Thiên nhiên', icon: FaTree },
  { id: 'culture', name: 'Văn hóa', icon: FaBook },
];

export const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Vé Sun World Ba Na Hills - Cầu Vàng',
    location: 'Đà Nẵng',
    category: 'sunworld',
    price: 850000,
    originalPrice: 1000000,
    rating: 4.8,
    reviews: 1245,
    image: '/back1.jpg',
    badge: 'Bán chạy',
  },
  {
    id: 2,
    title: 'Vé VinWonders Nha Trang',
    location: 'Nha Trang',
    category: 'vinwonders',
    price: 650000,
    originalPrice: 800000,
    rating: 4.7,
    reviews: 892,
    image: '/back2.jpg',
    badge: 'Giảm 19%',
  },
  {
    id: 3,
    title: 'Vé Sun World Fansipan Legend',
    location: 'Sapa',
    category: 'sunworld',
    price: 750000,
    originalPrice: 900000,
    rating: 4.9,
    reviews: 567,
    image: '/back3.jpg',
    badge: 'Hot',
  },
  {
    id: 4,
    title: 'Vé VinWonders Phú Quốc',
    location: 'Phú Quốc',
    category: 'vinwonders',
    price: 950000,
    originalPrice: 1200000,
    rating: 4.8,
    reviews: 1034,
    image: '/back4.jpg',
    badge: 'Giảm 21%',
  },
  {
    id: 5,
    title: 'Vé Sun World Halong Complex',
    location: 'Hạ Long',
    category: 'sunworld',
    price: 550000,
    originalPrice: 700000,
    rating: 4.6,
    reviews: 678,
    image: '/back5.jpg',
    badge: 'Ưu đãi',
  },
  {
    id: 6,
    title: 'Vé Bảo tàng Lịch sử Việt Nam',
    location: 'Hà Nội',
    category: 'museum',
    price: 40000,
    originalPrice: 50000,
    rating: 4.5,
    reviews: 234,
    image: '/back6.jpg',
    badge: null,
  },
  {
    id: 7,
    title: 'Vé Tham Quan Văn Miếu Quốc Tử Giám',
    location: 'Hà Nội',
    category: 'culture',
    price: 30000,
    originalPrice: 30000,
    rating: 4.7,
    reviews: 456,
    image: '/back7.jpg',
    badge: null,
  },
  {
    id: 8,
    title: 'Vé VinWonders Nam Hội An',
    location: 'Hội An',
    category: 'vinwonders',
    price: 750000,
    originalPrice: 900000,
    rating: 4.6,
    reviews: 345,
    image: '/back8.jpg',
    badge: 'Mới',
  },
];

export const popularLocations = ['Hạ Long', 'Đà Nẵng', 'Nha Trang', 'Đà Lạt', 'Phú Quốc'];

export const onlineBenefits: BenefitItem[] = [
  { title: 'Không xếp hàng', desc: 'Nhận vé ngay, không cần chờ đợi', icon: FaBolt },
  { title: 'Giá ưu đãi', desc: 'Nhiều chương trình khuyến mãi hấp dẫn', icon: FaDollarSign },
  { title: 'Đổi trả dễ dàng', desc: 'Chính sách đổi trả linh hoạt', icon: FaExchangeAlt },
  { title: 'Hỗ trợ 24/7', desc: 'Tư vấn và hỗ trợ mọi lúc', icon: FaComments },
];
