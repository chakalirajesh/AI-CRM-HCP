from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(Integer, ForeignKey("hcps.id"))

    interaction_type = Column(String(50))

    notes = Column(Text)

    ai_summary = Column(Text)

    next_action = Column(String(200))

    created_at = Column(DateTime(timezone=True), server_default=func.now())