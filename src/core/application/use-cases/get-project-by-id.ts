import { Project } from '@/core/domain/entities/project';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';

/**
 * Use Case: Get Project by ID
 * Obtiene un proyecto específico validando que pertenezca al tenant
 */
export async function getProjectById(
  repository: IProjectRepository,
  projectId: string,
  tenantIds: string[]
): Promise<Project | null> {
  for (const tenantId of tenantIds) {
    const project = await repository.findByIdAndTenant(projectId, tenantId);
    if (project) {
      return project;
    }
  }
  return null;
}
