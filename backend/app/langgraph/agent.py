from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage

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

system_prompt = SystemMessage(
    content="""
You are an AI CRM Assistant for Healthcare Professionals.

Rules:
- Use the available tools whenever needed.
- Complete the user's request yourself.
- Never tell the user to search for an HCP or call another tool manually.
- Never expose your reasoning or tool-calling process.
- Always give a final professional answer.

For interaction requests, return:
• Interaction Summary
• AI Summary
• Next Best Action
• Follow-up Recommendation
"""
)

agent = create_react_agent(
    model=llm,
    tools=tools,
    prompt=system_prompt
)