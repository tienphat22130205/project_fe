const container = 'max-w-7xl mx-auto px-6';

export const veThamQuanStyles = {
  container,

  //Trang
  page: {
    root: 'bg-white min-h-screen',
  },

  //Đầu trang
  hero: {
    section: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16',
    headingWrap: 'text-center mb-8',
    title: 'text-4xl md:text-5xl font-bold mb-4',
    subtitle: 'text-xl text-blue-100',
    searchPanel:
      'bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 max-w-4xl mx-auto border-2 border-gray-400',
    searchRow: 'flex gap-4',
    fieldWrap: 'relative flex-1',
    icon: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400',
    input:
      'w-full pl-12 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900',
    button:
      'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center gap-2 shadow-lg',
  },

  //Lọc danh mục
  categoryFilter: {
    section: `${container} py-8 mt-12`,
    header: 'flex items-center gap-2 mb-4',
    title: 'font-semibold text-gray-900',
    chips: 'flex flex-wrap gap-3',
    chipBase: 'px-4 py-2 rounded-lg font-medium transition flex items-center gap-2',
    chipActive: 'bg-blue-600 text-white shadow-md',
    chipInactive: 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-400',
  },

  //Địa điểm nổi bật
  popular: {
    section: 'bg-white py-16',
    title: 'text-3xl font-bold text-center text-gray-900 mb-12',
    grid: 'grid md:grid-cols-5 gap-4',
    card:
      'bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center text-white cursor-pointer shadow-lg',
    iconWrap: 'flex justify-center mb-2',
    name: 'font-bold text-lg',
  },

  //Danh sách vé
  grid: {
    section: `${container} py-8`,
    headingWrap: 'mb-6',
    title: 'text-3xl font-bold text-gray-900 mb-2',
    subtitle: 'text-gray-600',
    cards: 'grid md:grid-cols-2 lg:grid-cols-4 gap-6',
    card: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group',
    imageWrap: 'relative h-48 overflow-hidden',
    image: 'w-full h-full object-cover',
    badge: 'absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold',
    overlay: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3',
    overlayRow: 'flex items-center gap-1 text-white text-sm',
    body: 'p-4',
    cardTitle: 'font-bold text-base text-gray-900 mb-2 line-clamp-2 min-h-[3rem]',
    metaRow: 'flex items-center gap-3 mb-3',
    priceRow: 'flex items-baseline justify-between pt-3 border-t border-gray-100',
    action:
      'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-1',
  },

  //Đặt vé
  modal: {
    overlay: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4',
    panel: 'bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl',
    header: 'flex justify-between items-start gap-4 mb-4',
    close: 'text-gray-400 hover:text-gray-600 transition',
    formBox: 'rounded-xl border border-gray-100 bg-gray-50 p-4',
    grid: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
    label: 'text-xs text-gray-500 mb-1 block',
    input:
      'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
    actions: 'flex gap-3 mt-4',
    cancel: 'flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition',
    confirm: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition',
  },

  //Lợi ích
  benefits: {
    section: 'bg-white py-16',
    title: 'text-3xl font-bold text-center text-gray-900 mb-12',
    grid: 'grid md:grid-cols-4 gap-6',
    card: 'text-center p-6 rounded-xl bg-white shadow-sm',
    iconWrap: 'flex justify-center mb-4',
    icon: 'text-4xl text-blue-600',
    itemTitle: 'font-bold text-lg text-gray-900 mb-2',
    itemDesc: 'text-gray-600 text-sm',
  },
} as const;
