# Multi-Tenant SaaS Dashboard - Prueba Técnica Next.js

Dashboard multi-tenant para gestión de proyectos construido con Next.js 16 (App Router), TypeScript y Tailwind CSS.

## 🚀 Demo

- **Demo URL**: [Deployed on Vercel](#)
- **Tenants disponibles**:
  - `/acme/dashboard` - Acme Corporation
  - `/umbrella/dashboard` - Umbrella Corporation

## 📋 Decisiones Técnicas Clave

### 1. Arquitectura Multi-Tenant

**Decisión**: Aislamiento completo de datos por tenant a nivel de repositorio.

**Implementación**:
- Cada tenant se identifica por su slug en la URL (`/[tenant]/...`)
- Validación del tenant en el layout padre (`src/app/[tenant]/layout.tsx`)
- El Patrón Repository valida que cada query incluya el `tenantId`
- Los datos mock están estructurados en un `Record<string, Project[]>` indexado por tenant

**Beneficios**:
- Seguridad: imposible acceder a datos de otro tenant
- Escalabilidad: fácil migrar a base de datos con cláusulas WHERE por tenant
- Testeable: cada tenant es una unidad aislada

### 2. Server vs Client Components

**Estrategia clara de separación**:

**Server Components** (sin `'use client'`):
- `src/app/[tenant]/layout.tsx` - Validación y fetching de tenant
- `src/app/[tenant]/dashboard/page.tsx` - Fetching de estadísticas
- `src/app/[tenant]/projects/page.tsx` - Fetching de proyectos
- `src/app/[tenant]/projects/[id]/page.tsx` - Fetching de proyecto individual
- `src/ui/components/dashboard-stats.tsx` - Componente puramente visual

**Client Components** (con `'use client'`):
- `src/ui/components/project-list.tsx` - Filtrado interactivo
- `src/ui/components/project-card.tsx` - Navegación con stados de hover

**Razón**:
- Fetching en servidor = mejor SEO, menos JavaScript en el cliente
- Interactividad en cliente = mejor UX sin recargas
- Los Server Components pasan datos serializables a Client Components

### 3. Arquitectura por Capas (DDD-inspired + Functional Programming)

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/        # Entidades (tipos)
│   │   ├── logic/           # Funciones puras (lógica de negocio)
│   │   └── repositories/    # Interfaces
│   └── application/
│       └── use-cases/       # Use Cases (orquestación)
├── infrastructure/          # Implementaciones concretas (mock data, repositories)
└── ui/                      # Componentes de presentación
```

**Beneficios**:
- **Dominio independiente**: Las entidades no dependen de nada
- **Funciones puras**: Toda la lógica de negocio es testeable sin mocks
- **Use Cases**: Orquestación clara y separada de la lógica pura
- **Intercambiable**: Cambiar de mock a DB real solamente requiere cambiar la capa de infraestructura
- **Escalable**: Cada capa tiene una responsabilidad única

### 4. Patrones de Diseño Aplicados

#### Repository Pattern
```typescript
// Interface en dominio
interface IProjectRepository {
  findByTenantId(tenantId: string): Promise<Project[]>;
  findByIdAndTenant(id: string, tenantId: string): Promise<Project | null>;
}

// Implementación en infraestructura
class MockProjectRepository implements IProjectRepository { ... }
```

**Ventaja**: Desacopla la lógica de negocio del almacenamiento de datos.

#### Use Cases + Pure Functions Pattern

**Funciones puras en el dominio**:
```typescript
// src/core/domain/logic/count-projects-by-status.ts
export function countProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return projects.filter((p) => p.status === status).length;
}

