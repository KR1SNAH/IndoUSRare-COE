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

export function matchesQuery(coe: Coe, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    coe.name.toLowerCase().includes(q) ||
    coe.city.toLowerCase().includes(q) ||
    coe.state.toLowerCase().includes(q)
  );
}
