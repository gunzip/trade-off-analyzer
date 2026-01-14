import { useState } from "react";
import type { AppState, ShareWarningType } from "../types";
import { encodeState } from "../utils/stateEncoding";

export const useShareLogic = () => {
  const [copied, setCopied] = useState(false);
  const [shareWarning, setShareWarning] = useState<ShareWarningType>(null);

  const handleShare = (config: AppState) => {
    const hash = encodeState(config);

    // Get base URL safely
    let baseUrl = window.location.href.split("#")[0];

    // Cleanup: If in blob environment, strip 'blob:' prefix
    if (baseUrl.startsWith("blob:")) {
      baseUrl = baseUrl.replace(/^blob:/, "");
    }

    const url = `${baseUrl}#${hash}`;

    // Copy to clipboard
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Update URL bar without reload
      window.history.pushState(null, "", `#${hash}`);

      // Check environment for warning
      const isPreviewEnv =
        window.location.protocol === "blob:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname.includes("usercontent.goog");

      if (isPreviewEnv) {
        setShareWarning("preview");
        setTimeout(() => setShareWarning(null), 8000);
      } else {
        setShareWarning(null);
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
    
    document.body.removeChild(textArea);
  };

  const resetToDefaults = () => {
    window.history.pushState(null, "", window.location.pathname);
    window.location.reload();
  };

  return {
    copied,
    shareWarning,
    handleShare,
    setShareWarning,
    resetToDefaults,
  };
};
