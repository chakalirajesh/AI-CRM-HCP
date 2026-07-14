from app.langgraph.agent import agent
import json


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

    content = result["messages"][-1].content

    print("========== AI RAW RESPONSE ==========")
    print(content)
    print("=====================================")

    try:
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        return json.loads(content)

    except Exception as e:
        print("JSON ERROR:", e)

        return {
            "summary": content
        }