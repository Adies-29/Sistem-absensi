import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface InputSelectProps {
    label: string;
    nama?: string; // Jadi opsional
    register?: (name: any) => UseFormRegisterReturn; // Tipe data register yang benar
    value?: string | number; // Tambahkan ini
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Tambahkan ini
    error?: string;
    disabled?: boolean;
    options: SelectOption[];
    className?: string;
    placeholder?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
    label,
    nama,
    register,
    value,
    onChange,
    error,
    disabled,
    options,
    className = "",
    placeholder
}) => {
    // Logika untuk menentukan apakah menggunakan register RHF atau manual onChange
    const registerProps = (register && nama) ? register(nama) : {};

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-sm font-semibold text-gray-700">
                {label}
            </label>
            
            <select
                {...registerProps}
                value={value}
                onChange={onChange}
                disabled={disabled} 
                className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all cursor-pointer ${
                    error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"
                }`}
            >
                <option value="" disabled={!value}>
                   {placeholder || `-- Pilih ${label} --`}
                </option>
                
                {options.map((opt, index) => (
                    <option key={index} value={opt.value} className="text-black">
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-xs font-medium text-red-500 mt-0.5">
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputSelect;