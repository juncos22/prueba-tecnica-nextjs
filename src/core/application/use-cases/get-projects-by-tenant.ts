import { Project } from '@/core/domain/entities/project';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';

/**
 * Use Case: Get Projects by Tenant
 * Orquesta la obtención de proyectos de un tenant
 */
export async function getProjectsByTenant(
  repository: IProjectRepository,
  tenantId: string
): Promise<Project[]> {
  return repository.findByTenantId(tenantId);
}
