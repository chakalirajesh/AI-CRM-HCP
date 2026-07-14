from fastapi import FastAPI

from app.database import Base, engine

# Import Models
from app.models.hcp import HCP
from app.models.interaction import Interaction

# Import Router
from app.routers.hcp_router import router as hcp_router


from app.routers.interaction_router import router as interaction_router

from app.routers.ai_router import router as ai_router

from fastapi.middleware.cors import CORSMiddleware

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI First CRM HCP Module",
    version="1.0.0",
    description="AI CRM for Healthcare Professionals"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Router
app.include_router(hcp_router)

app.include_router(interaction_router)

app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "AI CRM Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }