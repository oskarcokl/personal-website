import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, type Tokens } from "marked";

const FILE_PATH = path.join(process.cwd(), "antirrhetikos.md");

export interface AntirrhetikosEntry {
    mode: string;
    sub: string;
    hook: string;
    stop: string;
    move: string;
    timerSeconds: number | null;
}

export interface AntirrhetikosData {
    title: string;
    subtitle: string;
    entries: AntirrhetikosEntry[];
}

type TextFieldKey = "mode" | "sub" | "hook" | "stop" | "move";
type ColumnKey = TextFieldKey | "timer";

function matchColumn(header: string): ColumnKey | null {
    const normalized = header.trim().toLowerCase();
    if (normalized === "mode" || normalized === "category") return "mode";
    if (normalized.startsWith("sub") || normalized === "pattern" || normalized === "type") return "sub";
    if (normalized.includes("hook") || normalized.includes("trigger") || normalized.includes("thought")) return "hook";
    if (normalized.includes("counter") || normalized.includes("stop") || normalized.includes("script")) return "stop";
    if (normalized.includes("interrupt") || normalized.includes("move") || normalized.includes("action")) return "move";
    if (normalized === "timer" || normalized === "duration") return "timer";
    return null;
}

function cleanCell(text: string): string {
    return text.replace(/\\\|/g, "|").trim();
}

/** Extracts a duration in seconds from text like "5-minute timer", "60 seconds", or "1:30". */
export function parseTimerSeconds(text: string): number | null {
    const clockMatch = text.match(/\b(\d+):([0-5]\d)\b/);
    if (clockMatch) {
        const minutes = Number(clockMatch[1]);
        const seconds = Number(clockMatch[2]);
        const total = minutes * 60 + seconds;
        return total > 0 ? total : null;
    }

    const unitMatch = text.match(/\b(\d+)\s*[-\s]?(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/i);
    if (!unitMatch) return null;

    const value = Number(unitMatch[1]);
    if (!Number.isFinite(value) || value <= 0) return null;

    const unit = unitMatch[2].toLowerCase();
    if (unit.startsWith("h")) return value * 3600;
    if (unit.startsWith("m")) return value * 60;
    return value;
}

function parseTableEntries(table: Tokens.Table): AntirrhetikosEntry[] {
    const fallbackOrder: TextFieldKey[] = ["mode", "sub", "hook", "stop", "move"];
    const columnMap = table.header.map((cell, index) => matchColumn(cell.text) ?? fallbackOrder[index] ?? null);

    return table.rows
        .map((row) => {
            const entry: AntirrhetikosEntry = {
                mode: "",
                sub: "",
                hook: "",
                stop: "",
                move: "",
                timerSeconds: null,
            };
            let explicitTimer: number | null = null;

            row.forEach((cell, index) => {
                const key = columnMap[index];
                if (!key) return;
                const value = cleanCell(cell.text);
                if (key === "timer") {
                    explicitTimer = parseTimerSeconds(value);
                } else {
                    entry[key] = value;
                }
            });

            entry.timerSeconds = explicitTimer ?? parseTimerSeconds(entry.move);
            return entry;
        })
        .filter((entry) => entry.hook || entry.stop || entry.move);
}

/** Reads antirrhetikos.md: frontmatter holds title/subtitle, the GFM table holds the lookup rows. */
export function getAntirrhetikos(): AntirrhetikosData {
    const parsed = matter(fs.readFileSync(FILE_PATH, "utf-8"));
    const data = parsed.data ?? {};
    const tokens = marked.lexer(parsed.content);

    const entries = tokens
        .filter((token): token is Tokens.Table => token.type === "table")
        .flatMap(parseTableEntries);

    return {
        title: data.title ? String(data.title) : "Antirrhetikos",
        subtitle: data.subtitle
            ? String(data.subtitle)
            : "Recognize the camouflage. Fire the counter-script. Drop the thread.",
        entries,
    };
}
