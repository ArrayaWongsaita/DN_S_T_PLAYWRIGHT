// Drawings for Part 5: the three parts of an assertion, the timeline of auto-waiting,
// the flaky race, the sleep mistake, soft assertions and the timeout layers.
// Labels only: sentences stay in the slide's text.
import type { ReactNode } from 'react';
import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchPath, SketchRect } from '../components';

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
  halo = false,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
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
      {...(halo ? { stroke: 'var(--rs-paper)', strokeWidth: 4, paintOrder: 'stroke' as const } : {})}
    >
      {children}
    </text>
  );
}

/** The opening hook: the same test checks at the same moment on two runs, but the data arrives at two different moments. */
export function FlakyRace() {
  const danger = roleColour('danger');
  const success = roleColour('success');
  const neutral = roleColour('neutral');
  return (
    <Frame label="เส้นเวลา: รอบแรกข้อมูลมาหลังเทสตรวจ รอบสองข้อมูลมาก่อนเทสตรวจ">
      <SketchLine seedKey="p5/flaky/axis" x1={90} y1={290} x2={410} y2={290} stroke={EDGE} strokeWidth={1.4} />
      {[0, 1, 2, 3].map((second) => {
        const x = 90 + second * 106.67;
        return (
          <g key={second}>
            <SketchLine seedKey={`p5/flaky/axis-tick/${second}`} x1={x} y1={286} x2={x} y2={294} stroke={EDGE} strokeWidth={1.4} />
            <Label x={x} y={310} fill={MUTED}>
              {second}s
            </Label>
          </g>
        );
      })}

      <Label x={12} y={90} fill={MUTED} anchor="start">
        รอบ 1
      </Label>
      <SketchLine seedKey="p5/flaky/track/1" x1={90} y1={90} x2={410} y2={90} stroke={EDGE} strokeWidth={1.4} dashed />
      <Label x={133} y={64} fill={MUTED}>
        ตรวจ
      </Label>
      <SketchPath seedKey="p5/flaky/cross" d="M125 82 l16 16 M141 82 l-16 16" stroke={danger} strokeWidth={2.4} />
      <SketchLine seedKey="p5/flaky/data/1" x1={250} y1={50} x2={250} y2={130} stroke={neutral} strokeWidth={2} dashed />
      <Label x={250} y={38} fill={neutral} weight={600}>
        ข้อมูลมา
      </Label>
      <Label x={430} y={90} fill={danger} anchor="end" size={18} weight={600}>
        พัง
      </Label>

      <Label x={12} y={210} fill={MUTED} anchor="start">
        รอบ 2
      </Label>
      <SketchLine seedKey="p5/flaky/track/2" x1={90} y1={210} x2={410} y2={210} stroke={EDGE} strokeWidth={1.4} dashed />
      <Label x={133} y={180} fill={MUTED}>
        ตรวจ
      </Label>
      <SketchPath seedKey="p5/flaky/tick" d="M125 210 l6 7 l14 -16" stroke={success} strokeWidth={2.4} />
      <SketchLine seedKey="p5/flaky/data/2" x1={110} y1={170} x2={110} y2={250} stroke={neutral} strokeWidth={2} dashed />
      <Label x={110} y={154} fill={neutral} weight={600}>
        ข้อมูลมา
      </Label>
      <Label x={430} y={210} fill={success} anchor="end" size={18} weight={600}>
        ผ่าน
      </Label>
    </Frame>
  );
}

/**
 * The parts of an assertion: the locator at the centre, the questions around it.
 * `pieces` lights the locator, the text question and its expected value; `state` lights the value and checked questions.
 */
