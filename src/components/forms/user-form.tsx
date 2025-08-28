import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { userSchema, UserFormData } from "@/lib/validations";
import { useCreateUser } from "@/hooks/useUsers";
import { User, Save, UserPlus } from "lucide-react";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSuccess?: () => void;
  isEditing?: boolean;
}

export function UserForm({ initialData, onSuccess, isEditing = false }: UserFormProps) {
  const createUser = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "" },
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website || '',
        company: {
          name: data.company.name,
        },
      };
      await createUser.mutateAsync(userData);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Falha ao enviar o formulário de usuário:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {isEditing ? "Editar Usuário" : "Criar Novo Usuário"}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Atualizar informações do usuário" : "Preencha os detalhes para criar um novo usuário"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="João Silva"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Endereço de Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="joao@exemplo.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+55 (11) 1234-5678"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Site (Opcional)</Label>
              <Input
                id="website"
                {...register("website")}
                placeholder="https://exemplo.com"
                className={errors.website ? "border-destructive" : ""}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company">Nome da Empresa</Label>
              <Input
                id="company"
                {...register("company.name")}
                placeholder="Empresa Acme"
                className={errors.company?.name ? "border-destructive" : ""}
              />
              {errors.company?.name && (
                <p className="text-sm text-destructive">{errors.company.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Redefinir
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                  {isEditing ? "Atualizar Usuário" : "Criar Usuário"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}