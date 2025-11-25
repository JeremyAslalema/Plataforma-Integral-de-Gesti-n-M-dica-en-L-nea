'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales inválidas. Verifica tu email y contraseña.');
      } else {
        alert('¡Inicio de sesión exitoso!');
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Link href="/" className="logo-link">
            <div className="logo-icon">
              <span>🩺</span>
            </div>
            <span className="logo-text">Plataforma Médica</span>
          </Link>
          
          <h2 className="auth-title">
            Iniciar Sesión
          </h2>
          <p className="auth-subtitle">
            O{' '}
            <Link href="/auth/register" className="auth-link">
              crear una cuenta nueva
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="tu@email.com"
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <div className="checkbox-group">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label htmlFor="rememberMe" className="checkbox-label">
                  Recordarme
                </label>
              </div>

              <Link href="/auth/forgot-password" className="auth-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary auth-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>O continuar con</span>
            </div>

            {/* Social Login */}
            <div className="social-buttons">
              <button type="button" className="social-btn facebook-btn">
                <span className="social-icon">f</span>
                Facebook
              </button>
              <button type="button" className="social-btn google-btn">
                <span className="social-icon">G</span>
                Google
              </button>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="professional-card">
            <h3 className="professional-title">
              ¿Eres profesional de la salud?
            </h3>
            <Link href="/auth/login/profesional" className="btn btn-secondary professional-button">
              Acceso para Profesionales
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}