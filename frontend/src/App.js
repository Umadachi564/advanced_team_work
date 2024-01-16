import "./App.css";
import { useEffect, useState } from "react";
import { QuizPanel } from "./components/QuizPanel";
import GroupsIcon  from '@mui/icons-material/Groups';
import CallIcon  from '@mui/icons-material/Call';
import { Button, IconButton, Stack } from "@mui/material";
import { PopUpScreen } from "./components/PopUpScreen";

function App() {
  const [finishJudge, setFinishJudge] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0円");
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [telephoneOpen, setTelephoneOpen] = useState(false);

  const handleClickAudienceOpen = () => {
    setAudienceOpen(true);
  };

  const handleAudienceClose = () => {
    setAudienceOpen(false);
  };

  const handleClickTelephoneOpen = () => {
    setTelephoneOpen(true);
  }

  const handleTelephoneClose = () => {
    setTelephoneOpen(false);
  }

  const onClickRestart = () => {
    setQuestionNumber(1);
    setFinishJudge(false);
    setEarned("0円");
  }

  // 問題と解答のデータ
  const data = [
    {
      id: 1,
      question: "大阪公立大学の英語名は？",
      answers: [
        {
          text: "Osaka Prefecture University",
          correct: false,
        },
        {
          text: "Osaka University",
          correct: false,
        },
        {
          text: "Osaka City University",
          correct: false,
        },
        {
          text: "Osaka Metropolitan University",
          correct: true,
        },
      ],
    },
    {
      id: 2,
      question: "現在の大阪公立大学の学長は？",
      answers: [
        {
          text: "辻洋",
          correct: false,
        },
        {
          text: "辰巳砂昌弘",
          correct: true,
        },
        {
          text: "福島伸一",
          correct: false,
        },
        {
          text: "菅広文",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "先端ソフトウェアの開講コマは？",
      answers: [
        {
          text: "水曜日の3限",
          correct: false,
        },
        {
          text: "水曜日の4限",
          correct: false,
        },
        {
          text: "金曜日の3限",
          correct: false,
        },
        {
          text: "木曜日の3限",
          correct: true,
        },
      ],
    },
  ];

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
              <Button variant="contained" aria-label="50_50">50:50</Button>
              <IconButton color="primary" aria-label="audience" onClick={handleClickAudienceOpen}>
                <GroupsIcon />
              </IconButton>
              <IconButton color="primary" aria-label="telephone" onClick={handleClickTelephoneOpen}>
                <CallIcon />
              </IconButton>
            </Stack>

            {/* ボタンを押したときに表示されるポップアップ画面 デザインは最低限 */}
            <PopUpScreen open={audienceOpen} handleClose={handleAudienceClose} text="Audience"/>
            <PopUpScreen open={telephoneOpen} handleClose={handleTelephoneClose} text="Telephone"/>

            {/* 問題と解答のパネル */}
            <div className="bottom">
              <QuizPanel
                data={data}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setFinishJudge={setFinishJudge}
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