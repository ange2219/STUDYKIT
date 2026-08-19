import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-item border border-neutral-700">
        <CheckCircle2 size={18} className="text-[#1677FF] flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
