export default function PacienteDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard del Paciente</h1>
          <p className="text-gray-600 mb-8">Bienvenido a tu panel de control</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">📅 Mis Citas</h3>
              <p className="text-blue-700 text-sm">Próxima cita: Por agendar</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">📊 Historial</h3>
              <p className="text-green-700 text-sm">Consulta tu historial médico</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">💊 Recetas</h3>
              <p className="text-purple-700 text-sm">Recetas digitales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}