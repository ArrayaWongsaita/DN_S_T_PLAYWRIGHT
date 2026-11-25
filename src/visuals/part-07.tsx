// Drawings for Part 7: the request path with Playwright in the middle, the two orders of route and goto,
// the three states of a data page, the extra network tools and the handler-delay comparison.
import type { ReactNode } from 'react';
import { roleColour, SketchArrow, SketchLine, SketchRect } from '../components';

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
  size = 18,
  fill = INK,
  anchor = 'middle',
  weight,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" fontSize={size} fill={fill} fontWeight={weight}>
      {children}
    </text>
  );
}

export type NetworkMode = 'direct' | 'intercept' | 'late';

/**
 * หน้าเว็บเรียก API: `direct` is the request going straight out and failing, `intercept` has Playwright answer
 * in the middle (the API is not reached), `late` has the route set after the request already went through.
 */
export function NetworkPath({
  mode = 'intercept',
  highlight,
}: {
  mode?: NetworkMode;
  highlight?: 'page' | 'playwright' | 'api';
}) {
  const accent = roleColour('accent');
  const danger = roleColour('danger');
  const secondary = roleColour('secondary');
  const neutral = roleColour('neutral');
  const direct = mode === 'direct';
  const intercept = mode === 'intercept';
  const late = mode === 'late';

  const box = (key: 'page' | 'playwright' | 'api', x: number, label: string, note?: string, colour = neutral, dashed = false) => {
    const lit = highlight === key;
    const twoLines = note !== undefined;
    return (
      <g key={key}>
        <SketchRect
          seedKey={`np/${key}`}
          x={x}
          y={100}
          w={118}
          h={110}
          rounded
          stroke={lit ? accent : colour}
          strokeWidth={lit ? 3 : dashed ? 1.6 : 2}
          dashed={dashed}
        />
        <Label x={x + 59} y={twoLines ? 145 : 155} weight={twoLines || lit ? 600 : undefined}>
          {label}
        </Label>
        {twoLines ? <Label x={x + 59} y={177} fill={intercept ? secondary : late ? danger : MUTED}>{note}</Label> : null}
      </g>
    );
  };

  if (direct) {
    return (
      <Frame label="หน้าเว็บเรียก API แล้ว API ล่ม">
        {box('page', 70, 'หน้าเว็บ')}
        {box('api', 250, 'API', undefined, danger)}
        <SketchArrow seedKey="np/direct/ask" x1={210} y1={132} x2={246} y2={132} stroke={INK} strokeWidth={1.8} />
        <SketchLine seedKey="np/direct/back" x1={246} y1={182} x2={214} y2={182} stroke={danger} strokeWidth={1.8} dashed />
        <Label x={230} y={182} size={30} fill={danger} weight={600}>
          ✗
        </Label>
        <Label x={230} y={222} fill={danger} weight={600}>
          ล่ม
        </Label>
      </Frame>
    );
  }

  return (
    <Frame label="หน้าเว็บ Playwright และ API">
      {box('page', 18, 'หน้าเว็บ')}
      {box('playwright', 171, 'Playwright', intercept ? 'ตอบแทน' : 'ดักไม่ทัน', secondary, late)}
      {box('api', 324, 'API')}

      <SketchArrow seedKey="np/ask/1" x1={136} y1={132} x2={167} y2={132} stroke={INK} strokeWidth={1.8} />
      <SketchArrow
        seedKey="np/ask/2"
        x1={289}
        y1={132}
        x2={320}
        y2={132}
        stroke={intercept ? EDGE : INK}
        strokeWidth={intercept ? 1.4 : 1.8}
        dashed={intercept}
      />
      <SketchArrow seedKey="np/reply/1" x1={167} y1={182} x2={140} y2={182} stroke={INK} strokeWidth={1.8} />
      <SketchArrow
        seedKey="np/reply/2"
        x1={320}
        y1={182}
        x2={293}
        y2={182}
        stroke={intercept ? EDGE : INK}
        strokeWidth={intercept ? 1.4 : 1.8}
        dashed={intercept}
      />

      {intercept ? (
        <Label x={304} y={155} size={26} fill={danger} weight={600}>
          ✗
        </Label>
      ) : null}
    </Frame>
  );
}

/** The right order (route, then goto) above the wrong one (goto, then route set too late). */
export function RouteTimeline() {
  const success = roleColour('success');
  const danger = roleColour('danger');
  const lane = (y: number, good: boolean, first: string, firstNote: string, second: string, secondNote: string) => {
    const colour = good ? success : danger;
    return (
      <g>
        <SketchRect seedKey={`rt/${y}/a`} x={20} y={y} w={170} h={80} rounded stroke={INK} strokeWidth={1.8} />
        <Label x={105} y={y + 26} weight={600}>
          {first}
        </Label>
        <Label x={105} y={y + 60} size={16} fill={MUTED}>
          {firstNote}
        </Label>
        <SketchArrow seedKey={`rt/${y}/arrow`} x1={194} y1={y + 40} x2={246} y2={y + 40} stroke={INK} strokeWidth={1.8} />
        <SketchRect seedKey={`rt/${y}/b`} x={250} y={y} w={170} h={80} rounded stroke={colour} strokeWidth={2.2} />
        <Label x={335} y={y + 26} weight={600}>
          {second}
        </Label>
        <Label x={335} y={y + 60} size={16} fill={colour}>
          {secondNote}
        </Label>
      </g>
    );
  };
  return (
    <Frame label="ตั้ง route ก่อน goto ถูก ตั้งหลัง goto ผิด">
      <Label x={20} y={34} anchor="start" fill={success} weight={600}>
        ✓ ถูก
      </Label>
      {lane(56, true, 'ตั้ง route', 'ก่อน goto', 'goto', 'เรียก API')}
      <Label x={20} y={184} anchor="start" fill={danger} weight={600}>
        ✗ ผิด
      </Label>
      {lane(206, false, 'goto', 'เรียก API', 'ตั้ง route', 'ไม่ทัน')}
    </Frame>
  );
}

