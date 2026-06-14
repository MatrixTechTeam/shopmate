const variants = {
  primary: 'bg-primary text-white hover:bg-indigo-600 active:scale-95',
  secondary:
    'bg-white text-dark border border-gray-200 hover:bg-gray-50 active:scale-95',
  ghost: 'bg-transparent text-primary hover:bg-indigo-50 active:scale-95',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-150 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
