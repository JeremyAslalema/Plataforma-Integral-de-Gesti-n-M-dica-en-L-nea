'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// ✅ AGREGAR ESTA LÍNEA - Soluciona el error de build
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🩺</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Plataforma Médica</h1>
                <p className="text-sm text-gray-600">
                  Bienvenido, {session?.user?.name} • {session?.user?.role}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Mis Citas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mis Citas</h3>
            <p className="text-gray-600 mb-4">Gestiona tus citas médicas</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Ver Citas
            </button>
          </div>

          {/* Card 2 - Historial Médico */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Historial Médico</h3>
            <p className="text-gray-600 mb-4">Accede a tu historial completo</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Ver Historial
            </button>
          </div>

          {/* Card 3 - Mi Perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mi Perfil</h3>
            <p className="text-gray-600 mb-4">Actualiza tu información personal</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Editar Perfil
            </button>
          </div>

          {/* Card 4 - Recetas Médicas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recetas Médicas</h3>
            <p className="text-gray-600 mb-4">Consulta tus prescripciones</p>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
              Ver Recetas
            </button>
          </div>

          {/* Card 5 - Resultados de Exámenes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Exámenes Médicos</h3>
            <p className="text-gray-600 mb-4">Resultados de laboratorio</p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Ver Exámenes
            </button>
          </div>

          {/* Card 6 - Mensajes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mensajes</h3>
            <p className="text-gray-600 mb-4">Comunícate con tu médico</p>
            <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
              Ver Mensajes
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen Rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Citas Pendientes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Historiales</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-sm text-gray-600">Perfil Activo</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{session?.user?.role || 'Usuario'}</p>
              <p className="text-sm text-gray-600">Tipo de Usuario</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Bienvenido a la plataforma</p>
                <p className="text-xs text-gray-600">Tu cuenta ha sido activada correctamente</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">Hoy</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Perfil completado</p>
                <p className="text-xs text-gray-600">Tu información básica está configurada</p>
              </div>
              <span className="text-xs text-gray-500 ml-auto">Hoy</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 Plataforma Médica. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Ayuda</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Soporte</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Privacidad</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}