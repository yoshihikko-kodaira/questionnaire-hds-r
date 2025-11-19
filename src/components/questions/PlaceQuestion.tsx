'use client';

import { useState } from 'react';

interface PlaceQuestionProps {
  actualPlace: '家' | '病院' | '施設';
  onAnswer: (score: number, value: any) => void;
}

export default function PlaceQuestion({ actualPlace, onAnswer }: PlaceQuestionProps) {
  const [spontaneousAnswer, setSpontaneousAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showChoices, setShowChoices] = useState(false);

  const handleSpontaneousSubmit = () => {
    const answer = spontaneousAnswer.trim();
    const score = answer === actualPlace ? 2 : 0;

    if (score === 2) {
      onAnswer(score, { type: 'spontaneous', answer });
    } else {
      setShowChoices(true);
    }
  };

  const handleChoiceSubmit = () => {
    const score = selectedAnswer === actualPlace ? 1 : 0;
    onAnswer(score, { type: 'choice', answer: selectedAnswer });
  };

  if (showChoices) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-900">以下から選択してください</p>
        <div className="space-y-2">
          {['家', '病院', '施設'].map((place) => (
            <button
              key={place}
              onClick={() => setSelectedAnswer(place)}
              className={`w-full px-4 py-3 border rounded-md text-left transition-colors text-gray-900 ${
                selectedAnswer === place
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-400 hover:border-gray-400'
              }`}
            >
              {place}
            </button>
          ))}
        </div>
        <button
          onClick={handleChoiceSubmit}
          disabled={!selectedAnswer}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          次へ
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          自由回答（家、病院、施設のいずれか）
        </label>
        <input
          type="text"
          value={spontaneousAnswer}
          onChange={(e) => setSpontaneousAnswer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          placeholder="例: 家"
        />
      </div>
      <button
        onClick={handleSpontaneousSubmit}
        disabled={!spontaneousAnswer}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        回答する
      </button>
    </div>
  );
}
