'use client';

import { useState } from 'react';

interface DateQuestionProps {
  onAnswer: (score: number, value: any) => void;
}

export default function DateQuestion({ onAnswer }: DateQuestionProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  const handleSubmit = () => {
    const today = new Date();
    const actualYear = today.getFullYear();
    const actualMonth = today.getMonth() + 1;
    const actualDay = today.getDate();
    const actualDayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][today.getDay()];

    let score = 0;
    if (parseInt(year) === actualYear) score++;
    if (parseInt(month) === actualMonth) score++;
    if (parseInt(day) === actualDay) score++;
    if (dayOfWeek === actualDayOfWeek) score++;

    onAnswer(score, { year, month, day, dayOfWeek });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">年</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="2025"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">月</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="11"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">日</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            min="1"
            max="31"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="19"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">曜日</label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">選択してください</option>
            <option value="月">月曜日</option>
            <option value="火">火曜日</option>
            <option value="水">水曜日</option>
            <option value="木">木曜日</option>
            <option value="金">金曜日</option>
            <option value="土">土曜日</option>
            <option value="日">日曜日</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!year || !month || !day || !dayOfWeek}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
