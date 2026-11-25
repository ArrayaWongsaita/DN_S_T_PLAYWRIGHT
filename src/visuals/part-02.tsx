// Drawings for Part 2: the install flow, the project tree, the config map, the server the tests need
// and the first test's path through baseURL to the app. Labels only: sentences stay in the slide's text.
import type { ReactNode } from 'react';
import { roleColour, SketchArrow, SketchLine, SketchRect } from '../components';

const INK = '#2b2b2b';
const MUTED = '#646464';
const EDGE = '#b5b5b5';

function Frame({ label, children, mono = false }: { label: string; children: ReactNode; mono?: boolean }) {
  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label={label}
      fontFamily={mono ? 'var(--rs-mono)' : 'var(--rs-font)'}
    >
      {children}
    </svg>
  );
}

function Label({
  x,
  y,
  size = 16,
  fill = INK,
  anchor = 'middle',
  weight,
  halo = false,
  mono = false,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  halo?: boolean;
  mono?: boolean;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      fontFamily={mono ? 'var(--rs-mono)' : 'var(--rs-font)'}
      {...(halo ? { stroke: 'var(--rs-paper)', strokeWidth: 4, paintOrder: 'stroke' as const } : {})}
    >
      {children}
    </text>
  );
}

/**
 * One command from a Next.js project to three results: the config and example file, the package and
 * the browser. `highlight="all"` puts the three results under the spotlight, a number marks one of
 * them; the divider shows the flow plain.
 */
export function InstallFlow({ highlight }: { highlight?: 'all' | 1 | 2 | 3 }) {
  const accent = roleColour('accent');
  const neutral = roleColour('neutral');
  const outcomes = ['ไฟล์ใหม่', 'แพ็กเกจ', 'browser'];
  return (
    <Frame label="โปรเจกต์ Next.js รัน pnpm create playwright แล้วได้ไฟล์ใหม่ แพ็กเกจ และ browser">
      <SketchRect seedKey="p2/install/project" x={14} y={70} w={110} h={64} rounded stroke={neutral} strokeWidth={1.8} />
      <Label x={69} y={89}>โปรเจกต์</Label>
      <Label x={69} y={115}>Next.js</Label>
      <SketchArrow seedKey="p2/install/arrow" x1={126} y1={102} x2={138} y2={102} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/install/command" x={140} y={70} w={168} h={64} rounded stroke={accent} strokeWidth={2.4} />
      <Label x={224} y={89} mono weight={600}>pnpm create</Label>
      <Label x={224} y={115} mono weight={600}>playwright</Label>

      <SketchLine seedKey="p2/install/drop" x1={224} y1={134} x2={224} y2={170} stroke={INK} strokeWidth={1.8} />
      <SketchLine seedKey="p2/install/rail" x1={74} y1={170} x2={374} y2={170} stroke={INK} strokeWidth={1.8} />
      {outcomes.map((label, index) => {
        const x = 14 + index * 150;
        const lit = highlight === 'all' || highlight === index + 1;
        return (
          <g key={label}>
            <SketchArrow seedKey={`p2/install/branch/${index}`} x1={x + 60} y1={170} x2={x + 60} y2={198} stroke={INK} strokeWidth={1.8} />
            <SketchRect
              seedKey={`p2/install/out/${index}`}
              x={x}
              y={202}
              w={120}
              h={76}
              rounded
              stroke={lit ? accent : INK}
              strokeWidth={lit ? 2.4 : 1.8}
            />
            <Label x={x + 60} y={240} weight={lit ? 600 : undefined}>{label}</Label>
          </g>
        );
      })}
    </Frame>
  );
}

const INSTALL_ROWS: { text: string; y: number; weight?: number }[] = [
  { text: 'fresh/', y: 24, weight: 600 },
  { text: '├─ src/', y: 54 },
  { text: '│  └─ app/', y: 82 },
  { text: '│     └─ page.tsx', y: 110 },
  { text: '├─ tests/', y: 138 },
  { text: '│  └─ example.spec.ts', y: 166 },
  { text: '├─ playwright.config.ts', y: 194 },
  { text: '├─ package.json', y: 222 },
  { text: '└─ .gitignore', y: 250 },
];

