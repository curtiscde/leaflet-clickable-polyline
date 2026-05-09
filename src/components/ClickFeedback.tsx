"use client";

interface ClickFeedbackProps {
  count: number;
}

const ClickFeedback = ({ count }: ClickFeedbackProps) => {
  if (count === 0) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white shadow-lg">
      <span className="text-sm font-medium">
        Route clicked
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">
        {count}
      </span>
    </div>
  );
};

export default ClickFeedback;
