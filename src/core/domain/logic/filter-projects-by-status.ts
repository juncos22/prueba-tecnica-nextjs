import { Project, ProjectStatus } from '@/core/domain/entities/project';

/**
 * Función pura para filtrar proyectos por estado
 * No tiene side effects, solo transforma datos
 */
export function filterProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): Project[] {
  return projects.filter((p) => p.status === status);
}
