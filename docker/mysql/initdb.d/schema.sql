CREATE TABLE quiz (
    id INT,
    quiz_level INT,
    question TEXT,
    answers JSON,
    img_path VARCHAR(255),
    PRIMARY KEY (id)
);