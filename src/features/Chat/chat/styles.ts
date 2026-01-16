export const chatStyles = {
  //Khung tổng
  widget: {
    root: 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50',
  },

  //Nút mở chat
  launcher: {
    button:
      'relative h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200',
    iconWrap: 'absolute inset-0 flex items-center justify-center',
    onlineDot: 'absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white',
    unreadBadge:
      'absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center',
  },

  //Bảng chat
  panel: {
    root:
      'mb-3 w-[calc(100vw-1.5rem)] sm:w-[380px] max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] h-[calc(100vh-1.5rem)] sm:h-auto sm:max-h-[80vh] overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white flex flex-col animate-slide-up',
    body: 'flex flex-col flex-1 min-h-0 bg-gray-50',
  },

  //Thanh tiêu đề
  header: {
    root: 'bg-blue-600 text-white px-4 py-3',
    row: 'flex items-center gap-3',
    iconWrap: 'h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm',
    icon: 'text-lg',
    textWrap: 'min-w-0 flex-1',
    title: 'font-semibold leading-5 truncate',
    subtitle: 'text-white/80 text-sm leading-4 truncate',
    close:
      'p-2 rounded-md hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
    closeIcon: 'text-base',
  },

  //Tin nhắn
  messages: {
    list: 'flex-1 min-h-0 overflow-y-auto p-4 bg-gray-50',
    row: { base: 'mb-4', user: 'mb-4 flex justify-end' },
    assistant: {
      wrap: 'flex items-start gap-3',
      avatar:
        'h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100',
      avatarIcon: 'text-sm',
      bubble:
        'bg-gray-100 text-gray-900 border-2 border-white shadow-sm rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-6',
      bubblePre: 'whitespace-pre-line',
      maxWidth: 'max-w-[85%]',
    },
    user: {
      maxWidth: 'max-w-[85%]',
      bubble:
        'bg-blue-600 text-white border-2 border-white shadow-sm rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-6 whitespace-pre-line',
    },
    typing: {
      wrap: 'mb-4',
      dots: 'inline-flex items-center gap-1',
      dot: 'h-2 w-2 rounded-full bg-gray-400 animate-bounce',
    },
    tours: {
      grid: 'mt-3 grid gap-3',
      card: 'rounded-xl overflow-hidden border border-gray-200 bg-white',
      body: 'p-3',
      title: 'font-semibold text-sm leading-5 line-clamp-2',
      metaRow: 'mt-1 flex items-center justify-between text-xs text-gray-600',
      priceRow: 'mt-2 flex items-center justify-between',
      price: 'text-sm font-semibold text-blue-700',
      promo:
        'text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100',
      actions: 'mt-3 flex gap-2',
      link:
        'flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50',
      button:
        'flex-1 text-xs font-medium px-3 py-2 rounded-lg bg-blue-600 text-white hover:opacity-95',
    },
    quickReplies: {
      wrap: 'mt-3 flex flex-wrap gap-2',
      item:
        'text-xs px-3 py-2 rounded-full bg-gray-100 text-gray-800 border border-gray-200 hover:bg-blue-50 hover:border-blue-200',
    },
    time: 'text-xs text-gray-500 mt-1',
  },

  //Ô nhập
  input: {
    wrap: 'p-3 bg-white border-t border-gray-200',
    form: 'flex items-center gap-2',
    field:
      'flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100',
    submit: 'px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:opacity-95 disabled:opacity-60',
  },
} as const;
