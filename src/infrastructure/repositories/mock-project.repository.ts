import { Project } from '@/core/domain/entities/project';
import { Tenant } from '@/core/domain/entities/tenant';
import { IProjectRepository } from '@/core/domain/repositories/project-repository.interface';
import { PROJECTS, TENANTS } from '@/infrastructure/data/mock-data';

/**
 * Mock Project Repository
 * Implementación del Repository Pattern usando datos en memoria
 * Simula operaciones asíncronas que tendrías con una base de datos real
 */
export class MockProjectRepository implements IProjectRepository {
  /**
   * Obtiene todos los proyectos de un tenant
   * Asegura aislamiento de datos entre tenants
   */
  async findByTenantId(tenantId: string): Promise<Project[]> {
    // Simula latencia de red/DB
    await this.simulateDelay();

    const projects = PROJECTS[tenantId] || [];
    return [...projects]; // Retorna una copia para evitar mutaciones
  }

  /**
   * Obtiene un proyecto específico validando que pertenezca al tenant
   * Crítico para seguridad multi-tenant
   */
  async findByIdAndTenant(
    id: string,
    tenantId: string
  ): Promise<Project | null> {
    await this.simulateDelay();

    const projects = PROJECTS[tenantId] || [];
    const project = projects.find((p) => p.id === id);

    // Validación explícita de tenant para prevenir acceso cruzado
    if (project && project.tenantId !== tenantId) {
      return null;
    }

    return project ? { ...project } : null;
  }

  /**
   * Obtiene todos los proyectos de múltiples tenants
   * Retorna un Map con tenantId como key y lista de proyectos como value
   */
  async findByTenantIds(tenantIds: string[]): Promise<Map<string, Project[]>> {
    await this.simulateDelay();

    const result = new Map<string, Project[]>();

    tenantIds.forEach((tenantId) => {
      const projects = PROJECTS[tenantId] ?? [];
      result.set(tenantId, [...projects]);
    });

    return result;
  }

  /**
   * Obtiene información del tenant
   */
  async findTenantById(tenantId: string): Promise<Tenant | null> {
    await this.simulateDelay();

    const tenant = TENANTS[tenantId];
    return tenant ? { ...tenant } : null;
  }

  /**
   * Obtiene información de múltiples tenants por sus IDs
   * Filtra tenants que no existen
   */
  async findTenantsByIds(tenantIds: string[]): Promise<Tenant[]> {
    await this.simulateDelay();

    const tenants: Tenant[] = [];

    tenantIds.forEach((tenantId) => {
      const tenant = TENANTS[tenantId];
      if (tenant) {
        tenants.push({ ...tenant });
      }
    });

    return tenants;
  }

  /**
   * Cuenta proyectos de un tenant
   */
  async countProjectsByTenant(tenantId: string): Promise<number> {
    await this.simulateDelay();

    const projects = PROJECTS[tenantId] || [];
    return projects.length;
  }

  /**
   * Simula latencia de red/base de datos
   * Hace el mock más realista y ayuda a identificar problemas de UX
   */
  private async simulateDelay(): Promise<void> {
    const delay = Math.random() * 100 + 50; // 50-150ms
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}
