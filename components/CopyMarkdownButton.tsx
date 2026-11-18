'use client';

import { useState } from 'react';

export default function CopyMarkdownButton({
  markdown,
  label,
  copiedLabel,
}: {
  markdown: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked (insecure origin, denied permission); nothing to do.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="no-print border border-sky-700 text-sky-700 px-3 py-1 uppercase rounded-md cursor-pointer hover:bg-sky-50">
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
