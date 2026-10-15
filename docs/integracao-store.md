// Importar o store de gamificação
import { useGamificationStore } from '../gamification/store';

// No finalizar um treino, chamar:
const completeWorkoutSession = () => {
  // ... lógica existente do gymMe
  useGamificationStore.getState().completeWorkout();
};
