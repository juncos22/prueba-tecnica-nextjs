import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { getProjectsByTenant } from '@/core/application/use-cases';
import { ProjectList } from '@/ui/components/project-list';

/**
 * Projects List Page (Server Component)
 * Fetching de datos en el servidor
 * Pasa los datos al Client Component para manejar interactividad
 */

interface ProjectsPageProps {
  params: Promise<{ tenant: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { tenant } = await params;

  // Inicializar repositorio
  const repository = new MockProjectRepository();

  // Fetch de datos en el servidor usando use case
  const projects = await getProjectsByTenant(repository, tenant);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600">
          Manage all projects for your organization
        </p>
      </div>

      {/* Client Component para interactividad (filtros) */}
      <ProjectList projects={projects} tenantId={tenant} />
    </div>
  );
}
