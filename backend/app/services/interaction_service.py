from sqlalchemy.orm import Session
from app.models.interaction import Interaction


def create_interaction(db: Session, interaction: Interaction):
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return interaction


def get_all_interactions(db: Session):
    return db.query(Interaction).all()


def get_interaction_by_id(db: Session, interaction_id: int):
    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )