# Saigontourist - Tour Travel Website

Một trang web thương mại điện tử về tour du lịch được xây dựng bằng React TypeScript, được thiết kế dựa trên giao diện của Saigontourist.

## 🌟 Tính năng

- **Header với Navigation**: Logo, menu điều hướng, thanh tìm kiếm và thông tin liên hệ
- **Hero Banner**: Banner chính với ảnh nền và form tìm kiếm
- **Special Tours**: Section hiển thị các tour đặc biệt với icons đẹp mắt
- **Popular Tours**: Danh sách tour phổ biến với tabs (trong nước/ngoài nước)
- **Destinations**: Các điểm đến du lịch hấp dẫn với filters theo khu vực
- **Footer**: Thông tin công ty, dịch vụ, policies và payment methods
- **Responsive Design**: Tương thích với mọi thiết bị
- **Internationalization**: File vi.json chứa tất cả text tiếng Việt

## 🚀 Công nghệ sử dụng

- **React 18** với TypeScript
- **Vite** - Build tool nhanh và hiệu quả
- **CSS3** với Flexbox và Grid
- **ES6+** Features

## 📂 Cấu trúc dự án

```
src/
├── components/           # Các React components
│   ├── Header.tsx       # Header component
│   ├── Header.css
│   ├── HeroBanner.tsx   # Banner chính
│   ├── HeroBanner.css
│   ├── SpecialTours.tsx # Section tour đặc biệt
│   ├── SpecialTours.css
│   ├── PopularTours.tsx # Section tour phổ biến
│   ├── PopularTours.css
│   ├── Destinations.tsx # Section điểm đến
│   ├── Destinations.css
│   ├── Footer.tsx       # Footer component
│   └── Footer.css
├── locales/
│   └── vi.json          # File chứa text tiếng Việt
├── App.tsx              # Component chính
├── App.css              # Global styles
└── main.tsx             # Entry point

```

## 🛠️ Cài đặt và Chạy dự án

### Yêu cầu hệ thống
- Node.js 20.19+ hoặc 22.12+
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd project_fe_ck
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở trình duyệt**
```
http://localhost:5173
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎨 Design Features

- **Color Scheme**: Chủ yếu sử dụng màu xanh (#1e88e5) và gradient
- **Typography**: Segoe UI font family
- **Animations**: Hover effects, smooth transitions
- **Cards**: Modern card design với shadows và hover effects
- **Buttons**: Gradient buttons với hover animations

## 🌐 Internationalization

Dự án sử dụng file `vi.json` để quản lý tất cả text tiếng Việt:

```typescript
// Sử dụng trong component
import viTexts from '../locales/vi.json';

// Truy cập text
viTexts.header.logo // "SAIGONTOURIST"
viTexts.popularTours.title // "CHÚM TOUR ƯU ĐÃI"
```

## 🔧 Customization

### Thay đổi màu sắc chủ đạo
Chỉnh sửa trong file CSS, tìm và thay thế:
- Primary color: `#1e88e5`
- Secondary color: `#42a5f5`

### Thêm ngôn ngữ mới
1. Tạo file mới trong `src/locales/` (ví dụ: `en.json`)
2. Copy cấu trúc từ `vi.json` và dịch content
3. Import và sử dụng trong components

## 📝 Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Chạy ESLint
```

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
