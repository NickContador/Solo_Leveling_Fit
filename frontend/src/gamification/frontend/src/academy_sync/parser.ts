import type { AcademyExercise, ParseFormat } from './types';

export const parseFicha = (content: string, format: ParseFormat = 'text'): AcademyExercise[] => {
  switch (format) {
    case 'text': return parseText(content);
    case 'csv': return parseCSV(content);
    case 'json': return parseJSON(content);
    default: return parseText(content);
  }
};

const parseText = (text: string): AcademyExercise[] => {
  const exercises: AcademyExercise[] = [];
  const lines = text.split('\n').filter(l => l.trim());
  
  for (const line of lines) {
    const match = /^(.+?)\s+(\d+)\s*[x×]\s*(\d+)(?:\s+([\d.,]+)\s*(?:kg)?)?$/i.exec(line.trim());
    if (match) {
      exercises.push({
        id: `txt_${match[1].trim().toLowerCase().replace(/\s+/g, '_')}`,
        name: match[1].trim(),
        sets: parseInt(match[2]),
        reps: parseInt(match[3]),
        weight: match[4] ? parseFloat(match[4].replace(',', '.')) : null,
        sourceId: match[1].trim().toLowerCase(),
      });
    }
  }
  return exercises;
};

const parseCSV = (csv: string): AcademyExercise[] => {
  const exercises: AcademyExercise[] = [];
  const rows = csv.split('\n').map(r => r.split(';'));
  if (rows.length < 2) return [];
  
  const headers = rows[0].map(h => h.trim().toLowerCase());
  const idxName = headers.findIndex(h => h.includes('nome') || h.includes('exercicio'));
  const idxSets = headers.findIndex(h => h.includes('serie'));
  const idxReps = headers.findIndex(h => h.includes('repeticao') || h.includes('rep '));
  const idxWeight = headers.findIndex(h => h.includes('carga') || h.includes('peso'));
  
  if (idxName < 0) return [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[idxName]?.trim()) continue;
    exercises.push({
      id: `csv_${row[idxName].trim().toLowerCase().replace(/\s+/g, '_')}`,
      name: row[idxName].trim(),
      sets: idxSets >= 0 ? parseInt(row[idxSets]) || null : null,
      reps: idxReps >= 0 ? parseInt(row[idxReps]) || null : null,
      weight: idxWeight >= 0 ? parseFloat(row[idxWeight].replace(',', '.')) || null : null,
      sourceId: row[idxName].trim().toLowerCase(),
    });
  }
  return exercises;
};

const parseJSON = (jsonStr: string): AcademyExercise[] => {
  try {
    const data = JSON.parse(jsonStr);
    const exercises: AcademyExercise[] = [];
    let list: any[] = [];
    
    if (Array.isArray(data)) list = data;
    else if (data.exercicios) list = data.exercicios;
    else if (data.treinos) {
      Object.values(data.treinos).forEach((t: any) => {
        if (t.exercicios) list.push(...t.exercicios);
      });
    }
    
    for (const item of list) {
      const name = item.nome || item.exercicio || item.name;
      if (!name) continue;
      exercises.push({
        id: `json_${name.toLowerCase().replace(/\s+/g, '_')}`,
        name,
        sets: item.series ?? item.sets ?? null,
        reps: item.repeticoes ?? item.reps ?? null,
        weight: item.carga ?? item.peso ?? item.weight ?? null,
        sourceId: name.toLowerCase(),
      });
    }
    return exercises;
  } catch {
    return [];
  }
};

export const mergeFicha = (
  existing: SyncedExercise[],
  newFicha: AcademyExercise[]
): SyncedExercise[] => {
  const result: SyncedExercise[] = [];
  const existingMap = new Map(existing.map(e => [e.sourceId || e.id, e]));
  const newIds = new Set<string>();
  
  for (const ex of newFicha) {
    newIds.add(ex.sourceId || ex.id);
    const existing = existingMap.get(ex.sourceId || ex.id);
    
    if (existing && !existing.isUserOwned) {
      result.push({
        ...existing,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
        muscleGroup: ex.muscleGroup || existing.muscleGroup,
        lastSynced: new Date().toISOString(),
        userWeight: existing.userWeight, // ✅ Preserva carga do usuário
      });
    } else if (!existing) {
      result.push({
        ...ex,
        userWeight: ex.weight,
        lastSynced: new Date().toISOString(),
        isUserOwned: false,
      });
    }
  }
  
  // Mantém exercícios próprios do usuário
  for (const ex of existing) {
    if (ex.isUserOwned || !newIds.has(ex.sourceId || ex.id)) {
      if (!newIds.has(ex.sourceId || ex.id) && !ex.isUserOwned) continue;
      if (ex.isUserOwned) result.push(ex);
    }
  }
  
  return result;
};
