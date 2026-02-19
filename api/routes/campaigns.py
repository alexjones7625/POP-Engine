"""Campaign generation routes — wraps execution/generate_email_llm.py + validate_email_copy.py."""

from fastapi import APIRouter, HTTPException
from models.schemas import (
    CampaignGenerateRequest,
    CampaignGenerateResponse,
    CampaignValidateRequest,
    CampaignValidateResponse,
)

router = APIRouter()


@router.get("/")
async def list_campaigns():
    """List campaigns (placeholder — will fetch from Supabase)."""
    return []


@router.post("/generate", response_model=CampaignGenerateResponse)
async def generate_campaign(req: CampaignGenerateRequest):
    """Generate email campaign copy — wraps execution/generate_email_llm.py."""
    try:
        from execution.generate_email_llm import generate_email_copy
        result = generate_email_copy(
            brand_id=req.brand_id,
            framework=req.framework,
            brief=req.brief,
            style=req.style,
            product=req.product,
        )
        return CampaignGenerateResponse(
            subject=result.get("subject_line", ""),
            preview=result.get("preview_text", ""),
            body=result.get("copy", {}),
            framework_used=req.framework,
        )
    except ImportError:
        # Return placeholder if execution scripts unavailable
        return CampaignGenerateResponse(
            subject="[Placeholder] Generated Subject Line",
            preview="[Placeholder] Preview text",
            body={"hero": "Generated hero copy", "body": "Generated body copy"},
            framework_used=req.framework,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/validate", response_model=CampaignValidateResponse)
async def validate_campaign(req: CampaignValidateRequest):
    """Validate email copy — wraps execution/validate_email_copy.py."""
    try:
        from execution.validate_email_copy import validate_email
        result = validate_email(req.brand_id, req.copy)
        return CampaignValidateResponse(
            score=result.get("score", 0),
            passed=result.get("passed", False),
            checks=result.get("checks", []),
        )
    except ImportError:
        return CampaignValidateResponse(
            score=0,
            passed=False,
            checks=[{"name": "unavailable", "passed": False, "details": "Validation script not available"}],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
