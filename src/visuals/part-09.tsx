// Drawings for Part 9: login repeated by every test, the shared session file, the shop flow,
// the four special situations, what to learn next and the map of the course.
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

/** The hook: four tests in a row, each one going through the same login before it can reach checkout. */
export function LoginRepeat() {
  const secondary = roleColour('secondary');
  const warning = roleColour('warning');
  const neutral = roleColour('neutral');
  const rows = [34, 100, 166, 232];
  return (
    <Frame label="เทสสี่อันติดกัน แต่ละอันต้อง login ใหม่ก่อนถึง checkout">
      {['เทส', 'login', 'checkout'].map((name, index) => (
        <Label key={name} x={[69, 222, 378][index]} y={20} fill={MUTED}>
          {name}
        </Label>
      ))}
      {rows.map((y, index) => (
        <g key={y}>
          <SketchRect seedKey={`loginrepeat/test/${index}`} x={14} y={y} w={110} h={52} rounded stroke={secondary} strokeWidth={1.8} />
          <Label x={69} y={y + 26}>
            เทส {index + 1}
          </Label>
          <SketchRect seedKey={`loginrepeat/login/${index}`} x={170} y={y} w={104} h={52} rounded stroke={warning} strokeWidth={2} />
          <Label x={222} y={y + 26}>
            login
          </Label>
          <SketchRect seedKey={`loginrepeat/checkout/${index}`} x={310} y={y} w={136} h={52} rounded stroke={neutral} strokeWidth={1.6} />
          <Label x={378} y={y + 26}>
            checkout
          </Label>
          <SketchArrow seedKey={`loginrepeat/arrow/a/${index}`} x1={128} y1={y + 26} x2={166} y2={y + 26} stroke={INK} strokeWidth={1.6} />
          <SketchArrow seedKey={`loginrepeat/arrow/b/${index}`} x1={278} y1={y + 26} x2={306} y2={y + 26} stroke={INK} strokeWidth={1.6} />
        </g>
      ))}
      <Label x={230} y={308} fill={MUTED}>
        อีก 46 เทส
      </Label>
    </Frame>
  );
}

/**
 * One login in the setup project is written to user.json, and every test in the chromium project starts from that file.
 * `highlight` marks the part under discussion; `leak` draws the mistake of committing the file.
 */
