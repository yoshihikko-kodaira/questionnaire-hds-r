"use client";

import { useState } from "react";
import { Answer, WordSeries } from "@/types/hds-r";
import { QUESTIONS } from "@/data/questions";
import AgeQuestion from "./questions/AgeQuestion";
import DateQuestion from "./questions/DateQuestion";
import PlaceQuestion from "./questions/PlaceQuestion";
import WordRecallImmediateQuestion from "./questions/WordRecallImmediateQuestion";
import CalculationQuestion from "./questions/CalculationQuestion";
import DigitSpanQuestion from "./questions/DigitSpanQuestion";
import WordRecallDelayedQuestion from "./questions/WordRecallDelayedQuestion";
import ObjectMemoryQuestion from "./questions/ObjectMemoryQuestion";
import VerbalFluencyQuestion from "./questions/VerbalFluencyQuestion";

interface QuestionnaireProps {
  onComplete: (answers: Answer[], totalScore: number) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [actualAge, setActualAge] = useState<number>(0);
  const [actualPlace, setActualPlace] = useState<"家" | "病院" | "施設">("家");
  const [wordSeries, setWordSeries] = useState<WordSeries>(1);
  const [objects, setObjects] = useState([
    { name: "時計", emoji: "⌚" },
    { name: "鍵", emoji: "🔑" },
    { name: "ペン", emoji: "🖊️" },
    { name: "硬貨", emoji: "🪙" },
    { name: "メガネ", emoji: "👓" },
  ]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [setupAge, setSetupAge] = useState("");
  const [setupPlace, setSetupPlace] = useState<"家" | "病院" | "施設">("家");

  const handleSetupComplete = () => {
    setActualAge(parseInt(setupAge));
    setActualPlace(setupPlace);
    setIsSetupComplete(true);
  };

  const handleAnswer = (questionId: number, score: number, value: any) => {
    const question = QUESTIONS[currentQuestion];
    const newAnswer: Answer = {
      questionId,
      type: question.type,
      value,
      score,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 全質問完了
      const totalScore = newAnswers.reduce((sum, ans) => sum + ans.score, 0);
      onComplete(newAnswers, totalScore);
    }
  };

  if (!isSetupComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            検査の準備
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                受験者の実年齢
              </label>
              <input
                type="number"
                value={setupAge}
                onChange={(e) => setSetupAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="例: 75"
              />
              <p className="mt-1 text-xs text-gray-900">
                ※採点に使用します（受験者には見せないでください）
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                現在の場所
              </label>
              <select
                value={setupPlace}
                onChange={(e) =>
                  setSetupPlace(e.target.value as "家" | "病院" | "施設")
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="家">家</option>
                <option value="病院">病院</option>
                <option value="施設">施設</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                単語記憶の系列
              </label>
              <select
                value={wordSeries}
                onChange={(e) =>
                  setWordSeries(parseInt(e.target.value) as WordSeries)
                }
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value={1}>系列1: 桜、猫、電車</option>
                <option value={2}>系列2: 梅、犬、自動車</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                物品記憶の品物（5つ）
              </label>
              <div className="space-y-2">
                {objects.map((obj, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="text-2xl">{obj.emoji}</div>
                    <input
                      type="text"
                      value={obj.name}
                      onChange={(e) => {
                        const newObjects = [...objects];
                        newObjects[index] = {
                          ...newObjects[index],
                          name: e.target.value,
                        };
                        setObjects(newObjects);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder={`品物${index + 1}`}
                    />
                    <select
                      value={obj.emoji}
                      onChange={(e) => {
                        const newObjects = [...objects];
                        newObjects[index] = {
                          ...newObjects[index],
                          emoji: e.target.value,
                        };
                        setObjects(newObjects);
                      }}
                      className="px-3 py-2 border border-gray-400 rounded-md text-xl text-gray-900"
                    >
                      <option value="⌚">⌚ 時計</option>
                      <option value="🔑">🔑 鍵</option>
                      <option value="🖊️">🖊️ ペン</option>
                      <option value="🪙">🪙 硬貨</option>
                      <option value="👓">👓 メガネ</option>
                      <option value="📱">📱 スマホ</option>
                      <option value="💊">💊 薬</option>
                      <option value="📚">📚 本</option>
                      <option value="☂️">☂️ 傘</option>
                      <option value="🎒">🎒 カバン</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSetupComplete}
              disabled={!setupAge}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              検査を開始
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* プログレスバー */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">
              質問 {currentQuestion + 1} / {QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-900">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">問{question.id}</h2>
          <p className="text-lg mb-2 text-gray-900">{question.question}</p>
          {question.instruction && (
            <p className="text-sm text-gray-900 bg-blue-50 border border-blue-200 p-3 rounded font-medium">
              {question.instruction}
            </p>
          )}
        </div>

        {/* 質問コンポーネント */}
        <div>
          {question.type === "age" && (
            <AgeQuestion
              actualAge={actualAge}
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "date" && (
            <DateQuestion
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "place" && (
            <PlaceQuestion
              actualPlace={actualPlace}
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "word-recall-immediate" && (
            <WordRecallImmediateQuestion
              selectedSeries={wordSeries}
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "calculation" && (
            <CalculationQuestion
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "digit-span" && (
            <DigitSpanQuestion
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "word-recall-delayed" && (
            <WordRecallDelayedQuestion
              selectedSeries={wordSeries}
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "object-memory" && (
            <ObjectMemoryQuestion
              objects={objects}
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
          {question.type === "verbal-fluency" && (
            <VerbalFluencyQuestion
              onAnswer={(score, value) =>
                handleAnswer(question.id, score, value)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
