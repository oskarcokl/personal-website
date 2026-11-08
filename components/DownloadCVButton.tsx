'use client';

export default function DownloadCVButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        'no-print bg-sky-700 text-white px-3 py-1 right-0 uppercase rounded-md cursor-pointer hover:bg-sky-800'
      }>
      {label}
    </button>
  );
}
