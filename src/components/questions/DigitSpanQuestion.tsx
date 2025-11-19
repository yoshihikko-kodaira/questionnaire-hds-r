'use client';

import { useState } from 'react';

interface DigitSpanQuestionProps {
  onAnswer: (score: number, value: any) => void;
}

export default function DigitSpanQuestion({ onAnswer }: DigitSpanQuestionProps) {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [firstFailed, setFirstFailed] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const handleShowFirst = () => {
    setShowFirst(true);
  };

  const handleFirstSubmit = () => {
    const answer = first.replace(/[^0-9]/g, '');
    if (answer === '286') {
      // 正解、次へ
      setShowSecond(true);
    } else {
      // 不正解、打ち切り
      setFirstFailed(true);
      onAnswer(0, { first, second: null });
    }
  };

  const handleSecondSubmit = () => {
    const firstAnswer = first.replace(/[^0-9]/g, '');
    const secondAnswer = second.replace(/[^0-9]/g, '');

    let score = 0;
    if (firstAnswer === '286') score++;
    if (secondAnswer === '3529') score++;

    onAnswer(score, { first, second });
  };

  if (firstFailed) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-center text-gray-900">
            3桁逆唱に失敗したため、この問題は終了です
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

  if (!showFirst) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg text-center text-gray-900">
            これから3つの数字を表示します。<br />
            逆から言ってください。
          </p>
        </div>
        <button
          onClick={handleShowFirst}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          数字を表示する
        </button>
      </div>
    );
  }

  if (!showSecond) {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-3xl font-bold text-center tracking-widest text-gray-900">6 - 8 - 2</p>
        </div>
        <p className="text-sm text-gray-900 text-center">逆から言ってください</p>
        <div>
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg text-gray-900"
            placeholder="例: 2-8-6"
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-3xl font-bold text-center tracking-widest text-gray-900">3 - 5 - 2 - 9</p>
      </div>
      <p className="text-sm text-gray-900 text-center">逆から言ってください</p>
      <div>
        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg text-gray-900"
          placeholder="例: 9-2-5-3"
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
