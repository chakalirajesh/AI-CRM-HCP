from pydantic import BaseModel, EmailStr


class HCPCreate(BaseModel):
    name: str
    specialization: str
    hospital: str
    city: str
    email: EmailStr | None = None
    phone: str | None = None


class HCPResponse(HCPCreate):
    id: int

    class Config:
        from_attributes = True