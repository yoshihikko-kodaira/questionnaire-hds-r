'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ObjectItem {
  name: string;
  emoji: string;
  imagePath?: string;
}

interface ObjectMemoryQuestionProps {
  objects: ObjectItem[];
  onAnswer: (score: number, value: any) => void;
}

export default function ObjectMemoryQuestion({
  objects,
  onAnswer,
}: ObjectMemoryQuestionProps) {
  const [showObjects, setShowObjects] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);

  const handleShowObjects = () => {
    setShowObjects(true);
    // 5秒後に自動的に隠す
    setTimeout(() => {
      setIsHidden(true);
    }, 5000);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    answers.forEach((answer) => {
      if (answer && objects.some(obj => obj.name === answer)) {
        score++;
      }
    });

    onAnswer(score, { answers });
  };

  if (!showObjects) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-lg text-center text-gray-900">
            これから5つの品物を表示します。<br />
            よく覚えてください。
          </p>
        </div>
        <button
          onClick={handleShowObjects}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          品物を表示する
        </button>
      </div>
    );
  }

  if (!isHidden) {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4">
            {objects.map((obj, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border-2 border-yellow-300 shadow-md"
              >
                {obj.imagePath ? (
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={obj.imagePath}
                      alt={obj.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-6xl mb-2">{obj.emoji}</div>
                )}
                <div className="text-base font-bold text-gray-900">{obj.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-center text-blue-700">
            5秒後に自動的に隠れます...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-900">
        先ほど見せた5つの品物を思い出して入力してください
      </p>

      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              品物 {index + 1}
            </label>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="思い出せない場合は空欄"
            />
          </div>
        ))}
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
