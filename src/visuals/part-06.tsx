// Drawings for Part 6: the debug ladder, the run filters narrowing, the three run modes,
// what a failed run leaves behind, and the codegen/debug tool pair. Labels only: sentences stay in the slide's text.
import type { ReactNode } from 'react';
import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchRect } from '../components';

const INK = '#2b2b2b';
const MUTED = '#646464';
const EDGE = '#b5b5b5';

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label={label} fontFamily="var(--rs-font)">
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
  mono = false,
  halo = false,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  mono?: boolean;
  halo?: boolean;
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
      fontFamily={mono ? 'var(--rs-mono)' : undefined}
      {...(halo ? { stroke: 'var(--rs-paper)', strokeWidth: 4, paintOrder: 'stroke' as const } : {})}
    >
      {children}
    </text>
  );
}

const LADDER = ['debug', 'UI mode / headed', 'trace', 'report', 'อ่าน error'];

/** The five ways into a red test, from the lightest (read the error) at the bottom to the heaviest (debug) at the top. */
export function DebugLadder() {
  const secondary = roleColour('secondary');
  return (
    <Frame label="บันได 5 ขั้นจากการอ่าน error ไปจนถึง debug">
      <SketchArrow seedKey="p6/ladder/axis" x1={30} y1={302} x2={30} y2={40} stroke={EDGE} strokeWidth={1.6} />
      <Label x={42} y={316} anchor="start" fill={MUTED}>
        เบา
      </Label>
      <Label x={42} y={32} anchor="start" fill={MUTED}>
        หนัก
      </Label>
      {LADDER.map((label, index) => {
        const y = 54 + index * 52;
        return (
          <g key={label}>
            <SketchRect seedKey={`p6/ladder/${index}`} x={56} y={y} w={394} h={40} rounded stroke={secondary} strokeWidth={1.6} />
            <Label x={253} y={y + 20} weight={index === 0 ? 600 : undefined}>
              {label}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

const FILTERS = [
  { name: 'ทั้งโปรเจกต์', command: 'pnpm test:e2e', width: 400 },
  { name: 'โฟลเดอร์', command: 'e2e/04-click', width: 310 },
  { name: 'ไฟล์', command: 'click.spec.ts', width: 220 },
  { name: 'ชื่อเทส', command: '-g "Count: 2"', width: 150 },
];

/** One command filtered four ways: the whole project, a folder, a file, one test name by `-g`. */
export function RunFilter({ highlight }: { highlight?: number }) {
  const accent = roleColour('accent');
  return (
    <Frame label="กรองจากทั้งโปรเจกต์ แคบลงเป็นโฟลเดอร์ ไฟล์ และชื่อเทส">
      {FILTERS.map((filter, index) => {
        const lit = highlight === index;
        const top = 22 + index * 74;
        return (
          <g key={filter.name}>
            <Label x={20} y={top} anchor="start" fill={lit ? accent : MUTED} weight={lit ? 600 : undefined}>
              {filter.name}
            </Label>
            <SketchRect
              seedKey={`p6/filter/${index}`}
              x={20}
              y={top + 10}
              w={filter.width}
              h={38}
              rounded
              stroke={lit ? accent : EDGE}
              strokeWidth={lit ? 2.8 : 1.6}
              fill={lit ? accent : undefined}
            />
            <Label x={32} y={top + 29} anchor="start" mono halo={lit}>
              {filter.command}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** headless (no window), headed (a window to watch) and UI mode (test list, timeline and page together). */
export function ModeCompare({ highlight }: { highlight?: 0 | 1 | 2 }) {
  const accent = roleColour('accent');
  const primary = roleColour('primary');
  const headless = highlight === 0;
  const headed = highlight === 1;
  const ui = highlight === 2;
  const dots = (y: number, stroke: string) => (
    <>
      {[144, 158, 172].map((cx) => (
        <SketchEllipse key={cx} seedKey={`p6/mode/dot/${y}/${cx}`} cx={cx} cy={y} w={7} h={7} stroke={stroke} strokeWidth={1.2} />
      ))}
    </>
  );
  return (
    <Frame label="headless ไม่เห็นหน้าต่าง headed เห็นหน้าต่าง UI mode เห็นและย้อนดูได้">
      <Label x={112} y={62} anchor="end" fill={headless ? accent : MUTED} weight={headless ? 600 : undefined}>
        headless
      </Label>
      <SketchRect
        seedKey="p6/mode/headless"
        x={130}
        y={24}
        w={318}
        h={76}
        rounded
        stroke={headless ? accent : EDGE}
        strokeWidth={headless ? 2.8 : 1.8}
        dashed
      />
      <Label x={289} y={62} halo={headless}>
        ไม่เห็นหน้าต่าง
      </Label>

      <Label x={112} y={164} anchor="end" fill={headed ? accent : MUTED} weight={headed ? 600 : undefined}>
        headed
      </Label>
      <SketchRect
        seedKey="p6/mode/headed"
        x={130}
        y={126}
        w={318}
        h={76}
        rounded
        stroke={headed ? accent : primary}
        strokeWidth={headed ? 2.8 : 1.8}
      />
      <SketchLine seedKey="p6/mode/headed/bar" x1={130} y1={148} x2={448} y2={148} stroke={headed ? accent : primary} strokeWidth={1.4} />
      {dots(137, headed ? accent : primary)}
      <Label x={289} y={176} halo={headed}>
        เห็นหน้าต่าง
      </Label>

      <Label x={112} y={269} anchor="end" fill={ui ? accent : MUTED} weight={ui ? 600 : undefined}>
        UI mode
      </Label>
      <SketchRect
        seedKey="p6/mode/ui"
        x={130}
        y={228}
        w={318}
        h={82}
        rounded
        stroke={ui ? accent : primary}
        strokeWidth={ui ? 2.8 : 1.8}
      />
      <SketchLine seedKey="p6/mode/ui/bar" x1={130} y1={250} x2={448} y2={250} stroke={ui ? accent : primary} strokeWidth={1.4} />
      <SketchLine seedKey="p6/mode/ui/col/1" x1={238} y1={250} x2={238} y2={310} stroke={ui ? accent : EDGE} strokeWidth={1.2} />
      <SketchLine seedKey="p6/mode/ui/col/2" x1={352} y1={250} x2={352} y2={310} stroke={ui ? accent : EDGE} strokeWidth={1.2} />
      {dots(239, ui ? accent : primary)}
      <Label x={184} y={280} weight={ui ? 600 : undefined}>
        รายการเทส
      </Label>
      <Label x={295} y={280} weight={ui ? 600 : undefined}>
        ไทม์ไลน์
      </Label>
      <Label x={400} y={280} weight={ui ? 600 : undefined}>
        หน้าเว็บ
      </Label>
    </Frame>
  );
}

const ARTIFACTS = [
  { label: 'รายงาน HTML', x: 14 },
  { label: 'trace.zip', x: 165 },
  { label: 'screenshot', x: 316 },
];

/** What a failed run leaves behind: the HTML report, trace.zip and a screenshot, all from the same run. */
export function AfterRun({ highlight }: { highlight?: 0 | 1 | 2 | 'run' }) {
  const danger = roleColour('danger');
  const accent = roleColour('accent');
  const runLit = highlight === 'run';
  const line = runLit ? accent : EDGE;
  return (
    <Frame label="เทสล้ม แล้วได้รายงาน HTML trace และ screenshot">
      <SketchRect seedKey="p6/after/run" x={150} y={18} w={160} h={54} rounded stroke={runLit ? accent : danger} strokeWidth={runLit ? 2.8 : 2.2} />
      <Label x={230} y={45} weight={600} halo={runLit}>
        เทสล้ม
      </Label>
      <SketchLine seedKey="p6/after/drop" x1={230} y1={72} x2={230} y2={94} stroke={line} strokeWidth={runLit ? 2.4 : 1.6} />
      <SketchLine seedKey="p6/after/bus" x1={79} y1={94} x2={381} y2={94} stroke={line} strokeWidth={runLit ? 2.4 : 1.6} />
      {[79, 230, 381].map((x) => (
        <SketchArrow key={x} seedKey={`p6/after/arrow/${x}`} x1={x} y1={94} x2={x} y2={118} stroke={line} strokeWidth={runLit ? 2.4 : 1.6} />
      ))}
      {ARTIFACTS.map((artifact, index) => {
        const lit = highlight === index;
        return (
          <g key={artifact.label}>
            <SketchRect
              seedKey={`p6/after/box/${index}`}
              x={artifact.x}
              y={122}
              w={130}
              h={64}
              rounded
              stroke={lit ? accent : EDGE}
              strokeWidth={lit ? 2.8 : 1.6}
              fill={lit ? accent : undefined}
            />
            <Label x={artifact.x + 65} y={154} weight={lit ? 600 : undefined} halo={lit}>
              {artifact.label}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** codegen turns what you do in the browser into code; debug walks the code a step at a time. */
export function ToolPair({ highlight }: { highlight?: 'codegen' | 'debug' }) {
  const accent = roleColour('accent');
  const primary = roleColour('primary');
  const secondary = roleColour('secondary');
  const leftLit = highlight === 'codegen';
  const rightLit = highlight === 'debug';
  const dim = highlight !== undefined;
  const leftBase = (base: string) => (leftLit ? accent : dim ? EDGE : base);
  const rightBase = (base: string) => (rightLit ? accent : dim ? EDGE : base);
  return (
    <Frame label="codegen ใช้เว็บแล้วได้โค้ด debug ใช้โค้ดแล้วหยุดทีละขั้น">
      <SketchLine seedKey="p6/tools/divider" x1={230} y1={24} x2={230} y2={300} stroke={EDGE} strokeWidth={1.4} dashed />
      <Label x={117} y={44} size={18} fill={leftLit ? accent : dim ? MUTED : INK} weight={600}>
        codegen
      </Label>
      <Label x={343} y={44} size={18} fill={rightLit ? accent : dim ? MUTED : INK} weight={600}>
        debug
      </Label>

      <SketchRect seedKey="p6/tools/left/top" x={14} y={66} w={206} h={70} rounded stroke={leftBase(primary)} strokeWidth={leftLit ? 2.8 : 1.8} />
      <Label x={117} y={101} weight={leftLit ? 600 : undefined}>
        เบราว์เซอร์
      </Label>
      <SketchArrow seedKey="p6/tools/left/arrow" x1={117} y1={140} x2={117} y2={176} stroke={leftBase(EDGE)} strokeWidth={1.8} />
      <SketchRect seedKey="p6/tools/left/bottom" x={14} y={180} w={206} h={70} rounded stroke={leftBase(secondary)} strokeWidth={leftLit ? 2.8 : 1.8} />
      <Label x={117} y={215} weight={leftLit ? 600 : undefined}>
        โค้ดที่ได้
      </Label>

      <SketchRect seedKey="p6/tools/right/top" x={240} y={66} w={206} h={70} rounded stroke={rightBase(secondary)} strokeWidth={rightLit ? 2.8 : 1.8} />
      <Label x={343} y={101} weight={rightLit ? 600 : undefined}>
        โค้ดเทส
      </Label>
      <SketchArrow seedKey="p6/tools/right/arrow" x1={343} y1={140} x2={343} y2={176} stroke={rightBase(EDGE)} strokeWidth={1.8} />
      <SketchRect seedKey="p6/tools/right/bottom" x={240} y={180} w={206} h={70} rounded stroke={rightBase(primary)} strokeWidth={rightLit ? 2.8 : 1.8} />
      <Label x={343} y={215} weight={rightLit ? 600 : undefined}>
        Inspector
      </Label>
    </Frame>
  );
}
