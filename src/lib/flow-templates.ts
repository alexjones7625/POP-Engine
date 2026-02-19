import type { Node, Edge } from "@xyflow/react";

// ── Types ──────────────────────────────────────────────────────────

export type FlowNodeType = "trigger" | "email" | "sms" | "delay" | "condition";

export interface EmailNodeData {
  label: string;
  emailNumber: number;
  brief: string;
  framework: string;
  timing: string;
  status: "empty" | "brief" | "draft" | "reviewed" | "approved";
  copy?: {
    subject: string;
    preview: string;
    body: string;
  };
  [key: string]: unknown;
}

export interface TriggerNodeData {
  label: string;
  triggerType: string;
  description: string;
  [key: string]: unknown;
}

export interface DelayNodeData {
  label: string;
  duration: string;
  [key: string]: unknown;
}

export interface ConditionNodeData {
  label: string;
  condition: string;
  description: string;
  [key: string]: unknown;
}

// ── Flow Template Definition ───────────────────────────────────────

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
  emailCount: string;
  tacticId: string;
  nodes: Node[];
  edges: Edge[];
}

// ── Helper to build positioned nodes ───────────────────────────────

const Y_SPACING = 100;
const X_CENTER = 300;

function triggerNode(
  id: string,
  y: number,
  data: TriggerNodeData
): Node {
  return { id, type: "trigger", position: { x: X_CENTER, y }, data };
}

function emailNode(
  id: string,
  y: number,
  data: EmailNodeData
): Node {
  return { id, type: "email", position: { x: X_CENTER, y }, data };
}

function delayNode(
  id: string,
  y: number,
  data: DelayNodeData
): Node {
  return { id, type: "delay", position: { x: X_CENTER, y }, data };
}

function conditionNode(
  id: string,
  y: number,
  data: ConditionNodeData
): Node {
  return { id, type: "condition", position: { x: X_CENTER, y }, data };
}

function edge(source: string, target: string, label?: string): Edge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    ...(label ? { label } : {}),
  };
}

// ── Templates ──────────────────────────────────────────────────────

