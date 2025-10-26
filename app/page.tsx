export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Plataforma Integral de Gestión Médica
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Conectando pacientes y profesionales de la salud a través de un ecosistema digital unificado
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              👤 Soy Paciente
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
              🩺 Soy Profesional
            </button>
          </div>
        </div>

        {/* Sección de características */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">📅 Gestión de Citas</h3>
            <p className="text-gray-600">Agenda, modifica y cancela citas de forma sencilla</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">📊 Historial Médico</h3>
            <p className="text-gray-600">Acceso seguro a tus registros médicos completos</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">💬 Comunicación</h3>
            <p className="text-gray-600">Contacto directo con profesionales de la salud</p>
          </div>
        </div>
      </div>
    </main>
  );
}