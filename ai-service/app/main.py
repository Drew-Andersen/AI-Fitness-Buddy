from fastapi import FastAPI
from app.routes import workout

app = FastAPI()

app.include_router(workout.router, prefix="/workout")