export const flowTemplates: FlowTemplate[] = [
  // ────────────────────────────────────────────────────────────────
  // WELCOME FLOW (8 emails)
  // ────────────────────────────────────────────────────────────────
  {
    id: "welcome",
    name: "Welcome Flow",
    description:
      "Introduce new subscribers with an 8-email sequence: discount, brand story, best sellers, urgency, comparison, social proof, last chance, founder note",
    icon: "👋",
    badge: "Popular",
    emailCount: "8 emails",
    tacticId: "FLOW-ARCH-003",
    nodes: [
      triggerNode("t1", 0, {
        label: "New Subscriber",
        triggerType: "list_signup",
        description: "Triggers when someone joins the email list",
      }),
      emailNode("e1", Y_SPACING, {
        label: "Strong Introduction",
        emailNumber: 1,
        brief: "DESIGNED email. Deliver the promised welcome discount prominently at the top — don't make them hunt for it. Brief brand introduction (who we are, what we stand for). Show 3-4 bestseller products with individual shop buttons. Include 3-4 USP bullets (what makes us different). Add social proof section (star rating, customer count, media logos). Keep it simple — don't oversell on Email 1. Low-pressure conversion opportunity. Remind: discount code works on all products.",
        framework: "WELCOME-004",
        timing: "Immediate",
        status: "brief",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "1-2 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Brand Story",
        emailNumber: 2,
        brief: "TEXT-BASED email from the founder. Put a face to the name. Share the founding story — why we started this brand, the problem that existed, the solution we built, who it's for. 2-3 paragraphs, authentic conversational tone. Share the 'why' not just the 'what.' Optional team photo. Soft CTA: 'If you have questions, just hit reply.' End with P.S. reminding of welcome discount code. This is relationship building, NOT a sales email.",
        framework: "WELCOME-005",
        timing: "1-2 days",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "1-2 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Best Sellers",
        emailNumber: 3,
        brief: "DESIGNED email. Headline: 'Customer Favorites' or 'Meet Our Bestsellers.' Show 4-6 bestselling products — each with product image, name, key benefit (1 sentence), star rating + review count, and shop button. Mix price points if possible. Include risk reversals section (30-day guarantee, free shipping threshold, easy returns). End with 'Your welcome code works on all of these.' Alternative angle: deep-dive on ONE hero product with multiple benefits, use cases, and reviews.",
        framework: "WELCOME-006",
        timing: "1-2 days",
        status: "brief",
      }),
      delayNode("d3", Y_SPACING * 6, { label: "Wait", duration: "1-2 days" }),
      emailNode("e4", Y_SPACING * 7, {
        label: "Urgency + Risk Reversals",
        emailNumber: 4,
        brief: "DESIGNED email. Create time-bound urgency — 'Your welcome code expires in 48 hours.' Show discount code large and prominent. Optional countdown timer. Show bestsellers or last-viewed products. PROMINENT risk reversals: money-back guarantee, free shipping, easy returns, no questions asked. Social proof: 'Join X happy customers.' Strong CTA: 'Shop Before It's Gone.' Only use REAL deadlines — never fake urgency.",
        framework: "WELCOME-007",
        timing: "1-2 days",
        status: "brief",
      }),
      delayNode("d4", Y_SPACING * 8, { label: "Wait", duration: "1-2 days" }),
      emailNode("e5", Y_SPACING * 9, {
        label: "Us vs Them",
        emailNumber: 5,
        brief: "DESIGNED email. Differentiate from competitors without naming them. Headline: 'What Sets Us Apart' or 'How We're Different.' Brief intro: 'Not all [product category] is created equal.' Include comparison table/infographic with checkmarks (Us ✓ vs Them ✗) covering 4-6 key differentiators. 2-3 sentences explaining why these differences matter. Tone: confident and factual, never attack competitors directly. CTA: 'Choose Quality.' Optional: if original welcome code expired, offer a new smaller discount.",
        framework: "WELCOME-008",
        timing: "1-2 days",
        status: "brief",
      }),
      delayNode("d5", Y_SPACING * 10, { label: "Wait", duration: "1-2 days" }),
      emailNode("e6", Y_SPACING * 11, {
        label: "Heavy Social Proof",
        emailNumber: 6,
        brief: "DESIGNED email. Overwhelm with social proof. Headline: 'Don't Just Take Our Word For It.' Stats section: star rating, customer count, media features. Testimonial grid: 4-6 customer reviews — each with star rating, name + location, photo if available, specific benefit mentioned, 'Verified Purchase' badge. Media logos section: 'As Seen In.' User-generated content: real customer photos. CTA: 'Join Thousands of Happy Customers.' Include discount code reminder.",
        framework: "WELCOME-009",
        timing: "1-2 days",
        status: "brief",
      }),
      delayNode("d6", Y_SPACING * 12, { label: "Wait", duration: "1 day" }),
      emailNode("e7", Y_SPACING * 13, {
        label: "Last Chance",
        emailNumber: 7,
        brief: "DESIGNED email. Final urgency push. Headline: 'Final Call' or 'Last Chance.' Urgency message: 'This is your last chance to save X%.' Discount code displayed LARGE — 'Expires tonight at midnight.' Quick recap of why customers love us (3 bullet benefits). Show bestsellers. Risk reversal: 'Try risk-free for 30 days.' Strong CTA: 'Shop Now Before It's Gone.' Reinforcement: 'After tonight, this offer disappears.' Make the urgency REAL — actually end the discount after this.",
        framework: "WELCOME-010",
        timing: "1 day before expiry",
        status: "brief",
      }),
      delayNode("d7", Y_SPACING * 14, { label: "Wait", duration: "1 day" }),
      emailNode("e8", Y_SPACING * 15, {
        label: "Founder Note (Text)",
        emailNumber: 8,
        brief: "TEXT-BASED email from the founder. Personal check-in — 'I noticed you haven't ordered yet — is everything okay?' Offer support: 'If you have questions, just hit reply.' Extend discount one final time as a favor: 'I extended your code for one more day.' No pressure: 'No pressure either way — I just want to make sure you have what you need.' Sign with founder name, title, and contact info. P.S. offering to unsubscribe. Genuinely helpful, human, conversational — NOT desperate or salesy.",
        framework: "WELCOME-011",
        timing: "Last chance",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "e1"),
      edge("e1", "d1"),
      edge("d1", "e2"),
      edge("e2", "d2"),
      edge("d2", "e3"),
      edge("e3", "d3"),
      edge("d3", "e4"),
      edge("e4", "d4"),
      edge("d4", "e5"),
      edge("e5", "d5"),
      edge("d5", "e6"),
      edge("e6", "d6"),
      edge("d6", "e7"),
      edge("e7", "d7"),
      edge("d7", "e8"),
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // SITE ABANDON (1 email)
  // ────────────────────────────────────────────────────────────────
  {
    id: "site-abandon",
    name: "Site Abandon",
    description:
      "Follow up with visitors who browsed but didn't view any product",
    icon: "🌐",
    emailCount: "1 email",
    tacticId: "FLOW-ARCH-005",
    nodes: [
      triggerNode("t1", 0, {
        label: "Active on Site",
        triggerType: "site_visit",
        description: "Visitor active on site, no product view",
      }),
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "3-4 hours" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Need Help? + Bestsellers",
        emailNumber: 1,
        brief: "DESIGNED email. Address the abandonment directly: 'Still browsing?' or 'Need help finding something?' Show off bestselling products to re-pique interest. Include customer support details (reply to this email, chat link, phone). Optional: welcome offer or discount if they have one. Mix in a testimonial for social proof. Keep it helpful, not pushy — they showed low intent so we need to earn their attention. CTA: 'Shop Our Bestsellers' or 'See What's Popular.'",
        framework: "SITE-ABANDON-001",
        timing: "3-4 hours",
        status: "brief",
      }),
    ],
    edges: [edge("t1", "d1"), edge("d1", "e1")],
  },

  // ────────────────────────────────────────────────────────────────
  // BROWSE ABANDON (5 emails)
  // ────────────────────────────────────────────────────────────────
  {
    id: "browse-abandon",
    name: "Browse Abandon",
    description:
      "Re-engage visitors who viewed products but didn't add to cart",
    icon: "👁",
    emailCount: "5 emails",
    tacticId: "FLOW-ARCH-006",
    nodes: [
      triggerNode("t1", 0, {
        label: "Viewed Product",
        triggerType: "viewed_product",
        description: "Viewed product, didn't add to cart",
      }),
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "1 hour" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Simple Reminder",
        emailNumber: 1,
        brief: "DESIGNED email. Dynamic product block showing the EXACT product they viewed. Simple, clean reminder — 'Still thinking about [Product Name]?' Product image prominently displayed. No discount yet. Include a single strong CTA: 'Take Another Look.' Keep it short and visual. The product image does the selling.",
        framework: "BROWSE-001",
        timing: "1 hour",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1 day" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Brand Info + Risk Reversals",
        emailNumber: 2,
        brief: "TEXT-BASED email with urgency angle. 'Our most popular [products] are flying off the shelves.' Brief brand education — why our products are worth it. Include risk reversals: free shipping threshold, money-back guarantee, easy returns. Link back to the viewed product. Still no discount — let value and trust do the work.",
        framework: "BROWSE-002",
        timing: "1 day",
        status: "brief",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "1 day" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Product Testimonials",
        emailNumber: 3,
        brief: "DESIGNED email. Social proof focus — show 2-3 customer reviews specifically for the product category they browsed. Star ratings, customer names, specific benefit quotes, 'Verified Purchase' badges. Headline: 'Here's What Others Say' or 'See Why Customers Love It.' Include viewed product image again. CTA: 'Shop Now.' Still no discount.",
        framework: "BROWSE-003",
        timing: "2 days",
        status: "brief",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Introduce Discount",
        emailNumber: 4,
        brief: "DESIGNED email. First discount introduction — 'We saved something special for you.' Lead with the discount offer (10-15% off or free shipping). Show the viewed product with the discounted price. Include scarcity if real ('limited time'). Trust badges and guarantee. CTA: 'Claim My Discount.' Set a real expiration date.",
        framework: "BROWSE-004",
        timing: "2 days",
        status: "brief",
      }),
      delayNode("d5", Y_SPACING * 9, { label: "Wait", duration: "1 day" }),
      emailNode("e5", Y_SPACING * 10, {
        label: "Closer - Expires in 24h",
        emailNumber: 5,
        brief: "TEXT-BASED email from founder. Last chance — discount expires in 24 hours. Personal, conversational tone. 'Just a friendly reminder — your [X]% off expires tonight.' Show the product one final time. CTA: link to product. Sign with founder name. Keep it short and genuine. This is the final touch — after this they exit the flow.",
        framework: "BROWSE-005",
        timing: "1 day",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "d1"),
      edge("d1", "e1"),
      edge("e1", "d2"),
      edge("d2", "e2"),
      edge("e2", "d3"),
      edge("d3", "e3"),
      edge("e3", "d4"),
      edge("d4", "e4"),
      edge("e4", "d5"),
      edge("d5", "e5"),
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CART ABANDON (6+ emails with condition split)
  // ────────────────────────────────────────────────────────────────
  {
    id: "cart-abandon",
    name: "Cart Abandon",
    description: "Recover revenue from shoppers who added to cart but didn't start checkout",
    icon: "🛒",
    badge: "High ROI",
    emailCount: "6-8 emails",
    tacticId: "FLOW-ARCH-008",
    nodes: [
      triggerNode("t1", 0, {
        label: "Added to Cart",
        triggerType: "added_to_cart",
        description: "Added to cart, didn't start checkout",
      }),
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "30 min" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Cart Reminder",
        emailNumber: 1,
        brief: "DESIGNED email. Headline: 'You're just one click away.' Show the exact product(s) from their cart with images, names, and prices. Make the purchase feel CLOSE and easy. Single strong CTA: 'Complete My Order' or 'Finish My Order' linking directly to cart page. Include customer support info. NO discount yet — Email 1 converts easy wins at full margin. Keep it simple, clean, and visual. Product images are essential.",
        framework: "CART-004",
        timing: "30 min",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1 day" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Founder Nudge (Text)",
        emailNumber: 2,
        brief: "BRANDED TEXT email (plain text with logo). 'Was everything okay?' Check in casually — remind them of benefits like free shipping. Include a 'Finish my order' button linking to cart. Sign from the team or founder. Still no discount or very small incentive. This email should feel like a personal message, not marketing. High reply rates expected.",
        framework: "CART-005",
        timing: "1 day",
        status: "brief",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "1 day" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Brand USPs",
        emailNumber: 3,
        brief: "DESIGNED email. Address objections — why our products are worth buying. Show social proof: customer reviews for the specific carted products. Include 'Selling fast' indicator if true. Free shipping progress bar or threshold reminder. Add trust elements: return policy, money-back guarantee, security badges. CTA: 'Return to My Cart.' This is objection-handling — answer unspoken questions stopping conversion.",
        framework: "CART-006",
        timing: "1 day",
        status: "brief",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Product Testimonials",
        emailNumber: 4,
        brief: "DESIGNED email. Introduce incentive — 'We saved your cart and added a little something.' Discount code (5-10% off) with real expiration date. Show carted product images with the discount applied. Include scarcity element if real. Trust badge: guarantee and returns. CTA: 'Claim My Discount.' This is where holdouts convert.",
        framework: "CART-007",
        timing: "2 days",
        status: "brief",
      }),
      delayNode("d5", Y_SPACING * 9, { label: "Wait", duration: "2 days" }),
      emailNode("e5", Y_SPACING * 10, {
        label: "Last Chance Urgency",
        emailNumber: 5,
        brief: "DESIGNED email. 'Last chance for your cart.' Product images from cart. Best offer of the sequence. 'After [date], we can't guarantee availability.' Urgency must be REAL. Strong CTA: 'Complete My Order Now.' Include alternative product suggestions if applicable. This is the final designed email before the condition split.",
        framework: "CART-008",
        timing: "2 days",
        status: "brief",
      }),
      conditionNode("c1", Y_SPACING * 11, {
        label: "Previous Customer?",
        condition: "has_purchased_before",
        description: "Split: previous vs new customer",
      }),
      emailNode("e6a", Y_SPACING * 12.5, {
        label: "Founder Message (No Discount)",
        emailNumber: 6,
        brief: "TEXT-BASED email for PREVIOUS CUSTOMERS (they already trust the brand). Personal message from founder — no discount needed. 'Hey [Name], I saw you left some items in your cart. As a returning customer, I wanted to personally reach out.' Remind them of their previous positive experience. Soft CTA to complete order. Sign with founder name. These customers convert on relationship, not discounts.",
        framework: "CART-006A",
        timing: "Previous customer path",
        status: "brief",
      }),
      emailNode("e6b", Y_SPACING * 12.5, {
        label: "Discount Opener (10-15% off)",
        emailNumber: 6,
        brief: "DESIGNED email for NEW CUSTOMERS (need extra push). Lead with stronger discount: 10-15% off. 'Here's a special offer to help you decide.' Show carted products with discounted pricing. Include risk reversals prominently. CTA: 'Claim My [X]% Off.' Real expiration: 'Code expires in 24 hours.' This is the maximum incentive — if they don't convert here, they exit the flow.",
        framework: "CART-006B",
        timing: "New customer path",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "d1"),
      edge("d1", "e1"),
      edge("e1", "d2"),
      edge("d2", "e2"),
      edge("e2", "d3"),
      edge("d3", "e3"),
      edge("e3", "d4"),
      edge("d4", "e4"),
      edge("e4", "d5"),
      edge("d5", "e5"),
      edge("e5", "c1"),
      { ...edge("c1", "e6a"), label: "Yes", sourceHandle: "yes" },
      { ...edge("c1", "e6b"), label: "No", sourceHandle: "no" },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CHECKOUT ABANDON (5+ emails with condition split)
  // ────────────────────────────────────────────────────────────────
  {
    id: "checkout-abandon",
    name: "Checkout Abandon",
    description:
      "Recover revenue from shoppers who started checkout but didn't complete",
    icon: "💳",
    emailCount: "6-8 emails",
    tacticId: "FLOW-ARCH-008",
    nodes: [
      triggerNode("t1", 0, {
        label: "Started Checkout",
        triggerType: "started_checkout",
        description: "Started checkout, didn't complete purchase",
      }),
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "30 min" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Checkout Reminder",
        emailNumber: 1,
        brief: "DESIGNED email. HIGHEST intent — they were AT checkout. Headline: 'You're almost there!' Show cart contents with images, names, prices. Address checkout-specific objections: shipping cost surprise, payment security, return policy. Prominent security badges near CTA. Single CTA: 'Complete My Order' linking directly to checkout. NO discount — most will complete without one. Keep it short and friction-free.",
        framework: "CHECKOUT-001",
        timing: "30 min",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1 day" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Founder Nudge (Text)",
        emailNumber: 2,
        brief: "BRANDED TEXT email. 'Was everything okay with checkout?' Address common checkout abandonment reasons: unexpected shipping costs, payment concerns, needed more time. Remind of free shipping threshold if applicable. Mention money-back guarantee and easy returns. Include customer service contact for checkout issues. CTA: 'Complete My Order.' Personal, helpful tone — not salesy.",
        framework: "CHECKOUT-002",
        timing: "1 day",
        status: "brief",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "2 days" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Testimonials for Cart Products",
        emailNumber: 3,
        brief: "DESIGNED email. Show 2-3 customer reviews for the specific products in their cart. Star ratings, customer names, specific benefit quotes. Headline: 'See Why Others Love These.' Include the cart product images alongside reviews. Trust elements: verified purchase badges, review count. CTA: 'Return to Checkout.' This email overcomes the 'is it worth it?' objection with social proof.",
        framework: "CHECKOUT-003",
        timing: "2 days",
        status: "brief",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Last Chance Urgency",
        emailNumber: 4,
        brief: "DESIGNED email. Final push before condition split. 'Your saved checkout will expire soon.' Show cart products one more time. Include the best risk reversal: 'Try risk-free — 30 day money-back guarantee, free returns.' If introducing a small discount (5-10%), do it here. Strong CTA: 'Complete My Purchase.' After this, flow splits based on customer history.",
        framework: "CHECKOUT-004",
        timing: "2 days",
        status: "brief",
      }),
      conditionNode("c1", Y_SPACING * 9, {
        label: "Previous Customer?",
        condition: "has_purchased_before",
        description: "Split: previous vs new customer",
      }),
      emailNode("e5a", Y_SPACING * 10.5, {
        label: "Founder Message (No Discount)",
        emailNumber: 5,
        brief: "TEXT-BASED email for RETURNING CUSTOMERS. Personal check-in from the founder — 'Hey [Name], noticed you didn't finish checking out. Is there anything I can help with?' Reference their loyalty as a returning customer. No discount needed — they already trust the brand. Offer direct support (reply to email, phone number). Soft CTA to checkout. Sign with founder name and title.",
        framework: "CHECKOUT-005A",
        timing: "Previous customer path",
        status: "brief",
      }),
      emailNode("e5b", Y_SPACING * 10.5, {
        label: "Discount Opener",
        emailNumber: 5,
        brief: "DESIGNED email for NEW CUSTOMERS. Stronger incentive — 10-15% off to seal the deal. 'A little something to help you decide.' Show checkout items with discounted pricing. Prominent risk reversals: guarantee, free returns, secure checkout. CTA: 'Claim My Discount & Complete Order.' Real 24-hour expiration. This is the final attempt — maximum offer for first-time buyers.",
        framework: "CHECKOUT-005B",
        timing: "New customer path",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "d1"),
      edge("d1", "e1"),
      edge("e1", "d2"),
      edge("d2", "e2"),
      edge("e2", "d3"),
      edge("d3", "e3"),
      edge("e3", "d4"),
      edge("d4", "e4"),
      edge("e4", "c1"),
      { ...edge("c1", "e5a"), label: "Yes", sourceHandle: "yes" },
      { ...edge("c1", "e5b"), label: "No", sourceHandle: "no" },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // POST-PURCHASE (3 emails)
  // ────────────────────────────────────────────────────────────────
  {
    id: "post-purchase",
    name: "Post-Purchase",
    description:
      "Nurture new buyers with thank you, social follow, and product tips + upsell",
    icon: "🎉",
    emailCount: "3-4 emails",
    tacticId: "FLOW-ARCH-010",
    nodes: [
      triggerNode("t1", 0, {
        label: "Order Placed",
        triggerType: "placed_order",
        description: "Customer completed a purchase",
      }),
      emailNode("e1", Y_SPACING, {
        label: "Thank You from Founder",
        emailNumber: 1,
        brief: "TEXT-BASED email from the founder. Immediate send — capitalize on the 3-hour golden window (27% more likely to purchase again). Personal thank you: 'Every day, our team is dedicated to [mission]. You placing an order reminds us we're one step closer.' Reinforce their purchase decision (prevents buyer's remorse). Offer support contact. CRITICAL P.S. line: 'If you want to add more to your order, you can do so here →' (this PS upsell alone drives 1-2% additional orders). Sign with founder name and direct reply-to address.",
        framework: "PPF-007",
        timing: "Immediate",
        status: "brief",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "2 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Social Follow",
        emailNumber: 2,
        brief: "DESIGNED email. Time this to arrive during product anticipation phase. Headline: 'Let's Make it Official' or 'Let's Get Social.' Show social media handles with follow buttons (Instagram, TikTok, Facebook). Mention community: 'Join X customers who follow us for exclusive content.' Show a few UGC/lifestyle images from social. Optional: 'Your order is on the way!' update to build excitement. CTA: Follow buttons for each platform. For repeat buyers, make social CTAs more prominent.",
        framework: "PPF-012",
        timing: "2 days",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "5 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Product Tips + Upsell",
        emailNumber: 3,
        brief: "DESIGNED email. 'How to get the most out of your [product].' 3-5 product-specific usage tips based on what they bought. Improve their experience to reduce returns and increase satisfaction. Include a 'Pair it with these' cross-sell section showing 2-3 complementary products. For supplements: dosage, timing, stacking. For gear: care tips, best practices. CTA: 'Shop Complementary Products.' This email drives repeat purchases through education + cross-sell.",
        framework: "PPF-011",
        timing: "5 days",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "e1"),
      edge("e1", "d1"),
      edge("d1", "e2"),
      edge("e2", "d2"),
      edge("d2", "e3"),
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // WINBACK (3 emails)
  // ────────────────────────────────────────────────────────────────
  {
    id: "winback",
    name: "Winback",
    description:
      "Re-engage lapsed customers at 2x average time between purchases",
    icon: "💌",
    emailCount: "3 emails",
    tacticId: "FLOW-ARCH-012",
    nodes: [
      triggerNode("t1", 0, {
        label: "Lapsed Customer",
        triggerType: "time_since_purchase",
        description: "90 days since last purchase (segment-based trigger)",
      }),
      emailNode("e1", Y_SPACING, {
        label: "We Miss You",
        emailNumber: 1,
        brief: "DESIGNED email. Address their absence: 'It's Been a While.' Headline: 'While you've been away, we've been innovating.' Show new arrivals or what's changed since their last purchase. Highlight popular/trending products. Include guarantee/returns info as risk reversal. NO discount yet — see if they'll return at full price. CTA: 'Check Out What's New.' Longer delays between emails in this flow because they're also receiving regular campaigns.",
        framework: "WINB-007",
        timing: "At 90 days post-purchase",
        status: "brief",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "7 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Unique Discount (15-20%)",
        emailNumber: 2,
        brief: "DESIGNED email. Lead with discount — 'Take [X]% off your next order.' Keep it simple: discount headline, shop now CTA, product grid showing bestsellers or new arrivals. Include discount code prominently. Set real expiration date. This is the incentive play — they didn't come back from Email 1, so offer value. CTA: 'Shop Now with [X]% Off.'",
        framework: "WINB-008",
        timing: "7 days after Email 1",
        status: "brief",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "3 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Last Chance from Founder (Text)",
        emailNumber: 3,
        brief: "TEXT-BASED email from founder. Final personal touch — 'Just a friendly reminder — your [X]% off expires tonight.' We'd love to have you back. Keep it short, genuine, and personal. Include shop link. Sign with founder name. This is the last email in the flow — if they don't convert, they exit. No aggressive language — maintain brand relationship for future campaigns.",
        framework: "WINB-009",
        timing: "3 days after Email 2",
        status: "brief",
      }),
    ],
    edges: [
      edge("t1", "e1"),
      edge("e1", "d1"),
      edge("d1", "e2"),
      edge("e2", "d2"),
      edge("d2", "e3"),
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CUSTOM (blank canvas)
  // ────────────────────────────────────────────────────────────────
  {
    id: "custom",
    name: "Custom",
    description: "Start from scratch with an empty canvas",
    icon: "✨",
    emailCount: "Custom",
    tacticId: "",
    nodes: [
      triggerNode("t1", 0, {
        label: "Custom Trigger",
        triggerType: "custom",
        description: "Define your own trigger",
      }),
    ],
    edges: [],
  },
];
