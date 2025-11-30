// app/auth/register/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RegisterForm from '@/app/components/forms/register-form';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo') || 'paciente';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Link href="/" className="logo-link">
            <div className="logo-icon">
              <span>🩺</span>
            </div>
            <div className="logo-text">
              <span className="logo-main">Plataforma Médica</span>
              <span className="logo-sub">Salud Digital</span>
            </div>
          </Link>
          
          <div className="auth-title-section">
            <h1 className="auth-title">
              Crear Cuenta
            </h1>
            <p className="auth-subtitle">
              {tipo === 'profesional' ? 'Registro para profesionales de la salud' : 'Únete a nuestra plataforma médica'}
            </p>
          </div>

          <div className="auth-switch">
            <p className="auth-switch-text">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="auth-link auth-link-underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Register Form */}
        <div className="auth-form-container">
          <RegisterForm initialRole={tipo === 'profesional' ? 'DOCTOR' : 'PACIENTE'} />
        </div>

        {/* Additional Options */}
        <div className="auth-options">
          <div className="divider">
            <span>o registrarse con</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn google-btn">
              <span className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </span>
              Google
            </button>
            
            <button type="button" className="social-btn microsoft-btn">
              <span className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1V1z"/>
                  <path fill="#00a4ef" d="M1 13h10v10H1V13z"/>
                  <path fill="#7fba00" d="M13 1h10v10H13V1z"/>
                  <path fill="#ffb900" d="M13 13h10v10H13V13z"/>
                </svg>
              </span>
              Microsoft
            </button>
          </div>
        </div>

        {/* Professional Access Card */}
        {tipo === 'paciente' && (
          <div className="professional-access-card">
            <div className="professional-icon">
              <span>👨‍⚕️</span>
            </div>
            <div className="professional-content">
              <h3 className="professional-title">¿Eres profesional de la salud?</h3>
              <p className="professional-description">
                Regístrate como profesional para acceder a herramientas especializadas
              </p>
              <Link 
                href="/auth/register?tipo=profesional" 
                className="professional-link"
              >
                Registro profesional ›
              </Link>
            </div>
          </div>
        )}

        {/* Patient Access Card */}
        {tipo === 'profesional' && (
          <div className="professional-access-card patient-card">
            <div className="professional-icon">
              <span>👤</span>
            </div>
            <div className="professional-content">
              <h3 className="professional-title">¿Eres paciente?</h3>
              <p className="professional-description">
                Regístrate como paciente para gestionar tu salud
              </p>
              <Link 
                href="/auth/register?tipo=paciente" 
                className="professional-link"
              >
                Registro paciente ›
              </Link>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className="security-badge">
          <div className="security-icon">🔒</div>
          <div className="security-text">
            <strong>Conexión segura SSL</strong>
            <span>Tus datos médicos están protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}