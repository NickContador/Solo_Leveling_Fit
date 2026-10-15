export interface AcademyExercise {
  id: string;
  name: string;
  muscleGroup?: string;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  notes?: string;
  sourceId?: string;
}

export interface SyncedExercise extends AcademyExercise {
  userWeight: number | null;
  lastSynced: string;
  isUserOwned: boolean;
}

export interface SyncConfig {
  url?: string;
  lastSync?: string;
  rawText?: string;
  autoSync: boolean;
}

export type ParseFormat = 'text' | 'csv' | 'json' | 'befit';
