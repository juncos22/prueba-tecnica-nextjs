import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { getMultiTenantStats } from '@/core/application/use-cases';
import { parseTenantSlug } from '@/core/domain/logic';
import {DashboardStats} from "@/ui/components/dashboard-stats";

/**
 * Multi-Tenant Dashboard Page (Server Component)
 * Muestra estadísticas agregadas de múltiples tenants
 */

interface MultiTenantDashboardPageProps {
  params: Promise<{ tenants: string }>;
}

export default async function MultiTenantDashboardPage({
  params,
}: MultiTenantDashboardPageProps) {
  const { tenants: tenantsSlug } = await params;

  // Parsear tenants del slug
  const tenantIds = parseTenantSlug(tenantsSlug);

  // Inicializar repositorio
  const repository = new MockProjectRepository();

  // Fetch de datos usando use case
  const stats = await getMultiTenantStats(repository, tenantIds);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Multi-Tenant Dashboard
        </h1>
        <p className="text-gray-600">
          Viewing data from {stats.tenants.length} organization
          {stats.tenants.length > 1 ? 's' : ''}
        </p>
      </div>

      {
        stats.tenants.map((tenant) => (
            <DashboardStats key={tenant.id} tenantName={tenant.name} totalProjects={tenant.projectCount} activeProjects={tenant.activeProjects} archivedProjects={tenant.archivedProjects} />
        ))
      }
    </div>
  );
}
