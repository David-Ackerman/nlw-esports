import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TimeInput(props: InputProps) {
  return (
    <input
      {...props}
      type='time'
      className='bg-zinc-900 py-2 px-3 rounded text-sm placeholder:text-zinc-500'
    />
  );
}
