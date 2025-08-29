import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Code2, 
  Users, 
  FileText, 
  MessageSquare, 
  Zap, 
  Shield, 
  Palette,
  Database,
  Rocket,
  CheckCircle,
  ArrowRight,
  Github,
  ExternalLink,
  LogIn
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Pilha Moderna",
    description: "React 18, TypeScript, Vite para desenvolvimento extremamente rápido"
  },
  {
    icon: Palette,
    title: "Design Bonito",
    description: "Tailwind CSS + shadcn/ui com sistema de design personalizado"
  },
  {
    icon: Database,
    title: "Integração com API",
    description: "Axios + TanStack Query para obtenção de dados eficiente"
  },
  {
    icon: Shield,
    title: "Validação de Formulários", 
    description: "React Hook Form + Zod para validação segura de tipos"
  },
  {
    icon: Zap,
    title: "Desempenho",
    description: "Tamanho de pacote otimizado e desempenho em tempo de execução"
  },
  {
    icon: Rocket,
    title: "Pronto para Produção",
    description: "Melhores práticas integradas e tratamento de erros"
  }
];

const techStack = [
  { name: "React 18", color: "bg-blue-500" },
  { name: "TypeScript", color: "bg-blue-600" },
  { name: "Vite", color: "bg-purple-500" },
  { name: "Tailwind CSS", color: "bg-cyan-500" },
  { name: "shadcn/ui", color: "bg-gray-800" },
  { name: "TanStack Query", color: "bg-red-500" },
  { name: "React Hook Form", color: "bg-pink-500" },
  { name: "Zod", color: "bg-indigo-500" },
  { name: "Axios", color: "bg-green-500" },
  { name: "Lucide React", color: "bg-orange-500" }
];

export default function Index() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Seção Hero */}
      <section className="relative overflow-hidden bg-animated py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium glass">
              🚀 Modelo Pronto para Produção
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Genesis Base
              <span className="block text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                Modelo React Moderno com Supabase
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sistema completo com autenticação, banco de dados e CRUD.
              Construído com React, TypeScript, Tailwind e Supabase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/posts">
                  <Button size="lg" className="glass hover:glow transition-all duration-300 text-white border border-white/20">
                    <FileText className="h-5 w-5 mr-2" />
                    Ir para Posts
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="glass hover:glow transition-all duration-300 text-white border border-white/20">
                    <LogIn className="h-5 w-5 mr-2" />
                    Entrar / Cadastrar
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="glass text-white border-white/30 hover:bg-white/10">
                <ExternalLink className="h-5 w-5 mr-2" />
                Demonstração ao Vivo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Tudo o que Você Precisa para 
              <span className="text-gradient"> Criar Aplicativos Incríveis</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Um modelo cuidadosamente elaborado com ferramentas modernas, design bonito e configuração pronta para produção.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
                onMouseEnter={() => setActiveDemo(feature.title)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  {activeDemo === feature.title && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <CheckCircle className="h-4 w-4" />
                        <span>Pronto para uso</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Pilha Tecnológica */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Construído com Tecnologias Modernas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas cuidadosamente selecionadas que funcionam perfeitamente juntas para máxima produtividade.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techStack.map((tech, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-2 h-2 rounded-full ${tech.color} mr-2`}></div>
                {tech.name}
              </Badge>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Todas as dependências estão atualizadas e testadas em produção
            </p>
            <Button variant="outline" size="lg">
              Ver Dependências Completas
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Demonstrações */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore os Recursos
            </h2>
            <p className="text-xl text-muted-foreground">
              Exemplos interativos de todas as funcionalidades incluídas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Gerenciamento de Usuários</CardTitle>
                </div>
                <CardDescription>
                  Operações CRUD completas com TanStack Query e Axios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Validação de formulários com Zod</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Atualizações otimistas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Tratamento de erros e estados de carregamento</span>
                  </div>
                </div>
                <Link to="/users">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Experimentar Demonstração de Usuários
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Postagens e Conteúdo</CardTitle>
                </div>
                <CardDescription>
                  Obtenção de dados avançada com filtragem e paginação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Filtragem avançada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Layouts de cartão responsivos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Funcionalidades de busca e ordenação</span>
                  </div>
                </div>
                <Link to="/posts">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Navegar pelas Postagens
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Formulários de Contato</CardTitle>
                </div>
                <CardDescription>
                  Formulários bonitos com validação abrangente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Validação em tempo real</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Controles de formulário acessíveis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Notificações de sucesso</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Experimentar Formulário de Contato
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Chamada à Ação */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Pronto para Criar Algo Incrível?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comece com este modelo pronto para produção e economize semanas de configuração.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Github className="h-5 w-5 mr-2" />
              Clonar Repositório
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Ler Documentação
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}