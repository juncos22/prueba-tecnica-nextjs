import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { getProjectById } from "@/core/application/use-cases";
import { parseTenantSlug } from "@/core/domain/logic";

/**
 * Project Detail Page (Server Component)
 * Soporta búsqueda de proyecto en múltiples tenants
 * Valida que el proyecto pertenezca a uno de los tenants especificados
 */

interface ProjectDetailPageProps {
    params: Promise<{ tenants: string; id: string }>;
}

export default async function ProjectDetailPage({
                                                    params,
                                                }: ProjectDetailPageProps) {
    const { tenants, id } = await params;

    // Parsear tenants del slug
    const tenantIds = parseTenantSlug(tenants);

    // Inicializar repositorio
    const repository = new MockProjectRepository();

    // Buscar el proyecto en todos los tenants especificados
    const project = await getProjectById(repository, id, tenantIds);
    
    // Si el proyecto no existe en ninguno de los tenants, 404
    if (!project) {
        notFound();
    }

    const statusColor = project.status === 'active'
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-gray-100 text-gray-800 border-gray-200';

    return (
        <div>
            <div className="mb-6">
                <Link
                    href={`/${tenants}/projects`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                >
                    ← Back to Projects
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${statusColor}`}
                    >
            {project.status}
          </span>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-medium text-gray-600 mb-2">
                            Description
                        </h2>
                        <p className="text-gray-900">
                            {project.description || 'No description provided'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-sm font-medium text-gray-600 mb-2">
                                Project ID
                            </h2>
                            <p className="text-gray-900 font-mono">{project.id}</p>
                        </div>

                        <div>
                            <h2 className="text-sm font-medium text-gray-600 mb-2">
                                Created At
                            </h2>
                            <p className="text-gray-900">
                                {project.createdAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
