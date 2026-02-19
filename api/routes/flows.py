"""Flow management routes — wraps execution/generate_flow_emails.py + query_flow.py."""

from fastapi import APIRouter, HTTPException
from models.schemas import FlowGenerateRequest, FlowGenerateResponse

router = APIRouter()


@router.get("/")
async def list_flows():
    """List flows (placeholder — will fetch from Supabase)."""
    return []


@router.get("/templates")
async def get_flow_templates():
    """Get flow templates — wraps execution/query_flow.py."""
    try:
        from execution.query_flow import get_flow_templates
        return get_flow_templates()
    except ImportError:
        # Return template IDs if script unavailable
        return {
            "templates": [
                "welcome", "site-abandon", "browse-abandon",
                "cart-abandon", "checkout-abandon", "post-purchase",
                "winback", "custom",
            ]
        }


@router.post("/{flow_id}/generate", response_model=FlowGenerateResponse)
async def generate_flow_email(flow_id: str, req: FlowGenerateRequest):
    """Generate copy for a single flow email node."""
    try:
        from execution.generate_flow_emails import generate_single_flow_email
        result = generate_single_flow_email(
            flow_id=flow_id,
            node_id=req.node_id,
            brief=req.brief,
            framework=req.framework,
        )
        return FlowGenerateResponse(
            subject=result.get("subject_line", ""),
            preview=result.get("preview_text", ""),
            body=result.get("body", ""),
            framework_used=req.framework or "auto",
        )
    except ImportError:
        return FlowGenerateResponse(
            subject=f"[Placeholder] Flow Email Subject",
            preview="[Placeholder] Preview text",
            body=f"Generated flow email copy for node {req.node_id}",
            framework_used=req.framework or "auto",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
