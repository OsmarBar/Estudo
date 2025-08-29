import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2, Users, FileText, MessageSquare, LogIn, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Início", href: "/", icon: Code2 },
  { name: "Usuários", href: "/users", icon: Users },
  { name: "Postagens", href: "/posts", icon: FileText },
  { name: "Contato", href: "/contact", icon: MessageSquare },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            Genesis Base
          </span>
        </Link>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    isActive && "bg-primary text-primary-foreground shadow-md"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
          
          {/* Auth Buttons */}
          <div className="ml-4 flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.email}
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Navegação Mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-3 mt-6">
              <div className="flex items-center space-x-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  Genesis Base
                </span>
              </div>
              <div className="border-t pt-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start transition-all duration-200",
                          isActive && "bg-primary text-primary-foreground shadow-md"
                        )}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
                
                {/* Mobile Auth */}
                <div className="border-t pt-4 mt-4">
                  {user ? (
                    <>
                      <div className="px-2 py-2 text-sm text-muted-foreground">
                        Conectado como: {user.email}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="default" size="sm" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}