import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Share, Bookmark, Clock, AlertTriangle, BookmarkPlus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FeedPost as FeedPostType } from '@/types/feed';
import { cn } from '@/lib/utils';

interface FeedPostProps {
  post: FeedPostType;
  onInteraction: (postId: string, action: string) => void;
}

export const FeedPost = ({ post, onInteraction }: FeedPostProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const handleVote = (voteType: 'up' | 'down') => {
    setUserVote(userVote === voteType ? null : voteType);
    onInteraction(post.id, voteType === 'up' ? 'upvote' : 'downvote');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onInteraction(post.id, 'save');
    setSwipeOffset(0);
  };

  const handleShare = () => {
    onInteraction(post.id, 'share');
    setSwipeOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = swipeOffset;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newOffset = currentXRef.current + deltaX;
    if (newOffset >= 0 && newOffset <= 150) {
      setSwipeOffset(newOffset);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeOffset > 75) {
      setSwipeOffset(150);
    } else {
      setSwipeOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    currentXRef.current = swipeOffset;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newOffset = currentXRef.current + deltaX;
    if (newOffset >= 0 && newOffset <= 150) {
      setSwipeOffset(newOffset);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (swipeOffset > 75) {
      setSwipeOffset(150);
    } else {
      setSwipeOffset(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, swipeOffset]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'constitutional-law': 'bg-secondary/20 text-secondary border-secondary/40',
      'criminal-law': 'bg-red-500/20 text-red-400 border-red-500/40',
      'corporate-law': 'bg-green-500/20 text-green-400 border-green-500/40',
      'labor-law': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      'intellectual-property': 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      'environmental-law': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      'tax-law': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      'international-law': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      'regulations': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      'case-updates': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
      'legal-news': 'bg-primary/20 text-primary-foreground border-primary/40'
    };
    return colors[category as keyof typeof colors] || colors['legal-news'];
  };

  return (
    <div className="relative overflow-hidden">
      {/* Swipe Action Buttons */}
      <div className="absolute right-0 top-0 bottom-0 w-[150px] flex items-center justify-end gap-3 pr-4 pointer-events-none z-10">
        <Button
          onClick={handleSave}
          className={cn(
            "h-14 w-14 rounded-full transition-all duration-300 pointer-events-auto",
            "bg-secondary/90 hover:bg-secondary backdrop-blur-lg shadow-xl",
            swipeOffset > 0 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{
            transform: `translateX(${Math.max(0, 150 - swipeOffset)}px)`,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <BookmarkPlus className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleShare}
          className={cn(
            "h-14 w-14 rounded-full transition-all duration-300 pointer-events-auto",
            "bg-primary/90 hover:bg-primary backdrop-blur-lg shadow-xl",
            swipeOffset > 0 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{
            transform: `translateX(${Math.max(0, 150 - swipeOffset)}px)`,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Card */}
      <Card 
        ref={cardRef}
        className={cn(
          "border border-border/50 relative swipe-card bg-card hover:border-secondary/30 transition-all duration-200 rounded-xl",
          isDragging ? "cursor-grabbing shadow-2xl scale-[0.99]" : "cursor-grab hover:shadow-lg",
          swipeOffset > 0 && "shadow-xl border-secondary/40"
        )}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <CardContent className="p-6">
          {/* Header: Category and Regulation Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge className={cn("text-xs font-semibold border px-2.5 py-0.5", getCategoryColor(post.category))}>
              {post.category.replace('-', ' ').toUpperCase()}
            </Badge>
            {post.isRegulation && (
              <Badge variant="outline" className="text-xs font-semibold border-yellow-500/50 text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5">
                REGULATION
              </Badge>
            )}
            {post.isRegulation && post.urgency === 'high' && (
              <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse ml-1" />
            )}
          </div>

          {/* Title */}
          <h2 
            className="text-xl font-bold text-foreground hover:text-secondary cursor-pointer transition-colors mb-3 leading-tight"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {post.title}
          </h2>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 flex-wrap">
            <span className="font-medium text-foreground/80">by {post.author}</span>
            <span>·</span>
            <span>{post.source}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
            <span>·</span>
            <span>{new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {/* Content Excerpt */}
          <div className={cn(
            "text-foreground/85 text-[15px] leading-relaxed mb-4",
            !isExpanded && "line-clamp-3"
          )}>
            {post.content}
          </div>
          
          {post.content.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mb-4"
            >
              {isExpanded ? '← Show less' : 'Read more →'}
            </button>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-4 pb-4 border-b border-border/40">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs font-normal hover:bg-secondary/30 transition-colors cursor-pointer px-2.5 py-0.5"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Engagement Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Vote Buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                className={cn(
                  "h-9 px-3 rounded-lg hover:bg-green-500/10 hover:text-green-500 transition-all",
                  userVote === 'up' && "text-green-500 bg-green-500/15"
                )}
              >
                <ArrowUp className="h-4 w-4 mr-1.5" />
                <span className="font-semibold text-sm">{post.upvotes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                className={cn(
                  "h-9 px-3 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all",
                  userVote === 'down' && "text-red-500 bg-red-500/15"
                )}
              >
                <ArrowDown className="h-4 w-4 mr-1.5" />
                <span className="font-semibold text-sm">{post.downvotes}</span>
              </Button>

              {/* Comment Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInteraction(post.id, 'comment')}
                className="h-9 px-3 rounded-lg hover:bg-secondary/10 hover:text-secondary transition-all ml-1"
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                <span className="font-semibold text-sm">{post.commentCount}</span>
              </Button>

              {/* Share Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInteraction(post.id, 'share')}
                className="h-9 px-3 rounded-lg hover:bg-primary/10 hover:text-primary-foreground transition-all"
              >
                <Share className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Share</span>
              </Button>
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={cn(
                "h-9 px-3 rounded-lg hover:bg-secondary/10 hover:text-secondary transition-all",
                isSaved && "text-secondary bg-secondary/15"
              )}
            >
              <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};