import { Project } from '@/core/domain/entities/project';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';


/**
 * Use Case: Get Projects from Multiple Tenants
 * Obtiene y combina proyectos de múltiples tenants
 */
export async function getMultiTenantProjects(
  repository: IProjectRepository,
  tenantIds: string[]
): Promise<Map<string, Project[]>> {
  const projectsByTenant = await repository.findByTenantIds(tenantIds);
  return projectsByTenant;
}
