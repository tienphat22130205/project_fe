import React from 'react';

interface InfoRowProps {
    label: string;
    value: string;
    name: string;
    placeholder: string;
    type?: string;
    isEditing: boolean;
    onEdit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disableEdit?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
    label,
    value,
    name,
    placeholder,
    type = 'text',
    isEditing,
    onEdit,
    onChange,
    disableEdit = false,
}) => (
    <div className="flex items-start py-5 border-b-2 border-gray-200">
        <div className="w-48 text-gray-800 font-semibold">{label}</div>
        <div className="flex-1">
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            ) : (
                <div className="text-gray-900 py-2">{value || <span className="text-gray-400">{placeholder}</span>}</div>
            )}
        </div>
        <div className="w-32 text-right">
            {!isEditing && !disableEdit && (
                <button
                    onClick={onEdit}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                    Chỉnh sửa
                </button>
            )}
        </div>
    </div>
);

export default InfoRow;
