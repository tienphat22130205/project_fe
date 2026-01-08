import type { IconType } from 'react-icons';
import {
  FaUmbrellaBeach,
  FaTicketAlt,
  FaUtensils,
  FaBus,
  FaShip,
  FaCar,
  FaDollarSign,
  FaLock,
  FaComments,
  FaAward,
} from 'react-icons/fa';

export type ComboCategory = {
  name: string;
  icon: IconType;
};

export type ComboItem = {
  id: number;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
};

export type WhyChooseItem = {
  title: string;
  desc: string;
  icon: IconType;
};

export const comboCategories: ComboCategory[] = [
  { name: 'Free & Easy', icon: FaUmbrellaBeach },
  { name: 'Vé tham quan', icon: FaTicketAlt },
  { name: 'Vé ẩm thực', icon: FaUtensils },
  { name: 'City tour', icon: FaBus },
  { name: 'Du thuyền', icon: FaShip },
  { name: 'Thuê xe', icon: FaCar },
];

export const comboItems: ComboItem[] = [
  {
    id: 1,
    title: 'Combo Hạ Long 2N1D - Khách sạn 4 sao + Du thuyền',
    location: 'Hạ Long',
    price: '6.990.000',
    rating: 4.6,
    reviews: 128,
    image: '/back1.jpg',
  },
  {
    id: 2,
    title: 'Combo Đà Nẵng 3N2D - Resort bãi biển + City tour',
    location: 'Đà Nẵng',
    price: '8.500.000',
    rating: 4.8,
    reviews: 95,
    image: '/back2.jpg',
  },
  {
    id: 3,
    title: 'Combo Nha Trang 2N1D - Khách sạn view biển + Spa',
    location: 'Nha Trang',
    price: '5.990.000',
    rating: 4.7,
    reviews: 156,
    image: '/back3.jpg',
  },
  {
    id: 4,
    title: 'Combo Phú Quốc 3N2D - Resort 5 sao + Vé tham quan',
    location: 'Phú Quốc',
    price: '12.990.000',
    rating: 4.9,
    reviews: 203,
    image: '/back4.jpg',
  },
  {
    id: 5,
    title: 'Combo Đà Lạt 2N1D - Khách sạn view núi + Tour hoa',
    location: 'Đà Lạt',
    price: '4.990.000',
    rating: 4.5,
    reviews: 87,
    image: '/back5.jpg',
  },
  {
    id: 6,
    title: 'Combo Sapa 2N1D - Homestay + Trekking + Ẩm thực',
    location: 'Sapa',
    price: '5.500.000',
    rating: 4.6,
    reviews: 112,
    image: '/back6.jpg',
  },
];

export const comboWhyChooseItems: WhyChooseItem[] = [
  { title: 'Giá tốt nhiều ưu đãi', desc: 'Ưu đãi và quà tặng hấp dẫn khi mua combo online', icon: FaDollarSign },
  { title: 'Thanh toán an toàn', desc: 'Được bảo mật bởi tổ chức quốc tế Global Sign', icon: FaLock },
  { title: 'Tư vấn miễn phí', desc: 'Hỗ trợ tư vấn online miễn phí 24/7', icon: FaComments },
  { title: 'Thương hiệu uy tín', desc: 'Thương hiệu lữ hành hàng đầu Việt Nam', icon: FaAward },
];
