/**
 * DashboardStats Component (Server Component)
 * No necesita 'use client' porque no tiene interactividad
 * Renderiza solo en el servidor
 */

interface DashboardStatsProps {
  totalProjects: number;
  activeProjects: number;
  archivedProjects: number;
}

export function DashboardStats({
  totalProjects,
  activeProjects,
  archivedProjects,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Total Projects
        </h3>
        <p className="text-4xl font-bold text-gray-900">{totalProjects}</p>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Active Projects
        </h3>
        <p className="text-4xl font-bold text-green-600">{activeProjects}</p>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Archived Projects
        </h3>
        <p className="text-4xl font-bold text-gray-600">{archivedProjects}</p>
      </div>
    </div>
  );
}
