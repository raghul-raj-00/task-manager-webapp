from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    is_completed: bool
    created_at: datetime
    user_id: int
