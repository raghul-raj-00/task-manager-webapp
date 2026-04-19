from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from ..core.database import get_session
from ..api.deps import get_current_user
from ..models.task import Task
from ..models.user import User
from ..schemas.task import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()

@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_in: TaskCreate, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    db_task = Task(
        title=task_in.title,
        description=task_in.description,
        user_id=current_user.id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/", response_model=List[TaskRead])
async def list_tasks(
    completed: Optional[bool] = Query(None),
    offset: int = 0,
    limit: int = 10,
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    statement = select(Task).where(Task.user_id == current_user.id)
    if completed is not None:
        statement = statement.where(Task.is_completed == completed)
    
    tasks = session.exec(statement.offset(offset).limit(limit)).all()
    return tasks

@router.get("/{task_id}", response_model=TaskRead)
async def get_task(
    task_id: int, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    return task

@router.put("/{task_id}", response_model=TaskRead)
async def update_task(
    task_id: int, 
    task_in: TaskUpdate, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if db_task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    update_data = task_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    session.delete(task)
    session.commit()
    return None
