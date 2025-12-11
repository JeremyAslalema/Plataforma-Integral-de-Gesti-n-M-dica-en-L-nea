'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// ✅ AGREGAR ESTA LÍNEA - Soluciona el error de build
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-gray-600 font-medium">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const isDoctor = user.role === 'DOCTOR';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y brand */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">🩺</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">Plataforma Médica</h1>
                  <p className="text-xs text-gray-600 leading-tight">Gestión Integral de Salud</p>
                </div>
              </Link>
              
              {/* Badge de rol */}
              <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full ${isDoctor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                <span className="text-xs font-semibold uppercase">{isDoctor ? 'Profesional' : 'Paciente'}</span>
              </div>
            </div>

            {/* User menu desktop */}
            <div className="hidden md:flex items-center gap-6">
              {/* Notificaciones */}
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold shadow-md">
                    {user.name?.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.role}</p>
                  </div>
                </div>
                
                <button className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Configuración
                </button>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  ¡Bienvenido de vuelta, <span className="text-yellow-300">{user.name?.split(' ')[0]}!</span>
                </h1>
                <p className="opacity-90">
                  {isDoctor 
                    ? 'Gestiona tu consulta, pacientes y citas médicas desde un solo lugar.'
                    : 'Controla tu salud, citas e historial médico de forma segura y sencilla.'}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
                <div className="text-sm opacity-90 mb-1">Estado del perfil</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold">Completo</span>
                </div>
                <div className="text-xs opacity-80 mt-2">Último acceso: Hoy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-2xl text-blue-600">📅</span>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 rounded-full">+2 hoy</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm text-gray-600">Citas Programadas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="text-2xl text-green-600">📋</span>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-700 rounded-full">Listo</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">1</h3>
            <p className="text-sm text-gray-600">{isDoctor ? 'Pacientes' : 'Expedientes'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="text-2xl text-purple-600">💊</span>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-700 rounded-full">0 activas</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm text-gray-600">Recetas Activas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="text-2xl text-orange-600">✉️</span>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-orange-50 text-orange-700 rounded-full">Sin leer</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm text-gray-600">Mensajes</p>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Citas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">📅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mis Citas</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Gestiona tu agenda de consultas y citas programadas con pacientes'
                : 'Agenda, modifica o cancela tus citas médicas de forma sencilla'}
            </p>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Ver Citas
            </button>
          </div>

          {/* Historial Médico */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">📋</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Historial Médico</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Accede al historial clínico completo de tus pacientes de forma segura'
                : 'Consulta tu historial médico completo, diagnósticos y tratamientos'}
            </p>
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Ver Historial
            </button>
          </div>

          {/* Perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">👤</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mi Perfil</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Actualiza tu información profesional, especialidad y disponibilidad'
                : 'Mantén actualizados tus datos personales y preferencias de contacto'}
            </p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Editar Perfil
            </button>
          </div>

          {/* Recetas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">💊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recetas Médicas</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Emite y gestiona recetas digitales para tus pacientes'
                : 'Consulta tus recetas médicas actuales y pasadas'}
            </p>
            <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Ver Recetas
            </button>
          </div>

          {/* Exámenes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">🔬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Exámenes Médicos</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Revisa y analiza resultados de exámenes de laboratorio'
                : 'Consulta los resultados de tus exámenes de laboratorio e imágenes'}
            </p>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Ver Exámenes
            </button>
          </div>

          {/* Mensajes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mb-4">
              <span className="text-2xl text-white">✉️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mensajes</h3>
            <p className="text-gray-600 mb-6">
              {isDoctor 
                ? 'Comunícate de forma segura con tus pacientes'
                : 'Envía mensajes a tu médico y recibe respuestas rápidas'}
            </p>
            <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
              Ver Mensajes
            </button>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
              <span className="text-sm text-blue-600 font-medium cursor-pointer">Ver todo</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🎉</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">¡Bienvenido a la plataforma!</p>
                  <p className="text-sm text-gray-600">Tu cuenta ha sido activada exitosamente</p>
                </div>
                <span className="text-xs text-gray-500">Hoy</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Perfil completado</p>
                  <p className="text-sm text-gray-600">Tu información básica está configurada</p>
                </div>
                <span className="text-xs text-gray-500">Hoy</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🔄</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sistema sincronizado</p>
                  <p className="text-sm text-gray-600">Todos tus datos están actualizados</p>
                </div>
                <span className="text-xs text-gray-500">Hace 5 min</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl">➕</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Nueva Cita</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">📤</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Subir Archivo</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-xl">📱</span>
                </div>
                <span className="text-sm font-medium text-gray-900">App Móvil</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-xl">❓</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Ayuda</span>
              </button>
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-lg">🚨</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Contacto de Emergencia</p>
                  <p className="text-xs text-gray-600">Asistencia médica inmediata</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-medium text-sm">
                Llamar al 911
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🩺</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Plataforma Médica Integral</p>
                <p className="text-sm text-gray-600">Gestión de salud digital segura</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Términos
              </Link>
              <Link href="/help" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Ayuda
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Contacto
              </Link>
            </div>
            
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>© 2024 Plataforma Médica. Todos los derechos reservados.</p>
              <p className="text-xs mt-1">v1.0.0 • Conectado a base de datos segura</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}