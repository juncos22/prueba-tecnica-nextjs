/**
 * Función pura para parsear un slug de tenants
 * Soporta múltiples tenants separados por '+' o ','
 *
 * Ejemplos:
 * - "acme" -> ["acme"]
 * - "acme+umbrella" -> ["acme", "umbrella"]
 * - "acme,umbrella" -> ["acme", "umbrella"]
 */
export function parseTenantSlug(slug: string): string[] {
  // Normalizar: reemplazar ',' y variantes de '+' por un único '+'
  const normalized = slug.replace(/%2B|%2C|[+,]+/gi, '+');

  // Split por '+' y filtrar strings vacíos
  return normalized
    .split('+')
    .map((tenant) => tenant.trim())
    .filter((tenant) => tenant.length > 0);
}

/**
 * Función pura para crear un slug de múltiples tenants
 */
export function createTenantSlug(tenants: string[]): string {
  return tenants.join('+');
}

/**
 * Función pura para verificar si un slug es multi-tenant
 */
export function isMultiTenant(slug: string): boolean {
  return slug.includes('+') || slug.includes(',');
}
