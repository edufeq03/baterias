import { useState } from 'react';
import { ChevronDown, Check, MessageCircle, Zap, Shield, Leaf, AlertCircle, Star } from 'lucide-react';

/**
 * ReVolt - Landing Page de Assinatura de Baterias
 * Design: Premium Industrial Minimalista
 * 
 * Seções:
 * 1. Hero com busca de bateria
 * 2. Problema (bateria morta em situações críticas)
 * 3. Solução (assinatura)
 * 4. Recondicionamento (explicação técnica)
 * 5. Planos de assinatura
 * 6. Produtos em destaque
 * 7. Depoimentos
 * 8. FAQ
 * 9. CTA final
 * 10. Footer
 */

export default function Home() {
  const [searchModel, setSearchModel] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchModel.trim()) {
      alert(`Buscando baterias para: ${searchModel}`);
    }
  };

  const faqItems = [
    {
      question: 'Qual é a diferença entre uma bateria recondicionada e uma nova?',
      answer: 'Uma bateria recondicionada passa por um processo rigoroso de limpeza química, troca de eletrólito e ciclos de carga de 48h. Ela funciona com 90% da performance de uma bateria nova, mas custa muito menos. É uma excelente opção para quem quer economizar sem sacrificar a qualidade.'
    },
    {
      question: 'Como funciona a assinatura mensal?',
      answer: 'Você paga uma mensalidade fixa e tem direito a uma troca de bateria por ano, sem custos adicionais. Se sua bateria falhar antes do período de troca, nós substituímos gratuitamente. É como um seguro que garante que seu carro sempre terá uma bateria em perfeito estado.'
    },
    {
      question: 'Posso cancelar a assinatura a qualquer momento?',
      answer: 'Sim! Você pode cancelar sem multa ou taxa de cancelamento. Não há contrato de longa duração. Queremos que você fique conosco porque vê valor, não porque está preso.'
    },
    {
      question: 'Qual é a garantia das baterias recondicionadas?',
      answer: 'Todas as nossas baterias recondicionadas têm garantia de 12 meses. Se apresentar problemas dentro desse período, nós substituímos gratuitamente. Além disso, se você assinar nosso plano, a garantia é estendida indefinidamente enquanto mantiver a assinatura.'
    },
    {
      question: 'Como faço para saber qual bateria é compatível com meu carro?',
      answer: 'Use nossa ferramenta de busca no topo da página. Digite o modelo do seu carro e mostraremos todas as baterias compatíveis, com preços e especificações. Você também pode nos contatar via WhatsApp para uma recomendação personalizada.'
    },
    {
      question: 'Vocês fazem instalação?',
      answer: 'Sim! Oferecemos serviço de instalação profissional. Você pode agendar um horário conveniente e nossos técnicos instalarão a bateria no seu carro. O serviço é rápido (cerca de 30 minutos) e realizado com precisão.'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Motorista de Uber',
      text: 'Meu carro não pegava mais à noite. Comprei uma bateria recondicionada da ReVolt e estou rodando há 8 meses sem problemas. Recomendo!',
      rating: 5
    },
    {
      name: 'Marina Costa',
      role: 'Executiva',
      text: 'Assino o plano mensal e durmo tranquila. Não preciso me preocupar com bateria morta em situações críticas. Vale muito a pena!',
      rating: 5
    },
    {
      name: 'João Pereira',
      role: 'Taxista',
      text: 'Já troquei bateria 3 vezes com a ReVolt. Qualidade garantida, preço justo e atendimento excelente. Virei cliente fiel.',
      rating: 5
    }
  ];

  const plans = [
    {
      name: 'Essencial',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Para quem quer tranquilidade básica',
      features: [
        'Troca de bateria 1x ao ano',
        'Diagnóstico grátis do alternador',
        'Garantia estendida de 12 meses',
        'Suporte via WhatsApp',
        'Desconto em serviços adicionais'
      ],
      highlighted: false
    },
    {
      name: 'Premium',
      price: 'R$ 49,90',
      period: '/mês',
      description: 'Para quem quer máxima tranquilidade',
      features: [
        'Tudo do plano Essencial',
        'Troca de bateria 2x ao ano',
        'Substituição de emergência 24h',
        'Atendimento prioritário',
        'Desconto de 15% em baterias novas',
        'Teste de carga mensal grátis'
      ],
      highlighted: true
    },
    {
      name: 'Profissional',
      price: 'Consulte',
      period: 'para frotas',
      description: 'Para empresas e frotas',
      features: [
        'Plano customizado',
        'Manutenção preventiva',
        'Relatórios de performance',
        'Suporte técnico dedicado',
        'Preço especial por volume',
        'Agendamento flexível'
      ],
      highlighted: false
    }
  ];

  const products = [
    {
      name: 'Moura 60Ah',
      type: 'Recondicionada',
      compatibility: 'Gol, Corolla, Civic',
      originalPrice: 'R$ 580,00',
      price: 'R$ 220,00',
      image: '/images/hero-battery-tech.jpg'
    },
    {
      name: 'Heliar 45Ah',
      type: 'Recondicionada',
      compatibility: 'Honda Fit, Civic',
      originalPrice: 'R$ 650,00',
      price: 'R$ 250,00',
      image: '/images/hero-battery-tech.jpg'
    },
    {
      name: 'Moura 70Ah',
      type: 'Nova',
      compatibility: 'Gol G6+, Corolla',
      originalPrice: 'R$ 850,00',
      price: 'R$ 720,00',
      image: '/images/hero-battery-tech.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-blue-700" />
            <h1 className="text-2xl font-bold text-blue-700">Re<span className="text-gray-800">Volt</span></h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#assinatura" className="text-gray-600 hover:text-blue-700 transition">Assinatura</a>
            <a href="#reconditioning" className="text-gray-600 hover:text-blue-700 transition">Recondicionamento</a>
            <a href="#produtos" className="text-gray-600 hover:text-blue-700 transition">Produtos</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-700 transition">FAQ</a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Contato
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-battery-tech.jpg" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Nunca mais fique sem bateria no meio do caminho
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Compre baterias de qualidade ou assine um plano mensal para trocas anuais garantidas. Sem preocupações, sem surpresas desagradáveis.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Garantia 12 meses</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Instalação grátis</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Diagnóstico grátis</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/images/hero-battery-tech.jpg" alt="Bateria de tecnologia avançada" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Encontre a bateria ideal para seu carro</h3>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Digite o modelo do seu carro (ex: Gol, Civic, Corolla...)"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Buscar Bateria
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Problem Section - Why Subscribe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            O problema que ninguém quer enfrentar
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/images/car-battery-emergency.jpg" alt="Carro com bateria morta em situação crítica" className="rounded-2xl shadow-lg" />
            </div>
            <div className="space-y-6">
              <div className="card-accent">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Bateria morta à noite</h4>
                    <p className="text-gray-600">Você está em um lugar distante, escuro e perigoso. Seu carro não pega. Ninguém perto para ajudar.</p>
                  </div>
                </div>
              </div>
              <div className="card-accent">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Chuva e frio extremo</h4>
                    <p className="text-gray-600">Clima adverso reduz a performance da bateria. Justamente quando você mais precisa que o carro pegue.</p>
                  </div>
                </div>
              </div>
              <div className="card-accent">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Custo imprevisto</h4>
                    <p className="text-gray-600">Uma bateria nova custa entre R$ 500 e R$ 1.000. Você não estava preparado para esse gasto.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Subscription */}
      <section id="assinatura" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            A solução: Assinatura ReVolt
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Pague uma pequena mensalidade e nunca mais se preocupe com bateria morta. Trocas anuais garantidas, sem custos adicionais.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-blue-700 text-white shadow-2xl transform scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-700'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-blue-700'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-green-300' : 'text-green-600'}`} />
                      <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.highlighted
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-700 text-white hover:bg-blue-800'
                  }`}
                >
                  {plan.name === 'Profissional' ? 'Solicitar Orçamento' : 'Assinar Agora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reconditioning Section */}
      <section id="reconditioning" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                O que é recondicionamento de baterias?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Recondicionamento não é apenas "carregar uma bateria velha". É um processo científico que restaura a capacidade e performance da bateria para níveis próximos aos de uma bateria nova.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-700 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Limpeza Química</h4>
                    <p className="text-gray-600 text-sm">Removemos resíduos internos que causam curto-circuito e reduzem a performance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-700 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Troca do Eletrólito</h4>
                    <p className="text-gray-600 text-sm">Ácido novo com densidade ajustada para o clima tropical brasileiro.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-700 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Ciclo de 48h</h4>
                    <p className="text-gray-600 text-sm">Carga lenta e balanceamento de células para máxima durabilidade.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                <p className="text-gray-700">
                  <strong>Resultado:</strong> Uma bateria recondicionada funciona com 90% da performance de uma bateria nova, mas custa 60% menos.
                </p>
              </div>
            </div>
            <div>
              <img src="/images/reconditioning-process.jpg" alt="Processo de recondicionamento" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Nossas Baterias em Destaque
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Todas testadas, com garantia e prontas para instalação
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {product.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compatível com: <span className="font-medium">{product.compatibility}</span>
                  </p>
                  <div className="mb-6">
                    <p className="text-gray-400 line-through text-sm">{product.originalPrice}</p>
                    <p className="text-3xl font-bold text-blue-700">{product.price}</p>
                  </div>
                  <button className="w-full btn-primary">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            O que nossos clientes dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <h3 className="font-bold text-gray-900 text-left">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-700 transition-transform ${
                      expandedFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para nunca mais se preocupar com bateria?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Assine nosso plano mensal ou compre uma bateria de qualidade hoje mesmo. Seu carro (e sua paz de espírito) vão agradecer.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all hover:scale-105">
              Assinar Agora
            </button>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Fale com a Gente
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
                <h3 className="text-white font-bold">ReVolt</h3>
              </div>
              <p className="text-sm">Baterias inteligentes para seu carro.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Baterias</a></li>
                <li><a href="#assinatura" className="hover:text-white transition">Assinatura</a></li>
                <li><a href="#reconditioning" className="hover:text-white transition">Recondicionamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 ReVolt. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
