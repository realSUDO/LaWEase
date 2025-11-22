import { FeedPost, UserPreferences } from '@/types/feed';

export const mockFeedPosts: FeedPost[] = [
  {
    id: '1',
    title: 'Supreme Court Rules on Digital Privacy Rights in Landmark Case',
    content: 'The Supreme Court has issued a groundbreaking ruling on digital privacy rights, establishing new precedents for data protection in the digital age. This decision will significantly impact how companies handle user data and government surveillance programs.',
    author: 'Legal News Network',
    category: 'constitutional-law',
    tags: ['privacy', 'digital-rights', 'supreme-court', 'data-protection'],
    upvotes: 245,
    downvotes: 12,
    commentCount: 67,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: 'Legal News Network',
    isRegulation: false,
    urgency: 'high',
    readTime: 5
  },
  {
    id: '2',
    title: 'New Corporate Compliance Regulations Effective January 2024',
    content: 'The Securities and Exchange Commission has announced new corporate compliance regulations that will take effect in January 2024. These regulations focus on enhanced transparency requirements and stricter reporting standards for publicly traded companies.',
    author: 'SEC Official',
    category: 'corporate-law',
    tags: ['sec', 'compliance', 'regulations', 'corporate-governance'],
    upvotes: 189,
    downvotes: 8,
    commentCount: 34,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    source: 'SEC.gov',
    isRegulation: true,
    urgency: 'high',
    readTime: 7
  },
  {
    id: '3',
    title: 'Federal Court Clarifies Employment Law Standards for Remote Work',
    content: 'A federal appeals court has provided important clarification on employment law standards as they apply to remote work arrangements. The ruling addresses questions about overtime pay, workplace safety, and employer liability in remote work settings.',
    author: 'Employment Law Today',
    category: 'labor-law',
    tags: ['remote-work', 'employment', 'overtime', 'workplace-safety'],
    upvotes: 156,
    downvotes: 5,
    commentCount: 28,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    source: 'Employment Law Today',
    isRegulation: false,
    urgency: 'medium',
    readTime: 4
  },
  {
    id: '4',
    title: 'Updated Environmental Protection Agency Guidelines for 2024',
    content: 'The EPA has released updated environmental protection guidelines for 2024, including new standards for air quality monitoring, water pollution control, and waste management. These guidelines will affect industries nationwide.',
    author: 'EPA Communications',
    category: 'environmental-law',
    tags: ['epa', 'environment', 'pollution', 'guidelines', 'air-quality'],
    upvotes: 134,
    downvotes: 15,
    commentCount: 42,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    source: 'EPA.gov',
    isRegulation: true,
    urgency: 'medium',
    readTime: 6
  },
  {
    id: '5',
    title: 'Intellectual Property Rights in AI-Generated Content: New Precedent Set',
    content: 'A landmark case has established new precedent regarding intellectual property rights in AI-generated content. The court\'s decision addresses ownership, licensing, and fair use considerations for content created by artificial intelligence systems.',
    author: 'IP Law Review',
    category: 'intellectual-property',
    tags: ['ai', 'intellectual-property', 'copyright', 'fair-use'],
    upvotes: 298,
    downvotes: 22,
    commentCount: 89,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    source: 'IP Law Review',
    isRegulation: false,
    urgency: 'high',
    readTime: 8
  }
];

export const defaultUserPreferences: UserPreferences = {
  categories: ['constitutional-law', 'corporate-law', 'intellectual-property'],
  tags: ['privacy', 'digital-rights', 'compliance', 'ai', 'copyright'],
  interactionHistory: [
    {
      postId: '1',
      action: 'upvote',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      timeSpent: 300
    },
    {
      postId: '5',
      action: 'save',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      timeSpent: 480
    }
  ],
  savedPosts: ['5']
};