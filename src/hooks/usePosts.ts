import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title: string;
  body: string;
}

export interface UpdatePostData {
  title?: string;
  body?: string;
}

export function usePosts(userId?: string) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: async (): Promise<Post[]> => {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Erro ao carregar posts",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostData): Promise<Post> => {
      const { data: result, error } = await supabase
        .from('posts')
        .insert([
          {
            title: data.title,
            body: data.body,
            user_id: (await supabase.auth.getUser()).data.user?.id,
          },
        ])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao criar post",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post criado!",
        description: "Seu post foi publicado com sucesso.",
      });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePostData }): Promise<Post> => {
      const { data: result, error } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao atualizar post",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post atualizado!",
        description: "Suas alterações foram salvas.",
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Erro ao excluir post",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post excluído!",
        description: "O post foi removido com sucesso.",
      });
    },
  });
}