export function AuthShare({ highlight, leak = false }: { highlight?: 'setup' | 'file' | 'tests' | 'projects'; leak?: boolean }) {
  const primary = roleColour('primary');
  const secondary = roleColour('secondary');
  const accent = roleColour('accent');
  const danger = roleColour('danger');
  const setupLit = !leak && (highlight === 'setup' || highlight === 'projects');
  const fileLit = !leak && highlight === 'file';
  const testsLit = !leak && (highlight === 'tests' || highlight === 'projects');
  const frameLit = !leak && highlight === 'projects';
  const fileStroke = leak ? danger : fileLit ? accent : primary;
  return (
    <Frame label={leak ? 'ไฟล์ user.json ถูก commit ขึ้น git' : 'setup login ครั้งเดียว เก็บลง user.json แล้วเทสทุกอันใช้ซ้ำ'}>
      <SketchRect
        seedKey="authshare/setup"
        x={14}
        y={26}
        w={176}
        h={72}
        rounded
        stroke={setupLit ? accent : secondary}
        strokeWidth={setupLit ? 2.8 : 1.8}
      />
      <Label x={102} y={49} weight={setupLit ? 600 : undefined}>
        setup project
      </Label>
      <Label x={102} y={75} fill={MUTED} weight={setupLit ? 600 : undefined}>
        login 1 ครั้ง
      </Label>

      <SketchArrow seedKey="authshare/arrow/file" x1={192} y1={62} x2={306} y2={62} stroke={INK} strokeWidth={1.8} />
      <Label x={249} y={44} fill={MUTED}>
        เก็บ
      </Label>

      <SketchRect seedKey="authshare/file" x={310} y={30} w={136} h={64} rounded stroke={fileStroke} strokeWidth={fileLit || leak ? 2.8 : 1.8} />
      <Label x={378} y={49} weight={fileLit ? 600 : undefined}>
        user.json
      </Label>
      <Label x={378} y={75} fill={MUTED}>
        cookies
      </Label>

      <SketchArrow seedKey="authshare/dep" x1={102} y1={98} x2={102} y2={154} stroke={frameLit ? accent : INK} strokeWidth={frameLit ? 2.4 : 1.6} />
      <Label x={112} y={126} anchor="start" fill={frameLit ? accent : MUTED} weight={frameLit ? 600 : undefined}>
        dependencies
      </Label>

      <SketchRect
        seedKey="authshare/chromium"
        x={14}
        y={158}
        w={252}
        h={150}
        rounded
        stroke={frameLit ? accent : EDGE}
        strokeWidth={frameLit ? 2.6 : 1.6}
        dashed
      />
      <Label x={140} y={176} fill={frameLit ? accent : MUTED} weight={frameLit ? 600 : undefined}>
        chromium project
      </Label>
      {[190, 232, 274].map((y, index) => (
        <g key={y}>
          <SketchRect
            seedKey={`authshare/test/${index}`}
            x={26}
            y={y}
            w={228}
            h={34}
            rounded
            stroke={testsLit ? accent : secondary}
            strokeWidth={testsLit ? 2.6 : 1.6}
          />
          <Label x={140} y={y + 17} weight={testsLit ? 600 : undefined}>
            เทส {index + 1}
          </Label>
        </g>
      ))}

      {leak ? (
        <g>
          <SketchArrow seedKey="authshare/leak/arrow" x1={378} y1={94} x2={378} y2={146} stroke={danger} strokeWidth={2.2} />
          <Label x={370} y={120} anchor="end" fill={danger} weight={600}>
            ติดไปด้วย
          </Label>
          <SketchRect seedKey="authshare/git" x={300} y={150} w={146} h={64} rounded stroke={danger} strokeWidth={2.4} />
          <Label x={373} y={182} fill={danger} weight={600}>
            git commit
          </Label>
        </g>
      ) : (
        <g>
          <SketchLine seedKey="authshare/reuse/1" x1={378} y1={94} x2={378} y2={122} stroke={primary} strokeWidth={1.8} dashed />
          <SketchLine seedKey="authshare/reuse/2" x1={378} y1={122} x2={252} y2={122} stroke={primary} strokeWidth={1.8} dashed />
          <SketchArrow seedKey="authshare/reuse/3" x1={252} y1={122} x2={252} y2={154} stroke={primary} strokeWidth={1.8} />
          <Label x={310} y={108} fill={primary}>
            storageState
          </Label>
        </g>
      )}
    </Frame>
  );
}

const FLOW_STEPS = [
  { x: 12, label: 'เลือกสินค้า', role: 'neutral', tag: 'Part 3–4' },
  { x: 166, label: 'ตะกร้า', role: 'neutral', tag: 'Part 5 · 8' },
  { x: 320, label: 'ชำระเงิน', role: 'neutral', tag: 'Part 5' },
  { x: 320, label: 'login', role: 'primary', tag: 'Part 9' },
  { x: 166, label: 'ยืนยัน', role: 'neutral', tag: 'Part 8' },
  { x: 12, label: 'สำเร็จ', role: 'success', tag: 'Part 5' },
] as const;

/**
 * The full shop story: choose products, cart, checkout, the login detour, confirm and success.
 * `highlight` marks a step; `annotate` adds the Part that taught the tool used at that step.
 */
