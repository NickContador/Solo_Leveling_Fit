import React from 'react';
import { useGamificationStore } from '../gamification/store';
import { getRankForLevel, xpForNextLevel } from '../gamification/constants';

export const HunterPanel = () => {
  const { stats } = useGamificationStore();
  const rankInfo = getRankForLevel(stats.level);
  const xpPercent = (stats.xp / xpForNextLevel(stats.level)) * 100;

  return (
    <div className="hunter-panel">
      <div className="rank-header" style={{ borderColor: rankInfo.color, background: `linear-gradient(135deg, ${rankInfo.gradient[0]}33, ${rankInfo.gradient[1]}11)` }}>
        <span className="rank-badge" style={{ color: rankInfo.color }}>Rank {rankInfo.rank}</span>
        <h2>{rankInfo.title}</h2>
        <h1 className="level-display">Nível {stats.level}</h1>
      </div>
      
      <div className="xp-bar-container">
        <div className="xp-label">
          <span>XP</span>
          <span>{stats.xp} / {xpForNextLevel(stats.level)}</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpPercent}%`, backgroundColor: rankInfo.color }} />
        </div>
      </div>
      
      <div className="attributes-grid">
        {[
          { key: 'strength', label: 'Força', icon: '💪', color: '#EF4444' },
          { key: 'endurance', label: 'Resistência', icon: '❤️', color: '#3B82F6' },
          { key: 'speed', label: 'Velocidade', icon: '⚡', color: '#EAB308' },
          { key: 'discipline', label: 'Disciplina', icon: '🎯', color: '#A855F7' },
          { key: 'vitality', label: 'Vitalidade', icon: '✨', color: '#22C55E' },
        ].map(attr => (
          <div key={attr.key} className="attribute-card">
            <span className="attr-icon">{attr.icon}</span>
            <span className="attr-label">{attr.label}</span>
            <span className="attr-value" style={{ color: attr.color }}>
              {stats[attr.key as keyof typeof stats]}
            </span>
          </div>
        ))}
      </div>
      
      <div className="stats-footer">
        <div>🏋️ {stats.totalWorkouts} treinos concluídos</div>
        <div>📊 {stats.totalXP} XP total acumulado</div>
      </div>
    </div>
  );
};
