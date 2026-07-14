from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from app.config import settings
from app.langgraph.tools import (
    log_interaction_tool,
    edit_interaction_tool,
    search_hcp_tool,
    interaction_history_tool,
    followup_recommendation_tool,
)

llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model=settings.MODEL_NAME,
    temperature=0
)

tools = [
    log_interaction_tool,
    edit_interaction_tool,
    search_hcp_tool,
    interaction_history_tool,
    followup_recommendation_tool,
]

agent = create_react_agent(
    model=llm,
    tools=tools
)