import { Info, Link2 } from "lucide-react";

export const InfoPanel = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-700 flex gap-3">
      <Info className="w-5 h-5 flex-shrink-0" />
      <p>
        The app uses free budget first. Once at 0 remaining points, increasing a
        metric will automatically reduce its conflicting counterparts (
        <Link2 size={12} className="inline" />
        ).
      </p>
    </div>
  );
};
