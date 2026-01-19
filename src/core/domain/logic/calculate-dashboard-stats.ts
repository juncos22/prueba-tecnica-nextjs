import { Project } from '@/core/domain/entities/project';
import { countProjectsByStatus } from '@/core/domain/logic/count-projects-by-status';

/**
 * Función pura para calcular estadísticas del dashboard
 * Composición de funciones puras
 */
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  archivedProjects: number;
}

export function calculateDashboardStats(projects: Project[]): DashboardStats {
  return {
    totalProjects: projects.length,
    activeProjects: countProjectsByStatus(projects, 'active'),
    archivedProjects: countProjectsByStatus(projects, 'archived'),
  };
}
