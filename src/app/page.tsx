import { redirect } from 'next/navigation';

/**
 * Root Page
 * Redirige al tenant demo 'acme'
 * En producción, esto podría ser una landing page o autenticación
 */
export default function Home() {
  redirect('/acme/dashboard');
}
