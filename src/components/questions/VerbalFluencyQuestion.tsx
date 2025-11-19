'use client';

import { useState, useEffect } from 'react';

interface VerbalFluencyQuestionProps {
  onAnswer: (score: number, value: any) => void;
}

export default function VerbalFluencyQuestion({ onAnswer }: VerbalFluencyQuestionProps) {
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isStarted, timeLeft, isFinished]);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAddVegetable = () => {
    if (currentInput.trim()) {
      setVegetables([...vegetables, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddVegetable();
    }
  };

  const handleRemove = (index: number) => {
    setVegetables(vegetables.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const calculateScore = (count: number): number => {
    if (count >= 10) return 5;
    if (count === 9) return 4;
    if (count === 8) return 3;
    if (count === 7) return 2;
    if (count === 6) return 1;
    return 0;
  };

  const handleSubmit = () => {
    const score = calculateScore(vegetables.length);
    onAnswer(score, { vegetables, count: vegetables.length });
  };

  if (!isStarted) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg text-center text-gray-900">
            野菜の名前をできるだけ多く答えてください。<br />
            途中で詰まり、約10秒待っても出ない場合は終了します。
          </p>
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          開始する
        </button>
      </div>
    );
  }

  if (isFinished || timeLeft === 0) {
    const score = calculateScore(vegetables.length);
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-center font-medium text-gray-900">
            回答数: {vegetables.length}個
          </p>
          <p className="text-center text-sm text-gray-900 mt-2">
            得点: {score}点 / 5点
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium mb-2 text-gray-900">回答した野菜:</p>
          <div className="flex flex-wrap gap-2">
            {vegetables.map((veg, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-400 rounded-full text-sm"
              >
                {veg}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          次へ
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-center text-lg font-medium text-gray-900">
          残り時間: {timeLeft}秒
        </p>
        <p className="text-center text-sm text-gray-900 mt-1">
          現在の回答数: {vegetables.length}個
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="野菜の名前を入力"
          autoFocus
        />
        <button
          onClick={handleAddVegetable}
          disabled={!currentInput.trim()}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          追加
        </button>
      </div>

      {vegetables.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">回答済み:</p>
          <div className="flex flex-wrap gap-2">
            {vegetables.map((veg, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm flex items-center gap-2"
              >
                {veg}
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleFinish}
        className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
      >
        終了する
      </button>
    </div>
  );
}
