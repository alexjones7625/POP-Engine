"""
POP Platform API — FastAPI backend wrapping existing execution/ scripts.
"""

import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add project root to path so we can import execution/ scripts
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from routes.brands import router as brands_router
from routes.campaigns import router as campaigns_router
from routes.flows import router as flows_router
from routes.analytics import router as analytics_router
from routes.tactics import router as tactics_router

app = FastAPI(
    title="POP Platform API",
    description="Email Marketing Intelligence Platform backend",
    version="0.1.0",
)

# CORS — allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount route modules
app.include_router(brands_router, prefix="/api/brands", tags=["brands"])
app.include_router(campaigns_router, prefix="/api/campaigns", tags=["campaigns"])
app.include_router(flows_router, prefix="/api/flows", tags=["flows"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])
app.include_router(tactics_router, prefix="/api/tactics", tags=["tactics"])


@app.get("/api/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}
