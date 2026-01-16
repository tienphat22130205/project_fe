const container = 'max-w-7xl mx-auto px-6';

export const comboStyles = {
  container,

  //Trang
  page: {
    root: 'bg-white min-h-screen',
  },

  //Đầu trang
  hero: {
    section: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16',
    headingWrap: 'text-center mb-12',
    title: 'text-4xl md:text-5xl font-bold mb-4',
    subtitle: 'text-xl text-blue-100 max-w-2xl mx-auto',
    categoriesGrid: 'grid grid-cols-3 md:grid-cols-6 gap-4 mb-8',
    categoryItem:
      'bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition cursor-pointer border border-white/20',
    categoryIconWrap: 'flex justify-center mb-2',
    categoryName: 'text-sm font-medium',
    searchPanel:
      'bg-white rounded-2xl shadow-2xl p-6 md:p-7 -mb-12 relative z-10 border border-gray-200 max-w-4xl mx-auto',
    searchRow: 'flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch',
    fieldWrap: 'relative flex-1',
    fieldIcon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
    input:
      'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900',
    button:
      'w-full sm:w-auto px-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg whitespace-nowrap',
  },

  //Điểm nổi bật
  features: {
    section: 'bg-white py-16',
    title: 'text-3xl font-bold text-center text-gray-900 mb-12',
    grid: 'grid md:grid-cols-4 gap-6',
    item: 'text-center p-6 rounded-xl bg-white',
    iconWrap: 'flex justify-center mb-4',
    icon: 'text-4xl text-blue-600',
    itemTitle: 'font-bold text-lg text-gray-900 mb-2',
    itemDesc: 'text-gray-600 text-sm',
  },

  //Danh sách combo
  list: {
    section: `${container} py-20 mt-12`,
    headingWrap: 'mb-8',
    title: 'text-3xl font-bold text-gray-900 mb-2',
    subtitle: 'text-gray-600',
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    card: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group',
    imageWrap: 'relative h-48 overflow-hidden',
    image: 'w-full h-full object-cover',
    badge: 'absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold',
    body: 'p-5',
    locationRow: 'flex items-center gap-2 mb-2',
    locationIcon: 'text-gray-400 text-sm',
    locationText: 'text-sm text-gray-600',
    cardTitle: 'font-bold text-lg text-gray-900 mb-2 line-clamp-2',
    ratingRow: 'flex items-center gap-4 mb-3',
    rating: { wrap: 'flex items-center gap-1', star: 'text-yellow-400', text: 'text-sm font-semibold text-gray-900' },
    reviews: { wrap: 'flex items-center gap-1 text-gray-500 text-sm', icon: 'text-sm' },
    footer: 'flex items-baseline justify-between pt-3 border-t border-gray-100',
    priceLabel: 'text-xs text-gray-500',
    price: 'text-2xl font-bold text-red-600',
    action:
      'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition',
  },

  //đặt combo
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
} as const;
