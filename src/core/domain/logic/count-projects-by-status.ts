import { Project, ProjectStatus } from '@/core/domain/entities/project';

/**
 * Función pura para contar proyectos por estado
 * No tiene side effects, solo transforma datos
 */
export function countProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return projects.filter((p) => p.status === status).length;
}
