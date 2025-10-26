export default function ProfesionalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard del Profesional</h1>
          <p className="text-gray-600 mb-8">Panel para profesionales de la salud</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">👥 Pacientes</h3>
              <p className="text-blue-700 text-sm">Gestiona tus pacientes</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">📅 Agenda</h3>
              <p className="text-green-700 text-sm">Administra tu agenda</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">📋 Consultas</h3>
              <p className="text-purple-700 text-sm">Historial de consultas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}