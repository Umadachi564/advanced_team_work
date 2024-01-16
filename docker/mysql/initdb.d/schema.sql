CREATE TABLE questions (
    id INT,
    quiz_level INT,
    question TEXT,
    answers JSON,
    img_path VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE answers (
    id INT AUTO_INCREMENT,
    question_id INT,
    quiz_text TEXT,
    correct BOOLEAN,
    PRIMARY KEY (id)

);