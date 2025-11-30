'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: "📅",
      title: "Gestión de Citas Inteligente",
      description: "Agenda, modifica y cancela citas en tiempo real con confirmación instantánea y recordatorios automáticos.",
      stats: "Disponible 24/7"
    },
    {
      icon: "📊",
      title: "Historial Médico Digital",
      description: "Acceso seguro y cifrado a todos tus registros médicos desde cualquier dispositivo, en cualquier momento.",
      stats: "100% seguro y privado"
    },
    {
      icon: "💬",
      title: "Telemedicina Integrada",
      description: "Consultas virtuales con videollamada HD, chat en tiempo real y compartir archivos médicos.",
      stats: "Respuesta inmediata"
    },
    {
      icon: "❤️",
      title: "Monitoreo de Salud Continuo",
      description: "Seguimiento automático de signos vitales, métricas de salud y alertas preventivas inteligentes.",
      stats: "Alertas proactivas"
    },
    {
      icon: "💊",
      title: "Recetas Electrónicas",
      description: "Prescripciones digitales verificadas, enviadas directamente a farmacias asociadas de forma instantánea.",
      stats: "Cero papel"
    },
    {
      icon: "👥",
      title: "Red de Especialistas Certificados",
      description: "Acceso exclusivo a más de 1,000+ profesionales certificados en todas las especialidades médicas.",
      stats: "1,000+ especialistas"
    }
  ];

  const benefits = [
    "Ahorra hasta 3 horas semanales en trámites médicos",
    "Reduce costos de desplazamiento en un 70%",
    "Acceso inmediato a especialistas sin listas de espera",
    "Historial médico completo siempre disponible y actualizado",
    "Recordatorios automáticos de citas y medicamentos",
    "Consultas de seguimiento sin costo adicional"
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Paciente Crónico",
      comment: "La plataforma cambió completamente mi experiencia médica. Poder acceder a mis registros y agendar citas en minutos en lugar de horas ha sido increíble. La atención es más personalizada y eficiente.",
      rating: 5
    },
    {
      name: "Dr. Carlos Ruiz",
      role: "Cardiólogo",
      comment: "Como profesional, esta herramienta me ha permitido optimizar mi tiempo y ofrecer mejor atención. La gestión de agenda es intuitiva y el acceso al historial de pacientes es inmediato.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Madre de Familia",
      comment: "Gestionar las citas médicas de toda la familia era un caos. Ahora todo está centralizado, con recordatorios que nos salvan de olvidar citas importantes. ¡Totalmente recomendado!",
      rating: 5
    }
  ];

  const stats = [
    { value: "50,000+", label: "Pacientes Activos" },
    { value: "1,200+", label: "Profesionales Certificados" },
    { value: "99.9%", label: "Disponibilidad Garantizada" },
    { value: "4.9/5", label: "Satisfacción del Usuario" }
  ];

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando plataforma médica...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge fade-in-up">
            <span>🏆</span>
            Plataforma Médica Líder 2024
          </div>

          <h1 className="hero-title fade-in-up">
            Tu salud,{' '}
            <span className="gradient-text">simplificada</span>
          </h1>
          
          <p className="hero-subtitle fade-in-up">
            Conectamos pacientes y profesionales de la salud en un ecosistema digital seguro, 
            eficiente y centrado en tu bienestar. Atención médica de calidad al alcance de todos.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons fade-in-up">
            {session ? (
              <Link href="/dashboard" className="btn btn-primary">
                <span>🚀</span>
                Ir al Dashboard
                <span>→</span>
              </Link>
            ) : (
              <>
                <Link href="/auth/register?tipo=paciente" className="btn btn-primary">
                  <span>👤</span>
                  Soy Paciente
                  <span>→</span>
                </Link>
                <Link href="/auth/register?tipo=profesional" className="btn btn-secondary">
                  <span>🩺</span>
                  Soy Profesional
                  <span>→</span>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="stats-grid fade-in-up">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Todo lo que necesitas en un solo lugar</h2>
            <p className="section-subtitle">
              Herramientas profesionales diseñadas para mejorar tu experiencia en salud, 
              optimizando tiempo y mejorando resultados
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card fade-in-up">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                
                <p className="feature-description">{feature.description}</p>

                <div className="feature-stats">
                  <span>✅</span>
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div>
              <h2 className="benefits-title">
                Beneficios Tangibles para Tu Salud
              </h2>
              <p className="benefits-subtitle">
                Experimenta una nueva forma de gestionar tu bienestar con resultados medibles
              </p>
              
              <ul className="benefits-list">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="benefit-item fade-in-up">
                    <span className="benefit-icon">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="benefit-card fade-in-up">
              <h3 className="feature-title" style={{ color: 'white', marginBottom: '20px' }}>
                ¿Por qué elegirnos?
              </h3>
              <div className="feature-description" style={{ color: 'rgba(255,255,255,0.9)' }}>
                <p style={{ marginBottom: '15px' }}>
                  <strong>Tecnología de Vanguardia:</strong> Plataforma desarrollada con los más altos estándares de seguridad y usabilidad.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong>Equipo Médico Certificado:</strong> Todos nuestros profesionales están verificados y cuentan con certificaciones vigentes.
                </p>
                <p>
                  <strong>Soporte 24/7:</strong> Asistencia técnica y médica disponible cuando la necesites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
            <p className="section-subtitle">
              Experiencias reales de pacientes y profesionales que confían en nuestra plataforma
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card fade-in-up">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                
                <p className="testimonial-text">"{testimonial.comment}"</p>
                
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">
            ¿Listo para transformar tu experiencia médica?
          </h2>
          <p className="cta-subtitle">
            Únete a miles de usuarios que ya están disfrutando de una gestión de salud 
            más simple, rápida y efectiva
          </p>
          
          {session ? (
            <Link href="/dashboard" className="cta-button">
              Continuar al Dashboard ›
            </Link>
          ) : (
            <div className="cta-buttons" style={{ justifyContent: 'center' }}>
              <Link href="/auth/register?tipo=paciente" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary-blue)' }}>
                Comenzar como Paciente
              </Link>
              <Link href="/auth/register?tipo=profesional" className="btn btn-secondary" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Registrarse como Profesional
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--dark-text)', 
        color: 'white', 
        padding: '40px 0',
        textAlign: 'center' 
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div className="logo-icon" style={{ width: '40px', height: '40px' }}>
                  <span>🩺</span>
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Plataforma Médica</span>
              </div>
              <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                Transformando la experiencia en salud mediante tecnología innovadora
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Enlaces Rápidos</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem' }}>
                  <Link href="/auth/login" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>
                    Iniciar Sesión
                  </Link>
                  <Link href="/auth/register" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>
                    Registrarse
                  </Link>
                  <Link href="/dashboard" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>
                    Dashboard
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Soporte</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem' }}>
                  <a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Centro de Ayuda</a>
                  <a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Contacto</a>
                  <a href="#" style={{ color: 'white', opacity: '0.8', textDecoration: 'none' }}>Preguntas Frecuentes</a>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '30px', 
            paddingTop: '20px', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.8rem',
            opacity: '0.6'
          }}>
            <p>© 2024 Plataforma Médica Integral. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}