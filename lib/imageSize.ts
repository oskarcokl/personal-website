import fs from "fs";
import path from "path";

/** Reads the pixel size of a PNG or JPEG in /public from its file header. */
export function getPublicImageSize(src: string): { width: number; height: number } | null {
    const filePath = path.join("public", src);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const buf = fs.readFileSync(filePath);

    // PNG: width and height live in the IHDR chunk.
    if (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG") {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // JPEG: walk the markers until a start-of-frame segment.
    if (buf[0] === 0xff && buf[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buf.length) {
            if (buf[offset] !== 0xff) {
                offset++;
                continue;
            }
            const marker = buf[offset + 1];
            const length = buf.readUInt16BE(offset + 2);
            if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
                return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
            }
            offset += 2 + length;
        }
    }

    return null;
}
