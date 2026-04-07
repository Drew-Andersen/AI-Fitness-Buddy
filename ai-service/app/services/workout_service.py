import os
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def clean_ai_response(content: str):
    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
    
    return content.strip()

def generate_workout_plan(user_data):
    prompt = f"""
    Create a structured 5-day workout plan.

    User:
    - Weight: {user_data.get('weight')}
    - Goal: {user_data.get('goal')}
    - Experience: {user_data.get('experience')}

    IMPORTANT:
    - Retuirn ONLY valid JSON
    - Do NOT include markdown (no```json)
    - Do NOT include explanations
    - Output nust be directly parsable

    Format:
    [
        {{
        "goal": "cut",
        "duration": "5-days",
        "plan":[
            "day": "Monday",
            "focus": "Chest",
            "exerceises": [
                {{
                    "name": "Bench Press",
                    "sets": 4,
                    "reps": "8-10"
                }}
            ]
        ]
        }}
    ]
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a professional fitness coach. Always return valid JSON only, no markdown."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
    )

    content = response.choices[0].message.content

    # 🔥 CLEAN IT
    cleaned = clean_ai_response(content)

    try:
        return json.loads(cleaned)
    except Exception as e:
        print("JSON parse error:", e)
        return {"raw": cleaned}