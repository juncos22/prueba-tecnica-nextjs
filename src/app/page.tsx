import Link from 'next/link';

/**
 * Root Page - Landing
 * Muestra ejemplos de single-tenant y multi-tenant
 * En producción, esto podría ser autenticación o tenant selection
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Multi-Tenant SaaS Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Next.js 16 • App Router • TypeScript • Functional Architecture
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 Quick Access
          </h2>
          <p className="text-gray-600 mb-6">
            Choose single organization or combine multiple
          </p>

          <div className="space-y-3 mb-6">
            <Link
              href="/acme/dashboard"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
            >
              Acme Corporation →
            </Link>
            <Link
              href="/umbrella/dashboard"
              className="block w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center font-medium"
            >
              Umbrella Corporation →
            </Link>
            <Link
              href="/acme+umbrella/dashboard"
              className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-center font-medium"
            >
              🔥 Acme + Umbrella (Multi-Tenant) →
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              📝 URL Format Examples
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded font-mono text-xs">
                /acme/dashboard
                <span className="text-gray-400 ml-2">← Single tenant</span>
              </div>
              <div className="p-3 bg-gray-50 rounded font-mono text-xs">
                /acme+umbrella/projects
                <span className="text-gray-400 ml-2">← Multiple tenants</span>
              </div>
              <div className="p-3 bg-gray-50 rounded font-mono text-xs">
                /acme,umbrella/dashboard
                <span className="text-gray-400 ml-2">← Comma also works</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              <strong>💡 Pro tip:</strong> Separate tenant IDs with{' '}
              <code className="bg-gray-200 px-1 rounded">+</code> or{' '}
              <code className="bg-gray-200 px-1 rounded">,</code>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Architecture Highlights
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Tenant Isolation
              </h4>
              <p className="text-sm text-gray-600">
                Data completely isolated per tenant
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Pure Functions
              </h4>
              <p className="text-sm text-gray-600">
                100% testable domain logic
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Use Cases Pattern
              </h4>
              <p className="text-sm text-gray-600">
                Clean Architecture principles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
