"""Analytics routes — wraps execution/klaviyo_api.py for multi-account data."""

from fastapi import APIRouter

router = APIRouter()

# Placeholder data — in production, fetches from Klaviyo via existing scripts
MOCK_ACCOUNTS = {
    "cpx": {"name": "CPX", "revenue_30d": 24830, "emails_sent": 48290},
    "switch-research": {"name": "Switch Research", "revenue_30d": 18420, "emails_sent": 32100},
    "vapor-fresh": {"name": "Vapor Fresh", "revenue_30d": 12800, "emails_sent": 21500},
    "joyful-bath": {"name": "Joyful Bath Co", "revenue_30d": 8900, "emails_sent": 15300},
}


@router.get("/accounts")
async def list_accounts():
    """List all connected Klaviyo accounts."""
    return list(MOCK_ACCOUNTS.values())


@router.get("/accounts/{account_id}/summary")
async def get_account_summary(account_id: str, period: str = "30d"):
    """Get performance summary for a Klaviyo account."""
    account = MOCK_ACCOUNTS.get(account_id)
    if not account:
        return {"error": f"Account '{account_id}' not found"}

    # TODO: Wire to execution/klaviyo_api.py KlaviyoMultiAccountManager
    return {
        "account": account,
        "period": period,
        "metrics": {
            "revenue": account["revenue_30d"],
            "emails_sent": account["emails_sent"],
            "open_rate": 0.423,
            "click_rate": 0.038,
            "rpr": 0.51,
            "list_growth": 1240,
        },
    }


@router.get("/accounts/{account_id}/campaigns")
async def get_campaign_performance(account_id: str, period: str = "30d"):
    """Get campaign performance data."""
    # TODO: Wire to execution/klaviyo_api.py
    return {"campaigns": [], "period": period}


@router.get("/accounts/{account_id}/flows")
async def get_flow_performance(account_id: str, period: str = "30d"):
    """Get flow performance data."""
    # TODO: Wire to execution/klaviyo_api.py
    return {"flows": [], "period": period}
