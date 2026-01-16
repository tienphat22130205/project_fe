import { chatStyles } from './styles';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSubmit, disabled = false }: Props) {
  return (
    <div className={chatStyles.input.wrap}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className={chatStyles.input.form}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập câu hỏi của bạn…"
          disabled={disabled}
          className={chatStyles.input.field}
        />
        <button
          type="submit"
          disabled={disabled}
          className={chatStyles.input.submit}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
