import { QuestionData, WordSeriesData } from '@/types/hds-r';

export const WORD_SERIES: WordSeriesData[] = [
  {
    series: 1,
    words: { a: '桜', b: '猫', c: '電車' },
    hints: { a: '植物', b: '動物', c: '乗り物' },
  },
  {
    series: 2,
    words: { a: '梅', b: '犬', c: '自動車' },
    hints: { a: '植物', b: '動物', c: '乗り物' },
  },
];

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    type: 'age',
    question: 'お歳はいくつですか？',
    instruction: '（2年までの誤差は正解）',
    maxScore: 1,
    component: 'AgeQuestion',
  },
  {
    id: 2,
    type: 'date',
    question: '今日は何年何月何日ですか？ 何曜日ですか？',
    instruction: '（年月日、曜日が正解でそれぞれ1点ずつ）',
    maxScore: 4,
    component: 'DateQuestion',
  },
  {
    id: 3,
    type: 'place',
    question: '私たちがいまいるところはどこですか？',
    instruction: '（自発的にでれば2点、5秒おいて「家ですか？病院ですか？施設ですか？」のなかから正しい選択をすれば1点）',
    maxScore: 2,
    component: 'PlaceQuestion',
  },
  {
    id: 4,
    type: 'word-recall-immediate',
    question: 'これから言う3つの言葉を言ってみてください。あとでまた聞きますのでよく覚えておいてください。',
    instruction: '（以下の系列のいずれか1つで、採用した系列に○印をつけておく）',
    maxScore: 3,
    component: 'WordRecallImmediateQuestion',
  },
  {
    id: 5,
    type: 'calculation',
    question: '100から7を順番に引いてください。',
    instruction: '（100-7は？、それからまた7を引くと？と質問する。最初の答えが不正解の場合、打ち切る）',
    maxScore: 2,
    component: 'CalculationQuestion',
  },
  {
    id: 6,
    type: 'digit-span',
    question: '私がこれから言う数字を逆から言ってください。',
    instruction: '（6-8-2、3-5-2-9を逆に言ってもらう、3桁逆唱に失敗したら、打ち切る）',
    maxScore: 2,
    component: 'DigitSpanQuestion',
  },
  {
    id: 7,
    type: 'word-recall-delayed',
    question: '先ほど覚えてもらった言葉をもう一度言ってみてください。',
    instruction: '（自発的に回答があれば各2点、もし回答がない場合以下のヒントを与え正解であれば1点）',
    maxScore: 6,
    component: 'WordRecallDelayedQuestion',
  },
  {
    id: 8,
    type: 'object-memory',
    question: 'これから5つの品物を見せます。それを隠しますのでなにがあったか言ってください。',
    instruction: '（時計、鍵、タバコ、ペン、硬貨など必ず相互に無関係なもの）',
    maxScore: 5,
    component: 'ObjectMemoryQuestion',
  },
  {
    id: 9,
    type: 'verbal-fluency',
    question: '知っている野菜の名前をできるだけ多く言ってください。',
    instruction: '（答えた野菜の名前を記入する。途中で詰まり、約10秒間待っても出ない場合にはそこで打ち切る）\n0～5=0点、6=1点、7=2点、8=3点、9=4点、10=5点',
    maxScore: 5,
    component: 'VerbalFluencyQuestion',
  },
];

export const MAX_TOTAL_SCORE = 30;
export const DEMENTIA_THRESHOLD = 20;
