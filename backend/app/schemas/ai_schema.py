from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    hcp_name: Optional[str] = ""
    interaction_type: Optional[str] = ""
    date: Optional[str] = ""
    time: Optional[str] = ""
    attendees: Optional[str] = ""
    notes: Optional[str] = ""
    summary: Optional[str] = ""
    next_action: Optional[str] = ""
    follow_up: Optional[str] = ""