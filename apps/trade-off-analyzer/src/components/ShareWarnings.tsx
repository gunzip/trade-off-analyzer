import { AlertTriangle, Info, X } from "lucide-react";
import type { ShareWarningType } from "../types";

type ShareWarningsProps = {
  shareWarning: ShareWarningType;
  initialConfig: boolean;
  onDismissWarning: () => void;
  onResetDefaults: () => void;
};

export const ShareWarnings = ({
  shareWarning,
  initialConfig,
  onDismissWarning,
  onResetDefaults,
}: ShareWarningsProps) => {
  return (
    <div className="space-y-4 mb-6">
      {shareWarning === "preview" && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 text-sm text-amber-800 items-start animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <div className="flex-1">
            <strong>Preview Link Generated.</strong>
            <p className="mt-1 text-amber-700/80">
              You are running this app in a temporary preview environment
              (Blob/Localhost). The copied link might not work for others until
              you <strong>deploy this app</strong> to a public host.
            </p>
          </div>
          <button
            onClick={onDismissWarning}
            className="text-amber-500 hover:text-amber-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {initialConfig && (
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex justify-between items-center text-sm text-indigo-800 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span>Loaded configuration from shared link.</span>
          </div>
          <button onClick={onResetDefaults} className="underline hover:text-indigo-900">
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
};
