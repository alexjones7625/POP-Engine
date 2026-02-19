"""Pydantic models for API request/response validation."""

from pydantic import BaseModel
from typing import Optional


# ── Brands ──────────────────────────────────────────────────────────

class BrandBase(BaseModel):
    name: str
    klaviyo_account: Optional[str] = None
    website: Optional[str] = None


class BrandResponse(BrandBase):
    id: str


# ── Campaigns ───────────────────────────────────────────────────────

class CampaignGenerateRequest(BaseModel):
    brand_id: str
    framework: str
    style: str  # "designed" | "text-based" | "sms"
    brief: str
    product: Optional[str] = None
    title: Optional[str] = None


class CampaignGenerateResponse(BaseModel):
    subject: str
    preview: str
    body: dict  # Structured email copy (hero, body, bridge, product, closing)
    framework_used: str


class CampaignValidateRequest(BaseModel):
    brand_id: str
    copy: dict  # The email copy JSON to validate


class CampaignValidateResponse(BaseModel):
    score: float
    passed: bool
    checks: list[dict]  # Each check: {name, passed, details}


# ── Flows ───────────────────────────────────────────────────────────

class FlowGenerateRequest(BaseModel):
    flow_id: str
    node_id: str
    brief: str
    framework: Optional[str] = None


class FlowGenerateResponse(BaseModel):
    subject: str
    preview: str
    body: str
    framework_used: str


# ── Tactics ─────────────────────────────────────────────────────────

class TacticSearchRequest(BaseModel):
    query: Optional[str] = None
    domain: Optional[str] = None
    limit: int = 50
