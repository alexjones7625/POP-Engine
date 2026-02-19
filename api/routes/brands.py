"""Brand management routes — wraps execution/load_knowledge.py."""

import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent

# Load client data from existing knowledge base
CLIENTS_PATH = PROJECT_ROOT / "directives" / "knowledge" / "clients.json"


def _load_clients() -> list[dict]:
    """Load brands from existing clients.json."""
    if not CLIENTS_PATH.exists():
        return []
    with open(CLIENTS_PATH, "r") as f:
        data = json.load(f)
    # Normalize: clients.json may be a dict keyed by client name or a list
    if isinstance(data, dict):
        return [{"id": k, "name": k, **v} for k, v in data.items()]
    return data


@router.get("/")
async def list_brands():
    """List all configured brands."""
    return _load_clients()


@router.get("/{brand_id}")
async def get_brand(brand_id: str):
    """Get a single brand by ID."""
    clients = _load_clients()
    for client in clients:
        if client.get("id") == brand_id or client.get("name") == brand_id:
            return client
    raise HTTPException(status_code=404, detail=f"Brand '{brand_id}' not found")


@router.get("/{brand_id}/knowledge")
async def get_brand_knowledge(brand_id: str):
    """Load brand knowledge — wraps execution/load_knowledge.py."""
    try:
        from execution.load_knowledge import load_all_knowledge
        knowledge = load_all_knowledge(brand_id)
        return {"brand_id": brand_id, "knowledge": knowledge}
    except ImportError:
        # Graceful fallback if execution scripts aren't available
        return {
            "brand_id": brand_id,
            "knowledge": None,
            "error": "load_knowledge.py not available in current environment",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
