import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';
import {
  calculateMultiTenantStats,
  MultiTenantStats,
} from '@/core/domain/logic/calculate-multi-tenant-stats';

/**
 * Use Case: Get Multi-Tenant Dashboard Stats
 * Obtiene estadísticas agregadas de múltiples tenants
 */
export async function getMultiTenantStats(
  repository: IProjectRepository,
  tenantIds: string[]
): Promise<MultiTenantStats> {
  // Obtener información de los tenants
  const tenants = await repository.findTenantsByIds(tenantIds);

  // Validar que todos los tenants existen
  if (tenants.length !== tenantIds.length) {
    const foundIds = tenants.map((t) => t.id);
    const missingIds = tenantIds.filter((id) => !foundIds.includes(id));
    throw new Error(`Tenants not found: ${missingIds.join(', ')}`);
  }

  // Obtener proyectos de todos los tenants
  const projectsByTenant = await repository.findByTenantIds(tenantIds);

  return calculateMultiTenantStats(tenants, projectsByTenant);
}
