-- POP Platform Database Schema
-- Run this in Supabase SQL Editor to initialize the database

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Brands ─────────────────────────────────────────────────────────

CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  klaviyo_account TEXT,
  website TEXT,
  style_preferences JSONB DEFAULT '{}',
  cardinal_rules JSONB DEFAULT '[]',
  products JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── Flows ──────────────────────────────────────────────────────────

CREATE TABLE flows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  flow_type TEXT, -- welcome, cart_abandon, checkout_abandon, etc.
  template_source TEXT, -- which skills/flows/*.md template was used
  status TEXT DEFAULT 'draft', -- draft, active, archived
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE flow_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flow_id UUID REFERENCES flows(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL, -- trigger, email, sms, delay, condition
  position_x FLOAT DEFAULT 0,
  position_y FLOAT DEFAULT 0,
  data JSONB DEFAULT '{}', -- node-specific data (brief, timing, conditions)
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE flow_edges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flow_id UUID REFERENCES flows(id) ON DELETE CASCADE,
  source_node_id UUID REFERENCES flow_nodes(id) ON DELETE CASCADE,
  target_node_id UUID REFERENCES flow_nodes(id) ON DELETE CASCADE,
  label TEXT,
  source_handle TEXT
);

CREATE TABLE flow_email_copies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  node_id UUID REFERENCES flow_nodes(id) ON DELETE CASCADE,
  version INTEGER DEFAULT 1,
  subject_line TEXT,
  preview_text TEXT,
  copy_json JSONB, -- full email structure (hero, body, bridge, product, closing)
  validation_score FLOAT,
  validation_details JSONB,
  status TEXT DEFAULT 'draft', -- draft, reviewed, approved
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Campaigns ──────────────────────────────────────────────────────

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  framework TEXT,
  style TEXT DEFAULT 'designed', -- designed, text-based, sms
  brief TEXT,
  subject_line TEXT,
  preview_text TEXT,
  copy_json JSONB, -- full email structure
  validation_score FLOAT,
  validation_details JSONB,
  status TEXT DEFAULT 'draft', -- draft, designed, reviewed, approved, sent
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ────────────────────────────────────────────────────────

CREATE INDEX idx_flows_brand ON flows(brand_id);
CREATE INDEX idx_flows_type ON flows(flow_type);
CREATE INDEX idx_flow_nodes_flow ON flow_nodes(flow_id);
CREATE INDEX idx_flow_edges_flow ON flow_edges(flow_id);
CREATE INDEX idx_flow_copies_node ON flow_email_copies(node_id);
CREATE INDEX idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ── Updated_at trigger ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER flows_updated_at
  BEFORE UPDATE ON flows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
