import type { RankInfo } from './types';

export const RANKS: RankInfo[] = [
  { rank: 'F', title: 'Iniciante', minLevel: 1, color: '#9E9E9E', gradient: ['#757575', '#9E9E9E'] },
  { rank: 'E', title: 'Atleta', minLevel: 5, color: '#4CAF50', gradient: ['#388E3C', '#4CAF50'] },
  { rank: 'D', title: 'Guerreiro', minLevel: 10, color: '#2196F3', gradient: ['#1976D2', '#2196F3'] },
  { rank: 'C', title: 'Campeão', minLevel: 20, color: '#9C27B0', gradient: ['#7B1FA2', '#9C27B0'] },
  { rank: 'B', title: 'Herói', minLevel: 30, color: '#FF9800', gradient: ['#FB8C00', '#FF9800'] },
  { rank: 'A', title: 'Mestre', minLevel: 50, color: '#FF5722', gradient: ['#E64A19', '#FF5722'] },
  { rank: 'S', title: 'Lenda', minLevel: 80, color: '#FFD700', gradient: ['#F5DE19', '#FFD700'] },
];

export const getRankForLevel = (level: number): RankInfo => {
  return [...RANKS].reverse().find(r => level >= r.minLevel) || RANKS[0];
};

export const xpForNextLevel = (level: number) => level * 100;

export const calculateXP = {
  workout: 50,
  setCompleted: 5,
  personalRecord: 100,
  streakDay: 20,
  fullWeek: 200,
};