// src/core/domain/logic/calculate-dashboard-stats.ts
export function calculateDashboardStats(projects: Project[]): DashboardStats {
  return {
    totalProjects: projects.length,
    activeProjects: countProjectsByStatus(projects, 'active'),
    archivedProjects: countProjectsByStatus(projects, 'archived'),
  };
}
```

**Use Cases en la capa de aplicación** (orquestación):
```typescript
// src/core/application/use-cases/get-dashboard-stats.ts
export async function getDashboardStats(
  repository: IProjectRepository,
  tenantId: string
): Promise<DashboardStats> {
  const projects = await repository.findByTenantId(tenantId);
  return calculateDashboardStats(projects); // Función pura
}
```

**Ventajas**:
- **Funciones puras = Tests triviales**: No necesitan mocks, solo input/output
- **Composabilidad**: Las funciones puras se pueden combinar fácilmente
- **Tree-shaking**: Solo importas lo que usas

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── [tenant]/
│   │   ├── layout.tsx              # Validación de tenant + navegación
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Server Component - Dashboard
│   │   └── projects/
│   │       ├── page.tsx            # Server Component - Lista de proyectos
│   │       └── [id]/
│   │           └── page.tsx        # Server Component - Detalle de proyecto
│   ├── layout.tsx                  # Layout raíz
│   └── page.tsx                    # Redirect a /acme/dashboard
│
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── tenant.ts           # Entity: Tenant
│   │   │   └── project.ts          # Entity: Project
│   │   ├── logic/
│   │   │   ├── count-projects-by-status.ts     # Función pura
│   │   │   ├── filter-projects-by-status.ts    # Función pura
│   │   │   ├── calculate-dashboard-stats.ts    # Función pura
│   │   │   └── index.ts            # Barrel export
│   │   └── repositories/
│   │       └── project-repository.interface.ts  # Interface del Repository
│   └── application/
│       └── use-cases/
│           ├── get-projects-by-tenant.ts       # Use Case
│           ├── get-project-by-id.ts            # Use Case
│           ├── get-tenant-info.ts              # Use Case
│           ├── get-dashboard-stats.ts          # Use Case
│           └── index.ts            # Barrel export
│
├── infrastructure/
│   ├── data/
│   │   └── mock-data.ts            # Datos mock por tenant
│   └── repositories/
│       └── mock-project.repository.ts  # Implementación del Repository
│
└── ui/
    └── components/
        ├── dashboard-stats.tsx     # Server Component - Estadísticas
        ├── project-list.tsx        # Client Component - Lista con filtros
        └── project-card.tsx        # Client Component - Tarjeta de proyecto
```

## 🛠️ Tecnologías

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4**
- **pnpm** (Package manager)

## 🚀 Instalación y Ejecución (Require tener Pnpm instalado)

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo
pnpm dev

# Build de producción
pnpm build

# Ejecutar build
pnpm start
```

Abrir [http://localhost:3000](http://localhost:3000) - redirigirá a `/acme/dashboard`.

## 🔗 URLs Disponibles

### Tenant: Acme Corporation
- `/acme/dashboard` - Dashboard con estadísticas
- `/acme/projects` - Lista de proyectos (con filtros)
- `/acme/projects/acme-1` - Detalle del proyecto "Website Redesign"
- `/acme/projects/acme-2` - Detalle del proyecto "Mobile App Development"
- `/acme/projects/acme-3` - Detalle del proyecto "Legacy System Migration"

### Tenant: Umbrella Corporation
- `/umbrella/dashboard` - Dashboard con estadísticas
- `/umbrella/projects` - Lista de proyectos
- `/umbrella/projects/umbrella-1` - Detalle del proyecto "Research Platform"
- `/umbrella/projects/umbrella-2` - Detalle del proyecto "Security Audit"

### Validación de Seguridad
- `/acme/projects/umbrella-1` - ❌ 404 (proyecto no pertenece al tenant)
- `/invalid-tenant/dashboard` - ❌ 404 (tenant no existe)

## ✅ Requisitos Cumplidos

### Funcionales
- ✅ Multi-tenant con slug en URL (`/[tenant]/...`)
- ✅ Aislamiento de datos por tenant
- ✅ Dashboard con nombre del tenant y total de proyectos
- ✅ Lista de proyectos con filtros (active/archived)
- ✅ Detalle de proyecto con validación de tenant
- ✅ Server Components para fetching
- ✅ Client Components para interactividad

### Arquitectónicos
- ✅ Separación clara Server/Client Components
- ✅ Patrón Repository
- ✅ Use Cases + Pure Functions (Functional Programming)
- ✅ Arquitectura en capas (Domain, Application, Infrastructure, UI)
- ✅ Lógica de negocio 100% testeable sin mocks
- ✅ Mock data fácilmente reemplazable

### Deploy
- ✅ Repositorio público en GitHub
- ✅ Commits descriptivos
- ✅ README con decisiones técnicas
- 🔄 Deploy en Vercel (pendiente)

## 🎯 Qué Mejoraría con Más Tiempo

### 1. Testing
- Unit tests para el Service Layer (lógica pura = fácil de testear)
- Integration tests para el Repository
- E2E tests con Playwright para flujos críticos

### 2. Estado y Caché
- React Server Components con `revalidate` para caché automático
- Optimistic UI en filtros con `useOptimistic`
- Suspense boundaries con loading states más granulares

### 3. Seguridad
- Middleware de Next.js para validación de tenant antes del rendering
- Rate limiting por tenant
- Autenticación real (NextAuth.js o similar)

### 4. Performance
- Lazy loading de componentes pesados
- Image optimization para futuros assets
- Implementar React Compiler (en Next.js 16)

### 5. Developer Experience
- ESLint rules custom para arquitectura (enforce layering)
- Husky pre-commit hooks
- CI/CD con tests automáticos
- Storybook para componentes UI

### 6. Base de Datos Real
```typescript
// Migración trivial gracias a Repository Pattern
class PostgresProjectRepository implements IProjectRepository {
  constructor(private db: PostgresClient) {}

