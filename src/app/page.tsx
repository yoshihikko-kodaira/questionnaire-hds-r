'use client';

import { useState } from 'react';
import Questionnaire from '@/components/Questionnaire';
import Result from '@/components/Result';
import { Answer } from '@/types/hds-r';

type ViewMode = 'welcome' | 'questionnaire' | 'result';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('welcome');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = () => {
    setViewMode('questionnaire');
  };

  const handleComplete = (completedAnswers: Answer[], score: number) => {
    setAnswers(completedAnswers);
    setTotalScore(score);
    setViewMode('result');
  };

  const handleRestart = () => {
    setAnswers([]);
    setTotalScore(0);
    setViewMode('welcome');
  };

  if (viewMode === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              改訂長谷川式簡易知能評価
            </h1>
            <p className="text-xl text-gray-900 mb-2">HDS-R</p>
            <p className="text-sm text-gray-900">
              Hasegawa's Dementia Scale - Revised
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-3 text-gray-800">検査について</h2>
            <ul className="space-y-2 text-sm text-gray-900">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>認知症のスクリーニング検査です（30点満点）</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>全9問の質問に答えていただきます</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>所要時間: 約10〜15分</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>20点以下の場合、認知症の疑いがあります</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-3 text-gray-800">注意事項</h2>
            <ul className="space-y-2 text-sm text-gray-900">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span>この検査はスクリーニングを目的としています</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span>確定診断には医療機関での検査が必要です</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span>落ち着いた環境で実施してください</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            検査を開始する
          </button>

          <div className="mt-6 text-xs text-gray-900 text-center">
            <p>出典: 加藤仲司ほか: 老年精神医学雑誌 1991; 2: 1339</p>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'questionnaire') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <Questionnaire onComplete={handleComplete} />
      </div>
    );
  }

  if (viewMode === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <Result
          answers={answers}
          totalScore={totalScore}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return null;
}
