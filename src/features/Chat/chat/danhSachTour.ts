export type Tour = {
  id: string;
  title: string;
  destination: string; // ví dụ: "Đà Nẵng", "Phú Quốc"
  region: 'trong_nuoc' | 'ngoai_nuoc';
  durationText: string; // ví dụ: "3N2Đ"
  days: number;
  nights: number;
  priceFromVnd: number;
  imageUrl?: string;
  highlights: string[];
  itinerary: Array<{ day: string; title: string; details: string[] }>;
  includes: string[];
  excludes: string[];
  promoText?: string;
};

export const mockTours: Tour[] = [
  {
    id: 'dn-3n2d-01',
    title: 'Đà Nẵng – Hội An – Bà Nà Hills (3N2Đ)',
    destination: 'Đà Nẵng',
    region: 'trong_nuoc',
    durationText: '3N2Đ',
    days: 3,
    nights: 2,
    priceFromVnd: 4290000,
    promoText: 'Tặng vé phố cổ Hội An buổi tối',
    highlights: ['Check-in Cầu Vàng', 'Ăn đặc sản Hội An', 'Lịch trình nhẹ nhàng, dễ đi'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Đà Nẵng – Biển Mỹ Khê',
        details: ['Đón khách, nhận phòng', 'Tự do tắm biển Mỹ Khê', 'Gợi ý food tour hải sản'],
      },
      {
        day: 'Ngày 2',
        title: 'Bà Nà Hills – Cầu Vàng',
        details: ['Tham quan Cầu Vàng', 'Vui chơi Fantasy Park', 'Trải nghiệm cáp treo'],
      },
      {
        day: 'Ngày 3',
        title: 'Hội An – Tiễn khách',
        details: ['Dạo phố cổ', 'Mua quà lưu niệm', 'Tiễn khách'],
      },
    ],
    includes: ['Xe đưa đón theo chương trình', 'Khách sạn 3* (2 đêm)', 'HDV', 'Bảo hiểm du lịch'],
    excludes: ['Chi phí cá nhân', 'Vé tham quan ngoài chương trình', 'VAT'],
  },
  {
    id: 'pq-4n3d-01',
    title: 'Phú Quốc nghỉ dưỡng + cano 4 đảo (4N3Đ)',
    destination: 'Phú Quốc',
    region: 'trong_nuoc',
    durationText: '4N3Đ',
    days: 4,
    nights: 3,
    priceFromVnd: 5690000,
    promoText: 'Giảm 300K/khách cho nhóm từ 4',
    highlights: ['Cano 4 đảo', 'Sunset Town', 'Resort gần biển'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Check-in Phú Quốc',
        details: ['Nhận phòng', 'Tự do khám phá chợ đêm'],
      },
      {
        day: 'Ngày 2',
        title: 'Cano 4 đảo – Lặn ngắm san hô',
        details: ['Hòn Móng Tay/Hòn Gầm Ghì', 'Ăn trưa trên đảo', 'Chụp ảnh sống ảo'],
      },
      {
        day: 'Ngày 3',
        title: 'Grand World – Sunset Town',
        details: ['Tham quan Grand World', 'Tự do café/ẩm thực', 'Ngắm hoàng hôn'],
      },
      {
        day: 'Ngày 4',
        title: 'Mua sắm – Tiễn khách',
        details: ['Mua quà đặc sản', 'Tiễn khách'],
      },
    ],
    includes: ['Xe đưa đón', 'Resort/KS 3–4*', 'Tour cano 4 đảo', 'Bảo hiểm'],
    excludes: ['Vé show (nếu có)', 'Chi phí cá nhân', 'VAT'],
  },
  {
    id: 'sapa-3n2d-01',
    title: 'Sa Pa – Fansipan – Bản Cát Cát (3N2Đ)',
    destination: 'Sa Pa',
    region: 'trong_nuoc',
    durationText: '3N2Đ',
    days: 3,
    nights: 2,
    priceFromVnd: 3590000,
    highlights: ['Chinh phục Fansipan', 'Khí hậu mát mẻ', 'Bản Cát Cát'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Lào Cai – Sa Pa',
        details: ['Di chuyển, nhận phòng', 'Dạo nhà thờ đá'],
      },
      {
        day: 'Ngày 2',
        title: 'Fansipan – Cát Cát',
        details: ['Cáp treo Fansipan', 'Tham quan bản Cát Cát', 'Thưởng thức đặc sản'],
      },
      {
        day: 'Ngày 3',
        title: 'Chợ Sa Pa – về',
        details: ['Mua sắm', 'Trở về'],
      },
    ],
    includes: ['Xe/giường nằm (tuỳ gói)', 'KS 2–3*', 'HDV', 'Bảo hiểm'],
    excludes: ['Vé cáp treo Fansipan', 'Chi phí cá nhân', 'VAT'],
  },
  {
    id: 'thai-5n4d-01',
    title: 'Bangkok – Pattaya (5N4Đ) | Bay thẳng',
    destination: 'Thái Lan',
    region: 'ngoai_nuoc',
    durationText: '5N4Đ',
    days: 5,
    nights: 4,
    priceFromVnd: 8990000,
    promoText: 'Tặng vé show đặc sắc (số lượng có hạn)',
    highlights: ['Bay thẳng, dễ đi', 'Chợ đêm + ẩm thực', 'Check-in landmark nổi tiếng'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Bangkok – nhận phòng',
        details: ['Bay thẳng', 'Tự do khám phá'],
      },
      {
        day: 'Ngày 2',
        title: 'Pattaya – biển và phố',
        details: ['Tham quan điểm nổi bật', 'Tự do mua sắm'],
      },
      {
        day: 'Ngày 3',
        title: 'Bangkok – chùa/landmark',
        details: ['Tham quan chùa nổi tiếng', 'Ăn uống, café'],
      },
      {
        day: 'Ngày 4',
        title: 'Free day',
        details: ['Tự do theo nhu cầu'],
      },
      {
        day: 'Ngày 5',
        title: 'Tiễn khách',
        details: ['Mua quà', 'Bay về'],
      },
    ],
    includes: ['Vé máy bay khứ hồi', 'KS 3–4*', 'HDV', 'Bảo hiểm'],
    excludes: ['Hộ chiếu/visa (nếu cần)', 'Chi phí cá nhân', 'Tip'],
  },
  {
    id: 'jp-6n5d-01',
    title: 'Nhật Bản mùa đẹp: Tokyo – Fuji – Kyoto (6N5Đ)',
    destination: 'Nhật Bản',
    region: 'ngoai_nuoc',
    durationText: '6N5Đ',
    days: 6,
    nights: 5,
    priceFromVnd: 27990000,
    highlights: ['Trải nghiệm tàu nhanh', 'Ngắm núi Phú Sĩ', 'Kyoto cổ kính'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Tokyo',
        details: ['Bay đến Tokyo', 'Nghỉ ngơi'],
      },
      {
        day: 'Ngày 2',
        title: 'Tokyo city tour',
        details: ['Tham quan khu trung tâm', 'Mua sắm'],
      },
      {
        day: 'Ngày 3',
        title: 'Fuji – Hồ – Onsen',
        details: ['Check-in Phú Sĩ (tuỳ thời tiết)', 'Trải nghiệm onsen'],
      },
      {
        day: 'Ngày 4',
        title: 'Kyoto',
        details: ['Di chuyển Kyoto', 'Tham quan điểm nổi bật'],
      },
      {
        day: 'Ngày 5',
        title: 'Kyoto – Osaka',
        details: ['Ẩm thực', 'Tự do'],
      },
      {
        day: 'Ngày 6',
        title: 'Bay về',
        details: ['Tiễn khách'],
      },
    ],
    includes: ['Vé máy bay', 'Khách sạn', 'Di chuyển nội địa', 'Bảo hiểm'],
    excludes: ['Visa', 'Chi phí cá nhân', 'Tip'],
  },
];

export function formatVnd(amount: number) {
  try {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  } catch {
    return amount.toString() + '₫';
  }
}
