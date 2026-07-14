from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction_schema import (
    InteractionCreate,
    InteractionUpdate,
)

router = APIRouter(
    prefix="/interaction",
    tags=["Interactions"]
)


@router.post("/")
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    new_interaction = Interaction(
    hcp_id=interaction.hcp_id,
    interaction_type=interaction.interaction_type,
    notes=interaction.notes,
    ai_summary="",
    next_action=""
    )
    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return {
        "message": "Interaction Logged Successfully",
        "data": new_interaction
    }


@router.get("/")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()


@router.put("/{interaction_id}")
def edit_interaction(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db)
):
    record = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if not record:
        return {"message": "Interaction Not Found"}

    record.notes = interaction.notes

    db.commit()

    return {
    "message": "Interaction Updated Successfully",
    "data": record
}