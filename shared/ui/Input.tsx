import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...props }, ref) => {
        const inputId =
            id || (label ? `${label.toLowerCase().replace(/\s+/g, '-')}-input` : undefined);

        return (
            <div className="flex flex-col gap-1 group">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-rounds font-bold ml-[6px] text-[13px] text-muted-light group-focus-within:text-black uppercase tracking-wide transition-colors"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`w-full h-[48px] px-4 rounded-[16px] border ${
                        error
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-inset focus:ring-red-500'
                            : 'border-muted-light focus:border-black focus:ring-1 focus:ring-inset focus:ring-black'
                    } focus:outline-none transition-all font-rounds font-bold placeholder:text-muted-light/50 placeholder:font-rounds placeholder:font-bold text-[17px] placeholder:text-[15px] text-black ${className}`}
                    {...props}
                />
                {error && <span className="text-red-500 text-xs font-rounds mt-1">{error}</span>}
            </div>
        );
    },
);

Input.displayName = 'Input';
