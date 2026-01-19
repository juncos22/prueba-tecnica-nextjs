# Multi-Tenant SaaS Dashboard - Prueba Técnica Next.js

Dashboard multi-tenant para gestión de proyectos construido con Next.js 16 (App Router), TypeScript y Tailwind CSS.

## 🚀 Demo

- **Demo Vercel URL**: [Deploy en Vercel](https://prueba-tecnica-nextjs-three.vercel.app)
- **Demo Netlify URL**: [Deploy en Netlify](https://prueba-tecnica-nextjs.netlify.app/)
- **Tenants disponibles**:
  - `/acme/dashboard` - Acme Corporation (Single Tenant)
  - `/umbrella/dashboard` - Umbrella Corporation (Single Tenant)
  - `/acme+umbrella/dashboard` - Multi Tenant View (Separado por `+`)
  - `/acme,umbrella/dashboard` - Multi Tenant View (Separado por `,`)

## 📋 Decisiones Técnicas Clave

### 1. Arquitectura Multi-Tenant y Routing Dinámico

**Decisión**: Aislamiento de datos por tenant y soporte para vistas agregadas multi-tenant.

**Implementación**:
- **Rutas Dinámicas**: `src/app/[tenants]/...` captura uno o más tenants.
- **Parsing Robusto**:
  - Soporte para separadores `+` y `,` (ej. `/acme+umbrella` o `/acme,umbrella`).
  - Manejo de URL encoding (`%2B`, `%2C`) para asegurar compatibilidad con todos los navegadores.
- **Validación**:
  - Verificación de existencia para cada tenant especificado en la URL.
  - Retorno de 404 si algún tenant no existe.
- **Contexto**:
  - El layout (`src/app/[tenants]/layout.tsx`) inyecta el contexto multi-tenant.
  - La navegación ("Back to Projects") maneja la decodificación de la URL original.

**Beneficios**:
- **Flexibilidad**: Los usuarios pueden ver datos de una sola organización o comparar múltiples organizaciones en una sola vista.
- **UX**: Navegación fluida y URLs compartibles y legibles.

### 2. Server vs Client Components

**Estrategia clara de separación**:

**Server Components** (sin `'use client'`):
- `src/app/[tenants]/layout.tsx`: Validación de tenants y estructura general.
- `src/app/[tenants]/dashboard/page.tsx`: Agregación de estadísticas de múltiples tenants.
- `src/app/[tenants]/projects/page.tsx`: Listado de proyectos agrupados por tenant.
- `src/app/[tenants]/projects/[id]/page.tsx`: Detalle de proyecto con búsqueda contextual.
- `src/ui/components/dashboard-stats.tsx`: Presentación de métricas.

**Client Components** (con `'use client'`):
- `src/ui/components/project-list.tsx`: Filtrado interactivo (Active/Archived) sin recarga.
- `src/ui/components/project-card.tsx`: Tarjeta interactiva con navegación.

**Razón**:
- Optimización de carga inicial y SEO con Server Components.
- Interactividad rica en el cliente donde es necesario (filtros).

### 3. Arquitectura por Capas (DDD-inspired + Functional Programming)

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/        # Entidades (tipos)
│   │   ├── logic/           # Funciones puras (parsing, cálculos)
│   │   └── repositories/    # Interfaces
│   └── application/
│       └── use-cases/       # Use Cases (orquestación multi-tenant)
├── infrastructure/          # Implementaciones concretas (mock data, repositories)
└── ui/components            # Componentes de presentación
```

**Beneficios**:
- **Lógica de Negocio Pura**: Funciones como `parseTenantSlug` o `calculateMultiTenantStats` son puras y fáciles de testear.
- **Casos de Uso Claros**: `getMultiTenantStats` encapsula la complejidad de agregar datos de múltiples fuentes.
- **Independencia**: La UI no conoce la procedencia de los datos.

### 4. Patrones de Diseño Aplicados

#### Repository Pattern
```typescript
interface IProjectRepository {
  findByTenantIds(tenantIds: string[]): Promise<Map<string, Project[]>>;
  findByIdAndTenant(id: string, tenantId: string): Promise<Project | null>;
  // ...
}
```
**Ventaja**: Permite cambiar la fuente de datos (Mock vs DB) sin tocar la lógica de negocio ni la UI.

#### Use Cases (Orquestación)
Los casos de uso manejan la lógica de coordinación. Por ejemplo, `getProjectById` ahora acepta múltiples `tenantIds` e itera para encontrar el proyecto en el contexto correcto, abstrayendo esta complejidad de la página.

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── [tenants]/                  # Ruta dinámica para 1 o N tenants
│   │   ├── layout.tsx              # Layout compartido
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard Multi-Tenant
│   │   └── projects/
│   │       ├── page.tsx            # Lista de Proyectos Multi-Tenant
│   │       └── [id]/
│   │           └── page.tsx        # Detalle de Proyecto
│   ├── layout.tsx                  # Root Layout
│   └── page.tsx                    # Redirect
│
├── core/
│   ├── domain/
│   │   ├── logic/
│   │   │   ├── parse-tenant-slug.ts        # Lógica de parsing de URL
│   │   │   ├── calculate-multi-tenant-stats.ts # Agregación de métricas
│   │   │   └── ...
│   └── application/
│       └── use-cases/
│           ├── get-multi-tenant-projects.ts
│           ├── get-multi-tenant-stats.ts
│           └── ...
│
├── infrastructure/
│   └── repositories/
│       └── mock-project.repository.ts  # Soporte para operaciones bulk/multi-tenant
```

## 🛠️ Tecnologías

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4**
- **pnpm** (Package manager)

## 🚀 Instalación y Ejecución (Requiere tener Pnpm instalado)

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

## 🔗 URLs y Navegación

### Single Tenant
- `/acme/dashboard`
- `/umbrella/projects`

### Multi Tenant
- `/acme+umbrella/dashboard`: Muestra tarjetas de estadísticas para ambos tenants.
- `/acme,umbrella/projects`: Muestra listas de proyectos separadas para cada tenant.
- **Navegación**: Al entrar al detalle de un proyecto desde una vista multi-tenant (ej. `/acme+umbrella/projects/p1`), el enlace "Back to Projects" mantiene el contexto (`/acme+umbrella/projects`), preservando la selección del usuario.

## ✅ Funcionalidades Completadas

### Core
- ✅ Soporte completo Multi-Tenant (Single & Multiple view).
- ✅ Parsing avanzado de URLs (soporte `,`, `+`, `%2B`, `%2C`).
- ✅ Aislamiento de datos garantizado por repositorio.
- ✅ Dashboard con métricas agregadas.
- ✅ Listado de proyectos con filtros en cliente.
- ✅ Detalle de proyecto con resolución contextual de tenant.

### Calidad de Código
- ✅ Tipado estricto con TypeScript.
- ✅ Arquitectura limpia (Clean Architecture).
- ✅ Componentes modulares y reutilizables.

## 🚫 Detalles Dejados de Lado Conscientemente

Debido al alcance de la prueba técnica y para priorizar la solidez de la arquitectura multi-tenant, se omitieron deliberadamente los siguientes aspectos:

1.  **CRUD Completo**: La aplicación es de solo lectura. No se implementó la creación, edición o eliminación de proyectos, ya que el foco estaba en la visualización aislada por tenant.
2.  **Autenticación y Autorización**: Se asume que el `tenantId` en la URL es válido tras pasar el layout. En una aplicación real, se usaría un sistema como NextAuth.js para validar que el usuario pertenece efectivamente al tenant que intenta visualizar.
3.  **Estética Avanzada y Gráficos**: Se utilizó un diseño limpio con Tailwind CSS 4, pero se evitaron bibliotecas de gráficos (como Recharts) o animaciones complejas para mantener el bundle ligero y centrarse en la lógica de negocio.
4.  **Internacionalización (i18n)**: El contenido está mayoritariamente en inglés/español mixto (mock data), priorizando la funcionalidad sobre la localización completa.
5.  **Paginación**: Dado que los datasets de prueba son pequeños, se optó por un listado simple en lugar de implementar paginación o infinite scroll.
6. **Estados Globales**: Manejo de estados globales con Context API o Zustand y Persistencia para que conserve los estados modificados en caso de ser necesario.
7. **LocalDB**: Manejo de una base de datos local basada en archivos JSON para organizar mejor la información mockeada.

## 🎯 Mejoras Futuras

- **Persistencia Real**: Reemplazar `MockProjectRepository` con una implementación de PostgreSQL/Prisma.
- **Autenticación**: Integrar NextAuth para proteger rutas privadas.
- **UI/UX**: Añadir gráficos (Charts) al dashboard y mejorar transiciones.
- **Testing**: Ampliar cobertura de tests unitarios y E2E.
- **Analytics**: Analíticas sobre rendimiento y usuarios que estén en el sitio (fácilmente implementable en Vercel).