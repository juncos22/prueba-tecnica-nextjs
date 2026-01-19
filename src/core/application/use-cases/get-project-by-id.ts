import { Project } from '@/core/domain/entities/project';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';

/**
 * Use Case: Get Project by ID
 * Obtiene un proyecto específico validando que pertenezca al tenant
 */
export async function getProjectById(
  repository: IProjectRepository,
  projectId: string,
  tenantId: string
): Promise<Project | null> {
  return repository.findByIdAndTenant(projectId, tenantId);
}
