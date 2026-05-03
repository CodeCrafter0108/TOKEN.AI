'use client';
import { tokenLogoStub } from "@/constants/tokenLogoStub";
import { useEffect, useState } from "react";


export const useFallBackImage = (url?: string | null, timeoutMs = 1000) => {
  const fallback = url ? tokenLogoStub[url] ?? null : null;
  const [src, setSrc] = useState<string | null>(url ?? null);

  useEffect(() => {
    setSrc(url ?? null);

    if (!url) return;

    let cancelled = false;

    const img = new window.Image();

    const timer = setTimeout(() => {
      if (!cancelled) {
        cancelled = true;
        img.src = '';
        setSrc(fallback);
      }
    }, timeoutMs);

    img.onload = () => {
      if (!cancelled) {
        clearTimeout(timer);
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        clearTimeout(timer);
        cancelled = true;
        setSrc(fallback);
      }
    };

    img.src = url;

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [url, fallback, timeoutMs]);

  const onError = () => setSrc(fallback);

  return { src, onError };
};