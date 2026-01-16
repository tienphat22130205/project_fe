const container = 'max-w-7xl mx-auto px-6';

export const duHocStyles = {
  container,

  //Đầu trang
  hero: {
    section: 'bg-white',
    container: `${container} py-16 md:py-28`,
    panel: 'relative overflow-hidden rounded-2xl bg-white shadow-lg',
    backdrop: 'absolute inset-0 bg-cover bg-center brightness-[0.65]',
    content: 'relative p-8 md:p-16',
    title:
      'text-3xl md:text-5xl text-white font-extrabold leading-tight drop-shadow-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]',
    subtitle: 'mt-4 text-lg md:text-xl text-white',
    actions: 'mt-8 flex flex-col sm:flex-row gap-3',
    actionButton:
      'inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300',
    meta: 'mt-6 flex flex-wrap gap-4 text-sm text-slate-200',
    metaItem: 'flex items-center gap-2',
    metaIcon: 'text-xl text-white',
  },

  //Thẻ nội dung
  cards: {
    section: `${container} py-12`,
    grid3: 'grid md:grid-cols-3 gap-6',
    statsGrid: 'mt-10 grid sm:grid-cols-3 md:grid-cols-4 gap-6',
    galleryGrid: 'mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3',
    featuredTitle: 'text-2xl font-semibold text-slate-800',
    featuredGrid: 'mt-6 grid md:grid-cols-3 gap-6',
    featureCard: {
      base: 'bg-white rounded-xl p-6 border-2 border-slate-400',
      hover: 'shadow-sm transition transform hover:shadow-lg hover:-translate-y-1',
      icon: 'text-blue-600 text-2xl mb-3',
      title: 'font-semibold text-lg text-slate-800',
      desc: 'mt-2 text-slate-600',
    },
    statCard: {
      base: 'bg-white p-6 rounded-xl shadow text-center border-2 border-slate-400',
      num: 'text-3xl font-bold text-blue-600',
      label: 'mt-2 text-slate-600',
    },
    programCard: {
      base: 'bg-white rounded-xl p-6 border-2 border-slate-400',
      hover: 'shadow-sm transition hover:shadow-lg',
      image: 'w-full h-40 object-cover rounded-md mb-4',
      title: 'font-semibold text-lg text-slate-800',
      desc: 'mt-2 text-slate-600',
      link: 'inline-block text-blue-600 font-semibold',
    },
    galleryItem: {
      wrap: 'overflow-hidden rounded-lg bg-white shadow-sm border-2 border-slate-400',
      image: 'w-full h-24 sm:h-32 object-cover transition transform hover:scale-105',
    },
  },

  //Liên hệ
  contact: {
    section: 'py-12',
    container,
    panel:
      'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between',
    title: 'text-2xl font-bold',
    desc: 'mt-2 text-slate-100',
    actions: 'mt-4 md:mt-0 flex gap-3',
    secondaryAction: 'border border-white px-4 py-3 rounded-lg',
  },

  //Trang 
  page: {
    root: 'bg-white min-h-screen',
    footer: `${container} py-12 text-center text-slate-600`,
  },
} as const;
