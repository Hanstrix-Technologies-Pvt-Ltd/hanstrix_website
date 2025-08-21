// components/AISummaryButton.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

export default function AiSummaryButton({
  content,
  serviceName,
  variant = "ghost", // keep it subtle in the hero
  size = "md",
  className = "",
  label = "Quick Summary",
}: {
  content: string;
  serviceName: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setSummary(null);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, serviceName }),
      });
      const data = await res.json();
      if (res.ok) setSummary(data.summary);
      else setError(data.error || "Failed to summarize");
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses =
    size === "sm"
      ? "h-9 px-3 text-sm"
      : size === "lg"
      ? "h-12 px-6 text-base"
      : "h-10 px-4 text-sm";

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-neon text-white border border-white/10 shadow-lg"
      : variant === "secondary"
      ? "bg-white/10 text-white border border-white/10 hover:bg-white/20"
      : variant === "link"
      ? "bg-transparent text-cyan-300 hover:text-white underline-offset-4 hover:underline"
      : // ghost (default)
        "bg-transparent text-white/80 hover:text-white border border-white/10";

  return (
    <div className={`relative z-20 ${className}`}>
      <Button
        onClick={handleSummarize}
        disabled={loading}
        className={`inline-flex items-center gap-2 ${sizeClasses} ${variantClasses}`}
        aria-label="Open page summary"
      >
        <Sparkles className="w-4 h-4" />
        {loading ? "Summarizing..." : label}
      </Button>

      {error && <p className="mt-2 text-red-500 text-sm animate-pulse">{error}</p>}

      {/* Render modal only after mount to avoid SSR issues */}
      {mounted && summary &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full sm:w-[95%] md:w-4/5 lg:w-2/3 max-w-4xl max-h-[90vh] bg-gray-900 text-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
              <button
                onClick={() => setSummary(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close summary"
              >
                <X size={28} />
              </button>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar pr-6 md:pr-8">
                <h4 className="font-bold mb-6 text-xl sm:text-2xl md:text-3xl text-gradient-neon">
                  Page Summary
                </h4>

                {/* Clean, readable markdown without needing @tailwindcss/typography */}
                <div className="space-y-4 text-white/90">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl md:text-3xl font-bold text-white mt-6" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl md:text-2xl font-semibold text-white mt-5" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg md:text-xl font-semibold text-white mt-4" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="leading-relaxed text-white/85" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 space-y-1 marker:text-cyan-400" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 space-y-1 marker:text-cyan-400" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                      ),
                      hr: () => <hr className="border-gray-700 my-4" />,
                      strong: ({ node, ...props }) => (
                        <strong className="text-white" {...props} />
                      ),
                    }}
                  >
                    {summary}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(128, 128, 128, 0.5);
                border-radius: 4px;
                border: 2px solid #1a1a1a;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(128, 128, 128, 0.7);
              }
            `}</style>
          </div>,
          document.body
        )}
    </div>
  );
}
