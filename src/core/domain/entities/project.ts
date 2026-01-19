/**
 * Project Entity
 * Representa un proyecto dentro de un tenant
 */
export type ProjectStatus = 'active' | 'archived';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  tenantId: string;
  description?: string;
  createdAt: Date;
}
