'use client';

import { useState } from 'react';

interface AgeQuestionProps {
  actualAge: number;
  onAnswer: (score: number, value: number) => void;
}

export default function AgeQuestion({ actualAge, onAnswer }: AgeQuestionProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    const answerNum = parseInt(answer);
    const diff = Math.abs(answerNum - actualAge);
    const score = diff <= 2 ? 1 : 0;
    onAnswer(score, answerNum);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          回答者の年齢を入力してください
        </label>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="例: 75"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!answer}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
