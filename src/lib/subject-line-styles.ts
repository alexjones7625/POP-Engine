export interface SubjectLineStyle {
  id: string;
  name: string;
  description: string;
  example: string;
  tacticId: string;
}

export const subjectLineStyles: SubjectLineStyle[] = [
  {
    id: "announcement",
    name: "Announcement",
    description: "Straightforward news or product update",
    example: "Introducing Our New Line",
    tacticId: "SUBJ-004",
  },
  {
    id: "benefit",
    name: "Benefit",
    description: "Lead with clear value proposition",
    example: "20% Off Everything",
    tacticId: "SUBJ-004",
  },
  {
    id: "cliffhanger",
    name: "Cliffhanger",
    description: "Open a loop that demands resolution",
    example: "What Happened Next...",
    tacticId: "SUBJ-003",
  },
  {
    id: "controversial",
    name: "Controversial",
    description: "Challenge assumptions or go against the grain",
    example: "Stop Buying Protein Powder",
    tacticId: "SUBJ-003",
  },
  {
    id: "how-to",
    name: "How-To",
    description: "Promise practical knowledge or solution",
    example: "How To Wake Up Energized",
    tacticId: "SUBJ-004",
  },
  {
    id: "intrigue",
    name: "Intrigue",
    description: "Build pure curiosity without revealing anything",
    example: "Myth. Busted.",
    tacticId: "SUBJ-003",
  },
  {
    id: "listicle",
    name: "Listicle",
    description: "Number-based promise of organized info",
    example: "3 Things You Don't Know",
    tacticId: "SUBJ-003",
  },
  {
    id: "oppositional",
    name: "Oppositional",
    description: "Contrast or before/after framing",
    example: "What We Were vs Now",
    tacticId: "SUBJ-003",
  },
  {
    id: "personal",
    name: "Personal",
    description: "Conversational, feels like a friend texting",
    example: "You're Going to Love This",
    tacticId: "SUBJ-001",
  },
  {
    id: "question",
    name: "Question",
    description: "Engage with a question they can't ignore",
    example: "Still Thinking About It?",
    tacticId: "SUBJ-003",
  },
  {
    id: "short",
    name: "Short",
    description: "Maximum 2-3 words for impact",
    example: "They're Back",
    tacticId: "SUBJ-002",
  },
  {
    id: "social-proof",
    name: "Social Proof",
    description: "Leverage others' actions or opinions",
    example: "Join 10,000+ Happy Customers",
    tacticId: "SUBJ-010",
  },
  {
    id: "statistic",
    name: "Statistic",
    description: "Lead with a specific, surprising number",
    example: "87% See Results in 7 Days",
    tacticId: "SUBJ-004",
  },
  {
    id: "unconventional",
    name: "Unconventional",
    description: "Unexpected format or phrasing that breaks pattern",
    example: "re: your cart (it misses you)",
    tacticId: "SUBJ-003",
  },
  {
    id: "urgency",
    name: "Urgency",
    description: "Time or scarcity pressure (only when real)",
    example: "Ends Tonight",
    tacticId: "SUBJ-005",
  },
];
