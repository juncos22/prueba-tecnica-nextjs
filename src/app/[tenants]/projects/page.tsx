import {MockProjectRepository} from '@/infrastructure/repositories/mock-project.repository';
import {getMultiTenantProjects} from '@/core/application/use-cases';
import {parseTenantSlug} from '@/core/domain/logic';
import {ProjectList} from '@/ui/components/project-list';

/**
 * Multi-Tenant Projects Page (Server Component)
 * Muestra proyectos de múltiples tenants
 */

interface MultiTenantProjectsPageProps {
    params: Promise<{ tenants: string }>;
}

export default async function MultiTenantProjectsPage({
                                                          params,
                                                      }: MultiTenantProjectsPageProps) {
    const {tenants: tenantsSlug} = await params;
    // Parsear tenants del slug
    const tenantIds = parseTenantSlug(tenantsSlug);

    // Inicializar repositorio
    const repository = new MockProjectRepository();

    // Fetch de proyectos combinados
    const projects = await getMultiTenantProjects(repository, tenantIds);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Multi-Tenant Projects
                </h1>
            </div>
            {/* Client Component para filtros */}
            {
                Array.from(projects.entries()).map(([key, tenantProjects]) => (
                    <div key={key} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 capitalize text-black">{key} Projects</h2>
                        <ProjectList tenantsSlug={tenantsSlug} projects={tenantProjects} tenantId={tenantsSlug}/>
                    </div>
                ))
            }
        </div>
    );
}
