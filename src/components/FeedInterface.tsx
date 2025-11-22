import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FeedPost } from './FeedPost';
import { ForYouFeed } from './ForYouFeed';
import { Filter, Search, TrendingUp, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { FeedPost as FeedPostType, UserPreferences, LegalCategory } from '@/types/feed';
import { FeedAlgorithm } from '@/services/feedAlgorithm';
import { mockFeedPosts, defaultUserPreferences } from '@/data/mockFeedData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const FeedInterface = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>('relevance');
  const [showRegulationsOnly, setShowRegulationsOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let filteredPosts = mockFeedPosts;

    if (selectedCategory !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

    if (showRegulationsOnly) {
      filteredPosts = filteredPosts.filter(post => post.isRegulation);
    }

    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'relevance':
        filteredPosts = FeedAlgorithm.sortPostsByRelevance(filteredPosts, userPreferences);
        break;
      case 'recent':
        filteredPosts = [...filteredPosts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case 'popular':
        filteredPosts = [...filteredPosts].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
    }

    setPosts(filteredPosts);
  }, [selectedCategory, searchQuery, sortBy, showRegulationsOnly, userPreferences]);

  const handleInteraction = (postId: string, action: string) => {
    const newInteraction = {
      postId,
      action: action as any,
      timestamp: new Date(),
      timeSpent: Math.floor(Math.random() * 300) + 60
    };

    setUserPreferences(prev => ({
      ...prev,
      interactionHistory: [...prev.interactionHistory, newInteraction],
      savedPosts: action === 'save' 
        ? prev.savedPosts.includes(postId)
          ? prev.savedPosts.filter(id => id !== postId)
          : [...prev.savedPosts, postId]
        : prev.savedPosts
    }));

    toast({
      title: "Action recorded",
      description: `Your ${action} has been recorded to improve recommendations`,
    });
  };

  const handleForYouPostClick = (postId: string) => {
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const categories: { value: LegalCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Topics' },
    { value: 'constitutional-law', label: 'Constitutional Law' },
    { value: 'criminal-law', label: 'Criminal Law' },
    { value: 'corporate-law', label: 'Corporate Law' },
    { value: 'labor-law', label: 'Labor Law' },
    { value: 'intellectual-property', label: 'Intellectual Property' },
    { value: 'environmental-law', label: 'Environmental Law' },
    { value: 'regulations', label: 'Regulations' },
    { value: 'legal-news', label: 'Legal News' }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Fixed Header */}
      <div className="border-b border-border/60 bg-card/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-5 border-b border-border/40">
            <div className="flex items-center gap-5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2 hover:bg-secondary/10 hover:text-secondary h-10 px-4 rounded-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </Button>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 shadow-sm">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                    LaWEase Legal Feed
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5">Your personalized legal intelligence platform</p>
                </div>
              </div>
            </div>
            <Button
              variant={showRegulationsOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowRegulationsOnly(!showRegulationsOnly)}
              className="gap-2 h-10 px-4 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Regulations Only</span>
            </Button>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, cases, regulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-lg border-border/60 bg-background/50"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Sort by:</span>
              <Button
                variant={sortBy === 'relevance' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('relevance')}
                className={cn(
                  "gap-1.5 h-9 px-3 rounded-lg",
                  sortBy === 'relevance' && "shadow-sm"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Relevance</span>
              </Button>
              <Button
                variant={sortBy === 'recent' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('recent')}
                className={cn(
                  "gap-1.5 h-9 px-3 rounded-lg",
                  sortBy === 'recent' && "shadow-sm"
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Recent</span>
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('popular')}
                className={cn(
                  "gap-1.5 h-9 px-3 rounded-lg",
                  sortBy === 'popular' && "shadow-sm"
                )}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Popular</span>
              </Button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                  "border border-transparent",
                  selectedCategory === category.value
                    ? "bg-secondary text-secondary-foreground shadow-sm border-secondary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl h-full">
          <div className="flex gap-6 h-full py-6">
            {/* Main Feed Column (70%) */}
            <div className="flex-1 min-w-0">
              <ScrollArea className="h-full pr-2">
                {posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">No articles found</h2>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Try adjusting your filters or search terms to find relevant legal content
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <div key={post.id} id={`post-${post.id}`}>
                        <FeedPost
                          post={post}
                          onInteraction={handleInteraction}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* For You Sidebar (30%) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-[180px]">
                <ForYouFeed posts={posts} onPostClick={handleForYouPostClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};