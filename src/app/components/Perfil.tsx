import { X, User, Mail, School, MapPin, GraduationCap, Settings, Edit, LogOut } from 'lucide-react';

interface PerfilProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Perfil({ isOpen, onClose, onLogout }: PerfilProps) {
  // Dados do usuário (em produção, viriam de um contexto/state global)
  const usuario = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    escola: 'CETI Manoel Ferreira Barbosa',
    gre: 'GRE Valença do Piauí',
    serie: '3º Ano - Ensino Médio',
    turma: 'Turma A',
    avatar: '👨‍🎓'
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel Lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 pb-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-white font-bold text-lg">Meu Perfil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Avatar e Nome */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg">
              {usuario.avatar}
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{usuario.nome}</h3>
            <p className="text-emerald-100 text-sm">{usuario.email}</p>
          </div>
        </div>

        {/* Informações */}
        <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {/* Escola */}
          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
            <div className="bg-blue-100 p-2 rounded-lg">
              <School className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Escola</p>
              <p className="text-sm font-semibold text-gray-900">{usuario.escola}</p>
            </div>
          </div>

          {/* GRE */}
          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">GRE</p>
              <p className="text-sm font-semibold text-gray-900">{usuario.gre}</p>
            </div>
          </div>

          {/* Série e Turma */}
          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
            <div className="bg-purple-100 p-2 rounded-lg">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Série/Turma</p>
              <p className="text-sm font-semibold text-gray-900">{usuario.serie}</p>
              <p className="text-xs text-gray-600">{usuario.turma}</p>
            </div>
          </div>

          {/* Configurações */}
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Configurações</span>
          </button>
        </div>

        {/* Footer com ações */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 space-y-2">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Edit className="w-5 h-5" />
            Editar Perfil
          </button>
          <button
            onClick={onLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
