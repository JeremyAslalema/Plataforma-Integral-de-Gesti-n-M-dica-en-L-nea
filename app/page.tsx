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

  // Estilos CSS en objeto para evitar problemas de carga
  const styles = {
    main: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #caf0f8 0%, #ffffff 50%, #90e0ef 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    hero: {
      padding: '80px 20px',
      textAlign: 'center' as const,
      position: 'relative' as const
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: '#ffffff',
      color: '#0077b6',
      padding: '8px 16px',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '20px',
      color: '#1e293b'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.6'
    },
    ctaButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
      marginBottom: '60px'
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
      color: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)'
    },
    btnSecondary: {
      background: '#ffffff',
      color: '#0077b6',
      boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    statCard: {
      background: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      textAlign: 'center' as const,
      boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)',
      transition: 'transform 0.3s ease'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#0077b6',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    },
    section: {
      padding: '80px 0',
      background: '#ffffff'
    },
    sectionHeader: {
      textAlign: 'center' as const,
      marginBottom: '60px'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '16px'
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    featureCard: {
      background: '#ffffff',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    },
    featureIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
      color: '#ffffff'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '12px'
    },
    featureDescription: {
      color: '#64748b',
      marginBottom: '16px',
      lineHeight: '1.6'
    },
    featureStats: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#0077b6',
      fontWeight: '600'
    }
  };

  return (
    <main style={styles.main}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroBadge}>
            <span>🏆</span>
            Plataforma líder en salud digital
          </div>

          <h1 style={styles.heroTitle}>
            Tu salud,{' '}
            <span style={styles.gradientText}>simplificada</span>
          </h1>
          
          <p style={styles.heroSubtitle}>
            Conectamos pacientes y profesionales de la salud en un ecosistema digital seguro, 
            eficiente y centrado en tu bienestar
          </p>

          {/* CTA Buttons */}
          <div style={styles.ctaButtons}>
            <Link href="/auth/login?tipo=paciente" style={{...styles.btn, ...styles.btnPrimary}}>
              <span>👤</span>
              Soy Paciente
              <span>→</span>
            </Link>
            <Link href="/auth/login?tipo=profesional" style={{...styles.btn, ...styles.btnSecondary}}>
              <span>🩺</span>
              Soy Profesional
              <span>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div style={styles.statsGrid}>
            {[
              { value: "50K+", label: "Pacientes activos" },
              { value: "1000+", label: "Profesionales" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "Valoración" }
            ].map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Todo lo que necesitas en un solo lugar</h2>
            <p style={styles.sectionSubtitle}>
              Herramientas profesionales diseñadas para mejorar tu experiencia en salud
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={styles.featureCard}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>
                
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                
                <p style={styles.featureDescription}>{feature.description}</p>

                <div style={styles.featureStats}>
                  <span>✓</span>
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}