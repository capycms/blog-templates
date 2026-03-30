"use client";

import { useEffect, useState } from "react";

export function ProgressBar({
  barClassName = "bg-blue-500",
}: {
  barClassName?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div
        className={`h-full ${barClassName} transition-all duration-150`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
