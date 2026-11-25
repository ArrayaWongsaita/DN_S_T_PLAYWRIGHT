// Drawings for Part 1: the covered payment button, the E2E flow, the code→browser control diagram,
// the test pyramid and the capability map. Labels only: sentences stay in the slide's text.
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

/** The opening hook: a payment button under a covering bar, while the unit test card stays green. */
export function Part1Overlay() {
  const primary = roleColour('primary');
  const success = roleColour('success');
  const warning = roleColour('warning');
  return (
    <Frame label="หน้าจอจ่ายเงินที่ปุ่มถูกแถบทับ และ unit test ที่ยังผ่าน">
      <SketchRect seedKey="p1/overlay/window" x={20} y={24} w={300} h={250} rounded stroke={primary} strokeWidth={2} />
      <SketchLine seedKey="p1/overlay/topbar" x1={20} y1={58} x2={320} y2={58} stroke={primary} strokeWidth={1.4} />
      {[40, 56, 72].map((x) => (
        <SketchEllipse key={x} seedKey={`p1/overlay/dot/${x}`} cx={x} cy={41} w={9} h={9} stroke={primary} strokeWidth={1.4} />
      ))}
      <Label x={170} y={88} size={18}>
        หน้าจอจ่ายเงิน
      </Label>
      <SketchRect seedKey="p1/overlay/button" x={110} y={176} w={120} h={58} rounded stroke={primary} strokeWidth={2} />
      <SketchRect seedKey="p1/overlay/cover" x={64} y={158} w={212} h={40} rounded stroke={warning} strokeWidth={2.2} fill={warning} fillStyle="hachure" dashed />
      <Label x={170} y={140} fill={INK} halo>
        แถบทับ
      </Label>
      <Label x={170} y={224}>
        จ่ายเงิน
      </Label>

      <SketchRect seedKey="p1/overlay/card" x={332} y={70} w={112} h={190} rounded stroke={success} strokeWidth={2} />
      <Label x={388} y={96} weight={600}>
        unit test
      </Label>
      {[140, 176, 212].map((y) => (
        <g key={y}>
          <SketchPath seedKey={`p1/overlay/tick/${y}`} d={`M346 ${y} l7 7 l14 -16`} stroke={success} strokeWidth={2.4} />
          <Label x={378} y={y} anchor="start" fill={success}>
            ผ่าน
          </Label>
        </g>
      ))}
      <Label x={388} y={240} fill={success} weight={600}>
        ผ่านหมด
      </Label>
    </Frame>
  );
}

const FLOW = [
  { x: 20, y: 30, title: 'ผู้ใช้จำลอง', detail: 'เปิด /shop · กดเพิ่มชา', role: 'primary' },
  { x: 250, y: 30, title: 'เบราว์เซอร์จริง', detail: 'คลิกที่ปุ่ม', role: 'primary' },
  { x: 250, y: 204, title: 'แอป Next.js', detail: 'อัปเดตตะกร้า', role: 'neutral' },
  { x: 20, y: 204, title: 'ผลที่เห็น', detail: 'ตะกร้า (1)', role: 'primary' },
] as const;

/** The parts of an end-to-end test, in the course's /shop example; `highlight` marks the step under discussion. */
export function E2EFlow({ highlight }: { highlight?: number }) {
  return (
    <Frame label="ผู้ใช้จำลอง เบราว์เซอร์จริง แอป Next.js และผลที่เห็น">
      {FLOW.map((step, index) => {
        const lit = highlight === index;
        return (
          <g key={step.title}>
            <SketchRect
              seedKey={`e2e/box/${index}`}
              x={step.x}
              y={step.y}
              w={190}
              h={96}
              rounded
              stroke={lit ? roleColour('accent') : roleColour(step.role)}
              strokeWidth={lit ? 2.8 : 1.8}
            />
            <Label x={step.x + 95} y={step.y + 32} weight={lit ? 600 : undefined}>
              {step.title}
            </Label>
            <Label x={step.x + 95} y={step.y + 62} fill={MUTED} weight={lit ? 600 : undefined}>
              {step.detail}
            </Label>
          </g>
        );
      })}
      <SketchArrow seedKey="e2e/arrow/1" x1={214} y1={78} x2={246} y2={78} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="e2e/arrow/2" x1={345} y1={130} x2={345} y2={200} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="e2e/arrow/3" x1={246} y1={252} x2={214} y2={252} stroke={INK} strokeWidth={1.8} />
    </Frame>
  );
}

/**
 * The test code sending a command to Playwright, which drives three real browsers; the return arrow is the result.
 * `wait` is the same picture with the wait for that result under the spotlight.
 */
