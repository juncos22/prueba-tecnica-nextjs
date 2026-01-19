import { Tenant } from '@/core/domain/entities/tenant';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';

/**
 * Use Case: Get Tenant Info
 * Obtiene información del tenant
 */
export async function getTenantInfo(
  repository: IProjectRepository,
  tenantId: string
): Promise<Tenant | null> {
  return repository.findTenantById(tenantId);
}
