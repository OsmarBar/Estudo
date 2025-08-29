import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PostForm } from "@/components/forms/post-form";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts, useDeletePost, type Post } from "@/hooks/usePosts";
import { FileText, Plus, Edit, Trash2, Calendar, User } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Posts() {
  const { user, loading: authLoading } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);

  const { data: posts, isLoading, error } = usePosts(selectedUserId);
  const deletePost = useDeletePost();

  if (authLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Carregando..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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

  if (showCreateForm) {
    return (
      <div className="container py-8">
        <PostForm
          onSuccess={() => setShowCreateForm(false)}
          onCancel={() => setShowCreateForm(false)}
        />
      </div>
    );
  }

  if (editingPost) {
    return (
      <div className="container py-8">
        <PostForm
          post={editingPost}
          onSuccess={() => setEditingPost(undefined)}
          onCancel={() => setEditingPost(undefined)}
        />
      </div>
    );
  }

  const handleDeletePost = async (postId: string) => {
    await deletePost.mutateAsync(postId);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Meus Posts
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas postagens com total controle
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedUserId ? "outline" : "default"}
            onClick={() => setSelectedUserId(undefined)}
          >
            Todos os Posts
          </Button>
          <Button 
            variant={selectedUserId === user.id ? "default" : "outline"}
            onClick={() => setSelectedUserId(user.id)}
          >
            Meus Posts
          </Button>
          <Button 
            variant="default" 
            className="gap-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4" />
            Novo Post
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Carregando posts..." />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {post.user_id === user.id && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" />
                    {post.user_id === user.id ? 'Você' : 'Outro usuário'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {posts && posts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {selectedUserId === user.id ? "Você ainda não tem posts" : "Nenhum post encontrado"}
            </p>
            <p className="text-muted-foreground mb-4">
              {selectedUserId === user.id 
                ? "Crie seu primeiro post para começar a compartilhar conteúdo" 
                : "Tente ajustar os filtros ou volte mais tarde"
              }
            </p>
            {selectedUserId === user.id && (
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Criar Primeiro Post
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}