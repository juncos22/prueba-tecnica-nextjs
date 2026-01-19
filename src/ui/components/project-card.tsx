'use client';

import { Project } from '@/core/domain/entities/project';
import Link from 'next/link';

/**
 * ProjectCard Component (Client Component)
 * Muestra un proyecto individual con interactividad
 */

interface ProjectCardProps {
  project: Project;
  tenantId: string;
}

export function ProjectCard({ project, tenantId }: ProjectCardProps) {
  const statusColor =
    project.status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';

  return (
    <Link
      href={`/${tenantId}/projects/${project.id}`}
      className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {project.status}
        </span>
      </div>
      {project.description && (
        <p className="text-gray-600 mt-2">{project.description}</p>
      )}
      <p className="text-gray-400 text-sm mt-4">
        Created: {project.createdAt.toLocaleDateString()}
      </p>
    </Link>
  );
}
