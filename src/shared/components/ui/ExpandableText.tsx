"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "./Modal";

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
  title?: string;
}

export function ExpandableText({ 
  text, 
  maxLines = 2, 
  className = "",
  title = "Deskripsi"
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      // Check if text is truncated
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  const lineClampClass = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  }[maxLines] || "line-clamp-2";

  return (
    <>
      <div>
        <p 
          ref={textRef}
          className={`${lineClampClass} ${className}`}
        >
          {text}
        </p>
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 hover:underline"
          >
            Lihat selengkapnya
          </button>
        )}
      </div>

      <Modal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={title}
      >
        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      </Modal>
    </>
  );
}
