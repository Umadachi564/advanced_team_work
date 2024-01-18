from fastapi import FastAPI, HTTPException
from typing import List
from starlette.middleware.cors import CORSMiddleware
from db import session
from model import Questions,Answers
from sqlalchemy.orm import joinedload
import schemas
from typing import List
import random
import os
from openai import OpenAI

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
# ルートディレクトリ
@app.get("/")
def index():
    return {"message":"Hello World"}

# テーブルにいる全クイズ情報を取得 GET
@app.get("/quizzes", response_model=List[schemas.Questions])
def read_quizzes():
    quizzes = session.query(Questions).options(joinedload(Questions.answers)).all()
    return quizzes


# idにマッチするクイズ情報を取得 GET
@app.get("/quizzes/{quiz_id}", response_model=schemas.Questions)
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


@app.get("/quizzes/fromlevel/{level}", response_model=List[schemas.Questions])
def get_question(level: int):
    quiz_num = 5
    quiz = session.query(Questions).options(joinedload(Questions.answers)).filter(Questions.quiz_level == level).all()
    if len(quiz) < quiz_num:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return random.sample(quiz, quiz_num)

@app.get("/telephone")
def get_telephone_text(question_text: str, select_A: str, select_B: str, select_C: str, select_D: str):
    question_text = "問題です。" + question_text + "の答えはどれでしょうか？"
    # select_text = "選択肢は、" + select_A + "、" + select_B + "、" + select_C + "、" + select_D + "です。"
    select_text = "選択肢は、" +"A: "+ select_A + "、" +"B: "+ select_B + "、" + "C: "+select_C + "、" + "D: "+select_D + "です。"
    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get("API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "あなたはクイズ・ミリオネアの挑戦者から「テレフォン」で質問を受けている挑戦者の友人です。次の質問に陽気な口調で回答してください。ただし、知識レベルは大阪の一般的な大学生のものとします。",
            },
            {
                "role": "user",
                "content": question_text + select_text,
            }
        ],
        model="gpt-3.5-turbo",
    )
    # AIからの応答をレスポンスとして返す
    return chat_completion.choices[0].message.content
# 問題のPOST
#@app.post("/add/")
#def create_question(addQuest: schemas.Questions):
#    ans1 = Answers(text=addQuest.answers[0].quiz_text, correct=addQuest.answers[0].correct)
#    ans2 = Answers(text=addQuest.answers[1].quiz_text, correct=addQuest.answers[1].correct)
#    ans3 = Answers(text=addQuest.answers[2].quiz_text, correct=addQuest.answers[2].correct)
#    ans4 = Answers(text=addQuest.answers[3].quiz_text, correct=addQuest.answers[3].correct)
#    newQuest = Questions(id=addQuest.id, level=addQuest.quiz_level, question=addQuest.question, img_path=addQuest.img_path, answers=[ans1, ans2, ans3, ans4])
#    session.add(newQuest)
#    session.commit()
#    session.refresh(newQuest)
#    return

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
