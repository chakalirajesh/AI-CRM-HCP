from fastapi import APIRouter
from app.schemas.ai_schema import ChatRequest
from app.langgraph.workflow import run_agent

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

@router.post("/chat")
def chat(request: ChatRequest):
    try:
        result = run_agent(request.message)

        print("AI RESULT:", result)
        print("TYPE:", type(result))

        return {
            "response": str(result)
        }

    except Exception as e:
        print(e)
        return {
            "response": "AI service is temporarily unavailable.",
            "error": str(e)
        }