import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MockProjectRepository } from '@/infrastructure/repositories/mock-project.repository';
import { getTenantInfo } from '@/core/application/use-cases';

/**
 * Tenant Layout (Server Component)
 * Valida que el tenant existe antes de renderizar las páginas hijas
 * Proporciona navegación común para todas las páginas del tenant
 */

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  const { tenant } = await params;

  // Inicializar repositorio (en una app real, esto sería via DI)
  const repository = new MockProjectRepository();

  // Validar que el tenant existe
  const tenantInfo = await getTenantInfo(repository, tenant);

  if (!tenantInfo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">
                {tenantInfo.name}
              </h1>
              <div className="flex gap-4">
                <Link
                  href={`/${tenant}/dashboard`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/${tenant}/projects`}
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
