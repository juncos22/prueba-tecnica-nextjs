'use client';

import { Project } from '@/core/domain/entities/project';
import { ProjectCard } from '@/ui/components/project-card';
import { useState } from 'react';

/**
 * ProjectList Component (Client Component)
 * Maneja la interacción de filtrado de proyectos
 * El fetching de datos se hace en el Server Component
 */

interface ProjectListProps {
  projects: Project[];
  tenantId: string;
  tenantsSlug: string;
}

export function ProjectList({ projects, tenantId, tenantsSlug }: ProjectListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All ({projects.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Active ({projects.filter((p) => p.status === 'active').length})
        </button>
        <button
          onClick={() => setFilter('archived')}
          className={`px-4 py-2 rounded ${
            filter === 'archived'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Archived ({projects.filter((p) => p.status === 'archived').length})
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No projects found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tenantId={tenantId}
              tenantsSlug={tenantsSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
