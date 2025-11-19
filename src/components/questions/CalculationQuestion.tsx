'use client';

import { useState } from 'react';

interface CalculationQuestionProps {
  onAnswer: (score: number, value: any) => void;
}

export default function CalculationQuestion({ onAnswer }: CalculationQuestionProps) {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [firstIncorrect, setFirstIncorrect] = useState(false);

  const handleFirstSubmit = () => {
    const answer = parseInt(first);
    if (answer === 93) {
      // 正解、次の質問へ
    } else {
      // 不正解、打ち切り
      setFirstIncorrect(true);
      onAnswer(0, { first, second: null });
    }
  };

  const handleSecondSubmit = () => {
    const firstAnswer = parseInt(first);
    const secondAnswer = parseInt(second);

    let score = 0;
    if (firstAnswer === 93) score++;
    if (secondAnswer === 86) score++;

    onAnswer(score, { first, second });
  };

  if (firstIncorrect) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-center text-gray-900">
            最初の答えが不正解のため、この問題は終了です
          </p>
        </div>
        <button
          onClick={() => onAnswer(0, { first, second: null })}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          次へ
        </button>
      </div>
    );
  }

  if (!first) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg text-center text-gray-900">100 − 7 = ?</p>
        </div>
        <div>
          <input
            type="number"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg text-gray-900"
            placeholder="答えを入力"
          />
        </div>
        <button
          onClick={handleFirstSubmit}
          disabled={!first}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          回答する
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-sm text-center text-green-700">1問目: {first} ✓</p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-lg text-center text-gray-900">それからまた7を引くと？</p>
      </div>
      <div>
        <input
          type="number"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg text-gray-900"
          placeholder="答えを入力"
        />
      </div>
      <button
        onClick={handleSecondSubmit}
        disabled={!second}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
