from pydantic import BaseModel, Field
from typing import List

class Answer(BaseModel):
    quiz_text: str
    correct: bool

class Questions(BaseModel):
    id: int
    quiz_level: int
    question: str
    answers: List[Answer] = Field(min_items=4, max_items=4)
    img_path: str = ""