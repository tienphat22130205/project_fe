export function createChatId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
