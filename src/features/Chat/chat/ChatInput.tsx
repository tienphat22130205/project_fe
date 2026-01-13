type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSubmit, disabled = false }: Props) {
  return (
    <div className="p-3 bg-gray-900 border-t border-white/10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex items-center gap-2"
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Đặt câu hỏi tại đây"
          disabled={disabled}
          className="flex-1 bg-transparent border border-white/15 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:opacity-95"
        >
          Gửi
        </button>
      </form>

      <div className="text-center text-xs text-white/40 mt-2">AI chat (FE demo)</div>
    </div>
  );
}
