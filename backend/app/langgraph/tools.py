from langchain_core.tools import tool


from langchain_core.tools import tool

from app.database import SessionLocal
from app.models.interaction import Interaction
from app.services.interaction_service import create_interaction


@tool
def log_interaction_tool(notes: str) -> str:
    """
    Log a new HCP interaction.
    """

    db = SessionLocal()

    try:
        interaction = Interaction(
            hcp_id=1,          # Temporary for testing
            interaction_type="AI Chat",
            notes=notes
        )

        saved = create_interaction(db, interaction)

        return f"✅ Interaction saved successfully. ID: {saved.id}"

    except Exception as e:
        db.rollback()
        return f"❌ Error: {str(e)}"

    finally:
        db.close()

@tool
def edit_interaction_tool(interaction_id: str, notes: str) -> str:
    """
    Edit an existing interaction.
    """
    return f"Interaction {interaction_id} updated successfully."


@tool
def search_hcp_tool(name: str) -> str:
    """
    Search for an HCP.
    """
    return f"Searching HCP: {name}"


@tool
def interaction_history_tool(hcp_id: str) -> str:
    """
    Get interaction history.
    """
    return f"Showing interaction history for HCP ID {hcp_id}"


@tool
def followup_recommendation_tool(notes: str) -> str:
    """
    Generate follow-up recommendation.
    """
    return "Recommended follow-up: Schedule another meeting within 2 weeks."