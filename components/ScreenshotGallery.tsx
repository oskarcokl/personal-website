"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScreenshotGalleryProps {
    screenshots: string[];
    title: string;
}

export default function ScreenshotGallery({
    screenshots,
    title,
}: ScreenshotGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const count = screenshots?.length ?? 0;

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        triggerRef.current?.focus();
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    }, [count]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }, [count]);

    useEffect(() => {
        if (!lightboxOpen) {
            return;
        }

        closeButtonRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();

            // Keep keyboard focus inside the dialog while it is open.
            if (e.key === "Tab" && dialogRef.current) {
                const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

    if (count === 0) {
        return null;
    }

    const openLightbox = (index: number, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger;
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {screenshots.map((screenshot, index) => (
                    <button
                        key={screenshot}
                        type="button"
                        onClick={(e) => openLightbox(index, e.currentTarget)}
                        aria-label={`View ${title} screenshot ${index + 1} of ${count}`}
                        className="relative aspect-video bg-neutral-100 rounded overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <Image
                            src={screenshot}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 33vw, 50vw"
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {lightboxOpen && (
                <div
                    ref={dialogRef}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} screenshots`}
                >
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                        className="absolute top-4 right-4 text-white text-3xl hover:text-neutral-300 cursor-pointer"
                        aria-label="Close lightbox"
                    >
                        &times;
                    </button>

                    {screenshots.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                className="absolute left-4 text-white text-4xl hover:text-neutral-300 cursor-pointer"
                                aria-label="Previous screenshot"
                            >
                                &#8249;
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                className="absolute right-4 text-white text-4xl hover:text-neutral-300 cursor-pointer"
                                aria-label="Next screenshot"
                            >
                                &#8250;
                            </button>
                        </>
                    )}

                    <div
                        className="relative max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={screenshots[currentIndex]}
                            alt={`${title} screenshot ${currentIndex + 1} of ${count}`}
                            width={1920}
                            height={1080}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>

                    <div className="absolute bottom-4 text-white text-sm" aria-live="polite">
                        {currentIndex + 1} / {count}
                    </div>
                </div>
            )}
        </>
    );
}
