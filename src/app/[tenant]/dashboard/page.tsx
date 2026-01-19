import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { getTenantInfo, getDashboardStats } from '@/core/application/use-cases';
import { DashboardStats } from '@/ui/components/dashboard-stats';

/**
 * Dashboard Page (Server Component)
 * Fetching de datos en el servidor
 * No necesita 'use client'
 */

interface DashboardPageProps {
  params: Promise<{ tenant: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { tenant } = await params;

  // Inicializar repositorio
  const repository = new MockProjectRepository();

  // Fetch de datos en el servidor usando use cases
  const tenantInfo = await getTenantInfo(repository, tenant);
  const stats = await getDashboardStats(repository, tenant);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to {tenantInfo?.name} dashboard
        </p>
      </div>

      <DashboardStats
        totalProjects={stats.totalProjects}
        activeProjects={stats.activeProjects}
        archivedProjects={stats.archivedProjects}
      />

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Quick Stats
        </h2>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>
            {stats.activeProjects} active project
            {stats.activeProjects !== 1 ? 's' : ''} in progress
          </li>
          <li>
            {stats.archivedProjects} project
            {stats.archivedProjects !== 1 ? 's' : ''} archived
          </li>
          <li>Total: {stats.totalProjects} projects</li>
        </ul>
      </div>
    </div>
  );
}
