'use client'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const tipo = searchParams.get('tipo') || 'paciente'

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #caf0f8 0%, #ffffff 50%, #90e0ef 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 119, 182, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#0077b6', marginBottom: '20px' }}>
          Login para {tipo === 'paciente' ? 'Pacientes' : 'Profesionales'}
        </h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>
          Página de login en construcción
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#0077b6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none'
          }}
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}