  async findByTenantId(tenantId: string): Promise<Project[]> {
    return this.db.query(
      'SELECT * FROM projects WHERE tenant_id = $1',
      [tenantId]
    );
  }
}

// En la app, cambiar:
// const repo = new MockProjectRepository();
// por:
// const repo = new PostgresProjectRepository(db);
```

## 🚫 Qué Conscientemente Dejé Fuera

### 1. Estética Avanzada
- Animaciones complejas (no requerido por la prueba)
- Sistema de temas dinámico (dark mode ya configurado pero no usado)
- Iconos customizados (usar SVGs inline en producción)

### 2. Features de Producto
- Crear/editar/eliminar proyectos (CRUD completo)
- Búsqueda/ordenamiento avanzado
- Paginación (los datasets de ejemplo son pequeños)
- Dashboard con gráficas (Chart.js/Recharts)

### 3. Internacionalización
- i18n (no requerido, pero fácil de agregar con `next-intl`)

### 4. Gestión de Estado Global
- No necesario: Server Components + props es suficiente
- En app real con auth: Context API o Zustand para sesiones de usuario

### 5. Logging y Observabilidad
- Sentry para tracking de errores
- Analytics (Vercel Analytics / Google Analytics)
- Performance monitoring

### 6. Landing Page con algún tenant por defecto (Traído de una DB real)
- No requerido por la prueba
- El proyecto en sí deja un tenant por defecto: `/acme/dashboard`

## 📝 Notas de Implementación

### Por qué Mock con Latencia Simulada
```typescript
private async simulateDelay(): Promise<void> {
  const delay = Math.random() * 100 + 50; // 50-150ms
  return new Promise((resolve) => setTimeout(resolve, delay));
}
```
**Razón**: Ayuda a identificar race conditions y mejora la experiencia de desarrollo al simular condiciones reales de red.

### Por qué Funciones Puras en Domain Logic
```typescript
// src/core/domain/logic/count-projects-by-status.ts
export function countProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return projects.filter((p) => p.status === status).length;
}
```
**Razón**: Fáciles de testear (sin mocks necesarios), predecibles, y componibles. Sin side effects = sin bugs ocultos. Separadas en archivos individuales para mejor organización y tree-shaking.

### Por qué la interfaz Repository en Domain
**Razón**: Dependency Inversion Principle (SOLID). El dominio define QUÉ necesita, la infraestructura implementa CÓMO lo obtiene.

### Por qué Use Cases en lugar de Service Classes
```typescript
export async function getDashboardStats(
  repository: IProjectRepository,
  tenantId: string
) { /* ... */ }
// Uso: getDashboardStats(repository, tenantId)
```

**Razón**: Más simple, no hay estado oculto, no hay `this`, mejor para tree-shaking, alineado con la filosofía funcional de React.
