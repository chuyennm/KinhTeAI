import { lazy, Suspense, type ComponentType } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TutorProvider } from './components/TutorContext';
import { I18nProvider } from './i18n';
import { HomePage } from './pages/Home';

// Each page is its own chunk; the service worker precaches all of them for offline use.
// After a new deploy an open tab may still reference chunk names that no longer exist:
// reload once to pick up the new build instead of hanging on the loading state.
const RELOAD_FLAG = 'kinhteai.chunkReload';
const page = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() =>
    load()
      .then((m) => {
        sessionStorage.removeItem(RELOAD_FLAG);
        return { default: m[name] };
      })
      .catch((err) => {
        if (!sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, '1');
          location.reload();
          return new Promise<never>(() => undefined);
        }
        throw err;
      }),
  );

const CurriculumPage = page(() => import('./pages/Curriculum'), 'CurriculumPage');
const ModulePage = page(() => import('./pages/Curriculum'), 'ModulePage');
const LessonPage = page(() => import('./pages/Lesson'), 'LessonPage');
const CasesPage = page(() => import('./pages/Cases'), 'CasesPage');
const CaseDetailPage = page(() => import('./pages/Cases'), 'CaseDetailPage');
const ToolsPage = page(() => import('./pages/Tools'), 'ToolsPage');
const ToolPage = page(() => import('./pages/Tools'), 'ToolPage');
const LabPage = page(() => import('./pages/Lab'), 'LabPage');
const ReviewPage = page(() => import('./pages/Review'), 'ReviewPage');
const JournalPage = page(() => import('./pages/Journal'), 'JournalPage');
const GlossaryPage = page(() => import('./pages/Glossary'), 'GlossaryPage');
const GuidePage = page(() => import('./pages/Guide'), 'GuidePage');
const SettingsPage = page(() => import('./pages/Settings'), 'SettingsPage');

// HashRouter: GitHub Pages has no server-side rewrites, so deep links live after "#".
export function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <TutorProvider>
          <Layout>
            <Suspense fallback={<div className="animate-pulse text-sm text-muted">…</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<CurriculumPage />} />
                <Route path="/learn/:moduleId" element={<ModulePage />} />
                <Route path="/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/cases/:caseId" element={<CaseDetailPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:simId" element={<ToolPage />} />
                <Route path="/lab" element={<LabPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </TutorProvider>
      </HashRouter>
    </I18nProvider>
  );
}
