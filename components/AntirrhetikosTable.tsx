"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AntirrhetikosEntry } from "@/lib/antirrhetikos";

interface TimerState {
    entryKey: string;
    label: string;
    durationSeconds: number;
    remainingMs: number;
    endTimeMs: number | null;
    status: "running" | "paused" | "done";
}

function getEntryKey(entry: AntirrhetikosEntry): string {
    return `${entry.mode}::${entry.sub}::${entry.hook}`;
}

function formatDuration(totalSeconds: number): string {
    const clamped = Math.max(0, Math.ceil(totalSeconds));
    const hours = Math.floor(clamped / 3600);
    const minutes = Math.floor((clamped % 3600) / 60);
    const seconds = clamped % 60;
    const pad = (n: number) => String(n).padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${minutes}:${pad(seconds)}`;
}

function playChime(audioContext: AudioContext | null) {
    if (!audioContext) return;

    const start = () => {
        const now = audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99, 523.25, 659.25, 783.99];
        const offsets = [0, 0.16, 0.32, 0.72, 0.88, 1.04];

        notes.forEach((frequency, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const t = now + offsets[i];

            osc.type = "sine";
            osc.frequency.setValueAtTime(frequency, t);

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start(t);
            osc.stop(t + 0.6);
        });
    };

    if (audioContext.state === "suspended") {
        void audioContext.resume().then(start).catch(() => {});
    } else {
        start();
    }
}

export default function AntirrhetikosTable({ entries }: { entries: AntirrhetikosEntry[] }) {
    const [activeMode, setActiveMode] = useState("All");
    const [query, setQuery] = useState("");
    const [selectedEntry, setSelectedEntry] = useState<AntirrhetikosEntry | null>(null);
    const [timer, setTimer] = useState<TimerState | null>(null);

    const searchRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const baseTitleRef = useRef<string | null>(null);

    const ensureAudioContext = useCallback(() => {
        if (typeof window === "undefined") return null;
        if (!audioContextRef.current) {
            const AudioCtx =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                audioContextRef.current = new AudioCtx();
            }
        }
        if (audioContextRef.current?.state === "suspended") {
            void audioContextRef.current.resume().catch(() => {});
        }
        return audioContextRef.current;
    }, []);

    const startTimerForEntry = useCallback(
        (entry: AntirrhetikosEntry) => {
            if (!entry.timerSeconds) return;
            ensureAudioContext();
            const durationMs = entry.timerSeconds * 1000;
            setTimer({
                entryKey: getEntryKey(entry),
                label: entry.sub || entry.mode,
                durationSeconds: entry.timerSeconds,
                remainingMs: durationMs,
                endTimeMs: Date.now() + durationMs,
                status: "running",
            });
        },
        [ensureAudioContext]
    );

    const pauseTimer = useCallback(() => {
        setTimer((current) => {
            if (!current || current.status !== "running" || current.endTimeMs === null) return current;
            return {
                ...current,
                remainingMs: Math.max(0, current.endTimeMs - Date.now()),
                endTimeMs: null,
                status: "paused",
            };
        });
    }, []);

    const resumeTimer = useCallback(() => {
        ensureAudioContext();
        setTimer((current) => {
            if (!current || current.status !== "paused" || current.remainingMs <= 0) return current;
            return {
                ...current,
                endTimeMs: Date.now() + current.remainingMs,
                status: "running",
            };
        });
    }, [ensureAudioContext]);

    const clearTimer = useCallback(() => {
        setTimer(null);
    }, []);

    // Tick accurately against wall-clock time so background tab throttling cannot drift.
    useEffect(() => {
        if (!timer || timer.status !== "running" || timer.endTimeMs === null) return;

        const targetEndMs = timer.endTimeMs;
        const intervalId = window.setInterval(() => {
            const remaining = Math.max(0, targetEndMs - Date.now());
            if (remaining <= 0) {
                window.clearInterval(intervalId);
                playChime(audioContextRef.current);
                setTimer((current) =>
                    current && current.endTimeMs === targetEndMs
                        ? { ...current, remainingMs: 0, endTimeMs: null, status: "done" }
                        : current
                );
            } else {
                setTimer((current) =>
                    current && current.endTimeMs === targetEndMs
                        ? { ...current, remainingMs: remaining }
                        : current
                );
            }
        }, 250);

        return () => window.clearInterval(intervalId);
    }, [timer?.status, timer?.endTimeMs]);

    const tabTitleText = !timer
        ? null
        : timer.status === "done"
          ? "Time's up"
          : formatDuration(timer.remainingMs / 1000);

    // Reflect active countdown in the browser tab title.
    useEffect(() => {
        if (typeof document === "undefined") return;
        if (baseTitleRef.current === null) {
            baseTitleRef.current = document.title;
        }
        const baseTitle = baseTitleRef.current;
        document.title = tabTitleText ? `${tabTitleText} — ${baseTitle}` : baseTitle;
    }, [tabTitleText]);

    useEffect(() => {
        return () => {
            if (typeof document !== "undefined" && baseTitleRef.current !== null) {
                document.title = baseTitleRef.current;
            }
        };
    }, []);

    const modes = useMemo(
        () => ["All", ...Array.from(new Set(entries.map((entry) => entry.mode).filter(Boolean)))],
        [entries]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return entries.filter((entry) => {
            const matchesMode = activeMode === "All" || entry.mode === activeMode;
            const matchesQuery =
                !q ||
                entry.hook.toLowerCase().includes(q) ||
                entry.stop.toLowerCase().includes(q) ||
                entry.move.toLowerCase().includes(q) ||
                entry.mode.toLowerCase().includes(q) ||
                entry.sub.toLowerCase().includes(q);
            return matchesMode && matchesQuery;
        });
    }, [entries, activeMode, query]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (selectedEntry && !dialog.open) {
            dialog.showModal();
        } else if (!selectedEntry && dialog.open) {
            dialog.close();
        }
    }, [selectedEntry]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === "/" &&
                !event.metaKey &&
                !event.ctrlKey &&
                !event.altKey &&
                document.activeElement !== searchRef.current &&
                !(document.activeElement instanceof HTMLInputElement) &&
                !(document.activeElement instanceof HTMLTextAreaElement) &&
                !dialogRef.current?.open
            ) {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    const selectedEntryKey = selectedEntry ? getEntryKey(selectedEntry) : null;
    const selectedTimer = timer && selectedEntryKey === timer.entryKey ? timer : null;

    return (
        <div className="flex flex-col gap-6 text-base">
            {timer && !selectedEntry && (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex flex-wrap items-center justify-between gap-3 border-y border-sky-700/40 bg-sky-50/70 px-4 py-3"
                >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-bold text-sky-700">{timer.label}</span>
                        <span className="font-mono font-bold tabular-nums text-black">
                            {timer.status === "done"
                                ? "Time's up!"
                                : formatDuration(timer.remainingMs / 1000)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {timer.status === "running" && (
                            <button
                                type="button"
                                onClick={pauseTimer}
                                className="border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                            >
                                Pause
                            </button>
                        )}
                        {timer.status === "paused" && (
                            <button
                                type="button"
                                onClick={resumeTimer}
                                className="border border-sky-700 bg-sky-700 text-white px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-800"
                            >
                                Resume
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={clearTimer}
                            className="border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                        >
                            {timer.status === "done" ? "Dismiss" : "Stop"}
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
                <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            if (query) {
                                setQuery("");
                            } else {
                                searchRef.current?.blur();
                            }
                        }
                    }}
                    placeholder="Filter hooks... (press /)"
                    aria-label="Filter hooks"
                    autoComplete="off"
                    className="flex-1 min-w-[220px] rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-base text-black placeholder:text-gray-500 focus:border-sky-700 focus:outline-none"
                />
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by mode">
                    {modes.map((mode) => {
                        const isActive = mode === activeMode;
                        return (
                            <button
                                key={mode}
                                type="button"
                                onClick={() => setActiveMode(mode)}
                                aria-pressed={isActive}
                                className={
                                    isActive
                                        ? "border border-sky-700 bg-sky-700 text-white px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-800"
                                        : "border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                                }
                            >
                                {mode}
                            </button>
                        );
                    })}
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="py-8 text-center text-base text-gray-600">
                    No matching entries.{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setActiveMode("All");
                            setQuery("");
                        }}
                        className="text-sky-700 underline cursor-pointer"
                    >
                        Reset filters
                    </button>
                </p>
            ) : (
                <table className="w-full border-collapse text-left text-base">
                    <thead className="hidden md:table-header-group border-b-2 border-neutral-300 text-sky-700">
                        <tr>
                            <th scope="col" className="w-48 py-3 pr-4 font-bold">
                                Pattern
                            </th>
                            <th scope="col" className="py-3 px-4 font-bold">
                                Hook
                            </th>
                            <th scope="col" className="py-3 px-4 font-bold">
                                Counter-Script
                            </th>
                            <th scope="col" className="py-3 pl-4 font-bold">
                                10-Second Interrupt
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {filtered.map((entry, index) => (
                            <tr
                                key={`${entry.mode}-${entry.sub}-${index}`}
                                tabIndex={0}
                                onClick={() => setSelectedEntry(entry)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        setSelectedEntry(entry);
                                    }
                                }}
                                className="block md:table-row cursor-pointer hover:bg-sky-50/70 focus:bg-sky-50 focus:outline-none"
                            >
                                <td className="block md:table-cell align-top py-1 pt-4 md:py-4 md:pr-4">
                                    <span className="font-bold text-sky-700">{entry.mode}</span>
                                    {entry.sub && (
                                        <span className="block text-gray-600 italic">{entry.sub}</span>
                                    )}
                                </td>
                                <td className="block md:table-cell align-top py-1.5 md:py-4 md:px-4 text-black">
                                    &ldquo;{entry.hook}&rdquo;
                                </td>
                                <td className="block md:table-cell align-top py-1.5 md:py-4 md:px-4 font-bold text-black">
                                    <span className="block md:hidden font-bold text-sky-700">Counter-Script</span>
                                    {entry.stop}
                                </td>
                                <td className="block md:table-cell align-top py-1.5 pb-4 md:py-4 md:pl-4 text-neutral-800">
                                    <span className="block md:hidden font-bold text-sky-700">10-Second Interrupt</span>
                                    {entry.move}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <dialog
                ref={dialogRef}
                onClose={() => setSelectedEntry(null)}
                onClick={(event) => {
                    if (event.target === dialogRef.current) {
                        dialogRef.current.close();
                    }
                }}
                aria-labelledby="strike-modal-title"
                className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-md border border-neutral-300 bg-stone-50 p-6 sm:p-8 text-base text-black backdrop:bg-black/50"
            >
                {selectedEntry && (
                    <div>
                        <p id="strike-modal-title" className="text-sky-700 font-bold mb-2">
                            {selectedEntry.mode}
                            {selectedEntry.sub ? ` · ${selectedEntry.sub}` : ""}
                        </p>
                        <p className="italic text-gray-600 mb-5">
                            &ldquo;{selectedEntry.hook}&rdquo;
                        </p>
                        <p className="text-2xl font-bold leading-snug text-black mb-6">
                            {selectedEntry.stop}
                        </p>
                        <div className="border-l-2 border-sky-700 pl-4 mb-7">
                            <span className="block font-bold text-sky-700 mb-1">
                                10-Second Physical Interrupt
                            </span>
                            <p className="text-black">{selectedEntry.move}</p>

                            {selectedEntry.timerSeconds !== null && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
                                    <span className="font-mono text-xl font-bold tabular-nums text-black" aria-live="off">
                                        {selectedTimer
                                            ? selectedTimer.status === "done"
                                                ? "0:00 — Time's up!"
                                                : formatDuration(selectedTimer.remainingMs / 1000)
                                            : formatDuration(selectedEntry.timerSeconds)}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {!selectedTimer || selectedTimer.status === "done" ? (
                                            <button
                                                type="button"
                                                onClick={() => startTimerForEntry(selectedEntry)}
                                                className="border border-sky-700 bg-sky-700 text-white px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-800"
                                            >
                                                {selectedTimer?.status === "done" ? "Restart timer" : "Start timer"}
                                            </button>
                                        ) : selectedTimer.status === "running" ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={pauseTimer}
                                                    className="border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                                                >
                                                    Pause
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={clearTimer}
                                                    className="border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                                                >
                                                    Reset
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={resumeTimer}
                                                    className="border border-sky-700 bg-sky-700 text-white px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-800"
                                                >
                                                    Resume
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={clearTimer}
                                                    className="border border-sky-700 text-sky-700 px-3 py-1 rounded-md text-base cursor-pointer hover:bg-sky-50"
                                                >
                                                    Reset
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            className="w-full border border-sky-700 bg-sky-700 text-white px-4 py-2 rounded-md text-base cursor-pointer hover:bg-sky-800"
                        >
                            Executing — Return to Work (Esc)
                        </button>
                    </div>
                )}
            </dialog>
        </div>
    );
}
