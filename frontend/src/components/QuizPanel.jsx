import { useEffect, useState, React } from "react";
import useSound from "use-sound";
import nextquiz from "../assets/sounds/nextquiz.mp3";
import final_answer from "../assets/sounds/final_answer.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";
import wait from "../assets/sounds/answer_wait.mp3";

// クイズの判定処理や、次の問題への遷移処理を行うコンポーネント
// 新規性: 音を鳴らす処理を追加

export const QuizPanel = ({ data, questionNumber, setQuestionNumber, setFinishJudge, fiftyData, fiftyflag}) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [nextQuiz] = useSound(nextquiz, { interrupt: true });
    const [finalAnswer,{ stop }] = useSound(final_answer, { interrupt: true })
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    const [waitAnswer, WaitAnswerOption] = useSound(wait, { interrupt: true });

    useEffect(() => {
        waitAnswer();
    }, [waitAnswer]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
        callback();
        }, duration);
    };

    const handleClick = (a) => {
        WaitAnswerOption.stop();
        finalAnswer();
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(3000, () => {
            setClassName(a.correct ? "answer correct" : "answer wrong");
        });
        delay(5000, () => {
            stop();
        if (a.correct) {
            correctAnswer();
                delay(4000, () => {
                    nextQuiz();
                    delay(5000, () => {
                        // questionNumberが15なら終了
                        if (questionNumber === 15) {
                            setQuestionNumber((prev) => prev + 1);
                            setFinishJudge(true);
                            WaitAnswerOption.stop();
                        }else{
                            waitAnswer();
                            // もしfiftyflagがtrueなら, fiftyDataを空にする
                            if (fiftyflag) {
                                fiftyData.splice(0, fiftyData.length);
                            }
                            setQuestionNumber((prev) => prev + 1);
                            setSelectedAnswer(null);
                        }
                    });
                });
            // setTimeout(() => {
            //   setQuestionNumber((prev) => prev + 1);
            //   setSelectedAnswer(null);
            // }, 1000);
        } else {
            wrongAnswer();
            delay(1000, () => {
                setFinishJudge(true);
            });
        }
        })
    };
    return (
        <div className="trivia">
            <div className="question">
                {question?.question}
            </div>
            {/* question.img_pathが空文字列でなければ画像を表示 空文字なら何も表示しない*/}
            {question?.img_path && (
                <div className="question-img">
                    <img src={question?.img_path} alt="quiz-img" />
                </div>
            )}
            <div className="answers">
                {question?.answers.map((a) => {
                    if (fiftyData.length > 0 && !fiftyData.some(fd => fd.quiz_text === a.quiz_text)) {
                        return null;
                    }
                    return (
                        <div
                            className={selectedAnswer === a ? className : "answer"}
                            onClick={() => !selectedAnswer && handleClick(a)}
                        >
                            {a.quiz_text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}