import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ExternalLink
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Modern Stack",
    description: "React 18, TypeScript, Vite for blazing fast development"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Tailwind CSS + shadcn/ui with custom design system"
  },
  {
    icon: Database,
    title: "API Integration",
    description: "Axios + TanStack Query for efficient data fetching"
  },
  {
    icon: Shield,
    title: "Form Validation", 
    description: "React Hook Form + Zod for type-safe validation"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized bundle size and runtime performance"
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Built-in best practices and error handling"
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-animated py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium glass">
              🚀 Production Ready Template
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              BaseProject
              <span className="block text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                Modern React Template
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Jump-start your next project with this comprehensive React + TypeScript template.
              Built with modern tools and best practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glass hover:glow transition-all duration-300 text-white border border-white/20">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Button>
              <Button variant="outline" size="lg" className="glass text-white border-white/30 hover:bg-white/10">
                <ExternalLink className="h-5 w-5 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything You Need to 
              <span className="text-gradient"> Build Amazing Apps</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A carefully crafted template with modern tools, beautiful design, and production-ready configuration.
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
                        <span>Ready to use</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Carefully selected tools that work perfectly together for maximum productivity.
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
              All dependencies are up-to-date and production-tested
            </p>
            <Button variant="outline" size="lg">
              View Full Dependencies
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore the Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Interactive examples of all the included functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">User Management</CardTitle>
                </div>
                <CardDescription>
                  Complete CRUD operations with TanStack Query and Axios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Form validation with Zod</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Optimistic updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Error handling & loading states</span>
                  </div>
                </div>
                <Link to="/users">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Try User Demo
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Posts & Content</CardTitle>
                </div>
                <CardDescription>
                  Advanced data fetching with filtering and pagination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Advanced filtering</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Responsive card layouts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Search & sort functionality</span>
                  </div>
                </div>
                <Link to="/posts">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Browse Posts
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Contact Forms</CardTitle>
                </div>
                <CardDescription>
                  Beautiful forms with comprehensive validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Real-time validation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Accessible form controls</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Success notifications</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Try Contact Form
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get started with this production-ready template and save weeks of setup time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Github className="h-5 w-5 mr-2" />
              Clone Repository
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Read Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}