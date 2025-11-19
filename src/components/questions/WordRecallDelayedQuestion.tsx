'use client';

import { useState } from 'react';
import { WORD_SERIES } from '@/data/questions';
import { WordSeries } from '@/types/hds-r';

interface WordRecallDelayedQuestionProps {
  selectedSeries: WordSeries;
  onAnswer: (score: number, value: any) => void;
}

export default function WordRecallDelayedQuestion({
  selectedSeries,
  onAnswer,
}: WordRecallDelayedQuestionProps) {
  const series = WORD_SERIES[selectedSeries - 1];
  const [wordA, setWordA] = useState('');
  const [wordB, setWordB] = useState('');
  const [wordC, setWordC] = useState('');
  const [showHints, setShowHints] = useState(false);

  const handleSpontaneousSubmit = () => {
    let score = 0;
    if (wordA === series.words.a) score += 2;
    if (wordB === series.words.b) score += 2;
    if (wordC === series.words.c) score += 2;

    // すべて正解なら終了
    if (score === 6) {
      onAnswer(score, {
        type: 'spontaneous',
        words: { a: wordA, b: wordB, c: wordC },
      });
    } else {
      // ヒントを表示
      setShowHints(true);
    }
  };

  const handleHintSubmit = () => {
    let score = 0;

    // 自発的回答のスコア
    if (wordA === series.words.a) score += 2;
    if (wordB === series.words.b) score += 2;
    if (wordC === series.words.c) score += 2;

    // ヒント後の回答（まだ正解していないもののみ）
    const [hintWordA, hintWordB, hintWordC] = [wordA, wordB, wordC];
    if (wordA !== series.words.a && hintWordA === series.words.a) score += 1;
    if (wordB !== series.words.b && hintWordB === series.words.b) score += 1;
    if (wordC !== series.words.c && hintWordC === series.words.c) score += 1;

    onAnswer(score, {
      type: 'with_hints',
      spontaneous: { a: wordA, b: wordB, c: wordC },
      withHints: { a: hintWordA, b: hintWordB, c: hintWordC },
    });
  };

  if (!showHints) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-900">
          先ほど覚えてもらった3つの言葉を思い出してください
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              1つ目の言葉
            </label>
            <input
              type="text"
              value={wordA}
              onChange={(e) => setWordA(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="思い出せない場合は空欄"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              2つ目の言葉
            </label>
            <input
              type="text"
              value={wordB}
              onChange={(e) => setWordB(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="思い出せない場合は空欄"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              3つ目の言葉
            </label>
            <input
              type="text"
              value={wordC}
              onChange={(e) => setWordC(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="思い出せない場合は空欄"
            />
          </div>
        </div>
        <button
          onClick={handleSpontaneousSubmit}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          回答する
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm font-medium mb-2 text-gray-900">ヒント:</p>
        <div className="space-y-1 text-sm text-gray-900">
          <p>a) {series.hints.a}</p>
          <p>b) {series.hints.b}</p>
          <p>c) {series.hints.c}</p>
        </div>
      </div>

      <p className="text-sm text-gray-900">
        ヒントを参考に、もう一度答えてください（変更不要なら同じ答えを入力）
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            a) {series.hints.a}
          </label>
          <input
            type="text"
            value={wordA}
            onChange={(e) => setWordA(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            b) {series.hints.b}
          </label>
          <input
            type="text"
            value={wordB}
            onChange={(e) => setWordB(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            c) {series.hints.c}
          </label>
          <input
            type="text"
            value={wordC}
            onChange={(e) => setWordC(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      <button
        onClick={handleHintSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
