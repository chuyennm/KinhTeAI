import { Link, useParams } from 'react-router-dom';
import { Card, PageHeader } from '../components/ui';
import { findModule } from '../data/curriculum';
import { useI18n } from '../i18n';
import { SIMULATORS } from '../simulators';

export function ToolsPage() {
  const { tx, tr } = useI18n();
  return (
    <div>
      <PageHeader
        kicker={tx('Công cụ tương tác', 'Interactive tools')}
        title={tx('Phòng mô phỏng', 'Simulators')}
        sub={tx('Mỗi công cụ gắn với một module. Hãy luôn dự đoán kết quả TRƯỚC khi kéo thanh trượt.', 'Each tool belongs to a module. Always predict the result BEFORE you move a slider.')}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(SIMULATORS).map(([id, s]) => (
          <Link key={id} to={`/tools/${id}`}>
            <Card className="h-full p-5 transition hover:border-gold/60">
              <div className="num mb-1 text-xs font-semibold uppercase tracking-widest text-gold">Module {findModule(s.module)?.index}</div>
              <h2 className="font-serif text-lg font-semibold">{tr(s.title)}</h2>
              <p className="mt-1 text-sm text-muted">{tr(s.desc)}</p>
            </Card>
          </Link>
        ))}
        <Link to="/lab">
          <Card className="h-full p-5 transition hover:border-gold/60">
            <div className="num mb-1 text-xs font-semibold uppercase tracking-widest text-gold">Module 6</div>
            <h2 className="font-serif text-lg font-semibold">Python Lab</h2>
            <p className="mt-1 text-sm text-muted">
              {tx('Python thật (numpy, pandas, scipy) chạy trong trình duyệt với dữ liệu vĩ mô có sẵn.', 'Real Python (numpy, pandas, scipy) in your browser with bundled macro data.')}
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export function ToolPage() {
  const { simId = '' } = useParams();
  const { tx, tr } = useI18n();
  const s = SIMULATORS[simId as keyof typeof SIMULATORS];
  if (!s) return <p>{tx('Không tìm thấy công cụ.', 'Tool not found.')}</p>;
  const m = findModule(s.module);
  return (
    <div>
      <PageHeader
        kicker={
          <Link to="/tools" className="hover:underline">
            ← {tx('Mô phỏng', 'Simulators')}
          </Link>
        }
        title={tr(s.title)}
        sub={tr(s.desc)}
        right={
          m && (
            <Link to={`/learn/${m.id}`} className="text-sm text-gold underline">
              Module {m.index}: {tr(m.title)}
            </Link>
          )
        }
      />
      <s.Component />
    </div>
  );
}
