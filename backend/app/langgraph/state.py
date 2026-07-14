from typing import TypedDict, Optional


class CRMState(TypedDict):
    user_input: str

    hcp_id: Optional[int]

    interaction_type: Optional[str]

    notes: Optional[str]

    ai_summary: Optional[str]

    next_action: Optional[str]

    tool: Optional[str]

    response: Optional[str]