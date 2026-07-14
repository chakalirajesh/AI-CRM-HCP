from app.langgraph.agent import agent


def run_agent(user_message: str):

    result = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": user_message,
                }
            ]
        }
    )

    print(result)  # Debug: see what LangGraph returns

    return result["messages"][-1].content