interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
    >
      {children}
    </button>
  )
} 