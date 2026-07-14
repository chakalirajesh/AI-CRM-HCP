from sqlalchemy import Column, Integer, String
from app.database import Base


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialization = Column(String(100), nullable=False)
    hospital = Column(String(150), nullable=False)
    city = Column(String(100), nullable=False)
    email = Column(String(120), unique=True)
    phone = Column(String(20))