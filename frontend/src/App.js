import "./App.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { QuizPanel } from "./components/QuizPanel";
import GroupsIcon  from '@mui/icons-material/Groups';
import CallIcon  from '@mui/icons-material/Call';
import { Button, IconButton, Stack } from "@mui/material";
import { PopUpScreen } from "./components/PopUpScreen";
import { PopUpScreenAudience } from "./components/PopUpScreenAudience";

function App() {
  const [finishJudge, setFinishJudge] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0円");
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [telephoneOpen, setTelephoneOpen] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [fiftyData, setFiftyData] = useState([]);
  const [fiftyflag, setFiftyflag] = useState(false);
  const [telephoneflag, setTelephoneflag] = useState(false);
  const [audienceflag, setAudienceflag] = useState(false);

  const handleClickAudienceOpen = () => {
    setAudienceOpen(true);

  };

  const handleAudienceClose = () => {
    setAudienceOpen(false);
    setAudienceflag(true);
  };

  const handleClickTelephoneOpen = () => {
    setTelephoneOpen(true);
  }

  const handleTelephoneClose = () => {
    setTelephoneOpen(false);
    setTelephoneflag(true);
  }

  const handleClickFifty = () => {
    const url = "http://127.0.0.1:8001/fifty/"

    // 現在の問題と解答のデータのidを取得
    const currentQuestionId = quizData[questionNumber - 1].id;
    const newUrl = url + currentQuestionId;
    // APIにリクエスト
    axios.get(newUrl)
      .then((response) => {
        const data = response.data;
        setFiftyData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setFiftyflag(true);
  }
  const onClickRestart = () => {
    setQuestionNumber(1);
    setFinishJudge(false);
    setEarned("0円");
    setFiftyflag(false);
    setTelephoneflag(false);
    setAudienceflag(false);
    setFiftyData([]);
    setQuizData([]); // quizDataを空にする
    // データを再取得
    fetchData().then((data) => {
      setQuizData(data);
      console.log(data);
    });
  }
  
  const fetchData = async () => {
    try {
      const url = "http://127.0.0.1:8001/quizzes";
      const response = await axios.get(url);
      const data = response.data;

      // quiz_levelごとにデータを分割
      const level1 = data.filter(quiz => quiz.quiz_level === 1);
      const level2 = data.filter(quiz => quiz.quiz_level === 2);
      const level3 = data.filter(quiz => quiz.quiz_level === 3);

      // 各レベルからランダムに5問ずつ抽出
      const selectedData = [...selectRandom(level1, 5), ...selectRandom(level2, 5), ...selectRandom(level3, 5)];
  
      return selectedData;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 配列からランダムに指定した数の要素を抽出する関数

  const selectRandom = (array, num) => {
    const selected = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      selected.push(array[randomIndex]);
      array.splice(randomIndex, 1); // 選択した問題を元のデータから削除
    }
    return selected;
  }

  useEffect(() => {
    fetchData().then((data) => {
      setQuizData(data);
      console.log(data);
    });
  }, []);
  // 問題と解答のデータ
  // const data = [
  //   {
  //     id: 1,
  //     question: "大阪公立大学の英語名は？",
  //     answers: [
  //       {
  //         text: "Osaka Prefecture University",
  //         correct: false,
  //       },
  //       {
  //         text: "Osaka University",
  //         correct: false,
  //       },
  //       {
  //         text: "Osaka City University",
  //         correct: false,
  //       },
  //       {
  //         text: "Osaka Metropolitan University",
  //         correct: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     question: "現在の大阪公立大学の学長は？",
  //     answers: [
  //       {
  //         text: "辻洋",
  //         correct: false,
  //       },
  //       {
  //         text: "辰巳砂昌弘",
  //         correct: true,
  //       },
  //       {
  //         text: "福島伸一",
  //         correct: false,
  //       },
  //       {
  //         text: "菅広文",
  //         correct: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     question: "先端ソフトウェアの開講コマは？",
  //     answers: [
  //       {
  //         text: "水曜日の3限",
  //         correct: false,
  //       },
  //       {
  //         text: "水曜日の4限",
  //         correct: false,
  //       },
  //       {
  //         text: "金曜日の3限",
  //         correct: false,
  //       },
  //       {
  //         text: "木曜日の3限",
  //         correct: true,
  //       },
  //     ],
  //   },
  // ];

  // 右端にある賞金のリスト
  const moneyPyramid = 
      [
        { id: 1, amount: "￥10,000" },
        { id: 2, amount: "￥20,000" },
        { id: 3, amount: "￥30,000" },
        { id: 4, amount: "￥50,000" },
        { id: 5, amount: "￥100,000" },
        { id: 6, amount: "￥150,000" },
        { id: 7, amount: "￥250,000" },
        { id: 8, amount: "￥500,000" },
        { id: 9, amount: "￥750,000" },
        { id: 10, amount: "￥1,000,000" },
        { id: 11, amount: "￥1,500,000" },
        { id: 12, amount: "￥2,500,000" },
        { id: 13, amount: "￥5,000,000" },
        { id: 14, amount: "￥7,500,000" },
        { id: 15, amount: "￥10,000,000" },
      ].reverse();

  // 正解したら賞金を更新
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {/* クイズ本体のUI */}
      <div className="main">
        {finishJudge ? (
          // 終了画面
          <div className="endText">
            <h1>獲得賞金: {earned}</h1>
            <Button variant="contained" aria-label="Reset" onClick={onClickRestart}>最初からやり直す</Button>
          </div>
        ) : (
          <>
            {/* オプションのボタン群 */}
            <Stack direction="row" spacing={2} className="ButtonsBack">
              <Button variant="contained" aria-label="50_50" onClick={handleClickFifty} disabled={fiftyflag}>50:50</Button>
              <IconButton color="primary" aria-label="audience" onClick={handleClickAudienceOpen} disabled={audienceflag}>
                <GroupsIcon />
              </IconButton>
              <IconButton color="primary" aria-label="telephone" onClick={handleClickTelephoneOpen} disabled={telephoneflag}>
                <CallIcon />
              </IconButton>
            </Stack>

            {/* ボタンを押したときに表示されるポップアップ画面 デザインは最低限 */}
            <PopUpScreenAudience open={audienceOpen} handleClose={handleAudienceClose} text="Audience"/>
            <PopUpScreen open={telephoneOpen} handleClose={handleTelephoneClose} text="Telephone"/>

            {/* 問題と解答のパネル */}
            <div className="bottom">
              <QuizPanel
                data={quizData}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setFinishJudge={setFinishJudge}
                fiftyData={fiftyData}
                fiftyflag={fiftyflag}
              />
            </div>
          </>
        )}
      </div>

      {/* 右端にある賞金欄 */}
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;