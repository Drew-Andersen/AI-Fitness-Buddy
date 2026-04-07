from fastapi import APIRouter
from app.services.workout_service import generate_workout_plan

router = APIRouter()

@router.post("/generate")
def generate_workout(data: dict):
    plan = generate_workout_plan(data)
    return plan