export function ShopFlow({ highlight, annotate = false }: { highlight?: number; annotate?: boolean }) {
  return (
    <Frame label="เลือกสินค้า ตะกร้า ชำระเงิน login ยืนยัน สำเร็จ">
      {FLOW_STEPS.map((step, index) => {
        const row = index < 3 ? 30 : 210;
        const lit = highlight === index;
        const role = step.role === 'success' ? roleColour('success') : step.role === 'primary' ? roleColour('primary') : roleColour('neutral');
        return (
          <g key={step.label}>
            <SketchRect
              seedKey={`shopflow/box/${index}`}
              x={step.x}
              y={row}
              w={128}
              h={56}
              rounded
              stroke={lit ? roleColour('accent') : role}
              strokeWidth={lit ? 2.8 : 1.8}
            />
            {index === 3 ? (
              <g>
                <Label x={step.x + 64} y={row + 19} weight={lit ? 600 : undefined}>
                  login
                </Label>
                <Label x={step.x + 64} y={row + 45} fill={MUTED}>
                  กลับ checkout
                </Label>
              </g>
            ) : (
              <Label x={step.x + 64} y={row + 28} weight={lit ? 600 : undefined}>
                {step.label}
              </Label>
            )}
            {annotate ? (
              <Label x={step.x + 64} y={row + 74} fill={MUTED}>
                {step.tag}
              </Label>
            ) : null}
          </g>
        );
      })}

      <SketchArrow seedKey="shopflow/arrow/1" x1={142} y1={58} x2={162} y2={58} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="shopflow/arrow/2" x1={296} y1={58} x2={316} y2={58} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="shopflow/arrow/3" x1={436} y1={88} x2={436} y2={206} stroke={INK} strokeWidth={1.8} />
      <Label x={426} y={146} anchor="end" fill={MUTED}>
        ยังไม่ login
      </Label>
      <SketchArrow seedKey="shopflow/arrow/4" x1={316} y1={238} x2={298} y2={238} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="shopflow/arrow/5" x1={162} y1={238} x2={144} y2={238} stroke={INK} strokeWidth={1.8} />
    </Frame>
  );
}

const SPECIAL = [
  { x: 14, y: 24, label: 'dialog' },
  { x: 240, y: 24, label: 'แท็บใหม่' },
  { x: 14, y: 170, label: 'iframe' },
  { x: 240, y: 170, label: 'ดาวน์โหลด' },
];

/** The four situations a real app throws at a test, as four labelled cards. */
export function SpecialCases() {
  const primary = roleColour('primary');
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  return (
    <Frame label="dialog แท็บใหม่ iframe และดาวน์โหลด">
      {SPECIAL.map((card) => {
        const x = card.x;
        const y = card.y;
        return (
          <g key={card.label}>
            <SketchRect seedKey={`special/${card.label}/card`} x={x} y={y} w={206} h={130} rounded stroke={EDGE} strokeWidth={1.6} />
            <Label x={x + 103} y={y + 112}>
              {card.label}
            </Label>
          </g>
        );
      })}

      <SketchRect seedKey="special/dialog/window" x={38} y={42} w={76} h={42} rounded stroke={primary} strokeWidth={1.8} />
      <SketchLine seedKey="special/dialog/bar" x1={38} y1={54} x2={114} y2={54} stroke={primary} strokeWidth={1.2} />
      {[46, 54, 62].map((x) => (
        <SketchEllipse key={x} seedKey={`special/dialog/dot/${x}`} cx={x} cy={48} w={5} h={5} stroke={primary} strokeWidth={1} />
      ))}
      <SketchRect seedKey="special/dialog/alert" x={96} y={66} w={62} h={30} rounded stroke={warning} strokeWidth={2} fill={warning} fillStyle="hachure" />
      <Label x={127} y={81} halo>
        OK
      </Label>

      <SketchRect seedKey="special/popup/back" x={266} y={42} w={72} h={40} rounded stroke={primary} strokeWidth={1.6} />
      <SketchLine seedKey="special/popup/backbar" x1={266} y1={54} x2={338} y2={54} stroke={primary} strokeWidth={1} />
      <SketchRect seedKey="special/popup/front" x={298} y={60} w={82} h={44} rounded stroke={accent} strokeWidth={2} />
      <SketchLine seedKey="special/popup/frontbar" x1={298} y1={72} x2={380} y2={72} stroke={accent} strokeWidth={1.2} />

      <SketchRect seedKey="special/iframe/outer" x={42} y={188} w={100} h={62} rounded stroke={primary} strokeWidth={1.8} />
      <SketchRect seedKey="special/iframe/inner" x={56} y={202} w={72} h={34} rounded stroke={accent} strokeWidth={2} dashed />

      <SketchRect seedKey="special/download/window" x={264} y={188} w={76} h={40} rounded stroke={primary} strokeWidth={1.6} />
      <SketchLine seedKey="special/download/bar" x1={264} y1={200} x2={340} y2={200} stroke={primary} strokeWidth={1} />
      <SketchArrow seedKey="special/download/arrow" x1={302} y1={230} x2={302} y2={242} stroke={INK} strokeWidth={1.8} />
      <SketchRect seedKey="special/download/file" x={280} y={246} w={44} h={26} rounded stroke={accent} strokeWidth={1.8} />
    </Frame>
  );
}

