# read_and_insert_data.py

import json
from db import session
from model import Questions, Answers

# ...

def read_and_insert_data(json_file_path):
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for quiz_data in data:
        question = Questions(
            id=quiz_data.get('id'),
            quiz_level=quiz_data.get('level'),
            question=quiz_data.get('question'),
            img_path=quiz_data.get('img_path')
        )

        session.add(question)
        session.flush()  # 質問のプライマリキー（id）の生成を強制

        for answer_data in quiz_data.get('answers', []):
            answer = Answers(
                question_id=question.id,  # 正しい質問のIDを使用
                quiz_text=answer_data.get('text'),
                correct=answer_data.get('correct')
            )
            session.add(answer)

        session.commit()

# ...


if __name__ == "__main__":
    # 問題ディレクトリ内のJSONファイルへのパスを指定
    json_file_path = './problems/problems.json'
    
    # JSONデータをデータベースに登録
    read_and_insert_data(json_file_path)
