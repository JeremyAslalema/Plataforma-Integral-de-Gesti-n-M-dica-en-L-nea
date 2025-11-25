'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: "📅",
      title: "Gestión de Citas",
      description: "Agenda, modifica y cancela citas en tiempo real con confirmación instantánea",
      stats: "24/7 disponible"
    },
    {
      icon: "📊",
      title: "Historial Médico Digital",
      description: "Acceso seguro y cifrado a todos tus registros médicos desde cualquier dispositivo",
      stats: "100% seguro"
    },
    {
      icon: "💬",
      title: "Telemedicina",
      description: "Consultas virtuales con videollamada HD y chat en tiempo real",
      stats: "Respuesta rápida"
    },
    {
      icon: "❤️",
      title: "Monitoreo de Salud",
      description: "Seguimiento continuo de tus signos vitales y métricas de salud",
      stats: "Alertas automáticas"
    },
    {
      icon: "💊",
      title: "Recetas Electrónicas",
      description: "Prescripciones digitales verificadas y enviadas directamente a farmacias",
      stats: "Sin papel"
    },
    {
      icon: "👥",
      title: "Red de Especialistas",
      description: "Acceso a más de 1000+ profesionales certificados en todas las especialidades",
      stats: "1000+ médicos"
    }
  ];

  const benefits = [
    "Ahorra tiempo con citas en línea",
    "Reduce costos de desplazamiento",
    "Acceso inmediato a especialistas",
    "Historial médico siempre disponible"
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Paciente",
      comment: "La plataforma cambió completamente mi experiencia médica. Todo es más rápido y accesible.",
      rating: 5
    },
    {
      name: "Dr. Carlos Ruiz",
      role: "Cardiólogo",
      comment: "Herramienta indispensable para gestionar mi práctica médica de manera eficiente.",
      rating: 5
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span>🏆</span>
            Plataforma líder en salud digital
          </div>

          <h1 className="hero-title">
            Tu salud,{' '}
            <span className="gradient-text">simplificada</span>
          </h1>
          
          <p className="hero-subtitle">
            Conectamos pacientes y profesionales de la salud en un ecosistema digital seguro, 
            eficiente y centrado en tu bienestar
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link href="/auth/login?tipo=paciente" className="btn btn-primary">
              <span>👤</span>
              Soy Paciente
              <span>→</span>
            </Link>
            <Link href="/auth/login?tipo=profesional" className="btn btn-secondary">
              <span>🩺</span>
              Soy Profesional
              <span>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {[
              { value: "50K+", label: "Pacientes activos" },
              { value: "1000+", label: "Profesionales" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "Valoración" }
            ].map((stat, idx) => (
              <div key={idx} className="stat-card fade-in-up">
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
              Herramientas profesionales diseñadas para mejorar tu experiencia en salud
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card fade-in-up"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                
                <p className="feature-description">{feature.description}</p>

                <div className="feature-stats">
                  <span>✓</span>
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
              <h2 className="benefits-title">¿Por qué elegirnos?</h2>
              <p className="benefits-subtitle">
                Transformamos la atención médica con tecnología de vanguardia y un enfoque humano
              </p>
              <ul className="benefits-list">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefit-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '3rem' }}>🕐</span>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24/7</div>
                  <div style={{ opacity: 0.9 }}>Disponibilidad</div>
                </div>
              </div>
              <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                Nuestro equipo de soporte y profesionales médicos están disponibles en cualquier momento 
                para atenderte, porque tu salud no espera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
            <p className="section-subtitle">Miles de personas confían en nosotros</p>
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

      {/* CTA Final */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Comienza tu viaje hacia una mejor salud</h2>
          <p className="cta-subtitle">
            Únete a miles de usuarios que ya transformaron su experiencia médica
          </p>
          <Link href="/auth/login" className="cta-button">
            Crear cuenta gratis
          </Link>
        </div>
      </section>
    </main>
  );
}