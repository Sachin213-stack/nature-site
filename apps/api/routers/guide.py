"""Grounded AI Guide endpoint with NVIDIA NIM adapter and local fallback."""

import httpx
from apps.api.config import settings
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/guide", tags=["guide"])


class GuideRequest(BaseModel):
    query: str
    section: str = "loss"


class GuideResponse(BaseModel):
    reply: str
    sources: list[str]
    caveat: str


SECTION_KNOWLEDGE: dict[str, dict[str, object]] = {
    "loss": {
        "reply": (
            "Between 1970 and 2020, monitored wildlife populations experienced an average decline of "
            "73% in relative population size according to the Living Planet Report 2024. Freshwater "
            "systems experienced the steepest proportional decline at -85%."
        ),
        "sources": ["src-lpr-2024"],
        "caveat": (
            "73% represents the average proportional change in monitored population sizes, "
            "NOT 73% of total animals dying."
        ),
    },
    "underground": {
        "reply": (
            "Mycorrhizal fungal networks form symbiotic associations with vascular plant roots, "
            "drawing down and storing up to 13.12 Gt of carbon annually in soil minerals while "
            "facilitating phosphorus and nitrogen transport."
        ),
        "sources": ["src-soil-biodiv-2023"],
        "caveat": (
            "Nutrient transfer occurs via physical gradients and does NOT imply conscious "
            "communication or warning sharing between trees."
        ),
    },
    "food": {
        "reply": (
            "Agriculture occupies roughly 46% of habitable global land. Shifting toward "
            "diversified agroecological mosaics and regenerative soil stewardship rebuilds "
            "pollinator habitats while sustaining food security."
        ),
        "sources": ["src-fao-land-2024"],
        "caveat": (
            "Agroecological transition scenarios are illustrative benchmarks; localized yields "
            "depend on climate and agronomic adaptation."
        ),
    },
    "rivers": {
        "reply": (
            "Over 1.2 million barriers fragment European rivers. Targeted decommissioning of "
            "obsolete dams restores natural gravel beds and migratory fish corridors."
        ),
        "sources": ["src-amber-rivers-2023"],
        "caveat": (
            "Ecological recovery following dam removal is gradual across the catchment, not instant."
        ),
    },
    "recovery": {
        "reply": (
            "Targeted habitat protection works: India's wild tiger population grew from 2,967 (2018) "
            "to 3,682 (2022), and global wild tiger counts rebounded from ~3,200 to ~5,700."
        ),
        "sources": ["src-tiger-status-2023"],
        "caveat": (
            "Species turnaround demonstrates conservation works, but does not mean the wider "
            "extinction crisis is resolved."
        ),
    },
    "cities": {
        "reply": (
            "Urban green roofs, bioswales, and native pollinator corridors lower surface temperatures "
            "while providing safe stepping stones for wildlife."
        ),
        "sources": ["src-cities-research-pending"],
        "caveat": (
            "Urban bio-corridor models are illustrative representations pending director verification."
        ),
    },
}


@router.post("/chat", response_model=GuideResponse)
async def guide_chat(req: GuideRequest) -> GuideResponse:
    """Answer scientific questions using NVIDIA NIM or verified local corpus fallback."""
    # Check if NVIDIA NIM is configured with valid API key
    if settings.nvidia_nim_api_key and settings.nvidia_nim_model:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{settings.nvidia_nim_base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.nvidia_nim_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": settings.nvidia_nim_model,
                        "messages": [
                            {
                                "role": "system",
                                "content": (
                                    "You are the Nature 3D scientific guide. You must answer strictly "
                                    "based on verified biodiversity monitoring data. Never describe "
                                    "73% decline as animals dying (it is monitored population size change). "
                                    "Never imply trees communicate consciously through fungal networks."
                                ),
                            },
                            {"role": "user", "content": req.query},
                        ],
                        "temperature": 0.2,
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    content = data["choices"][0]["message"]["content"]
                    knowledge = SECTION_KNOWLEDGE.get(req.section, SECTION_KNOWLEDGE["loss"])
                    return GuideResponse(
                        reply=content,
                        sources=knowledge["sources"],  # type: ignore[arg-type]
                        caveat=knowledge["caveat"],  # type: ignore[arg-type]
                    )
        except Exception:
            pass  # Gracefully fall through to verified local knowledge

    # Fallback to verified local scientific knowledge
    knowledge = SECTION_KNOWLEDGE.get(req.section, SECTION_KNOWLEDGE["loss"])
    return GuideResponse(
        reply=knowledge["reply"],  # type: ignore[arg-type]
        sources=knowledge["sources"],  # type: ignore[arg-type]
        caveat=knowledge["caveat"],  # type: ignore[arg-type]
    )
