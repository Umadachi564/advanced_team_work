from fastapi import FastAPI, HTTPException
from typing import List
from starlette.middleware.cors import CORSMiddleware
from db import session
from model import Questions,Answers
from sqlalchemy.orm import relationship,joinedload
import random

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------APIの実装------------
# テーブルにいる全クイズ情報を取得 GET
@app.get("/quizzes")
def read_quizzes():
    quizzes = session.query(Questions).options(joinedload(Questions.answers)).all()
    return quizzes


# idにマッチするクイズ情報を取得 GET
@app.get("/quizzes/{quiz_id}")
def read_quiz(quiz_id: int):
    quiz = session.query(Questions).options(joinedload(Questions.answers)).filter(Questions.id == quiz_id).first()
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz


@app.get("/fifty/{quiz_id}")
def fifty_fifty(quiz_id: int):
    quiz = session.query(Questions).options(joinedload(Questions.answers)).filter(Questions.id == quiz_id).first()
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    correct_number = 0
    f_list = []
    for index, answer in enumerate(quiz.answers):
        if answer.correct == True:
            correct_number = index
        else:
            f_list.append(answer)
    r = random.randint(0, 2)
    select = [f_list[r], quiz.answers[correct_number]]

    return select


# # クイズ情報を登録 POST
# @app.post("/quiz")
# async def create_quiz(quiz: Quiz, db: Session = Depends(get_db)):
#     db_quiz = QuizTable(**quiz.dict())
#     db.add(db_quiz)
#     db.commit()
#     db.refresh(db_quiz)
#     return db_quiz

# # 複数のクイズ情報を更新 PUT
# @app.put("/quizzes")
# async def update_quizzes(quizzes: List[Quiz], db: Session = Depends(get_db)):
#     for new_quiz in quizzes:
#         db_quiz = db.query(QuizTable).filter(QuizTable.id == new_quiz.id).first()
#         if db_quiz:
#             db_quiz.level = new_quiz.level
#             db_quiz.question = new_quiz.question
#             db_quiz.answers = new_quiz.answers
#             db_quiz.img_path = new_quiz.img_path
#             db.commit()
#     return {"message": "Quizzes updated successfully"}