export function AssertMap({ mode = 'map' }: { mode?: 'map' | 'pieces' | 'state' }) {
  const accent = roleColour('accent');
  const code = roleColour('secondary');
  const pieces = mode === 'pieces';
  const state = mode === 'state';
  const chips = [
    { x: 14, y: 30, w: 136, h: 56, question: 'เห็นไหม', method: 'toBeVisible' },
    { x: 310, y: 30, w: 136, h: 56, question: 'ข้อความ', method: 'toHaveText' },
    { x: 314, y: 138, w: 132, h: 56, question: 'จำนวน', method: 'toHaveCount' },
    { x: 278, y: 244, w: 136, h: 56, question: 'ค่า', method: 'toHaveValue' },
    { x: 46, y: 244, w: 136, h: 56, question: 'ติ๊กไหม', method: 'toBeChecked' },
  ];
  const litChip = [false, pieces, false, state, state];
  const strokeOf = (lit: boolean, base: string) => (lit ? accent : base);
  return (
    <Frame label="locator อยู่กลาง ล้อมด้วยคำถาม เห็นไหม ข้อความ จำนวน ค่า ติ๊กไหม">
      <SketchLine seedKey="p5/assert/line/1" x1={82} y1={86} x2={160} y2={136} stroke={pieces ? accent : EDGE} strokeWidth={1.2} dashed />
      <SketchLine seedKey="p5/assert/line/2" x1={378} y1={86} x2={300} y2={136} stroke={pieces ? accent : EDGE} strokeWidth={1.2} dashed />
      <SketchLine seedKey="p5/assert/line/3" x1={114} y1={244} x2={170} y2={200} stroke={state ? accent : EDGE} strokeWidth={1.2} dashed />
      <SketchLine seedKey="p5/assert/line/4" x1={346} y1={244} x2={280} y2={200} stroke={state ? accent : EDGE} strokeWidth={1.2} dashed />

      {chips.map((chip, index) => (
        <g key={chip.method}>
          <SketchRect
            seedKey={`p5/assert/chip/${index}`}
            x={chip.x}
            y={chip.y}
            w={chip.w}
            h={chip.h}
            rounded
            stroke={strokeOf(litChip[index], code)}
            strokeWidth={litChip[index] ? 2.8 : 1.6}
          />
          <Label x={chip.x + chip.w / 2} y={chip.y + 18} weight={600}>
            {chip.question}
          </Label>
          <Label x={chip.x + chip.w / 2} y={chip.y + 44} fill={MUTED}>
            {chip.method}
          </Label>
        </g>
      ))}

      <SketchRect
        seedKey="p5/assert/locator"
        x={130}
        y={136}
        w={176}
        h={64}
        rounded
        stroke={strokeOf(pieces, code)}
        strokeWidth={pieces ? 2.8 : 1.8}
      />
      <Label x={218} y={156} size={18} weight={600}>
        locator
      </Label>
      <Label x={218} y={185} fill={MUTED}>
        getByText("ชา")
      </Label>

      {pieces ? (
        <g>
          <SketchRect seedKey="p5/assert/value" x={180} y={40} w={118} h={36} rounded stroke={accent} strokeWidth={2.4} />
          <Label x={239} y={58} fill={accent} weight={600}>
            "ชา"
          </Label>
          <SketchLine seedKey="p5/assert/value-line" x1={298} y1={58} x2={310} y2={58} stroke={accent} strokeWidth={1.6} dashed />
        </g>
      ) : null}
    </Frame>
  );
}

