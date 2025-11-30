'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: 'PACIENTE' | 'DOCTOR';
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  specialty?: string;
  license?: string;
  acceptTerms: boolean;
}

interface RegisterFormProps {
  initialRole?: 'PACIENTE' | 'DOCTOR';
}

export default function RegisterForm({ initialRole = 'PACIENTE' }: RegisterFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: initialRole,
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    specialty: '',
    license: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones del frontend
    if (!formData.email || !formData.password || !formData.name) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones para continuar');
      setLoading(false);
      return;
    }

    if (formData.role === 'DOCTOR' && !formData.specialty) {
      setError('La especialidad es requerida para profesionales de la salud');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        name: formData.name.trim(),
        role: formData.role,
        phone: formData.phone?.trim() || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        address: formData.address?.trim() || undefined,
        specialty: formData.specialty?.trim() || undefined,
        license: formData.license?.trim() || undefined,
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
        // Registro exitoso
        console.log('Registro exitoso:', data);
        
        // Mostrar mensaje de éxito
        alert('¡Cuenta creada exitosamente! Serás redirigido al login.');
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        // Error del servidor
        setError(data.error || 'Error en el registro. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const isDoctor = formData.role === 'DOCTOR';

  return (
    <form onSubmit={handleSubmit} className="auth-form register-form">
      {error && (
        <div className="form-error">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <strong>Error en el registro</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Tipo de Usuario */}
      <div className="form-group">
        <label htmlFor="role" className="form-label">
          <span>Tipo de cuenta</span>
          <span className="required-asterisk">*</span>
        </label>
        <div className="role-selector">
          <button
            type="button"
            className={`role-option ${formData.role === 'PACIENTE' ? 'active' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'PACIENTE' }))}
          >
            <span className="role-option-icon">👤</span>
            <span className="role-option-text">
              <strong>Paciente</strong>
              <span>Gestiona tu salud</span>
            </span>
          </button>
          
          <button
            type="button"
            className={`role-option ${formData.role === 'DOCTOR' ? 'active' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'DOCTOR' }))}
          >
            <span className="role-option-icon">👨‍⚕️</span>
            <span className="role-option-text">
              <strong>Profesional</strong>
              <span>Gestiona tu consulta</span>
            </span>
          </button>
        </div>
      </div>

      {/* Información Personal */}
      <div className="form-section">
        <h3 className="form-section-title">Información personal</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <span>Nombre completo</span>
              <span className="required-asterisk">*</span>
            </label>
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Juan Pérez García"
                disabled={loading}
                autoComplete="name"
              />
              <div className="input-icon">👤</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <span>Correo electrónico</span>
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

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              <span>Teléfono</span>
            </label>
            <div className="input-container">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+52 123 456 7890"
                disabled={loading}
                autoComplete="tel"
              />
              <div className="input-icon">📞</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              <span>Género</span>
            </label>
            <div className="input-container">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                <option value="">Seleccionar</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
                <option value="PREFIERO_NO_DECIR">Prefiero no decir</option>
              </select>
              <div className="input-icon">⚧</div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">
              <span>Fecha de nacimiento</span>
            </label>
            <div className="input-container">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
              <div className="input-icon">📅</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            <span>Dirección</span>
          </label>
          <div className="input-container">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Tu dirección completa"
              disabled={loading}
              autoComplete="street-address"
            />
            <div className="input-icon">🏠</div>
          </div>
        </div>
      </div>

      {/* Información Profesional */}
      {isDoctor && (
        <div className="form-section professional-section">
          <h3 className="form-section-title">Información profesional</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="specialty" className="form-label">
                <span>Especialidad</span>
                <span className="required-asterisk">*</span>
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required={isDoctor}
                  className="form-input"
                  placeholder="Cardiología, Pediatría, etc."
                  disabled={loading}
                />
                <div className="input-icon">🎓</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="license" className="form-label">
                <span>Cédula profesional</span>
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="license"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Número de cédula"
                  disabled={loading}
                />
                <div className="input-icon">📋</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seguridad */}
      <div className="form-section security-section">
        <h3 className="form-section-title">Seguridad de la cuenta</h3>
        
        <div className="form-row">
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
                autoComplete="new-password"
                minLength={6}
              />
              <div className="input-icon">🔒</div>
            </div>
            <div className="password-requirements">
              Mínimo 6 caracteres
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <span>Confirmar contraseña</span>
              <span className="required-asterisk">*</span>
            </label>
            <div className="input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="••••••••"
                disabled={loading}
                autoComplete="new-password"
                minLength={6}
              />
              <div className="input-icon">🔒</div>
            </div>
          </div>
        </div>
      </div>

      {/* Términos y Condiciones */}
      <div className="form-group terms-group">
        <label className="checkbox-label terms-label">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={loading}
            className="checkbox-input"
            required
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            Acepto los{' '}
            <Link href="/terminos" className="terms-link">
              Términos de servicio
            </Link>{' '}
            y la{' '}
            <Link href="/privacidad" className="terms-link">
              Política de privacidad
            </Link>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`submit-button ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <div className="button-spinner"></div>
            Creando cuenta...
          </>
        ) : (
          <>
            <span className="button-icon">🚀</span>
            Crear Cuenta
          </>
        )}
      </button>
    </form>
  );
}