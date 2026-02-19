export interface CampaignFramework {
  id: string;
  name: string;
  tacticId: string;
  bestFor: string;
  category: "product" | "educational" | "social-proof" | "brand-story" | "seasonal";
}

export const campaignFrameworks: CampaignFramework[] = [
  { id: "1", name: "One Benefit Deep-Dive", tacticId: "CAMP-002", bestFor: "Highlighting single product advantage", category: "product" },
  { id: "2", name: "One Feature Spotlight", tacticId: "CAMP-003", bestFor: "Showcasing a specific product feature", category: "product" },
  { id: "3", name: "FAQ Deep-Dive", tacticId: "CAMP-004", bestFor: "Answering customer objections", category: "product" },
  { id: "4", name: "What's Inside", tacticId: "CAMP-005", bestFor: "Ingredient/component transparency", category: "product" },
  { id: "5", name: "How It's Made", tacticId: "CAMP-006", bestFor: "Manufacturing quality story", category: "product" },
  { id: "6", name: "How To Use", tacticId: "CAMP-007", bestFor: "Usage education for complex products", category: "product" },
  { id: "7", name: "Back In Stock", tacticId: "CAMP-008", bestFor: "Creating urgency with restocked items", category: "product" },
  { id: "8", name: "Trending/Bestsellers", tacticId: "CAMP-009", bestFor: "Social proof via popularity", category: "product" },
  { id: "9", name: "Reviews/Testimonials Feature", tacticId: "CAMP-010", bestFor: "Building trust through customer voices", category: "social-proof" },
  { id: "10", name: "Us vs Them", tacticId: "CAMP-011", bestFor: "Direct competitor comparison", category: "educational" },
  { id: "11", name: "Myths vs Facts", tacticId: "CAMP-012", bestFor: "Busting industry misconceptions", category: "educational" },
  { id: "12", name: "Blog Content Promotion", tacticId: "CAMP-013", bestFor: "Driving traffic to educational content", category: "educational" },
  { id: "13", name: "Research Study", tacticId: "CAMP-014", bestFor: "Authority building with data", category: "educational" },
  { id: "14", name: "Holiday Email", tacticId: "CAMP-015", bestFor: "Seasonal relevance + promotions", category: "seasonal" },
  { id: "15", name: "Progress Update", tacticId: "CAMP-016", bestFor: "Brand milestone sharing", category: "brand-story" },
  { id: "16", name: "Customer Transformation", tacticId: "CAMP-017", bestFor: "Before/after success stories", category: "social-proof" },
  { id: "17", name: "Before vs After", tacticId: "CAMP-018", bestFor: "Visual transformation proof", category: "social-proof" },
  { id: "18", name: "Puzzles/Riddles/Engagement", tacticId: "CAMP-019", bestFor: "Interactive engagement boost", category: "seasonal" },
  { id: "19", name: "Note from Founder", tacticId: "CAMP-020", bestFor: "Personal brand connection", category: "brand-story" },
  { id: "20", name: "Gift Guide", tacticId: "CAMP-021", bestFor: "Holiday/occasion product curation", category: "seasonal" },
  { id: "21", name: "Treat Yourself", tacticId: "CAMP-022", bestFor: "Self-purchase justification", category: "seasonal" },
  { id: "22", name: "Media Publications", tacticId: "CAMP-023", bestFor: "As-seen-in credibility", category: "social-proof" },
  { id: "23", name: "Behind the Scenes", tacticId: "CAMP-024", bestFor: "Transparency and authenticity", category: "brand-story" },
  { id: "24", name: "Tips and Tricks", tacticId: "CAMP-025", bestFor: "Value-first educational content", category: "educational" },
  { id: "25", name: "UGC (User-Generated Content)", tacticId: "CAMP-026", bestFor: "Community-driven social proof", category: "social-proof" },
  { id: "26", name: "Sneak Peek", tacticId: "CAMP-027", bestFor: "Building anticipation for launches", category: "brand-story" },
  { id: "27", name: "Flashback/Throwback", tacticId: "CAMP-028", bestFor: "Nostalgia + brand heritage", category: "brand-story" },
  { id: "28", name: "Staff Picks", tacticId: "CAMP-029", bestFor: "Personal recommendations with faces", category: "social-proof" },
  { id: "29", name: "Brand Values", tacticId: "CAMP-030", bestFor: "Mission-driven connection", category: "brand-story" },
];

export const campaignStyles = [
  { id: "designed", label: "Designed", description: "Rich HTML email with graphics and layout", icon: "🎨" },
  { id: "text-based", label: "Text-Based", description: "Plain text, personal feel from founder", icon: "✏️" },
  { id: "sms", label: "SMS", description: "160 character mobile messages", icon: "📱" },
] as const;

export type CampaignStyle = (typeof campaignStyles)[number]["id"];
