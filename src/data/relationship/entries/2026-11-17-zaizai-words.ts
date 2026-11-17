import type { RelationshipEntry } from '../types'

const entry: RelationshipEntry = {
  slug: '2026-11-17-zaizai-words',
  collection: 'sweet',
  // 照片來源：Khadeeja Yasser on Unsplash
  cover: { image: 'images/journal/zaizai-words-heart-sand.jpg', alt: '沙灘上畫的一顆愛心，遠方是海浪' },
  eyebrow: 'WORDS FROM ZAIZAI',
  title: '仔仔說過的很棒的話',
  subtitle: '不完美，是讓另一個人參與你生命的機會',
  lede: '不是只有完美的人才值得被愛。',
  date: '2026-11-17',
  categories: ['仔仔語錄', '愛與接納', '共同成長'],
  summary:
    '收藏仔仔曾經對許寶說過的一段話：不完美的地方，恰好給了對方愛你的機會。我們在彼此不完美的時候，學習理解、陪伴與接納。',
  closing: '',
  sections: [
    {
      id: 'words',
      title: '仔仔曾經告訴我',
      nav: '仔仔說的話',
      layout: 'prose',
      intro: [
        {
          t: 'quote',
          text: '不是只有完美的人才值得被愛，恰恰相反，不完美的地方，恰好給了對方愛你的機會。',
        },
        { t: 'pull', text: '不完美，是讓另一個人參與你生命的機會。' },
      ],
    },
    {
      id: 'meaning',
      title: '這句話對我們的意義',
      nav: '對我們的意義',
      layout: 'soft',
      intro: [
        {
          t: 'p',
          text: '當我容易生氣、缺乏安全感，或是需要比較長的時間消化情緒時，仔仔可以有機會理解我的情緒、陪伴我的脆弱，讓我感受到安全感。',
        },
        { t: 'p', text: '而我也學習在她不完美的時候，給她同樣的理解與接納。' },
      ],
    },
  ],
}

export default entry