/** The whole topic as a timeline: data arrives at 1.5s, expect keeps asking, and click waits for the element. */
export function WaitTimeline({ highlight }: { highlight?: 'expect' | 'action' }) {
  const accent = roleColour('accent');
  const secondary = roleColour('secondary');
  const primary = roleColour('primary');
  const neutral = roleColour('neutral');
  const success = roleColour('success');
  const warning = roleColour('warning');
  const dim = highlight !== undefined;
  const laneFill = (lane: 'expect' | 'action') => (highlight === lane ? accent : dim ? MUTED : INK);
  const laneStroke = (lane: 'expect' | 'action') => (highlight === lane ? accent : dim ? EDGE : lane === 'expect' ? secondary : primary);
  return (
    <Frame label="เส้นเวลา: ข้อมูลมาที่ 1.5 วินาที expect ถามซ้ำ และ click รอ element">
      {[
        { y: 64, label: 'ข้อมูล' },
        { y: 150, label: 'expect' },
        { y: 236, label: 'action' },
      ].map((lane) => (
        <g key={lane.label}>
          <Label x={12} y={lane.y} anchor="start" fill={highlight === lane.label ? accent : dim ? MUTED : INK} weight={highlight === lane.label ? 600 : undefined}>
            {lane.label}
          </Label>
          <SketchLine seedKey={`p5/wait/track/${lane.y}`} x1={120} y1={lane.y} x2={430} y2={lane.y} stroke={EDGE} strokeWidth={1.2} dashed />
        </g>
      ))}

      <Label x={166} y={64} fill={MUTED} halo>
        ยังไม่มา
      </Label>
      <SketchRect seedKey="p5/wait/data" x={213} y={46} w={112} h={36} rounded stroke={neutral} strokeWidth={1.8} />
      <Label x={269} y={64} fill={neutral} weight={600}>
        ข้อมูลมา
      </Label>

      {[126, 148, 170, 192, 214].map((x, index) => (
        <g key={x}>
          <SketchEllipse seedKey={`p5/wait/ask/${index}`} cx={x} cy={150} w={20} h={20} stroke={laneStroke('expect')} strokeWidth={highlight === 'expect' ? 2 : 1.6} />
          <Label x={x} y={150} size={16} fill={laneFill('expect')}>
            ?
          </Label>
        </g>
      ))}
      <SketchPath seedKey="p5/wait/pass" d="M232 150 l6 7 l13 -16" stroke={success} strokeWidth={2.4} />
      <Label x={276} y={150} fill={success} weight={600}>
        ผ่าน
      </Label>

      <SketchRect
        seedKey="p5/wait/wait-bar"
        x={139}
        y={228}
        w={55}
        h={18}
        stroke={highlight === 'action' ? accent : dim ? EDGE : warning}
        strokeWidth={highlight === 'action' ? 2.2 : 1.6}
        fill={highlight === 'action' ? accent : dim ? undefined : warning}
        fillStyle="hachure"
      />
      <Label x={166} y={208} fill={highlight === 'action' ? accent : dim ? MUTED : warning} weight={highlight === 'action' ? 600 : undefined}>
        รอ
      </Label>
      <SketchRect
        seedKey="p5/wait/click"
        x={198}
        y={224}
        w={64}
        h={26}
        rounded
        stroke={highlight === 'action' ? accent : dim ? EDGE : primary}
        strokeWidth={highlight === 'action' ? 2.2 : 1.6}
      />
      <Label x={230} y={237} fill={highlight === 'action' ? accent : dim ? MUTED : primary} weight={highlight === 'action' ? 600 : undefined}>
        คลิก
      </Label>

      <SketchLine seedKey="p5/wait/axis" x1={120} y1={292} x2={430} y2={292} stroke={INK} strokeWidth={1.4} />
      {[0, 1, 2, 3, 4, 5].map((second) => {
        const x = 120 + second * 62;
        return (
          <g key={second}>
            <SketchLine seedKey={`p5/wait/axis-tick/${second}`} x1={x} y1={286} x2={x} y2={292} stroke={INK} strokeWidth={1.4} />
            <Label x={x} y={310} fill={MUTED}>
              {second}s
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** The mistake: sleep(1s) checks at 1s while the data arrives at 1.5s; expect keeps asking and passes at 1.5s. */
export function SleepMistake() {
  const danger = roleColour('danger');
  const success = roleColour('success');
  const warning = roleColour('warning');
  const neutral = roleColour('neutral');
  const secondary = roleColour('secondary');
  return (
    <Frame label="เส้นเวลา: sleep 1 วินาทีตรวจก่อนข้อมูลมาที่ 1.5 วินาที ส่วน expect รอจนผ่าน">
      <SketchLine seedKey="p5/sleep/data" x1={250} y1={34} x2={250} y2={280} stroke={neutral} strokeWidth={2} dashed />
      <Label x={250} y={22} fill={neutral} weight={600}>
        ข้อมูลมา
      </Label>

      <Label x={12} y={100} anchor="start" fill={MUTED}>
        sleep
      </Label>
      <SketchLine seedKey="p5/sleep/track/1" x1={90} y1={100} x2={410} y2={100} stroke={EDGE} strokeWidth={1.2} dashed />
      <SketchRect seedKey="p5/sleep/bar" x={90} y={82} w={107} h={36} stroke={warning} strokeWidth={1.8} fill={warning} fillStyle="hachure" />
      <Label x={143} y={100}>
        sleep 1s
      </Label>
      <SketchArrow seedKey="p5/sleep/arrow" x1={197} y1={100} x2={212} y2={100} stroke={INK} strokeWidth={1.6} />
      <Label x={222} y={64} fill={MUTED}>
        ตรวจ
      </Label>
      <SketchPath seedKey="p5/sleep/cross" d="M214 92 l16 16 M230 92 l-16 16" stroke={danger} strokeWidth={2.4} />
      <Label x={200} y={146} fill={danger}>
        ยังไม่มา
      </Label>

      <Label x={12} y={240} anchor="start" fill={MUTED}>
        expect
      </Label>
      <SketchLine seedKey="p5/sleep/track/2" x1={90} y1={240} x2={410} y2={240} stroke={EDGE} strokeWidth={1.2} dashed />
      {[98, 120, 142, 164, 186, 208].map((x, index) => (
        <g key={x}>
          <SketchEllipse seedKey={`p5/sleep/ask/${index}`} cx={x} cy={240} w={20} h={20} stroke={secondary} strokeWidth={1.6} />
          <Label x={x} y={240} fill={secondary}>
            ?
          </Label>
        </g>
      ))}
      <SketchPath seedKey="p5/sleep/pass" d="M254 240 l6 7 l13 -16" stroke={success} strokeWidth={2.4} />
      <Label x={296} y={240} fill={success} weight={600}>
        ผ่าน
      </Label>

      <SketchLine seedKey="p5/sleep/axis" x1={90} y1={290} x2={410} y2={290} stroke={INK} strokeWidth={1.4} />
      {[0, 1, 2, 3].map((second) => {
        const x = 90 + second * 106.67;
        return (
          <g key={second}>
            <SketchLine seedKey={`p5/sleep/axis-tick/${second}`} x1={x} y1={286} x2={x} y2={294} stroke={INK} strokeWidth={1.4} />
            <Label x={x} y={310} fill={MUTED}>
              {second}s
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** Normal expect stops at the first failure; expect.soft keeps going and reports every failure at the end. */
export function SoftChecks() {
  const success = roleColour('success');
  const danger = roleColour('danger');
  const accent = roleColour('accent');
  const secondary = roleColour('secondary');
  const symbol = (x: number, y: number, value: string, colour: string) => (
    <g>
      <SketchRect seedKey={`p5/soft/box/${y}/${x}/${value}`} x={x} y={y} w={52} h={52} rounded stroke={EDGE} strokeWidth={1.4} />
      <Label x={x + 26} y={y + 26} size={26} fill={colour} weight={600}>
        {value}
      </Label>
    </g>
  );
  return (
    <Frame label="ปกติหยุดที่ข้อที่ผิด ส่วน soft ตรวจต่อจนจบแล้วรายงานทีเดียว">
      <Label x={12} y={100} anchor="start" fill={MUTED} size={18}>
        ปกติ
      </Label>
      {symbol(100, 74, '✓', success)}
      {symbol(168, 74, '✗', danger)}
      <SketchLine seedKey="p5/soft/stop" x1={248} y1={80} x2={248} y2={120} stroke={danger} strokeWidth={3} />
      <Label x={270} y={100} anchor="start" fill={danger} size={18} weight={600}>
        หยุด
      </Label>

      <SketchRect seedKey="p5/soft/soft-frame" x={86} y={194} w={360} h={72} rounded stroke={accent} strokeWidth={1.8} dashed />
      <Label x={12} y={230} anchor="start" fill={accent} size={18} weight={600}>
        soft
      </Label>
      {symbol(100, 204, '✓', success)}
      {symbol(168, 204, '✗', danger)}
      {symbol(236, 204, '✓', success)}
      <SketchArrow seedKey="p5/soft/arrow" x1={292} y1={230} x2={310} y2={230} stroke={INK} strokeWidth={1.6} />
      <SketchRect seedKey="p5/soft/report" x={314} y={204} w={116} h={52} rounded stroke={secondary} strokeWidth={1.8} />
      <Label x={372} y={230} fill={secondary} weight={600}>
        รายงาน
      </Label>
    </Frame>
  );
}

/** The three timeout scopes: the test's 30s holds two siblings — each expect's 5s and the action's wait. */
export function TimeoutLayers() {
  const secondary = roleColour('secondary');
  const primary = roleColour('primary');
  return (
    <Frame label="timeout สามชั้น: test 30s ครอบ expect 5s และ action ที่รอจนพร้อม">
      <SketchRect seedKey="p5/timeout/test" x={14} y={30} w={432} h={272} rounded stroke={secondary} strokeWidth={2.2} />
      <Label x={34} y={58} anchor="start" size={18} weight={600}>
        test 30s
      </Label>

      <SketchRect seedKey="p5/timeout/expect" x={36} y={96} w={186} h={160} rounded stroke={secondary} strokeWidth={1.8} />
      <Label x={129} y={176} size={18} weight={600}>
        expect 5s
      </Label>

      <SketchRect seedKey="p5/timeout/action" x={238} y={96} w={186} h={160} rounded stroke={primary} strokeWidth={1.8} />
      <Label x={331} y={163} weight={600}>
        action
      </Label>
      <Label x={331} y={189}>
        (รอจนพร้อม)
      </Label>
    </Frame>
  );
}