const NEXT = [
  { x: 14, y: 28, n: 1, top: 'CI', bottom: 'GitHub Actions' },
  { x: 242, y: 28, n: 2, top: 'หลายเบราว์เซอร์', bottom: 'sharding' },
  { x: 14, y: 174, n: 3, top: 'visual snapshot', bottom: 'toHaveScreenshot' },
  { x: 242, y: 174, n: 4, top: 'component testing', bottom: 'ทดสอบ component' },
];

/** Four things the course leaves out, as cards; `numbered` shows the order to take them. */
export function NextSteps({ numbered = false }: { numbered?: boolean }) {
  const primary = roleColour('primary');
  return (
    <Frame label="CI หลายเบราว์เซอร์ visual snapshot component testing">
      {NEXT.map((item) => (
        <g key={item.n}>
          <SketchRect seedKey={`next/card/${item.n}`} x={item.x} y={item.y} w={204} h={100} rounded stroke={primary} strokeWidth={1.8} />
          <Label x={item.x + 102} y={item.y + 37} weight={600}>
            {item.top}
          </Label>
          <Label x={item.x + 102} y={item.y + 63} fill={MUTED}>
            {item.bottom}
          </Label>
          {numbered ? (
            <g>
              <SketchEllipse seedKey={`next/n/${item.n}`} cx={item.x + 18} cy={item.y + 18} w={26} h={26} stroke={primary} strokeWidth={1.6} />
              <Label x={item.x + 18} y={item.y + 18} size={16} weight={600}>
                {item.n}
              </Label>
            </g>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

const COURSE = ['1 E2E', '2 ติดตั้ง', '3 หา element', '4 สั่ง', '5 ตรวจ/รอ', '6 ดูผล', '7 mock API', '8 จัดโครง', '9 login'];

/** The nine Parts as a 3×3 map, the last one lit: where the course ends. */
export function CourseMap() {
  const accent = roleColour('accent');
  const neutral = roleColour('neutral');
  return (
    <Frame label="แผนที่เก้า Part ของคอร์ส">
      {COURSE.map((label, index) => {
        const x = 14 + (index % 3) * 152;
        const y = 24 + Math.floor(index / 3) * 108;
        const current = index === 8;
        return (
          <g key={label}>
            <SketchRect
              seedKey={`coursemap/tile/${index}`}
              x={x}
              y={y}
              w={128}
              h={64}
              rounded
              stroke={current ? accent : neutral}
              strokeWidth={current ? 2.6 : 1.6}
              fill={current ? accent : undefined}
              fillStyle="dots"
            />
            <Label x={x + 64} y={y + 32} weight={current ? 600 : undefined} halo={current}>
              {label}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

const BANDS = [
  { label: 'flow', y: 78, count: 'น้อย' },
  { label: 'integration', y: 155, count: 'บ้าง' },
  { label: 'unit test', y: 237, count: 'เยอะ' },
];

/** The test pyramid, with full flows at the narrow top: they are the fewest tests. */
export function FlowPyramid() {
  const accent = roleColour('accent');
  return (
    <Frame label="พีระมิดเทส: flow เต็มยอดแคบ integration กลาง unit test ฐานกว้าง">
      <SketchPath seedKey="flowpyramid/outline" d="M230 34 L390 280 L70 280 Z" stroke={INK} strokeWidth={2} />
      <SketchPath seedKey="flowpyramid/top" d="M230 34 L284 117 L176 117 Z" stroke={accent} strokeWidth={2.4} fill={accent} fillStyle="dots" />
      <SketchLine seedKey="flowpyramid/line/1" x1={176} y1={117} x2={284} y2={117} stroke={INK} strokeWidth={1.4} />
      <SketchLine seedKey="flowpyramid/line/2" x1={127} y1={193} x2={333} y2={193} stroke={INK} strokeWidth={1.4} />
      {BANDS.map((band) => (
        <g key={band.label}>
          <Label x={230} y={band.y} weight={band.label === 'flow' ? 600 : undefined} halo>
            {band.label}
          </Label>
          <Label x={440} y={band.y} anchor="end" fill={MUTED}>
            {band.count}
          </Label>
        </g>
      ))}
    </Frame>
  );
}
