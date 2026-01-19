/**
 * Función pura para parsear segmentos de tenants de una catch-all route
 * Next.js convierte /acme/umbrella en ["acme", "umbrella"]
 *
 * También soporta el formato antiguo con separadores:
 * - "acme+umbrella" -> ["acme", "umbrella"]
 * - "acme,umbrella" -> ["acme", "umbrella"]
 */
export function parseTenantSegments(segments: string | string[]): string[] {
  // Si es un array, ya viene parseado por Next.js
  if (Array.isArray(segments)) {
    return segments.filter(s => s.length > 0);
  }

  // Si es un string (retrocompatibilidad), usar el parser antiguo
  const normalized = segments.replace(/%2B|%2C|[+,]+/gi, '+');
  return normalized
    .split('+')
    .map((tenant) => tenant.trim())
    .filter((tenant) => tenant.length > 0);
}

/**
 * Función pura para crear un path de múltiples tenants
 * Usa el formato /tenant1/tenant2 (sin separadores)
 */
export function createTenantPath(tenants: string[]): string {
  return tenants.join('/');
}

/**
 * Función pura para verificar si son múltiples tenants
 */
export function isMultiTenant(segments: string | string[]): boolean {
  if (Array.isArray(segments)) {
    return segments.length > 1;
  }
  return segments.includes('+') || segments.includes(',');
}
