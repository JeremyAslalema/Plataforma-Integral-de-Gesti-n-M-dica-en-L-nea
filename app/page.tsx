'use client';
import React, { useState } from 'react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: "📅",
      title: "Gestión de Citas",
      description: "Agenda, modifica y cancela citas en tiempo real con confirmación instantánea",
      color: "from-blue-500 to-blue-600",
      stats: "24/7 disponible"
    },
    {
      icon: "📊",
      title: "Historial Médico Digital",
      description: "Acceso seguro y cifrado a todos tus registros médicos desde cualquier dispositivo",
      color: "from-green-500 to-green-600",
      stats: "100% seguro"
    },
    {
      icon: "💬",
      title: "Telemedicina",
      description: "Consultas virtuales con videollamada HD y chat en tiempo real",
      color: "from-purple-500 to-purple-600",
      stats: "Respuesta rápida"
    },
    {
      icon: "❤️",
      title: "Monitoreo de Salud",
      description: "Seguimiento continuo de tus signos vitales y métricas de salud",
      color: "from-red-500 to-red-600",
      stats: "Alertas automáticas"
    },
    {
      icon: "💊",
      title: "Recetas Electrónicas",
      description: "Prescripciones digitales verificadas y enviadas directamente a farmacias",
      color: "from-orange-500 to-orange-600",
      stats: "Sin papel"
    },
    {
      icon: "👥",
      title: "Red de Especialistas",
      description: "Acceso a más de 1000+ profesionales certificados en todas las especialidades",
      color: "from-teal-500 to-teal-600",
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="text-base">🏆</span>
              Plataforma líder en salud digital
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Tu salud,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                simplificada
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Conectamos pacientes y profesionales de la salud en un ecosistema digital seguro, 
              eficiente y centrado en tu bienestar
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <span className="text-xl">👤</span>
                Soy Paciente
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <span className="text-xl">🩺</span>
                Soy Profesional
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: "50K+", label: "Pacientes activos" },
                { value: "1000+", label: "Profesionales" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9/5", label: "Valoración" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para mejorar tu experiencia en salud
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <span className="text-green-500">✓</span>
                  {feature.stats}
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Transformamos la atención médica con tecnología de vanguardia y un enfoque humano
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-300 text-2xl flex-shrink-0">✓</span>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🕐</span>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-100">Disponibilidad</div>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Nuestro equipo de soporte y profesionales médicos están disponibles en cualquier momento 
                para atenderte, porque tu salud no espera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">Miles de personas confían en nosotros</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comienza tu viaje hacia una mejor salud
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya transformaron su experiencia médica
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105">
            Crear cuenta gratis
          </button>
        </div>
      </section>
    </main>
  );
}