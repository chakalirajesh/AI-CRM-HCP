from fastapi import APIRouter
from app.schemas.ai_schema import ChatRequest
from app.langgraph.workflow import run_agent

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/chat")
def chat(request: ChatRequest):
    from app.langgraph.tools import generate_followup_ai

    result = generate_followup_ai(request.message)

    print("RESULT =", result)

    return {
        "response": result
    }