import json

def check_data_exist(problem):
    if (not 'id' in problem):
        return False
    if (not 'level' in problem):
        return False
    if (not 'question' in problem):
        return False
    if (not 'answers' in problem):
        return False
    if (not 'img_path' in problem):
        return False
    
    if (len(problem['answers']) != 4):
        return False
    for answer in problem['answers']:
        if (not 'text' in answer):
            return False
        if (not 'correct' in answer):
            return False
    
    return True

def check_data_format(problem):
    if (problem['id'] == None):
        return False
    if (problem['level'] == None):
        return False
    if (problem['question'] == "" or problem['question'] == None):
        return False
    if (problem['answers'] == None):
        return False
    if (problem['img_path'] == None):
        return False
    
    for answer in problem['answers']:
        if (answer['text'] == None):
            return False
        if (answer['correct'] == None):
            return False
    
    return True

def check_id_and_level(id, level):
    if (id / 10000) == level:
        return True
    else:
        return False

def check_answers(answers):
    is_only_one_correct = False
    for answer in answers:
        if (answer['text'] == "" or answer['text'] == None):
            return False
        if (answer['correct'] == None):
            return False
        if (answer['correct'] and is_only_one_correct):
            return False
        is_only_one_correct = is_only_one_correct or answer['correct']
    
    return is_only_one_correct

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
        print(f'Invalid id : idがレベルに対応していません (id : {problem["id"]}, level : {problem["level"]})')
        exit(1)
    if (not check_answers(problem['answers'])):
        print(f'Invalid answers : 正解が一つだけではありません (id : {problem["id"]})')
        exit(1)
        
print("OK")