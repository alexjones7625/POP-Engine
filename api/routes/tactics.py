"""Tactics browser routes — parses skills/ directory for searchable tactics."""

import re
from pathlib import Path
from fastapi import APIRouter

router = APIRouter()

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
SKILLS_DIR = PROJECT_ROOT / "skills"
TACTICS_INDEX = SKILLS_DIR / "TACTICS_INDEX.md"


def _parse_tactics_index() -> list[dict]:
    """Parse TACTICS_INDEX.md into structured tactic entries."""
    if not TACTICS_INDEX.exists():
        return []

    content = TACTICS_INDEX.read_text(encoding="utf-8")
    entries = []
    current_domain = ""

    for line in content.split("\n"):
        # Detect domain headers
        domain_match = re.match(r"^## ([A-Z][A-Z &/]+)", line)
        if domain_match:
            current_domain = domain_match.group(1).strip()
            continue

        # Detect skill file links
        file_match = re.match(r"^### \[(.+?)\]\((.+?)\)", line)
        if file_match:
            entries.append({
                "name": file_match.group(1),
                "file": file_match.group(2),
                "domain": current_domain,
            })

    return entries


@router.get("/")
async def search_tactics(q: str = "", domain: str = "", limit: int = 50):
    """Search tactics by query and/or domain filter."""
    entries = _parse_tactics_index()

    if domain:
        entries = [e for e in entries if domain.lower() in e["domain"].lower()]

    if q:
        q_lower = q.lower()
        entries = [
            e for e in entries
            if q_lower in e["name"].lower()
            or q_lower in e.get("file", "").lower()
            or q_lower in e.get("domain", "").lower()
        ]

    return {"results": entries[:limit], "total": len(entries)}


@router.get("/domains")
async def list_domains():
    """List all tactic domains."""
    entries = _parse_tactics_index()
    domains = sorted(set(e["domain"] for e in entries if e["domain"]))
    return {"domains": domains}


@router.get("/file/{file_path:path}")
async def get_tactic_file(file_path: str):
    """Read a specific skills file."""
    full_path = SKILLS_DIR / file_path
    if not full_path.exists() or not full_path.is_file():
        return {"error": f"File not found: {file_path}"}

    # Security: ensure path stays within skills/
    try:
        full_path.resolve().relative_to(SKILLS_DIR.resolve())
    except ValueError:
        return {"error": "Invalid path"}

    content = full_path.read_text(encoding="utf-8")
    return {"file": file_path, "content": content}
