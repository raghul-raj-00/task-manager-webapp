from fastapi import FastAPI

from sqlmodel import SQLModel
from .core.database import engine
from .api import auth, tasks
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Task Manager API")
origins = ["https://task-manager-webapp-31wl.onrender.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
SQLModel.metadata.create_all(engine)

# Routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])

# Serve frontend static files


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
