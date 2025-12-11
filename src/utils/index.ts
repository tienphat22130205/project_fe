/**
 * Format currency to Vietnamese Dong
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format date to Vietnamese format
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('vi-VN').format(dateObj);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate image placeholder URL
 */
export const getPlaceholderImage = (width: number, height: number, text: string): string => {
  return `https://via.placeholder.com/${width}x${height}/1e88e5/ffffff?text=${encodeURIComponent(text)}`;
};