const VITEST_ROWS: { text: string; y: number; weight?: number }[] = [
  { text: 'fresh/', y: 24, weight: 600 },
  { text: '├─ src/', y: 54 },
  { text: '│  └─ app/', y: 82 },
  { text: '│     └─ page.tsx', y: 110 },
  { text: '├─ e2e/', y: 138 },
  { text: '│  └─ home.spec.ts', y: 166 },
  { text: '├─ vitest.config.ts', y: 194 },
  { text: '└─ package.json', y: 222 },
];

/**
 * The project as a tree. `install` boxes what the installer added, `error` points at the generated
 * example that opens playwright.dev, and `vitest` boxes the e2e folder Vitest must leave alone.
 */
export function ProjectTree({ variant }: { variant: 'install' | 'error' | 'vitest' }) {
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  const rows = variant === 'vitest' ? VITEST_ROWS : INSTALL_ROWS;
  return (
    <Frame
      mono
      label={
        variant === 'install'
          ? 'ต้นไม้ไฟล์โปรเจกต์หลังติดตั้ง Playwright พร้อมไฟล์และโฟลเดอร์ที่เพิ่มมา'
          : variant === 'error'
            ? 'example.spec.ts ที่ installer สร้างให้เปิด playwright.dev'
            : 'โฟลเดอร์ e2e แยกจาก vitest.config.ts'
      }
    >
      {rows.map((row) => (
        <Label
          key={row.text}
          x={20}
          y={row.y}
          anchor="start"
          mono
          weight={row.weight}
        >
          {row.text}
        </Label>
      ))}

      {variant === 'install' ? (
        <g>
          <SketchRect seedKey="p2/tree/new" x={8} y={126} w={440} h={138} rounded dashed stroke={accent} strokeWidth={1.8} />
          <Label x={436} y={140} anchor="end" fill={accent}>install เพิ่ม</Label>
        </g>
      ) : null}

      {variant === 'error' ? (
        <g>
          <SketchRect seedKey="p2/tree/error" x={8} y={152} w={440} h={28} rounded dashed stroke={warning} strokeWidth={2} />
          <Label x={436} y={166} anchor="end" fill={warning}>playwright.dev</Label>
        </g>
      ) : null}

      {variant === 'vitest' ? (
        <g>
          <SketchRect seedKey="p2/tree/e2e" x={8} y={126} w={440} h={54} rounded dashed stroke={accent} strokeWidth={2} />
          <Label x={436} y={140} anchor="end" fill={accent} mono>exclude</Label>
        </g>
      ) : null}
    </Frame>
  );
}

const ZONES = [
  { key: 'testDir', short: 'โฟลเดอร์', question: 'เทสอยู่ที่ไหน' },
  { key: 'use', short: 'ค่ากลาง', question: 'ค่ากลางของทุกเทส' },
  { key: 'projects', short: 'เบราว์เซอร์', question: 'เบราว์เซอร์ตัวไหน' },
  { key: 'webServer', short: 'เซิร์ฟเวอร์', question: 'เปิดแอปอย่างไร' },
  { key: 'reporter', short: 'รายงาน', question: 'รายงานและ retry' },
];

/**
 * The config file as five zones. `zones` names each zone on the divider, `questions` says what each
 * zone answers. `highlight` marks the one zone a parts slide is about.
 */