export function ControlDiagram({ mode = 'send' }: { mode?: 'send' | 'wait' }) {
  const code = roleColour('secondary');
  const accent = roleColour('accent');
  const primary = roleColour('primary');
  const wait = mode === 'wait';
  const back = wait ? accent : EDGE;
  return (
    <Frame label="โค้ดเทสสั่ง Playwright ซึ่งสั่ง Chromium Firefox และ WebKit">
      <SketchRect seedKey="cd/code" x={14} y={36} w={132} h={128} rounded stroke={code} strokeWidth={2} />
      <Label x={80} y={86}>
        โค้ดเทส
      </Label>
      <Label x={80} y={114} fill={MUTED}>
        page.goto
      </Label>

      <SketchRect seedKey="cd/playwright" x={178} y={54} w={116} h={92} rounded stroke={accent} strokeWidth={2.2} />
      <Label x={236} y={100} weight={600}>
        Playwright
      </Label>

      {[
        { y: 30, name: 'Chromium' },
        { y: 102, name: 'Firefox' },
        { y: 174, name: 'WebKit' },
      ].map((browser) => (
        <g key={browser.name}>
          <SketchRect seedKey={`cd/browser/${browser.name}`} x={316} y={browser.y} w={130} h={56} rounded stroke={primary} strokeWidth={1.8} />
          <Label x={381} y={browser.y + 28}>
            {browser.name}
          </Label>
        </g>
      ))}

      <SketchArrow seedKey="cd/send" x1={150} y1={100} x2={174} y2={100} stroke={INK} strokeWidth={1.8} />
      {[58, 130, 202].map((y) => (
        <SketchArrow key={y} seedKey={`cd/fan/${y}`} x1={296} y1={100} x2={312} y2={y} stroke={EDGE} strokeWidth={1.5} />
      ))}

      <SketchLine seedKey="cd/return/1" x1={381} y1={230} x2={381} y2={288} stroke={back} strokeWidth={wait ? 2.4 : 1.5} dashed={!wait} />
      <SketchLine seedKey="cd/return/2" x1={381} y1={288} x2={86} y2={288} stroke={back} strokeWidth={wait ? 2.4 : 1.5} dashed={!wait} />
      <SketchArrow seedKey="cd/return/3" x1={86} y1={288} x2={86} y2={168} stroke={back} strokeWidth={wait ? 2.4 : 1.5} />
      <Label x={233} y={306} fill={wait ? accent : MUTED} weight={wait ? 600 : undefined}>
        {wait ? 'รอผล' : 'ผลกลับมา'}
      </Label>
    </Frame>
  );
}

const BANDS = [
  { n: 2, label: 'E2E', top: 34, bottom: 117, y: 92, count: 'น้อย' },
  { n: 1, label: 'integration', top: 117, bottom: 193, y: 158, count: 'บ้าง' },
  { n: 0, label: 'unit test', top: 193, bottom: 280, y: 240, count: 'เยอะ' },
] as const;

const bandPath = (n: number) => {
  if (n === 2) return 'M230 34 L284 117 L176 117 Z';
  if (n === 1) return 'M176 117 L284 117 L333 193 L127 193 Z';
  return 'M127 193 L333 193 L390 280 L70 280 Z';
};

/**
 * The test pyramid: many fast unit tests at the base, fewer integration tests, a few E2E at the top.
 * `overflow` draws the E2E band wider than the pyramid: the beginner's mistake of writing everything as E2E.
 */
export function TestPyramid({ highlight, overflow = false }: { highlight?: number; overflow?: boolean }) {
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  return (
    <Frame label="พีระมิดเทส: unit test ฐานกว้าง integration กลาง E2E ยอดแคบ">
      <SketchPath
        seedKey="pyramid/outline"
        d={overflow ? 'M176 117 L70 280 L390 280 L284 117' : 'M230 34 L390 280 L70 280 Z'}
        stroke={INK}
        strokeWidth={2}
      />
      <SketchLine seedKey="pyramid/line/1" x1={176} y1={117} x2={284} y2={117} stroke={INK} strokeWidth={1.4} />
      <SketchLine seedKey="pyramid/line/2" x1={127} y1={193} x2={333} y2={193} stroke={INK} strokeWidth={1.4} />

      {overflow ? (
        <SketchPath seedKey="pyramid/overflow" d="M130 34 L330 34 L284 117 L176 117 Z" stroke={warning} strokeWidth={2.4} fill={warning} fillStyle="hachure" />
      ) : highlight !== undefined ? (
        <SketchPath seedKey={`pyramid/highlight/${highlight}`} d={bandPath(highlight)} stroke={accent} strokeWidth={2.4} fill={accent} fillStyle="hachure" />
      ) : null}

      {BANDS.filter((band) => !(overflow && band.n === 2)).map((band) => (
        <Label key={band.n} x={230} y={band.y} weight={highlight === band.n ? 600 : undefined} halo>
          {band.label}
        </Label>
      ))}
      {overflow ? (
        <Label x={230} y={80} weight={600} halo>
          E2E ทุกเรื่อง
        </Label>
      ) : null}
      {BANDS.map((band) => (
        <Label key={band.count} x={400} y={band.y} anchor="start" fill={MUTED}>
          {band.count}
        </Label>
      ))}
    </Frame>
  );
}

