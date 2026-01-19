import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { parseTenantSlug } from '@/core/domain/logic';

/**
 * Multi-Tenant Layout (Server Component)
 * Soporta múltiples tenants en la URL separados por '+' o ','
 * Ejemplo: /acme+umbrella/dashboard
 */

interface MultiTenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenants: string }>;
}

export default async function MultiTenantLayout({
  children,
  params,
}: MultiTenantLayoutProps) {
  const { tenants: tenantsSlug } = await params;

  // Parsear el slug para obtener los IDs de tenants
  const tenantIds = parseTenantSlug(tenantsSlug);

  // Validar que haya al menos un tenant
  if (tenantIds.length === 0) {
    notFound();
  }

  // Inicializar repositorio
  const repository = new MockProjectRepository();

  // Validar que todos los tenants existen
  const tenantInfos = await repository.findTenantsByIds(tenantIds);

  if (tenantInfos.length !== tenantIds.length) {
    notFound();
  }

  const displayName =
    tenantInfos.length === 1
      ? tenantInfos[0].name
      : tenantInfos.map((t) => t.name).join(' + ');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {displayName}
                </h1>
                {tenantInfos.length > 1 && (
                  <p className="text-xs text-gray-500">
                    Multi-tenant view ({tenantInfos.length} organizations)
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/${tenantsSlug}/dashboard`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/${tenantsSlug}/projects`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
