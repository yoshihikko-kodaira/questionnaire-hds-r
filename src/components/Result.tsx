"use client";

import { Answer } from "@/types/hds-r";
import {
  QUESTIONS,
  MAX_TOTAL_SCORE,
  DEMENTIA_THRESHOLD,
} from "@/data/questions";

interface ResultProps {
  answers: Answer[];
  totalScore: number;
  onRestart: () => void;
}

export default function Result({
  answers,
  totalScore,
  onRestart,
}: ResultProps) {
  const percentage = (totalScore / MAX_TOTAL_SCORE) * 100;
  const hasConcern = totalScore <= DEMENTIA_THRESHOLD;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none">
        <h1 className="text-3xl font-bold text-center mb-8">結果</h1>

        {/* スコア表示 */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="inline-block">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {totalScore}
                <span className="text-3xl text-gray-400">
                  {" "}
                  / {MAX_TOTAL_SCORE}
                </span>
              </div>
              <div className="text-sm text-gray-900">合計得点</div>
            </div>
          </div>

          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                hasConcern
                  ? "bg-red-500"
                  : percentage < 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-900">
            {percentage.toFixed(1)}%
          </div>
        </div>

        {/* 各問題の詳細 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">各設問の得点</h2>
          <div className="space-y-2">
            {answers.map((answer, index) => {
              const question = QUESTIONS.find(
                (q) => q.id === answer.questionId
              );
              if (!question) return null;

              return (
                <div
                  key={answer.questionId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      問{question.id}: {question.type}
                    </div>
                    <div className="text-sm text-gray-900">
                      {question.question}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div
                      className={`text-lg font-bold ${
                        answer.score === question.maxScore
                          ? "text-green-600"
                          : answer.score > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {answer.score} / {question.maxScore}点
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-sm text-gray-900">
          <h3 className="font-bold mb-2">注意事項</h3>
          <ul className="space-y-1">
            <li>• この検査は認知症のスクリーニング検査です。</li>
            <li>• 確定診断には医療機関での詳しい検査が必要です。</li>
            <li>
              • 結果は年齢、教育歴、体調などの影響を受ける場合があります。
            </li>
            <li>• 心配な場合は、専門医にご相談ください。</li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
          >
            印刷する
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            新しい検査を開始
          </button>
        </div>

        {/* フッター */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-900 text-center">
          <p>実施日時: {new Date().toLocaleString("ja-JP")}</p>
          <p className="mt-1">
            出典: 加藤仲司ほか: 老年精神医学雑誌 1991; 2: 1339
          </p>
        </div>
      </div>
    </div>
  );
}
