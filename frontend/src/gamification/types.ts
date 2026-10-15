export interface HunterStats {
  level: number;
  xp: number;
  totalXP: number;
  strength: number;
  endurance: number;
  speed: number;
  discipline: number;
  vitality: number;
  totalWorkouts: number;
}

export type Rank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface RankInfo {
  rank: Rank;
  title: string;
  minLevel: number;
  color: string;
  gradient: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  progress: number;
  rewardXP: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  condition: (stats: HunterStats) => boolean;
}
