import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { postAPI } from "@/lib/api";
import { FileText, User, Plus, MessageSquare } from "lucide-react";

export default function Posts() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', selectedUserId],
    queryFn: async () => {
      if (selectedUserId) {
        const response = await postAPI.getByUserId(selectedUserId);
        return response.data;
      } else {
        const response = await postAPI.getAll();
        return response.data;
      }
    },
  });

  if (error) {
    return (
      <div className="container py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive">Falha ao carregar postagens. Tente novamente.</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredPosts = selectedUserId 
    ? posts?.filter(post => post.userId === selectedUserId)
    : posts;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Postagens e Artigos
          </h1>
          <p className="text-muted-foreground mt-2">
            Navegue pelas postagens com filtragem avançada e integração com API
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedUserId ? "outline" : "default"}
            onClick={() => setSelectedUserId(null)}
          >
            Todas as Postagens
          </Button>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Postagem
          </Button>
        </div>
      </div>

      {/* Botões de Filtro de Usuário */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Filtrar por Usuário:</p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((userId) => (
            <Button
              key={userId}
              variant={selectedUserId === userId ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedUserId(userId)}
              className="gap-1"
            >
              <User className="h-3 w-3" />
              Usuário {userId}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Carregando postagens..." />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts?.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    ID: {post.id}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" />
                    Usuário {post.userId}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                  {post.body}
                </CardDescription>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.body.length} caracteres</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ler Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredPosts && filteredPosts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {selectedUserId ? `Nenhuma postagem encontrada para o Usuário ${selectedUserId}` : "Nenhuma postagem encontrada"}
            </p>
            <p className="text-muted-foreground mb-4">
              {selectedUserId ? "Tente selecionar um usuário diferente" : "Volte mais tarde para novo conteúdo"}
            </p>
            {selectedUserId && (
              <Button onClick={() => setSelectedUserId(null)} variant="outline">
                Mostrar Todas as Postagens
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}