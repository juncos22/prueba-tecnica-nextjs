import { Project } from '@/core/domain/entities/project';
import { Tenant } from '@/core/domain/entities/tenant';

/**
 * Project Repository Interface
 * Abstracción para el acceso a datos de proyectos
 * Facilita cambiar la implementación (mock -> DB) sin afectar la lógica
 */
export interface IProjectRepository {
  /**
   * Obtiene todos los proyectos de un tenant
   */
  findByTenantId(tenantId: string): Promise<Project[]>;

  /**
   * Obtiene todos los proyectos de múltiples tenants
   */
  findByTenantIds(tenantIds: string[]): Promise<Map<string, Project[]>>;

  /**
   * Obtiene un proyecto por ID y tenant
   * Valida que el proyecto pertenezca al tenant
   */
  findByIdAndTenant(id: string, tenantId: string): Promise<Project | null>;

  /**
   * Obtiene información de un tenant por su ID
   */
  findTenantById(tenantId: string): Promise<Tenant | null>;

  /**
   * Obtiene información de múltiples tenants por sus IDs
   */
  findTenantsByIds(tenantIds: string[]): Promise<Tenant[]>;

  /**
   * Obtiene el conteo de proyectos por estado de un tenant
   */
  countProjectsByTenant(tenantId: string): Promise<number>;
}
