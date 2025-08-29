import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useCreatePost, useUpdatePost, type Post } from '@/hooks/usePosts';
import { FileText, Save, X } from 'lucide-react';

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const isEditing = !!post;
  const isLoading = createPost.isPending || updatePost.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      return;
    }

    try {
      if (isEditing) {
        await updatePost.mutateAsync({
          id: post.id,
          data: { title, body }
        });
      } else {
        await createPost.mutateAsync({ title, body });
      }
      
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {isEditing ? 'Editar Post' : 'Criar Novo Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do seu post..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body">Conteúdo</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escreva o conteúdo do seu post..."
              rows={8}
              required
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isLoading || !title.trim() || !body.trim()}>
              {isLoading ? (
                <LoadingSpinner size="sm" text={isEditing ? "Salvando..." : "Criando..."} />
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? 'Salvar Alterações' : 'Publicar Post'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}