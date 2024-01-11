# -*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, JSON
from pydantic import BaseModel
from db import Base
from db import ENGINE


# quizテーブルのモデルQuizTableを定義
class QuizTable(Base):
    __tablename__ = "quiz"
    id = Column(Integer, primary_key=True)
    quiz_level = Column(Integer, nullable=False)
    question = Column(String, nullable=False)
    answers = Column(JSON, nullable=False)
    img_path = Column(String, nullable=False)


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
