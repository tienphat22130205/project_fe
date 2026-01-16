const container = 'max-w-7xl mx-auto px-6';

export const veMayBayStyles = {
  container,

  // Trang (khung bao ngoài)
  page: {
    root: 'bg-white min-h-screen',
  },

  //Đầu trang
  hero: {
    section: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16',
    headingWrap: 'text-center mb-8',
    title: 'text-4xl md:text-5xl font-bold mb-4',
    subtitle: 'text-xl text-blue-100',
    tabs: 'flex justify-center gap-4 mb-6',
    tabBase: 'px-6 py-2 rounded-lg font-semibold transition border-2',
    tabActive: 'bg-white text-blue-600 border-white',
    tabInactive: 'bg-white/20 text-white hover:bg-white/30 border-white/30',
  },

  //Tìm kiếm
  search: {
    wrap: 'mt-8 pb-2',
    panel:
      'bg-white rounded-2xl shadow-2xl p-6 md:p-7 relative z-10 border border-gray-200 max-w-4xl mx-auto',
    row: 'flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch',
    fieldWrap: 'relative flex-1',
    icon: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400',
    input:
      'w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900',
    submit:
      'w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg whitespace-nowrap',
  },

  //danh sách chuyến bay
  results: {
    section: `${container} py-20 mt-12`,
    headingWrap: 'mb-8',
    title: 'text-3xl font-bold text-gray-900 mb-2',
    subtitle: 'text-gray-600',
    list: 'space-y-4',
    card: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6',
    cardGrid: 'grid md:grid-cols-12 gap-4 items-center',
    price: 'text-2xl font-bold text-red-600',
    seats: 'text-sm text-blue-600 mb-3 flex items-center justify-end gap-1',
    choose:
      'w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition',
  },

  //xác nhận đặt vé
  modal: {
    overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
    panel: 'bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl',
    header: 'flex justify-between items-start mb-6',
    close: 'text-gray-400 hover:text-gray-600 transition',
    infoBox: 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6',
    warningBox: 'bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6',
    actions: 'flex gap-3',
    cancel:
      'flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition',
    confirm:
      'flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition',
  },

  //ưu điểm
  benefits: {
    section: 'bg-white py-16',
    title: 'text-3xl font-bold text-center text-gray-900 mb-12',
    grid: 'grid md:grid-cols-4 gap-6',
    card: 'text-center p-6 rounded-xl bg-white',
    iconWrap: 'flex justify-center mb-4',
    icon: 'text-4xl text-blue-600',
    itemTitle: 'font-bold text-lg text-gray-900 mb-2',
    itemDesc: 'text-gray-600 text-sm',
  },
} as const;