export function ConfigMap({ mode = 'zones', highlight }: { mode?: 'zones' | 'questions'; highlight?: number }) {
  const accent = roleColour('accent');
  return (
    <Frame label="playwright.config.ts แบ่งเป็นห้าโซน testDir use projects webServer และ reporter">
      <SketchRect seedKey="p2/config/file" x={12} y={12} w={436} h={306} rounded stroke={INK} strokeWidth={2} />
      <Label x={28} y={34} anchor="start" size={18} weight={600} mono>playwright.config.ts</Label>
      <SketchLine seedKey="p2/config/rule" x1={22} y1={48} x2={438} y2={48} stroke={EDGE} strokeWidth={1.4} />

      {ZONES.map((zone, index) => {
        const y = 58 + index * 51;
        const lit = highlight === index;
        return (
          <g key={zone.key}>
            <SketchRect
              seedKey={`p2/config/zone/${index}`}
              x={22}
              y={y}
              w={416}
              h={46}
              rounded
              stroke={lit ? accent : EDGE}
              strokeWidth={lit ? 2.8 : 1.4}
            />
            <Label x={36} y={y + 23} anchor="start" weight={lit ? 600 : undefined} mono>{zone.key}</Label>
            <Label x={202} y={y + 23} anchor="start" fill={lit ? accent : MUTED} weight={lit ? 600 : undefined}>
              {mode === 'zones' ? zone.short : zone.question}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * The server the tests need: Playwright runs the webServer command, waits for the url and opens the
 * browser. `ports` shows the two servers apart: the learner's dev server and the test server.
 */
export function ServerPick({ mode = 'flow', highlight }: { mode?: 'flow' | 'ports'; highlight?: number }) {
  const accent = roleColour('accent');
  const primary = roleColour('primary');
  const secondary = roleColour('secondary');
  const neutral = roleColour('neutral');

  if (mode === 'ports') {
    const servers = [
      { x: 24, owner: 'คุณ', title: 'pnpm dev', url: 'localhost:3000', stroke: neutral, role: primary },
      { x: 252, owner: 'Playwright', title: 'webServer', url: 'localhost:3100', stroke: accent, role: accent },
    ];
    return (
      <Frame label="สองเซิร์ฟเวอร์แยกพอร์ต: pnpm dev ที่ 3000 และ webServer ของ Playwright ที่ 3100">
        {servers.map((server, index) => (
          <g key={server.title}>
            <Label x={server.x + 92} y={28} fill={server.role} weight={600}>{server.owner}</Label>
            <SketchRect seedKey={`p2/ports/server/${index}`} x={server.x} y={44} w={184} h={88} rounded stroke={server.stroke} strokeWidth={2.2} />
            <Label x={server.x + 92} y={75} weight={600} mono>{server.title}</Label>
            <Label x={server.x + 92} y={101} mono>{server.url}</Label>
            <SketchArrow seedKey={`p2/ports/arrow/${index}`} x1={server.x + 92} y1={136} x2={server.x + 92} y2={196} stroke={INK} strokeWidth={1.8} />
            <SketchRect seedKey={`p2/ports/app/${index}`} x={server.x} y={200} w={184} h={72} rounded stroke={neutral} strokeWidth={1.8} />
            <Label x={server.x + 92} y={223}>{index === 0 ? 'แอปที่คุณเปิด' : 'แอปที่เทส'}</Label>
            <Label x={server.x + 92} y={249} fill={MUTED}>{index === 0 ? 'สำหรับดูเอง' : 'Playwright เปิด'}</Label>
          </g>
        ))}
        <SketchLine seedKey="p2/ports/split" x1={230} y1={24} x2={230} y2={300} stroke={EDGE} strokeWidth={1.6} dashed />
        <Label x={230} y={166} fill={accent} weight={600} halo>แยกพอร์ต</Label>
      </Frame>
    );
  }

  return (
    <Frame label="Playwright สั่ง webServer ให้เปิดเซิร์ฟเวอร์ รอ url ตอบ แล้วเปิดเบราว์เซอร์">
      <SketchRect seedKey="p2/server/playwright" x={14} y={40} w={120} h={64} rounded stroke={highlight === 0 ? accent : secondary} strokeWidth={highlight === 0 ? 2.8 : 1.8} />
      <Label x={74} y={72} weight={highlight === 0 ? 600 : undefined}>Playwright</Label>
      <SketchArrow seedKey="p2/server/arrow/1" x1={136} y1={72} x2={168} y2={72} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/server/webserver" x={174} y={28} w={128} h={88} rounded stroke={accent} strokeWidth={highlight === 1 ? 2.8 : 1.8} />
      <Label x={238} y={59} weight={600}>webServer</Label>
      <Label x={238} y={85} fill={MUTED}>command</Label>
      <SketchArrow seedKey="p2/server/arrow/2" x1={304} y1={72} x2={330} y2={72} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/server/app" x={334} y={40} w={114} h={64} rounded stroke={highlight === 2 ? accent : neutral} strokeWidth={highlight === 2 ? 2.8 : 1.8} />
      <Label x={391} y={72} weight={highlight === 2 ? 600 : undefined}>เซิร์ฟเวอร์</Label>

      <SketchLine seedKey="p2/server/path/1" x1={391} y1={104} x2={391} y2={146} stroke={INK} strokeWidth={1.8} />
      <SketchLine seedKey="p2/server/path/2" x1={391} y1={146} x2={240} y2={146} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="p2/server/path/3" x1={240} y1={146} x2={240} y2={192} stroke={INK} strokeWidth={1.8} />
      <Label x={320} y={132} fill={MUTED}>รอ url ตอบ</Label>

      <SketchRect seedKey="p2/server/browser" x={176} y={196} w={128} h={64} rounded stroke={highlight === 3 ? accent : primary} strokeWidth={highlight === 3 ? 2.8 : 1.8} />
      <Label x={240} y={228} weight={highlight === 3 ? 600 : undefined}>เบราว์เซอร์</Label>
    </Frame>
  );
}

/**
 * The first test's path: the spec opens "/", baseURL completes the address, the app answers and the
 * result comes back. `highlight` marks the step the slide is about (1 is baseURL).
 */
export function TestFlow({ highlight }: { highlight?: number }) {
  const accent = roleColour('accent');
  const secondary = roleColour('secondary');
  const neutral = roleColour('neutral');
  const success = roleColour('success');
  return (
    <Frame label="home.spec.ts เปิด / ผ่าน baseURL ไปยังแอปเรา แล้วได้ผล passed">
      <SketchRect seedKey="p2/test/spec" x={12} y={56} w={128} h={84} rounded stroke={highlight === 0 ? accent : secondary} strokeWidth={highlight === 0 ? 2.8 : 1.8} />
      <Label x={76} y={85} mono>home.spec.ts</Label>
      <Label x={76} y={111} mono>goto(&quot;/&quot;)</Label>
      <SketchArrow seedKey="p2/test/arrow/1" x1={142} y1={98} x2={172} y2={98} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/test/base" x={176} y={56} w={146} h={84} rounded stroke={accent} strokeWidth={highlight === 1 ? 2.8 : 1.8} />
      <Label x={249} y={85} weight={600} mono>baseURL</Label>
      <Label x={249} y={111} mono>localhost:3100</Label>
      <SketchArrow seedKey="p2/test/arrow/2" x1={322} y1={98} x2={338} y2={98} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/test/app" x={340} y={56} w={108} h={84} rounded stroke={highlight === 2 ? accent : neutral} strokeWidth={highlight === 2 ? 2.8 : 1.8} />
      <Label x={394} y={85}>แอปเรา</Label>
      <Label x={394} y={111} fill={MUTED}>หน้าแรก</Label>
      <SketchArrow seedKey="p2/test/arrow/3" x1={394} y1={140} x2={394} y2={202} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p2/test/result" x={336} y={206} w={112} h={64} rounded stroke={highlight === 3 ? accent : success} strokeWidth={highlight === 3 ? 2.8 : 1.8} />
      <Label x={392} y={227} weight={600}>ผล</Label>
      <Label x={392} y={253} fill={success}>passed</Label>
    </Frame>
  );
}
