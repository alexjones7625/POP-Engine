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
        brief: "",
        framework: "WELCOME-001",
        timing: "Immediate",
        status: "empty",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "1-2 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Brand Story",
        emailNumber: 2,
        brief: "",
        framework: "WELCOME-002",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "1-2 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Best Sellers",
        emailNumber: 3,
        brief: "",
        framework: "WELCOME-003",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d3", Y_SPACING * 6, { label: "Wait", duration: "1-2 days" }),
      emailNode("e4", Y_SPACING * 7, {
        label: "Urgency + Risk Reversals",
        emailNumber: 4,
        brief: "",
        framework: "WELCOME-004",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d4", Y_SPACING * 8, { label: "Wait", duration: "1-2 days" }),
      emailNode("e5", Y_SPACING * 9, {
        label: "Us vs Them",
        emailNumber: 5,
        brief: "",
        framework: "WELCOME-005",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d5", Y_SPACING * 10, { label: "Wait", duration: "1-2 days" }),
      emailNode("e6", Y_SPACING * 11, {
        label: "Heavy Social Proof",
        emailNumber: 6,
        brief: "",
        framework: "WELCOME-006",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d6", Y_SPACING * 12, { label: "Wait", duration: "1 day" }),
      emailNode("e7", Y_SPACING * 13, {
        label: "Last Chance",
        emailNumber: 7,
        brief: "",
        framework: "WELCOME-007",
        timing: "1 day before expiry",
        status: "empty",
      }),
      delayNode("d7", Y_SPACING * 14, { label: "Wait", duration: "1 day" }),
      emailNode("e8", Y_SPACING * 15, {
        label: "Founder Note (Text)",
        emailNumber: 8,
        brief: "",
        framework: "WELCOME-008",
        timing: "Last chance",
        status: "empty",
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
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "2-4 hours" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Need Help? + Bestsellers",
        emailNumber: 1,
        brief: "",
        framework: "SITE-ABANDON-001",
        timing: "2-4 hours",
        status: "empty",
      }),
    ],
    edges: [edge("t1", "d1"), edge("d1", "e1")],
  },
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
      delayNode("d1", Y_SPACING, { label: "Wait", duration: "30 min" }),
      emailNode("e1", Y_SPACING * 2, {
        label: "Simple Reminder",
        emailNumber: 1,
        brief: "",
        framework: "BROWSE-001",
        timing: "30 min",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1-2 days" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Brand Info + Risk Reversals",
        emailNumber: 2,
        brief: "",
        framework: "BROWSE-002",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "2 days" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Product Testimonials",
        emailNumber: 3,
        brief: "",
        framework: "BROWSE-003",
        timing: "2 days",
        status: "empty",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Introduce Discount",
        emailNumber: 4,
        brief: "",
        framework: "BROWSE-004",
        timing: "2 days",
        status: "empty",
      }),
      delayNode("d5", Y_SPACING * 9, { label: "Wait", duration: "1 day" }),
      emailNode("e5", Y_SPACING * 10, {
        label: "Closer - Expires in 24h",
        emailNumber: 5,
        brief: "",
        framework: "BROWSE-005",
        timing: "1 day",
        status: "empty",
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
        brief: "",
        framework: "CART-001",
        timing: "30 min",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1-2 days" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Founder Nudge (Text)",
        emailNumber: 2,
        brief: "",
        framework: "CART-002",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "1-2 days" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Brand USPs",
        emailNumber: 3,
        brief: "",
        framework: "CART-003",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Product Testimonials",
        emailNumber: 4,
        brief: "",
        framework: "CART-004",
        timing: "2 days",
        status: "empty",
      }),
      delayNode("d5", Y_SPACING * 9, { label: "Wait", duration: "2 days" }),
      emailNode("e5", Y_SPACING * 10, {
        label: "Last Chance Urgency",
        emailNumber: 5,
        brief: "",
        framework: "CART-005",
        timing: "2 days",
        status: "empty",
      }),
      conditionNode("c1", Y_SPACING * 11, {
        label: "Previous Customer?",
        condition: "has_purchased_before",
        description: "Split: previous vs new customer",
      }),
      emailNode("e6a", Y_SPACING * 12.5, {
        label: "Founder Message (No Discount)",
        emailNumber: 6,
        brief: "",
        framework: "CART-006A",
        timing: "Previous customer path",
        status: "empty",
      }),
      emailNode("e6b", Y_SPACING * 12.5, {
        label: "Discount Opener (10-15% off)",
        emailNumber: 6,
        brief: "",
        framework: "CART-006B",
        timing: "New customer path",
        status: "empty",
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
        brief: "",
        framework: "CHECKOUT-001",
        timing: "30 min",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 3, { label: "Wait", duration: "1-2 days" }),
      emailNode("e2", Y_SPACING * 4, {
        label: "Founder Nudge (Text)",
        emailNumber: 2,
        brief: "",
        framework: "CHECKOUT-002",
        timing: "1-2 days",
        status: "empty",
      }),
      delayNode("d3", Y_SPACING * 5, { label: "Wait", duration: "2 days" }),
      emailNode("e3", Y_SPACING * 6, {
        label: "Testimonials for Cart Products",
        emailNumber: 3,
        brief: "",
        framework: "CHECKOUT-003",
        timing: "2 days",
        status: "empty",
      }),
      delayNode("d4", Y_SPACING * 7, { label: "Wait", duration: "2 days" }),
      emailNode("e4", Y_SPACING * 8, {
        label: "Last Chance Urgency",
        emailNumber: 4,
        brief: "",
        framework: "CHECKOUT-004",
        timing: "2 days",
        status: "empty",
      }),
      conditionNode("c1", Y_SPACING * 9, {
        label: "Previous Customer?",
        condition: "has_purchased_before",
        description: "Split: previous vs new customer",
      }),
      emailNode("e5a", Y_SPACING * 10.5, {
        label: "Founder Message (No Discount)",
        emailNumber: 5,
        brief: "",
        framework: "CHECKOUT-005A",
        timing: "Previous customer path",
        status: "empty",
      }),
      emailNode("e5b", Y_SPACING * 10.5, {
        label: "Discount Opener",
        emailNumber: 5,
        brief: "",
        framework: "CHECKOUT-005B",
        timing: "New customer path",
        status: "empty",
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
        brief: "",
        framework: "POST-001",
        timing: "Immediate",
        status: "empty",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "2 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Social Follow",
        emailNumber: 2,
        brief: "",
        framework: "POST-002",
        timing: "2 days",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "5 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Product Tips + Upsell",
        emailNumber: 3,
        brief: "",
        framework: "POST-003",
        timing: "5 days",
        status: "empty",
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
        description: "2x average purchase frequency elapsed",
      }),
      emailNode("e1", Y_SPACING, {
        label: "We Miss You",
        emailNumber: 1,
        brief: "",
        framework: "WINBACK-001",
        timing: "At 2x avg purchase gap",
        status: "empty",
      }),
      delayNode("d1", Y_SPACING * 2, { label: "Wait", duration: "3 days" }),
      emailNode("e2", Y_SPACING * 3, {
        label: "Unique Discount (15-20%)",
        emailNumber: 2,
        brief: "",
        framework: "WINBACK-002",
        timing: "3 days",
        status: "empty",
      }),
      delayNode("d2", Y_SPACING * 4, { label: "Wait", duration: "5 days" }),
      emailNode("e3", Y_SPACING * 5, {
        label: "Last Chance from Founder (Text)",
        emailNumber: 3,
        brief: "",
        framework: "WINBACK-003",
        timing: "5 days",
        status: "empty",
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
