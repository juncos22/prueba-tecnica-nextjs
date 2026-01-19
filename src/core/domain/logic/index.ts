/**
 * Domain Logic - Funciones Puras
 * Barrel export para facilitar imports
 */
export { countProjectsByStatus } from './count-projects-by-status';
export { filterProjectsByStatus } from './filter-projects-by-status';
export {
  calculateDashboardStats,
  type DashboardStats,
} from './calculate-dashboard-stats';
export {
  parseTenantSlug,
  createTenantSlug,
  isMultiTenant,
} from './parse-tenant-slug';
export {
  parseTenantSegments,
  createTenantPath,
  isMultiTenant as isMultiTenantSegments,
} from './parse-tenant-segments';
export { mergeProjectLists } from './merge-project-lists';
export {
  calculateMultiTenantStats,
  type MultiTenantStats,
} from './calculate-multi-tenant-stats';
