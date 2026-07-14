from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.hcp_schema import HCPCreate
from app.services.hcp_service import HCPService

router = APIRouter(
    prefix="/hcp",
    tags=["Healthcare Professionals"]
)


@router.post("/")
def create_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):

    data = HCPService.create_hcp(db, hcp)

    return {
        "message": "HCP Created Successfully",
        "data": data
    }


@router.get("/")
def get_all_hcp(
    db: Session = Depends(get_db)
):

    return HCPService.get_all_hcp(db)


@router.get("/{hcp_id}")
def get_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):

    return HCPService.get_hcp_by_id(db, hcp_id)
@router.put("/{hcp_id}")
def update_hcp(
    hcp_id: int,
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    return HCPService.update_hcp(db, hcp_id, hcp)


@router.delete("/{hcp_id}")
def delete_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    return HCPService.delete_hcp(db, hcp_id)