# -*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, JSON,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from db import Base
from db import ENGINE


# quizテーブルのモデルQuizTableを定義
# class QuizTable(Base):
#     __tablename__ = "quiz"
#     id = Column(Integer, primary_key=True)
#     quiz_level = Column(Integer, nullable=False)
#     question = Column(String, nullable=False)
#     answers = Column(JSON, nullable=False)
#     img_path = Column(String, nullable=False)
class Questions(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    quiz_level = Column(Integer)
    question = Column(String(255))
    answers = relationship("Answers", backref="questions")
    img_path = Column(String(255), nullable=True)

class Answers(Base):
    __tablename__ = "answers"
    id = Column(Integer, primary_key=True, autoincrement=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    quiz_text = Column(String(255))
    correct = Column(Boolean)

# # POSTやPUTのとき受け取るRequest Bodyのモデルを定義
# class Quiz(BaseModel):
#     id: int
#     level: int
#     question: str
#     answers: list
#     img_path: str


def main():
    # テーブルが存在しなければ、テーブルを作成
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
