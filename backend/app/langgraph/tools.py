from langchain_core.tools import tool
from app.database import SessionLocal
from app.models.interaction import Interaction
from app.models.hcp import HCP
from app.services.interaction_service import create_interaction

from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import json
load_dotenv()

llm = ChatGroq(
    model=os.getenv("MODEL_NAME", "gemma2-9b-it"),
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)


# -------------------------------------------------
# Helper Function
# -------------------------------------------------



def generate_followup_ai(notes: str):

    prompt = f"""
You are an AI CRM Assistant.

Extract the following information from the interaction.

Return ONLY valid JSON.

{{
  "hcp_name": "",
  "interaction_type": "Meeting",
  
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "attendees": "",
  "notes": "",
  "summary": "",
  "next_action": "",
  "follow_up": ""
}}

Rules:

1. If the doctor's full name is mentioned, return the full name.
2. If only a partial name is available, return the partial name exactly as mentioned.
3. Do not invent names.
4. If no time is mentioned, return "time": "".
5. Convert times:
   - 10 AM → 10:00
   - 2 PM → 14:00
   - 10:30 AM → 10:30
6. If "today" is mentioned, return today's date in YYYY-MM-DD format.
7. Put the doctor's name into the attendees field.
8. Return ONLY valid JSON.
If the interaction mentions conference, congress, symposium, CME, workshop or seminar,
return:

"interaction_type": "Conference"

Interaction:

{notes}
"""

    response = llm.invoke(prompt).content

    print("========== GROQ RESPONSE ==========")
    print(response)
    print("===================================")

    response = response.strip()

    if response.startswith("```json"):
        response = response.replace("```json", "", 1)

    if response.startswith("```"):
        response = response.replace("```", "", 1)

    response = response.replace("```", "").strip()

    try:
        return json.loads(response)
    except Exception as e:
        print("JSON ERROR:", e)
        return {
            "summary": response
        }

# -------------------------------------------------
# Tool 1 - Log Interaction
# -------------------------------------------------

@tool
def log_interaction_tool(notes: str) ->str:
    """
    Log a new HCP interaction.
    """

    db = SessionLocal()

    try:

        summary = llm.invoke(
            f"""
Summarize this HCP interaction professionally.

Interaction:
{notes}

Return only the summary.
"""
        ).content

        interaction = Interaction(
            hcp_id=1,
            interaction_type="AI Chat",
            notes=notes,
            ai_summary=summary,
            next_action="Follow up with HCP within 2 weeks"
        )
        saved = create_interaction(db, interaction)

        return f"""
        ✅ Interaction Logged Successfully

        Interaction ID : {saved.id}

        Interaction Type:
        {saved.interaction_type}
        
        Original Notes:
        {saved.notes}
        
        AI Summary:
        {saved.ai_summary}
        
        Next Action:
        {saved.next_action}
        
        Created At:
        {saved.created_at}
        """
       

    except Exception as e:
        db.rollback()
        return f"Error : {str(e)}"

    finally:
        db.close()


# -------------------------------------------------
# Tool 2 - Edit Interaction
# -------------------------------------------------

@tool
def edit_interaction_tool(interaction_id:str, notes:str)->str:
    """
    Edit an existing interaction.
    """

    db = SessionLocal()

    try:

        interaction = db.query(Interaction).filter(
            Interaction.id == int(interaction_id)
        ).first()

        if interaction is None:
            return "Interaction not found."

        summary = llm.invoke(
            f"""
Rewrite professionally:

{notes}
"""
        ).content

        interaction.notes = notes
        interaction.ai_summary = summary
        interaction.next_action = "Follow up with HCP"

        db.commit()

        db.refresh(interaction)

        return f"""
Interaction Updated Successfully

Interaction ID : {interaction.id}

Updated Notes:
{interaction.notes}
"""

    except Exception as e:
        db.rollback()
        return str(e)

    finally:
        db.close()


# -------------------------------------------------
# Tool 3 - Search HCP
# -------------------------------------------------

@tool
def search_hcp_tool(name:str)->str:
    """
    Search HCP by name.
    """

    db = SessionLocal()

    try:

        hcps = db.query(HCP).filter(
            HCP.name.ilike(f"%{name}%")
        ).all()

        if not hcps:
            return "No HCP found."

        result = ""

        for hcp in hcps:

            result += f"""

ID : {hcp.id}

Name : {hcp.name}

Specialization : {hcp.specialization}

Hospital : {hcp.hospital}

City : {hcp.city}

Email : {hcp.email}

Phone : {hcp.phone}

----------------------------
"""

        return result

    except Exception as e:
        return str(e)

    finally:
        db.close()


# -------------------------------------------------
# Tool 4 - Interaction History
# -------------------------------------------------

@tool
def interaction_history_tool(hcp_id:str)->str:
    """
    Fetch interaction history.
    """

    db = SessionLocal()

    try:

        history = db.query(Interaction).filter(
            Interaction.hcp_id == int(hcp_id)
        ).all()

        if not history:
            return "No interaction history found."

        result = ""

        for item in history:

            result += f"""
        Interaction ID : {item.id}

        Type : {item.interaction_type}

        Original Notes:
        {item.notes}

        AI Summary:
        {item.ai_summary}

        Next Action:
        {item.next_action}

        Created At:
        {item.created_at}

        -----------------------------
        """

        return result

    except Exception as e:
        return str(e)

    finally:
        db.close()


# -------------------------------------------------
# Tool 5 - AI Follow-up Recommendation
# -------------------------------------------------

@tool
def followup_recommendation_tool(notes:str)->str:
    """
    Generate AI follow-up recommendation.
    """

    return generate_followup_ai(notes)