export interface FeedPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: LegalCategory;
  tags: string[];
  upvotes: number;
  downvotes: number;
  commentCount: number;
  timestamp: Date;
  source: string;
  isRegulation: boolean;
  urgency: 'low' | 'medium' | 'high';
  readTime: number;
}

export interface UserInteraction {
  postId: string;
  action: 'view' | 'upvote' | 'downvote' | 'comment' | 'share' | 'save';
  timestamp: Date;
  timeSpent?: number;
}

export interface UserPreferences {
  categories: LegalCategory[];
  tags: string[];
  interactionHistory: UserInteraction[];
  savedPosts: string[];
}

export type LegalCategory = 
  | 'constitutional-law'
  | 'criminal-law'
  | 'civil-law'
  | 'corporate-law'
  | 'tax-law'
  | 'labor-law'
  | 'intellectual-property'
  | 'environmental-law'
  | 'international-law'
  | 'regulations'
  | 'case-updates'
  | 'legal-news';

export interface RelevanceScore {
  postId: string;
  score: number;
  factors: {
    categoryMatch: number;
    tagMatch: number;
    interactionHistory: number;
    recency: number;
    engagement: number;
    urgency: number;
  };
}