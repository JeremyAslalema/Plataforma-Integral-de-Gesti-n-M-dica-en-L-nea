'use client';
import React from 'react';
import Link from 'next/link';
import LoginForm from '@/app/components/forms/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🩺</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Plataforma Médica</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            O{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              crea una cuenta nueva
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <LoginForm />
        </div>

        {/* User Type Selection */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            ¿Eres profesional de la salud?
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            Accede con tu cuenta de profesional para gestionar tu consulta
          </p>
          <Link 
            href="/auth/login?tipo=profesional" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Acceso para Profesionales
          </Link>
        </div>
      </div>
    </div>
  );
}