import type { Coe } from "../types";

export function isUrl(value: string | undefined): value is string {
  return !!value && /^https?:\/\//i.test(value.trim());
}

/** The Staff/Contacts columns in the source data aren't consistent about
 * which one holds a staff-directory URL vs free-text contact info, so pick
 * by shape rather than by column name. */
export function getStaffDirectoryUrl(coe: Coe): string | undefined {
  if (isUrl(coe.staff)) return coe.staff;
  if (isUrl(coe.contacts)) return coe.contacts;
  return undefined;
}

export function getContactText(coe: Coe): string | undefined {
  if (coe.contacts && !isUrl(coe.contacts)) return coe.contacts;
  if (coe.staff && !isUrl(coe.staff)) return coe.staff;
  return undefined;
}

/** Combining name + address (rather than address alone) lets Google Maps
 * match the actual named place/business entity instead of a bare point. */
function placeQuery(coe: Coe): string {
  return encodeURIComponent(`${coe.name}, ${coe.address}`);
}

export function getDirectionsUrl(coe: Coe): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${placeQuery(coe)}`;
}

export function getMapsPlaceUrl(coe: Coe): string {
  return `https://www.google.com/maps/search/?api=1&query=${placeQuery(coe)}`;
}

const EMAIL_OBFUSCATED_RE = /([a-zA-Z0-9._-]+)\[at\]([a-zA-Z0-9._-]+)\[dot\]([a-zA-Z]{2,})/gi;
const TOKEN_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?\(?\d[\d\s().-]{6,}\d/g;

export interface ContactToken {
  text: string;
  href?: string;
}

/** Splits a line of free-text contact info into plain-text and
 * clickable (mailto:/tel:) segments, so the UI can render each part. */
export function linkifyContactLine(rawLine: string): ContactToken[] {
  const line = rawLine.replace(EMAIL_OBFUSCATED_RE, "$1@$2.$3");
  const tokens: ContactToken[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(TOKEN_RE)) {
    const text = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: line.slice(lastIndex, index) });
    tokens.push(
      text.includes("@")
        ? { text, href: `mailto:${text}` }
        : { text, href: `tel:${text.replace(/[^\d+]/g, "")}` },
    );
    lastIndex = index + text.length;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex) });

  return tokens;
}

export function matchesQuery(coe: Coe, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    coe.name.toLowerCase().includes(q) ||
    coe.city.toLowerCase().includes(q) ||
    coe.state.toLowerCase().includes(q)
  );
}