const LEFT = ['สั่งหน้าเว็บ', 'รอเอง', 'จำลอง API'];
const RIGHT = ['ดูผล/debug', 'จัดโครงสร้าง'];

/** What Playwright does, as six labels around it; `highlight` marks the capability the slide talks about. */
export function CapabilityMap({ highlight, future = false }: { highlight?: number; future?: boolean }) {
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  const box = (index: number, x: number, y: number, label: string) => {
    const lit = highlight === index;
    const tall = index === 2;
    return (
      <g key={index}>
        <SketchRect
          seedKey={`cap/box/${index}`}
          x={x}
          y={y}
          w={index >= 3 ? 152 : 130}
          h={tall ? 68 : 56}
          rounded
          stroke={lit ? accent : INK}
          strokeWidth={lit ? 2.8 : 1.6}
        />
        <Label x={x + (index >= 3 ? 76 : 65)} y={y + (tall ? 34 : 28)} weight={lit ? 600 : undefined}>
          {label}
        </Label>
      </g>
    );
  };
  return (
    <Frame label="Playwright อยู่กลาง ล้อมด้วยความสามารถ สั่งหน้าเว็บ รอเอง จำลอง API ดูผล จัดโครงสร้าง และรันขนาน">
      <SketchEllipse seedKey="cap/centre" cx={220} cy={149} w={128} h={76} stroke={accent} strokeWidth={2.4} />
      <Label x={220} y={149} size={18} weight={600}>
        Playwright
      </Label>

      {LEFT.map((label, index) => box(index, 14, index === 2 ? 204 : 26 + index * 94, label))}
      {RIGHT.map((label, index) => box(3 + index, 294, 26 + index * 94, label))}

      <SketchRect seedKey="cap/box/5" x={294} y={204} w={152} h={68} rounded stroke={highlight === 5 ? accent : INK} strokeWidth={highlight === 5 ? 2.8 : 1.6} />
      <Label x={370} y={224} weight={highlight === 5 ? 600 : undefined}>
        รันขนาน
      </Label>
      <Label x={370} y={252} weight={highlight === 5 ? 600 : undefined}>
        หลายเบราว์เซอร์
      </Label>

      {future ? (
        <g>
          <SketchRect seedKey="cap/future" x={160} y={284} w={120} h={34} rounded stroke={warning} strokeWidth={1.8} dashed />
          <Label x={220} y={301} fill={warning}>
            ต่อยอด
          </Label>
        </g>
      ) : null}
    </Frame>
  );
}

/** The five parts inside the Playwright box, drawn as one toolbox: the picture of the "what is in the box" slide. */
export function Toolbox() {
  const secondary = roleColour('secondary');
  const parts = [
    { x: 36, y: 66, w: 176, label: 'test runner' },
    { x: 248, y: 66, w: 176, label: 'locator' },
    { x: 36, y: 148, w: 176, label: 'action' },
    { x: 248, y: 148, w: 176, label: 'expect' },
    { x: 118, y: 230, w: 224, label: 'เครื่องมือดูผล' },
  ];
  return (
    <Frame label="ในกล่อง Playwright มี test runner locator action expect และเครื่องมือดูผล">
      <Label x={230} y={24} size={18} weight={600} fill={roleColour('accent')}>
        Playwright
      </Label>
      <SketchRect seedKey="toolbox/box" x={14} y={42} w={432} h={270} rounded stroke={EDGE} strokeWidth={1.6} dashed />
      {parts.map((part, index) => (
        <g key={part.label}>
          <SketchRect seedKey={`toolbox/part/${index}`} x={part.x} y={part.y} w={part.w} h={index === 4 ? 56 : 64} rounded stroke={secondary} strokeWidth={1.6} />
          <Label x={part.x + part.w / 2} y={part.y + (index === 4 ? 28 : 32)}>
            {part.label}
          </Label>
        </g>
      ))}
    </Frame>
  );
}
