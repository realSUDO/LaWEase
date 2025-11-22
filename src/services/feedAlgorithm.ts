import { FeedPost, UserPreferences, RelevanceScore, UserInteraction } from '@/types/feed';

export class FeedAlgorithm {
  private static readonly WEIGHTS = {
    categoryMatch: 0.25,
    tagMatch: 0.20,
    interactionHistory: 0.20,
    recency: 0.15,
    engagement: 0.15,
    urgency: 0.05
  };

  static calculateRelevanceScore(
    post: FeedPost,
    userPreferences: UserPreferences
  ): RelevanceScore {
    const factors = {
      categoryMatch: this.calculateCategoryMatch(post, userPreferences),
      tagMatch: this.calculateTagMatch(post, userPreferences),
      interactionHistory: this.calculateInteractionScore(post, userPreferences),
      recency: this.calculateRecencyScore(post),
      engagement: this.calculateEngagementScore(post),
      urgency: this.calculateUrgencyScore(post)
    };

    const score = Object.entries(factors).reduce(
      (total, [key, value]) => total + (value * this.WEIGHTS[key as keyof typeof this.WEIGHTS]),
      0
    );

    return {
      postId: post.id,
      score: Math.min(Math.max(score, 0), 1),
      factors
    };
  }

  private static calculateCategoryMatch(post: FeedPost, preferences: UserPreferences): number {
    return preferences.categories.includes(post.category) ? 1 : 0;
  }

  private static calculateTagMatch(post: FeedPost, preferences: UserPreferences): number {
    const matchingTags = post.tags.filter(tag => preferences.tags.includes(tag));
    return post.tags.length > 0 ? matchingTags.length / post.tags.length : 0;
  }

  private static calculateInteractionScore(post: FeedPost, preferences: UserPreferences): number {
    const relatedInteractions = preferences.interactionHistory.filter(interaction => {
      const relatedPost = this.findPostByCategory(post.category, preferences);
      return relatedPost || post.tags.some(tag => preferences.tags.includes(tag));
    });

    const positiveInteractions = relatedInteractions.filter(
      interaction => ['upvote', 'comment', 'share', 'save'].includes(interaction.action)
    );

    return relatedInteractions.length > 0 ? positiveInteractions.length / relatedInteractions.length : 0;
  }

  private static calculateRecencyScore(post: FeedPost): number {
    const hoursSincePost = (Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60);
    return Math.max(0, 1 - (hoursSincePost / 168)); // Decay over 1 week
  }

  private static calculateEngagementScore(post: FeedPost): number {
    const totalVotes = post.upvotes + post.downvotes;
    if (totalVotes === 0) return 0;
    
    const ratio = post.upvotes / totalVotes;
    const engagement = (post.upvotes + post.commentCount) / Math.max(1, totalVotes);
    
    return (ratio * 0.7) + (Math.min(engagement, 1) * 0.3);
  }

  private static calculateUrgencyScore(post: FeedPost): number {
    if (!post.isRegulation) return 0;
    
    const urgencyMap = { low: 0.3, medium: 0.6, high: 1.0 };
    return urgencyMap[post.urgency];
  }

  private static findPostByCategory(category: string, preferences: UserPreferences): boolean {
    return preferences.interactionHistory.some(interaction => 
      preferences.categories.includes(category as any)
    );
  }

  static sortPostsByRelevance(posts: FeedPost[], userPreferences: UserPreferences): FeedPost[] {
    const scoredPosts = posts.map(post => ({
      post,
      relevance: this.calculateRelevanceScore(post, userPreferences)
    }));

    return scoredPosts
      .sort((a, b) => b.relevance.score - a.relevance.score)
      .map(item => item.post);
  }
}