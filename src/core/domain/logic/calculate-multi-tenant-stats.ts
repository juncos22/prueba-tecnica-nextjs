import {Project} from '@/core/domain/entities/project';
import {Tenant} from '@/core/domain/entities/tenant';
import {countProjectsByStatus} from './count-projects-by-status';

/**
 * Estadísticas extendidas para múltiples tenants
 */
export interface MultiTenantStats {
    tenants: {
        id: string;
        name: string;
        projectCount: number;
        activeProjects: number;
        archivedProjects: number;
    }[];
}

/**
 * Función pura para calcular estadísticas de múltiples tenants
 */
export function calculateMultiTenantStats(
    tenants: Tenant[],
    projectsByTenant: Map<string, Project[]>
): MultiTenantStats {
    const allProjects: Project[] = [];
    const tenantStats: MultiTenantStats['tenants'] = [];

    tenants.forEach((tenant) => {
        const projects = projectsByTenant.get(tenant.id) || [];
        allProjects.push(...projects);

        tenantStats.push({
            id: tenant.id,
            name: tenant.name,
            projectCount: projects.length,
            activeProjects: allProjects.filter(p => p.tenantId === tenant.id && p.status === 'active').length,
            archivedProjects: allProjects.filter(p => p.tenantId === tenant.id && p.status === 'archived').length
        });
    });

    return {
        tenants: tenantStats,
    };
}
