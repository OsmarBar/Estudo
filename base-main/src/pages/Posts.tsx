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
              <p className="text-destructive">Failed to load posts. Please try again.</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
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
            Posts & Articles
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse posts with advanced filtering and API integration
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedUserId ? "outline" : "default"}
            onClick={() => setSelectedUserId(null)}
          >
            All Posts
          </Button>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* User Filter Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Filter by User:</p>
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
              User {userId}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Loading posts..." />
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
                    User {post.userId}
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
                    <span>{post.body.length} characters</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Read More
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
              {selectedUserId ? `No posts found for User ${selectedUserId}` : "No posts found"}
            </p>
            <p className="text-muted-foreground mb-4">
              {selectedUserId ? "Try selecting a different user" : "Check back later for new content"}
            </p>
            {selectedUserId && (
              <Button onClick={() => setSelectedUserId(null)} variant="outline">
                Show All Posts
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}