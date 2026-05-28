export interface ChartDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface TrendDataPoint {
  name: string;
  Overall: number;
  Technical: number;
  Communication: number;
  Confidence: number;
}

export interface SpeechDataPoint {
  name: string;
  Um: number;
  Like: number;
  Basically: number;
  So: number;
}

export const SCORE_DISTRIBUTION: ChartDataPoint[] = [
  { subject: 'Confidence', A: 88, fullMark: 100 },
  { subject: 'Fluency', A: 82, fullMark: 100 },
  { subject: 'Eye Contact', A: 78, fullMark: 100 },
  { subject: 'Body Language', A: 85, fullMark: 100 },
  { subject: 'Tech Accuracy', A: 83, fullMark: 100 },
  { subject: 'Problem Solving', A: 80, fullMark: 100 },
];

export const PERFORMANCE_TRENDS: TrendDataPoint[] = [
  { name: 'Int. 1', Overall: 70, Technical: 68, Communication: 72, Confidence: 65 },
  { name: 'Int. 2', Overall: 73, Technical: 72, Communication: 75, Confidence: 70 },
  { name: 'Int. 3', Overall: 76, Technical: 75, Communication: 78, Confidence: 73 },
  { name: 'Int. 4', Overall: 81, Technical: 80, Communication: 82, Confidence: 82 },
  { name: 'Int. 5', Overall: 84, Technical: 83, Communication: 81, Confidence: 88 },
];

export const FILLER_WORDS_HISTORY: SpeechDataPoint[] = [
  { name: 'Int. 1', Um: 8, Like: 12, Basically: 5, So: 9 },
  { name: 'Int. 2', Um: 6, Like: 9, Basically: 4, So: 7 },
  { name: 'Int. 3', Um: 4, Like: 7, Basically: 2, So: 8 },
  { name: 'Int. 4', Um: 3, Like: 5, Basically: 1, So: 6 },
  { name: 'Int. 5', Um: 2, Like: 4, Basically: 0, So: 4 },
];

export const EYE_CONTACT_TRENDS = [
  { name: 'Int. 1', ratio: 65 },
  { name: 'Int. 2', ratio: 70 },
  { name: 'Int. 3', ratio: 78 },
  { name: 'Int. 4', ratio: 82 },
  { name: 'Int. 5', ratio: 92 },
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't_1',
    name: 'Sarah Chen',
    role: 'SWE Intern at Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    quote: 'MockMate X AI was a game changer for my placement prep. The real-time facial analytics helped me control my nervousness, and the adaptive questions felt exactly like my actual Google rounds.',
  },
  {
    id: 't_2',
    name: 'Marcus Brody',
    role: 'Cloud Architect at Amazon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    quote: 'The speech processing is incredibly accurate. It highlighted that I was saying "basically" 18 times during a typical mock coding session! Correcting that boosted my communication feedback.',
  },
  {
    id: 't_3',
    name: 'Priya Nair',
    role: 'Frontend Engineer at Meta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    quote: 'I loved the company-specific simulations. The AI interviewer adapted its follow-ups based on the depth of my React answers. I felt 100% prepared going into my technical review.',
  },
];

export const MOCK_COMPANIES = [
  { name: 'Google', logo: 'G', color: 'text-red-500', popularRole: 'Software Engineer' },
  { name: 'Amazon', logo: 'A', color: 'text-yellow-500', popularRole: 'Frontend Engineer' },
  { name: 'General', logo: 'M', color: 'text-blue-500', popularRole: 'General Prep' },
];

export const MOCK_ACHIEVEMENTS = [
  { id: 'ach_1', title: 'Confidence King', desc: 'Maintained 85%+ confidence score in an interview', icon: '👑', unlocked: true },
  { id: 'ach_2', title: 'Eloquent Speaker', desc: 'Used fewer than 3 filler words in a technical round', icon: '🗣️', unlocked: true },
  { id: 'ach_3', title: 'Google Cracker', desc: 'Successfully simulated a Google SWE interview session', icon: '🔍', unlocked: true },
  { id: 'ach_4', title: 'Eye Contact Master', desc: 'Achieved 90%+ eye-contact ratio', icon: '👁️', unlocked: false },
  { id: 'ach_5', title: 'Perfect Score', desc: 'Achieved an overall interview rating of 95%+', icon: '🎯', unlocked: false },
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: 'rec_1',
    title: 'Work on Speech Pacing',
    description: 'You averaged 155 words per minute. Aim for a comfortable 130-145 words per minute to sound more composed.',
    type: 'speech',
    priority: 'high',
  },
  {
    id: 'rec_2',
    title: 'Review System Design Tries',
    description: 'Based on your autocomplete layout feedback, brush up on Trie node structures and index caching strategies.',
    type: 'technical',
    priority: 'medium',
  },
  {
    id: 'rec_3',
    title: 'Practice Eye Contact Stabiliy',
    description: 'Ensure your laptop is elevated so the camera is at eye level, making it easier to sustain direct contact indicators.',
    type: 'behavioral',
    priority: 'low',
  },
];
