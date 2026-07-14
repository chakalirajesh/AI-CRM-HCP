from sqlalchemy.orm import Session

from app.models.hcp import HCP
from app.schemas.hcp_schema import HCPCreate


class HCPService:

    @staticmethod
    def create_hcp(db: Session, hcp: HCPCreate):

        new_hcp = HCP(
            name=hcp.name,
            specialization=hcp.specialization,
            hospital=hcp.hospital,
            city=hcp.city,
            email=hcp.email,
            phone=hcp.phone
        )

        db.add(new_hcp)
        db.commit()
        db.refresh(new_hcp)

        return new_hcp

    @staticmethod
    def get_all_hcp(db: Session):

        return db.query(HCP).all()

    @staticmethod
    def get_hcp_by_id(db: Session, hcp_id: int):

        return db.query(HCP).filter(
            HCP.id == hcp_id
        ).first()

    # -------------------------
    # UPDATE HCP
    # -------------------------

    @staticmethod
    def update_hcp(db: Session, hcp_id: int, hcp: HCPCreate):

        existing_hcp = db.query(HCP).filter(
            HCP.id == hcp_id
        ).first()

        if not existing_hcp:
            return {"message": "HCP not found"}

        existing_hcp.name = hcp.name
        existing_hcp.specialization = hcp.specialization
        existing_hcp.hospital = hcp.hospital
        existing_hcp.city = hcp.city
        existing_hcp.email = hcp.email
        existing_hcp.phone = hcp.phone

        db.commit()
        db.refresh(existing_hcp)

        return {
            "message": "HCP Updated Successfully",
            "data": existing_hcp
        }

    # -------------------------
    # DELETE HCP
    # -------------------------

    @staticmethod
    def delete_hcp(db: Session, hcp_id: int):

        existing_hcp = db.query(HCP).filter(
            HCP.id == hcp_id
        ).first()

        if not existing_hcp:
            return {"message": "HCP not found"}

        db.delete(existing_hcp)
        db.commit()

        return {
            "message": "HCP Deleted Successfully"
        }