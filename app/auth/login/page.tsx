'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tipo = searchParams.get('tipo') || 'paciente';
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error === 'CredentialsSignin' 
          ? 'Email o contraseña incorrectos' 
          : 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Redirigir al dashboard si el login fue exitoso
      if (result?.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="logo-icon">🩺</div>
            <div className="logo-text">
              <div className="logo-main">Plataforma Médica</div>
              <div className="logo-sub">Salud Digital</div>
            </div>
          </Link>
          
          <div className="auth-title-section">
            <h1 className="auth-title">Iniciar Sesión</h1>
            <p className="auth-subtitle">
              {tipo === 'profesional' 
                ? 'Acceso para profesionales de la salud' 
                : 'Bienvenido de vuelta'}
            </p>
          </div>

          <div className="auth-switch">
            <p className="auth-switch-text">
              ¿No tienes cuenta?{' '}
              <Link 
                href={`/auth/register${tipo === 'profesional' ? '?tipo=profesional' : ''}`} 
                className="auth-link"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="validation-message error" style={{ margin: '1rem 2.5rem 0' }}>
            ⚠ {error}
          </div>
        )}

        {/* Login Form */}
        <div className="auth-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Correo Electrónico <span className="required-asterisk">*</span>
              </label>
              <div className="input-container">
                <div className="input-icon">📧</div>
                <input
                  type="email"
                  className="form-input"
                  placeholder="tu.email@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Contraseña <span className="required-asterisk">*</span>
              </label>
              <div className="input-container">
                <div className="input-icon">🔒</div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="validation-message">
                Mínimo 6 caracteres
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                Recordar sesión
              </label>
              <Link href="/auth/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>→</span>
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Login Options */}
        <div className="auth-options">
          <div className="divider">
            <span>O inicia sesión con</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-btn">
              <div className="social-icon">G</div>
              Google
            </button>
            <button type="button" className="social-btn">
              <div className="social-icon">f</div>
              Facebook
            </button>
          </div>
        </div>

        {/* Professional Access Card */}
        {tipo === 'paciente' && (
          <div className="professional-access-card">
            <div className="professional-icon">👨‍⚕️</div>
            <div className="professional-content">
              <div className="professional-title">¿Eres profesional de la salud?</div>
              <div className="professional-description">
                Acceso especial para médicos, enfermeros y personal sanitario
              </div>
              <Link href="/auth/login?tipo=profesional" className="professional-link">
                Iniciar sesión como profesional →
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