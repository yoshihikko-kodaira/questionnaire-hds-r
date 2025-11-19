// HDS-R質問票の型定義

export type QuestionType =
  | 'age'
  | 'date'
  | 'place'
  | 'word-recall-immediate'
  | 'calculation'
  | 'digit-span'
  | 'word-recall-delayed'
  | 'object-memory'
  | 'verbal-fluency';

export interface Answer {
  questionId: number;
  type: QuestionType;
  value: any;
  score: number;
}

export interface QuestionData {
  id: number;
  type: QuestionType;
  question: string;
  instruction?: string;
  maxScore: number;
  component: string;
}

export interface HdsrResult {
  answers: Answer[];
  totalScore: number;
  maxScore: number;
  interpretation: string;
  timestamp: Date;
}

// 単語記憶用の系列
export type WordSeries = 1 | 2;

export interface WordSeriesData {
  series: WordSeries;
  words: {
    a: string;
    b: string;
    c: string;
  };
  hints: {
    a: string;
    b: string;
    c: string;
  };
}