const STATES = [
  { key: 'error', title: 'error', detail: 'เกิดข้อผิดพลาด', role: 'danger' },
  { key: 'empty', title: 'ว่าง', detail: 'ไม่มีสินค้า', role: 'warning' },
  { key: 'loading', title: 'กำลังโหลด', detail: 'ยังไม่เห็นสินค้า', role: 'primary' },
] as const;

/** The three states a page that fetches data must handle; `highlight` marks the one the slide talks about. */
export function ThreeStates({ highlight }: { highlight?: number }) {
  const accent = roleColour('accent');
  return (
    <Frame label="สามสถานะ: error ว่าง และกำลังโหลด">
      {STATES.map((state, index) => {
        const lit = highlight === index;
        return (
          <g key={state.key}>
            <SketchRect
              seedKey={`states/${state.key}`}
              x={20}
              y={20 + index * 100}
              w={420}
              h={84}
              rounded
              stroke={lit ? accent : INK}
              strokeWidth={lit ? 3 : 1.8}
            />
            <Label x={230} y={48 + index * 100} size={18} weight={600}>
              {state.title}
            </Label>
            <Label x={230} y={82 + index * 100} fill={roleColour(state.role)}>
              {state.detail}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

const TOOLS = [
  { name: 'waitForRequest', note: 'ตรวจ request', role: 'secondary' },
  { name: 'route.abort', note: 'จำลองเน็ตล่ม', role: 'danger' },
  { name: 'route.fetch', note: 'แก้ของจริง', role: 'success' },
  { name: 'request', note: 'เรียก API ตรง', role: 'primary' },
] as const;

/** Four extra network tools, one per card; `highlight` marks the tool the slide talks about. */
export function ToolboxCards({ highlight }: { highlight?: number }) {
  const accent = roleColour('accent');
  return (
    <Frame label="เครื่องมือเสริม: waitForRequest route.abort route.fetch และ request">
      {TOOLS.map((tool, index) => {
        const lit = highlight === index;
        const x = index % 2 === 0 ? 20 : 240;
        const y = index < 2 ? 30 : 170;
        return (
          <g key={tool.name}>
            <SketchRect
              seedKey={`tool/${tool.name}`}
              x={x}
              y={y}
              w={200}
              h={120}
              rounded
              stroke={lit ? accent : roleColour(tool.role)}
              strokeWidth={lit ? 3 : 1.8}
            />
            <Label x={x + 100} y={y + 38} weight={600}>
              {tool.name}
            </Label>
            <Label x={x + 100} y={y + 72} size={16} fill={MUTED}>
              {tool.note}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** The right delay (in the route handler) above the wrong one (a sleep in the test). */
export function DelayCompare() {
  const success = roleColour('success');
  const danger = roleColour('danger');
  const row = (y: number, good: boolean, labels: string[]) => {
    const colour = good ? success : danger;
    return (
      <g>
        <Label x={20} y={y} anchor="start" fill={colour} weight={600}>
          {good ? '✓ หน่วงใน route' : '✗ sleep ในเทส'}
        </Label>
        {labels.map((label, index) => (
          <g key={label}>
            <SketchRect
              seedKey={`delay/${y}/${index}`}
              x={20 + index * 110}
              y={y + 24}
              w={90}
              h={52}
              rounded
              stroke={colour}
              strokeWidth={1.8}
            />
            <Label x={65 + index * 110} y={y + 50} size={14} weight={index === 1 ? 600 : undefined}>
              {label}
            </Label>
            {index < labels.length - 1 ? (
              <SketchArrow seedKey={`delay/${y}/arrow/${index}`} x1={112 + index * 110} y1={y + 50} x2={126 + index * 110} y2={y + 50} stroke={INK} strokeWidth={1.6} />
            ) : null}
          </g>
        ))}
      </g>
    );
  };
  return (
    <Frame label="หน่วงใน route เห็นกำลังโหลด ส่วน sleep ในเทสไม่เห็น">
      {row(26, true, ['goto', 'หน่วง 500', 'เห็นโหลด', 'เห็นสินค้า'])}
      {row(186, false, ['goto', 'sleep 500', 'ตอบแล้ว', 'ไม่เห็นโหลด'])}
    </Frame>
  );
}
