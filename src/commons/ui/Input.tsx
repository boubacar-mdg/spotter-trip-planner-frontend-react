import React, { Dispatch, ForwardedRef, forwardRef, SetStateAction } from "react";

interface InputProps {
  id?: string;
  name?: string;
  type: string;
  placeholder: string;
  value?: string | number;
  label?: string; 
  icon?: React.ReactNode; 
  onChange: Dispatch<SetStateAction<any>>; 
  className?: string;
  height?: number;
}

const Input = forwardRef(function Input({
  id,
  name,
  type,
  placeholder,
  onChange,
  label,
  icon,
  value,
  className,
  height = 14,
}: InputProps,  ref: ForwardedRef<HTMLInputElement>) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block font-semibold text-xs text-[#1D2E5C] leading-3"
          >
            {label}
          </label>
        </div>
      )}
      <div className="relative mt-2">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}

        <input
          type={type}
          id={id}
          name={name}
          value={value}
          className={className ? className : `block w-full h-${height} rounded-md text-[14px] border font-medium border-[#BCCDED] py-3 ${icon ? "pl-10" : "pl-3"} text-gray-900 placeholder:text-[#878787] placeholder:text-[14px] placeholder:font-normal sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#BCCDED] focus:border-[#BCCDED] transition`}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default Input;
