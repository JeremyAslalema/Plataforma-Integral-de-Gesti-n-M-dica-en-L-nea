'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones del frontend
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Mensajes de error más específicos
        if (result.error.includes('contraseña')) {
          setError('Contraseña incorrecta. Verifica tus credenciales.');
        } else if (result.error.includes('usuario')) {
          setError('No existe una cuenta con este email.');
        } else {
          setError('Credenciales inválidas. Verifica tu email y contraseña.');
        }
      } else {
        // Login exitoso
        console.log('Login exitoso, redirigiendo...');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implementar recuperación de contraseña
    alert('Funcionalidad de recuperación de contraseña en desarrollo');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="form-error">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <strong>Error de autenticación</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          <span>Correo Electrónico</span>
          <span className="required-asterisk">*</span>
        </label>
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="tu.email@ejemplo.com"
            disabled={loading}
            autoComplete="email"
          />
          <div className="input-icon">📧</div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          <span>Contraseña</span>
          <span className="required-asterisk">*</span>
        </label>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="••••••••"
            disabled={loading}
            autoComplete="current-password"
            minLength={6}
          />
          <div className="input-icon">🔒</div>
        </div>
        <div className="password-requirements">
          Mínimo 6 caracteres
        </div>
      </div>

      <div className="form-options">
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">Recordar sesión</span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="forgot-password-link"
          disabled={loading}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`submit-button ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <div className="button-spinner"></div>
            Iniciando sesión...
          </>
        ) : (
          <>
            <span className="button-icon">→</span>
            Iniciar Sesión
          </>
        )}
      </button>

      <div className="form-footer">
        <p className="form-footer-text">
          Al iniciar sesión, aceptas nuestros{' '}
          <Link href="/terminos" className="form-footer-link">
            Términos de servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacidad" className="form-footer-link">
            Política de privacidad
          </Link>
        </p>
      </div>
    </form>
  );
}
