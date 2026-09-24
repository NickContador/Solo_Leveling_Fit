import React from 'react';
import type { Mission } from '../gamification/types';

interface Props {
  mission: Mission;
}

export const MissionCard = ({ mission }: Props) => {
  const progressPercent = Math.min((mission.progress / mission.target) * 100, 100);

  return (
    <div className={`mission-card ${mission.completed ? 'completed' : ''}`}>
      <div className="mission-header">
        <span className="mission-type">{mission.type === 'daily' ? '☀️' : '📅'}</span>
        <h4>{mission.title}</h4>
        <span className="mission-reward">+{mission.rewardXP} XP</span>
      </div>
      <p className="mission-desc">{mission.description}</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <span className="progress-text">{mission.progress} / {mission.target}</span>
      {mission.completed && <span className="completed-badge">✅ Concluída!</span>}
    </div>
  );
};
