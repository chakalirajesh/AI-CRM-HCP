from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_id: int
    interaction_type: str
    notes: str


class InteractionUpdate(BaseModel):
    notes: str


class InteractionResponse(InteractionCreate):
    id: int
    ai_summary: str | None = None
    next_action: str | None = None

    class Config:
        from_attributes = True