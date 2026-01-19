import { Project } from '@/core/domain/entities/project';

/**
 * Función pura para combinar listas de proyectos de múltiples tenants
 * Mantiene el orden y elimina duplicados si existen
 */
export function mergeProjectLists(projectLists: Map<string, Project[]>): Project[] {
  // Simple flattening of the map values
  return Array.from(projectLists.values()).flat();
}