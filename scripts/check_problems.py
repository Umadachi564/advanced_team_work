import json

def check_data_exist(problem):
    if (not 'id' in problem):
        print(f"Invalid problem : idが存在しません (problem : {problem})")
        return False
    if (not 'level' in problem):
        print(f"Invalid problem : levelが存在しません (id : {problem['id']})")
        return False
    if (not 'question' in problem):
        print(f"Invalid problem : questionが存在しません (id : {problem['id']})")
        return False
    if (not 'answers' in problem):
        print(f"Invalid problem : answersが存在しません (id : {problem['id']})")
        return False
    if (not 'img_path' in problem):
        print(f"Invalid problem : img_pathが存在しません (id : {problem['id']})")
        return False
    
    if (len(problem['answers']) != 4):
        print(f"Invalid problem : answersの数が4ではありません (id : {problem['id']})")
        return False
    for answer in problem['answers']:
        if (not 'text' in answer):
            print(f"Invalid problem : 回答(problem['answers'][i][text])が存在しません (id : {problem['id']})")
            return False
        if (not 'correct' in answer):
            print(f"Invalid problem : 正解(problem['answers'][i][correct])が存在しません (id : {problem['id']})")
            return False
    
    return True

def check_data_format(problem):
    if (problem['id'] == None):
        print(f"Invalid problem : idが空です (problem : {problem})")
        return False
    if (problem['level'] == None):
        print(f"Invalid problem : levelが空です (id : {problem['id']})")
        return False
    if (problem['question'] == "" or problem['question'] == None):
        print(f"Invalid problem : 問題文が空です (id : {problem['id']})")
        return False
    if (problem['answers'] == None):
        print(f"Invalid problem : 回答が空です (id : {problem['id']})")
        return False
    if (problem['img_path'] == None):
        print(f"Invalid problem : 画像パスが空です(空文字列はOK) (id : {problem['id']})")
        return False
    
    for answer in problem['answers']:
        if (answer['text'] == None):
            print(f"Invalid answer : 回答が空です (id : {problem['id']})")
            return False
        if (answer['correct'] == None):
            print(f"Invalid answer : 正解が空です (id : {problem['id']})")
            return False
    
    return True

def check_id_and_level(id, level):
    if (id / 10000) == level:
        return True
    else:
        print(f"Invalid id : idがレベルに対応していません (id : {id}, level : {level})")
        return False

def check_answers(answers):
    is_only_one_correct = False
    for answer in answers:
        if (answer['text'] == "" or answer['text'] == None):
            print(f"Invalid answer : 空の選択肢があります (id : {problem['id']})")
            return False
        if (answer['correct'] == None):
            print(f"Invalid answer : 正解が設定されていません (id : {problem['id']})")
            return False
        if (answer['correct'] and is_only_one_correct):
            print(f"Invalid answer : 正解が一つだけではありません (id : {problem['id']})")
            return False
        is_only_one_correct = is_only_one_correct or answer['correct']
    
    return is_only_one_correct

def check_id_uniqueness(problems):
    id_set = set()
    for problem in problems:
        if (problem['id'] in id_set):
            print(f"Duplicate id : idが重複しています (id : {problem['id']})")
            return False
        id_set.add(problem['id'])
    
    return len(id_set) == len(problems)

with open('./src/assets/problems/problems.json') as f:
    problems = json.load(f)

for problem in problems:
    if (not check_data_exist(problem)):
        print(f"Data error : データが不足しています")
        print(f"problem : {problem}")
        exit(1)
    if (not check_data_format(problem)):
        print(f"Data format error : フォーマットに一致していない問題があります")
        print(f"problem : {problem}")
        exit(1)
    if (not check_id_and_level):
        exit(1)
    if (not check_answers(problem['answers'])):
        exit(1)
    if (not check_id_uniqueness(problems)):
        exit(1)
        
print("OK")