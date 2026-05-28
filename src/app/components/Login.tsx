import { useState } from 'react';
import { BookOpen, Mail, Lock, School, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    escola: '',
    gre: '',
    email: '',
    senha: ''
  });

  const escolas = [
    'CETI Manoel Ferreira Barbosa - Macedo',
    'CETI Deputado Raimundo Nonato Monteiro - Valença do Piauí',
    'CETI Poeta da Costa e Silva - Valença do Piauí',
    'Colégio Agrícola de Valença do Piauí',
    'CETI João Emílio Falcão Costa - Pimenteiras',
    'CETI Arimatéia Tito - Inhuma',
    'CETI Marcos Parente - Teresina',
    'Liceu Piauiense - Teresina',
    'Colégio Estadual Zacarias de Góis - Teresina',
    'CETI Anísio Teixeira - Teresina',
    'CETI Professor Raldir Cavalcante Bastos - Piripiri',
    'CETI Landri Sales - Piripiri',
    'Instituto Educacional Antonino Freire - Parnaíba',
    'CETI Desembargador Severino Pereira - Picos',
    'CETI Matias Olímpio - Floriano',
    'CETI Monsenhor Joaquim Lima - Campo Maior',
    'CETI José de Freitas Neto - Aroazes',
    'CETI Antonino Freire - São Francisco do Piauí'
  ];

  const gres = [
    'GRE Teresina Centro/Sul',
    'GRE Teresina Leste/Sudeste',
    'GRE Parnaíba',
    'GRE Picos',
    'GRE Floriano',
    'GRE Campo Maior',
    'GRE Valença do Piauí',
    'GRE Piripiri',
    'GRE São Raimundo Nonato',
    'GRE Corrente',
    'GRE Bom Jesus'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <BookOpen className="w-9 h-9 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            PiauíEduca+
          </h1>
          <p className="text-emerald-100 text-sm">
            Sua plataforma de estudos do Piauí
          </p>
        </div>

        {/* Card de Login/Cadastro */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                isLogin
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                !isLogin
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* Nome da Escola */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Escola
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.escola}
                      onChange={(e) => handleChange('escola', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                      required={!isLogin}
                    >
                      <option value="">Selecione sua escola</option>
                      {escolas.map((escola) => (
                        <option key={escola} value={escola}>
                          {escola}
                        </option>
                      ))}
                      <option value="outra">Outra escola</option>
                    </select>
                  </div>
                </div>

                {/* GRE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GRE
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.gre}
                      onChange={(e) => handleChange('gre', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                      required={!isLogin}
                    >
                      <option value="">Selecione a GRE</option>
                      {gres.map((gre) => (
                        <option key={gre} value={gre}>
                          {gre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* E-mail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Esqueci minha senha */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Esqueci minha senha
                </button>
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Informação Adicional */}
          {!isLogin && (
            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
              Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          )}
        </div>

        {/* Rodapé */}
        <div className="text-center">
          <p className="text-emerald-100 text-xs">
            Desenvolvido por estudante da rede estadual
          </p>
        </div>
      </div>
    </div>
  );
}
