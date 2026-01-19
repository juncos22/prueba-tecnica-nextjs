import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';
import {
  calculateDashboardStats,
  DashboardStats,
} from '@/core/domain/logic';

/**
 * Use Case: Get Dashboard Stats
 * Obtiene estadísticas del dashboard
 * Orquesta la obtención de datos y aplica lógica de dominio
 */
export async function getDashboardStats(
  repository: IProjectRepository,
  tenantId: string
): Promise<DashboardStats> {
  const projects = await repository.findByTenantId(tenantId);
  return calculateDashboardStats(projects);
}
