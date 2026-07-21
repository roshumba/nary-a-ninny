import clsx from 'clsx';

// extend type to make children a required property
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      shrink-0 bg-white p-10 rounded-lg
      className={className}
    >
      {children}
    </button>
  );
}
