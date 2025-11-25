'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'paciente',
    aceptaTerminos: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        name: `${formData.nombre} ${formData.apellido}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.tipoUsuario === 'profesional' ? 'DOCTOR' : 'PACIENTE'
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Registro exitoso! Serás redirigido al login.');
        router.push('/auth/login');
      } else {
        setError(data.error || 'Error en el registro');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error('Register error:', error);
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
            Crear Cuenta
          </h2>
          <p className="auth-subtitle">
            O{' '}
            <Link href="/auth/login" className="auth-link">
              inicia sesión en tu cuenta
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Register Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* User Type Selection */}
            <div className="form-group">
              <label htmlFor="tipoUsuario" className="form-label">
                Tipo de Usuario
              </label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                className="form-input"
              >
                <option value="paciente">Paciente</option>
                <option value="profesional">Profesional de la Salud</option>
              </select>
            </div>

            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  value={formData.apellido}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

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

            {/* Password Fields */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Repite tu contraseña"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="checkbox-group terms-group">
              <input
                id="aceptaTerminos"
                name="aceptaTerminos"
                type="checkbox"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                className="checkbox"
              />
              <label htmlFor="aceptaTerminos" className="checkbox-label">
                Acepto los{' '}
                <Link href="/terminos" className="auth-link">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacidad" className="auth-link">
                  política de privacidad
                </Link>
              </label>
            </div>

            {/* Additional Info for Professionals */}
            {formData.tipoUsuario === 'profesional' && (
              <div className="info-card">
                <h4 className="info-title">
                  Información para Profesionales
                </h4>
                <p className="info-text">
                  Como profesional de la salud, necesitarás verificar tu documentación 
                  profesional antes de poder atender pacientes.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary auth-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Creando cuenta...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}