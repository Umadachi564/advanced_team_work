-- INSERT INTO quiz (id, quiz_level, question, answers, img_path)
-- VALUES (11001, 1, 'hogehogehoge', '[{"text": "hoge", "correct": false}, {"text": "fuga", "correct": false}, {"text": "foo", "correct": true}, {"text": "bar", "correct": false}]', './img/hoge.png');
INSERT INTO questions (id, quiz_level, question, answers, img_path) VALUES (11001, 1, 'hogehogehoge', '[{"text": "hoge", "correct": false}, {"text": "fuga", "correct": false}, {"text": "foo", "correct": true}, {"text": "bar", "correct": false}]', './img/hoge.png');
INSERT INTO answers (id, question_id, quiz_text, correct) VALUES (11, 11001, 'foo', True);