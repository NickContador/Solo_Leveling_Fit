import { create } from 'zustand';
import type { HunterStats, Mission, Achievement } from './types';
import { getRankForLevel, xpForNextLevel, calculateXP } from './constants';

interface GamificationState {
  stats: HunterStats;
  missions: Mission[];
  achievements: Achievement[];
  lastMissionReset: string | null;
  addXP: (amount: number, attribute?: keyof HunterStats) => void;
  completeWorkout: () => void;
  checkAchievements: () => void;
  resetDailyMissions: () => void;
  resetWeeklyMissions: () => void;
}

const initialStats: HunterStats = {
  level: 1,
  xp: 0,
  totalXP: 0,
  strength: 10,
  endurance: 10,
  speed: 10,
  discipline: 10,
  vitality: 10,
  totalWorkouts: 0,
};

const initialDailyMissions: Mission[] = [
  { id: 'workout_1', title: 'Treine Hoje', description: 'Conclua 1 treino', type: 'daily', target: 1, progress: 0, rewardXP: 50, completed: false },
  { id: 'sets_5', title: 'Consistência', description: 'Conclua 5 séries', type: 'daily', target: 5, progress: 0, rewardXP: 30, completed: false },
  { id: 'sync', title: 'Sincronizar Ficha', description: 'Atualize sua ficha da academia', type: 'daily', target: 1, progress: 0, rewardXP: 20, completed: false },
];

const initialWeeklyMissions: Mission[] = [
  { id: 'week_5', title: 'Semana Produtiva', description: 'Treine 5 vezes na semana', type: 'weekly', target: 5, progress: 0, rewardXP: 200, completed: false },
  { id: 'pr_1', title: 'Quebre Recordes', description: 'Alcance 1 recorde pessoal', type: 'weekly', target: 1, progress: 0, rewardXP: 150, completed: false },
];

const initialAchievements: Achievement[] = [
  { id: 'first', title: 'Primeiro Passo', description: 'Conclua seu primeiro treino', icon: '🏅', unlocked: false, condition: s => s.totalWorkouts >= 1 },
  { id: 'ten', title: 'Firmeza', description: 'Conclua 10 treinos', icon: '💪', unlocked: false, condition: s => s.totalWorkouts >= 10 },
  { id: 'level10', title: 'Despertar', description: 'Alcance o Nível 10', icon: '⚡', unlocked: false, condition: s => s.level >= 10 },
  { id: 'level30', title: 'Caminho do Herói', description: 'Alcance o Nível 30', icon: '🔥', unlocked: false, condition: s => s.level >= 30 },
  { id: 'level50', title: 'Mestre', description: 'Alcance o Nível 50', icon: '👑', unlocked: false, condition: s => s.level >= 50 },
  { id: 'level80', title: 'Lenda', description: 'Alcance o Rank S', icon: '🌟', unlocked: false, condition: s => s.level >= 80 },
];

export const useGamificationStore = create<GamificationState>((set, get) => ({
  stats: initialStats,
  missions: [...initialDailyMissions, ...initialWeeklyMissions],
  achievements: initialAchievements,
  lastMissionReset: null,

  addXP: (amount, attribute) => set(state => {
    let newXP = state.stats.xp + amount;
    let newLevel = state.stats.level;
    let carryOver = 0;

    while (newXP >= xpForNextLevel(newLevel)) {
      carryOver = newXP - xpForNextLevel(newLevel);
      newLevel++;
      newXP = carryOver;
    }

    const attrUpdate = attribute ? { [attribute]: state.stats[attribute] + 1 } : {};

    return {
      stats: {
        ...state.stats,
        xp: newLevel !== state.stats.level ? carryOver : newXP,
        level: newLevel,
        totalXP: state.stats.totalXP + amount,
        ...attrUpdate,
      },
    };
  }),

  completeWorkout: () => {
    const { addXP, checkAchievements } = get();
    set(state => ({
      stats: { ...state.stats, totalWorkouts: state.stats.totalWorkouts + 1 },
      missions: state.missions.map(m => {
        if (m.completed) return m;
        const newProgress = Math.min(m.progress + 1, m.target);
        const completed = newProgress >= m.target;
        if (completed && !m.completed) addXP(m.rewardXP);
        return { ...m, progress: newProgress, completed };
      }),
    }));
    addXP(calculateXP.workout, 'discipline');
    checkAchievements();
  },

  checkAchievements: () => set(state => ({
    achievements: state.achievements.map(a => ({
      ...a,
      unlocked: a.unlocked || a.condition(state.stats),
      unlockedAt: a.unlocked || a.condition(state.stats) ? new Date().toISOString() : a.unlockedAt,
    })),
  })),

  resetDailyMissions: () => set(state => ({
    missions: [
      ...initialDailyMissions.map(m => ({ ...m, progress: 0, completed: false })),
      ...state.missions.filter(m => m.type === 'weekly'),
    ],
    lastMissionReset: new Date().toISOString(),
  })),

  resetWeeklyMissions: () => set(state => ({
    missions: [
      ...state.missions.filter(m => m.type === 'daily'),
      ...initialWeeklyMissions.map(m => ({ ...m, progress: 0, completed: false })),
    ],
  })),
}));
