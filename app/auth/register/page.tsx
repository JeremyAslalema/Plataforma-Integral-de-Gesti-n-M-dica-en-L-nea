'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tipo = searchParams.get('tipo') || 'paciente';
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    role: tipo === 'profesional' ? 'DOCTOR' : 'PACIENTE',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    specialty: '',
    license: '',
    bio: '',
    termsAccepted: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRoleChange = (role: 'PACIENTE' | 'DOCTOR') => {
    setFormData(prev => ({ ...prev, role }));
    router.push(`/auth/register?tipo=${role === 'DOCTOR' ? 'profesional' : 'paciente'}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    // Aquí iría la llamada a la API para registrar al usuario
    console.log('Datos del registro:', formData);
    
    // Simulación de registro
    setTimeout(() => {
      setLoading(false);
      // Redirigir al dashboard después del registro
      router.push('/auth/login');
    }, 2000);
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
              {tipo === 'profesional' 
                ? 'Registro para profesionales de la salud' 
                : 'Únete a nuestra plataforma médica'}
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
          <form onSubmit={handleSubmit} className="register-form">
            {/* Tipo de cuenta */}
            <div className="form-group">
              <label className="form-label">
                Tipo de cuenta *
                <span className="required-asterisk">*</span>
              </label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-option ${formData.role === 'PACIENTE' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('PACIENTE')}
                >
                  <span className="role-option-icon">👤</span>
                  <div className="role-option-text">
                    <strong>Paciente</strong>
                    <span>Gestiona tu salud</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  className={`role-option ${formData.role === 'DOCTOR' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('DOCTOR')}
                >
                  <span className="role-option-icon">👨‍⚕️</span>
                  <div className="role-option-text">
                    <strong>Profesional</strong>
                    <span>Gestiona tu consulta</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Información personal */}
            <div className="form-group">
              <label className="form-label">
                Información personal
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Nombre completo *
                <span className="required-asterisk">*</span>
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Juan Pérez García"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">👤</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Correo electrónico *
                  <span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="tu.email@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="input-icon">📧</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Teléfono
                </label>
                <div className="input-container">
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+52 123 456 7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <span className="input-icon">📞</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Fecha de nacimiento
                </label>
                <div className="input-container">
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-input"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  <span className="input-icon">📅</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Género
                </label>
                <select
                  name="gender"
                  className="form-input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                  <option value="OTRO">Otro</option>
                  <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Dirección
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Tu dirección completa"
                  value={formData.address}
                  onChange={handleChange}
                />
                <span className="input-icon">🏠</span>
              </div>
            </div>

            {/* Campos específicos para doctores */}
            {formData.role === 'DOCTOR' && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Información profesional
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Especialidad *
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="specialty"
                      className="form-input"
                      placeholder="Cardiología, Pediatría, etc."
                      value={formData.specialty}
                      onChange={handleChange}
                      required={formData.role === 'DOCTOR'}
                    />
                    <span className="input-icon">⚕️</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Número de licencia *
                    <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="license"
                      className="form-input"
                      placeholder="Ej: MED-123456"
                      value={formData.license}
                      onChange={handleChange}
                      required={formData.role === 'DOCTOR'}
                    />
                    <span className="input-icon">📋</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Breve biografía
                  </label>
                  <textarea
                    name="bio"
                    className="form-input"
                    placeholder="Describe tu experiencia profesional..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    style={{ paddingLeft: '0.75rem', paddingTop: '0.5rem' }}
                  />
                </div>
              </>
            )}

            {/* Seguridad de la cuenta */}
            <div className="form-group">
              <label className="form-label">
                Seguridad de la cuenta
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Contraseña *
                  <span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <span className="input-icon">🔒</span>
                </div>
                <div className="password-strength">
                  <div className="strength-text">Mínimo 6 caracteres</div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Confirmar contraseña *
                  <span className="required-asterisk">*</span>
                </label>
                <div className="input-container">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <span className="input-icon">🔒</span>
                </div>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <label htmlFor="terms" className="checkbox-label">
                  <div className="checkbox-custom"></div>
                  <span className="checkbox-text">
                    Acepto los{' '}
                    <Link href="/terms" className="terms-link">Términos de servicio</Link>{' '}
                    y la{' '}
                    <Link href="/privacy" className="terms-link">Política de privacidad</Link>
                  </span>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !formData.termsAccepted}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Crear Cuenta</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Register */}
        <div className="auth-options">
          <div className="divider">
            <span>o registrarse con</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn google-btn">
              <span className="social-icon">
                <svg width="16" height="16" viewBox="0 0 24 24">
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
                <svg width="16" height="16" viewBox="0 0 24 24">
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