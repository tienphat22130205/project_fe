type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSubmit, disabled = false }: Props) {
  return (
    <div className="p-3 bg-white border-t border-gray-200">
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
          placeholder="Nhập câu hỏi của bạn…"
          disabled={disabled}
          className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:opacity-95 disabled:opacity-60"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
