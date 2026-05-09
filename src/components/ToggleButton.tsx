"use client";

interface ToggleButtonProps {
  withFix: boolean;
  onToggle: () => void;
}

const ToggleButton = ({ withFix, onToggle }: ToggleButtonProps) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex rounded-full border border-gray-200 bg-white shadow-lg overflow-hidden">
      <button
        onClick={() => !withFix || onToggle()}
        className={`px-5 py-2.5 text-sm font-medium transition-colors ${
          !withFix
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Without fix
      </button>
      <button
        onClick={() => withFix || onToggle()}
        className={`px-5 py-2.5 text-sm font-medium transition-colors ${
          withFix
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        With fix
      </button>
    </div>
  );
};

export default ToggleButton;
