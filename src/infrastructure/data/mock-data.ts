import { Project } from '@/core/domain/entities/project';
import { Tenant } from '@/core/domain/entities/tenant';

/**
 * Mock Data
 * Datos aislados por tenant para simular un sistema multi-tenant
 * Diseñado para ser fácilmente reemplazable por una base de datos real
 */

export const TENANTS: Record<string, Tenant> = {
  acme: {
    id: 'acme',
    name: 'Acme Corporation',
  },
  umbrella: {
    id: 'umbrella',
    name: 'Umbrella Corporation',
  },
};

export const PROJECTS: Record<string, Project[]> = {
  acme: [
    {
      id: 'acme-1',
      name: 'Website Redesign',
      status: 'active',
      tenantId: 'acme',
      description: 'Complete redesign of the corporate website',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'acme-2',
      name: 'Mobile App Development',
      status: 'active',
      tenantId: 'acme',
      description: 'Native mobile application for iOS and Android',
      createdAt: new Date('2024-02-20'),
    },
    {
      id: 'acme-3',
      name: 'Legacy System Migration',
      status: 'archived',
      tenantId: 'acme',
      description: 'Migration from old system to new infrastructure',
      createdAt: new Date('2023-11-10'),
    },
  ],
  umbrella: [
    {
      id: 'umbrella-1',
      name: 'Research Platform',
      status: 'active',
      tenantId: 'umbrella',
      description: 'Internal research and development platform',
      createdAt: new Date('2024-03-01'),
    },
    {
      id: 'umbrella-2',
      name: 'Security Audit',
      status: 'archived',
      tenantId: 'umbrella',
      description: 'Comprehensive security audit of all systems',
      createdAt: new Date('2023-12-05'),
    },
  ],
};
