"use client";

import React, { useState } from "react";

interface IframeProps extends Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, "src"> {
  url?: string;
  containerClassName?: string;
}

export default function Iframe({
  url,
  className = "",
  containerClassName = "",
  title = "Google Map",
  ...props
}: IframeProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Map any standard React props to avoid casing conflicts
  const iframeProps = {
    ...props,
    allowFullScreen: props.allowFullScreen ?? (props as any).allowfullscreen,
    referrerPolicy: props.referrerPolicy ?? (props as any).referrerpolicy,
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 shadow-md transition-all duration-300 hover:border-blue-500/20 ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 backdrop-blur-xs">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      )}
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        onLoad={() => setIsLoading(false)}
        className={`block border-0 transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        {...iframeProps}
      />
    </div>
  );
}
