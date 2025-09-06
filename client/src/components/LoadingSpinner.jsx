import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      {/* spinner */}
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300">Loading...</p>
    </div>
  );
}
