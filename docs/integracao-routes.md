import { HunterPanel } from './components/HunterPanel';
import { MissionsPage } from './pages/MissionsPage';
import { AcademySyncPage } from './pages/AcademySyncPage';
import { AchievementsPage } from './pages/AchievementsPage';

// Dentro do Router:
<Route path="/hunter" element={<HunterPanel />} />
<Route path="/missions" element={<MissionsPage />} />
<Route path="/sync-academy" element={<AcademySyncPage />} />
<Route path="/achievements" element={<AchievementsPage />} />
