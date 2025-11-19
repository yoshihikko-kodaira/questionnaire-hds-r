'use client';

import { useState } from 'react';
import { WORD_SERIES } from '@/data/questions';
import { WordSeries } from '@/types/hds-r';

interface WordRecallImmediateQuestionProps {
  selectedSeries: WordSeries;
  onAnswer: (score: number, value: any) => void;
}

export default function WordRecallImmediateQuestion({
  selectedSeries,
  onAnswer,
}: WordRecallImmediateQuestionProps) {
  const series = WORD_SERIES[selectedSeries - 1];
  const [wordA, setWordA] = useState('');
  const [wordB, setWordB] = useState('');
  const [wordC, setWordC] = useState('');
  const [showWords, setShowWords] = useState(false);

  const handleShowWords = () => {
    setShowWords(true);
  };

  const handleSubmit = () => {
    let score = 0;
    if (wordA === series.words.a) score++;
    if (wordB === series.words.b) score++;
    if (wordC === series.words.c) score++;

    onAnswer(score, {
      series: selectedSeries,
      words: { a: wordA, b: wordB, c: wordC },
    });
  };

  if (!showWords) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg font-medium text-center text-gray-900">
            これから3つの言葉を表示します。<br />
            よく覚えてください。
          </p>
        </div>
        <button
          onClick={handleShowWords}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          言葉を表示する
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-2xl font-bold text-center space-x-8 text-gray-900">
          <span>{series.words.a}</span>
          <span>{series.words.b}</span>
          <span>{series.words.c}</span>
        </p>
      </div>

      <p className="text-sm text-gray-900 text-center">
        上記の3つの言葉を復唱してください
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">1つ目</label>
          <input
            type="text"
            value={wordA}
            onChange={(e) => setWordA(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">2つ目</label>
          <input
            type="text"
            value={wordB}
            onChange={(e) => setWordB(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">3つ目</label>
          <input
            type="text"
            value={wordC}
            onChange={(e) => setWordC(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!wordA || !wordB || !wordC}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
