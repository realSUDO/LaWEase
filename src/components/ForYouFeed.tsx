import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Flame, MessageCircle } from 'lucide-react';
import { FeedPost } from '@/types/feed';
import { cn } from '@/lib/utils';

interface ForYouFeedProps {
  posts: FeedPost[];
  onPostClick: (postId: string) => void;
}

export const ForYouFeed = ({ posts, onPostClick }: ForYouFeedProps) => {
  const topPosts = posts.slice(0, 5);

  const getCategoryColor = (category: string) => {
    const colors = {
      'constitutional-law': 'bg-secondary/20 text-secondary',
      'criminal-law': 'bg-red-500/20 text-red-400',
      'corporate-law': 'bg-green-500/20 text-green-400',
      'labor-law': 'bg-purple-500/20 text-purple-400',
      'intellectual-property': 'bg-orange-500/20 text-orange-400',
      'environmental-law': 'bg-emerald-500/20 text-emerald-400',
      'tax-law': 'bg-amber-500/20 text-amber-400',
      'international-law': 'bg-cyan-500/20 text-cyan-400',
      'regulations': 'bg-yellow-500/20 text-yellow-400',
      'case-updates': 'bg-indigo-500/20 text-indigo-400',
      'legal-news': 'bg-primary/20 text-primary-foreground'
    };
    return colors[category as keyof typeof colors] || colors['legal-news'];
  };

  return (
    <Card className="border-border/50 bg-card shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 px-5 py-4 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/30 to-primary/30">
              <Flame className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">For You</h2>
              <p className="text-xs text-muted-foreground">Trending in your interests</p>
            </div>
          </div>
        </div>

        {/* Trending Posts */}
        <div className="divide-y divide-border/30">
          {topPosts.map((post, index) => (
            <div
              key={post.id}
              className="px-5 py-4 hover:bg-accent/30 transition-all duration-200 cursor-pointer group"
              onClick={() => onPostClick(post.id)}
            >
              <div className="flex items-start gap-3">
                {/* Rank Badge */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  <Badge className={cn("text-[10px] font-semibold mb-2 px-2 py-0.5", getCategoryColor(post.category))}>
                    {post.category.replace('-', ' ').toUpperCase()}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Metrics */}
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span className="font-medium">{post.commentCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-muted/30 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Personalized based on your reading history
          </p>
        </div>
      </CardContent>
    </Card>
  );
};