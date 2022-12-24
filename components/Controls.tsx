import React from "react";

interface ButtonProps {
  showTitle: boolean;
  onClick: () => void;
  className?: string;
}

const Controls: React.FC<ButtonProps> = ({ showTitle, onClick, className }) => {
  return showTitle ? (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      Next
    </button>
  ) : (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-neutral-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      Reveal
    </button>
  );
};

export default Controls;
