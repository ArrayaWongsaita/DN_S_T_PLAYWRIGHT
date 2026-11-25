// Drawings for Part 3: the test skeleton, baseURL + path, the missing await, the locator ladder,
// the page with its locators, the email field, the match boxes and the two buttons of name/exact.
// Labels only: sentences stay in the slide's text.
import type { ReactNode } from 'react';
import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchRect } from '../components';

const INK = '#2b2b2b';
const MUTED = '#646464';
const EDGE = '#b5b5b5';

function Frame({ label, children, width = 460, height = 330 }: { label: string; children: ReactNode; width?: number; height?: number }) {
  return (
    <svg className="rs-figure" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} fontFamily="var(--rs-font)">
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

/**
 * The skeleton of a test: one `test( )` box holding the page, goto and expect.
 * `highlight` puts the one part the slide talks about under the spotlight.
 */
export function TestAnatomyFig({ highlight }: { highlight?: 'page' | 'goto' | 'expect' }) {
  const secondary = roleColour('secondary');
  const accent = roleColour('accent');
  const rows = [
    { key: 'page' as const, y: 74, h: 66, label: 'page', note: 'หน้าใหม่ทุกเทส', base: roleColour('primary') },
    { key: 'goto' as const, y: 158, h: 58, label: 'goto', note: '', base: secondary },
    { key: 'expect' as const, y: 232, h: 58, label: 'expect', note: '', base: secondary },
  ];
  return (
    <Frame label="กล่อง test มี page goto และ expect อยู่ข้างใน">
      <SketchRect seedKey="p3/anatomy/card" x={14} y={24} w={432} h={292} rounded stroke={EDGE} strokeWidth={1.6} />
      <SketchLine seedKey="p3/anatomy/header" x1={14} y1={56} x2={446} y2={56} stroke={EDGE} strokeWidth={1.4} />
      <Label x={230} y={40} size={18} fill={secondary} weight={600}>
        test
      </Label>
      {rows.map((row) => {
        const lit = highlight === row.key;
        return (
          <g key={row.key}>
            <SketchRect
              seedKey={`p3/anatomy/row/${row.key}`}
              x={44}
              y={row.y}
              w={372}
              h={row.h}
              rounded
              stroke={lit ? accent : row.base}
              strokeWidth={lit ? 3.2 : 2}
            />
            <Label x={230} y={row.y + (row.note ? 26 : row.h / 2)} size={18} weight={lit ? 600 : undefined} fill={INK}>
              {row.label}
            </Label>
            {row.note ? (
              <Label x={230} y={row.y + 53} fill={lit ? INK : MUTED} weight={lit ? 600 : undefined}>
                {row.note}
              </Label>
            ) : null}
          </g>
        );
      })}
      <SketchArrow seedKey="p3/anatomy/arrow/1" x1={230} y1={144} x2={230} y2={154} stroke={INK} strokeWidth={1.8} />
      <SketchArrow seedKey="p3/anatomy/arrow/2" x1={230} y1={220} x2={230} y2={228} stroke={INK} strokeWidth={1.8} />
    </Frame>
  );
}

/** baseURL plus the path in the code, joined into the URL Playwright opens. */
export function BaseUrlFig() {
  const primary = roleColour('primary');
  return (
    <Frame label="baseURL บวก path ต่อกันเป็น URL ที่ Playwright เปิด">
      <SketchRect seedKey="p3/baseurl/base" x={14} y={18} w={432} h={72} rounded stroke={primary} strokeWidth={1.8} />
      <Label x={230} y={42} fill={MUTED}>
        baseURL
      </Label>
      <Label x={230} y={70}>
        http://localhost:3100
      </Label>

      <Label x={230} y={104} size={20} fill={MUTED}>
        +
      </Label>

      <SketchRect seedKey="p3/baseurl/path" x={14} y={118} w={432} h={72} rounded stroke={roleColour('secondary')} strokeWidth={1.8} />
      <Label x={230} y={142} fill={MUTED}>
        path
      </Label>
      <Label x={230} y={170}>
        /lessons/01-first-test
      </Label>

      <SketchArrow seedKey="p3/baseurl/arrow" x1={230} y1={192} x2={230} y2={210} stroke={INK} strokeWidth={1.8} />

      <SketchRect seedKey="p3/baseurl/result" x={14} y={214} w={432} h={92} rounded stroke={primary} strokeWidth={2.2} />
      <Label x={230} y={236} fill={MUTED}>
        URL ที่เปิด
      </Label>
      <Label x={230} y={262} fill={primary} weight={600}>
        http://localhost:3100/
      </Label>
      <Label x={230} y={288} fill={primary} weight={600}>
        lessons/01-first-test
      </Label>
    </Frame>
  );
}

/** The expect line with no await: the test moves on, the browser has not answered, and the run ends as Test ended. */
export function NoAwaitFig() {
  const warning = roleColour('warning');
  const danger = roleColour('danger');
  return (
    <Frame label="บรรทัด expect ที่ไม่มี await เทสไปต่อทันทีและจบเป็น Test ended">
      <SketchRect seedKey="p3/noawait/code" x={14} y={14} w={300} h={186} rounded stroke={roleColour('secondary')} strokeWidth={1.8} />
      <SketchLine seedKey="p3/noawait/header" x1={14} y1={46} x2={314} y2={46} stroke={EDGE} strokeWidth={1.4} />
      <Label x={164} y={30} size={18} fill={roleColour('secondary')} weight={600}>
        test
      </Label>
      <Label x={30} y={66} anchor="start" fill={MUTED}>
        await page.goto(…)
      </Label>
      <SketchRect seedKey="p3/noawait/line" x={24} y={82} w={280} h={62} rounded stroke={warning} strokeWidth={3} />
      <Label x={36} y={102} anchor="start">
        expect(page)
      </Label>
      <Label x={36} y={128} anchor="start">
        .toHaveTitle(…)
      </Label>
      <Label x={30} y={168} anchor="start" fill={MUTED}>
        {'});'}
      </Label>

      <SketchRect seedKey="p3/noawait/browser" x={326} y={48} w={120} h={100} rounded stroke={roleColour('primary')} strokeWidth={1.8} />
      <Label x={386} y={72}>
        หน้าเว็บ
      </Label>
      <Label x={386} y={116} fill={MUTED}>
        โหลดอยู่
      </Label>
      <SketchArrow seedKey="p3/noawait/send" x1={306} y1={116} x2={322} y2={110} stroke={warning} strokeWidth={1.8} dashed />

      <SketchRect seedKey="p3/noawait/ended" x={14} y={274} w={432} h={44} rounded stroke={danger} strokeWidth={2.2} />
      <Label x={230} y={296} size={18} fill={danger} weight={600}>
        Test ended
      </Label>
      <SketchArrow seedKey="p3/noawait/skip" x1={164} y1={202} x2={164} y2={272} stroke={warning} strokeWidth={2} />
      <Label x={194} y={237} anchor="start" fill={warning} weight={600}>
        ไม่รอ
      </Label>
      <SketchLine seedKey="p3/noawait/pending/1" x1={386} y1={148} x2={386} y2={184} stroke={MUTED} strokeWidth={1.6} dashed />
      <Label x={386} y={204} fill={MUTED}>
        ยังไม่ตอบ
      </Label>
      <SketchArrow seedKey="p3/noawait/pending/2" x1={386} y1={224} x2={386} y2={272} stroke={MUTED} strokeWidth={1.6} dashed />
    </Frame>
  );
}

const LADDER = ['getByRole', 'getByLabel', 'getByPlaceholder', 'getByText', 'getByTestId'];

/** The locator ladder, from the one to try first to the last resort; `highlight` lights one rung. */
export function LocatorLadder({ highlight }: { highlight?: number }) {
  const accent = roleColour('accent');
  return (
    <Frame label="บันได locator: getByRole getByLabel getByPlaceholder getByText getByTestId">
      <SketchLine seedKey="p3/ladder/rail/left" x1={24} y1={18} x2={24} y2={312} stroke={EDGE} strokeWidth={1.6} />
      <SketchLine seedKey="p3/ladder/rail/right" x1={436} y1={18} x2={436} y2={312} stroke={EDGE} strokeWidth={1.6} />
      {LADDER.map((method, index) => {
        const y = 26 + index * 56;
        const lit = highlight === index || (highlight === undefined && index === 0);
        const last = index === LADDER.length - 1;
        return (
          <g key={method}>
            <SketchRect
              seedKey={`p3/ladder/rung/${index}`}
              x={24}
              y={y}
              w={412}
              h={44}
              rounded
              stroke={lit ? accent : last ? MUTED : INK}
              strokeWidth={lit ? 3.2 : 1.8}
              dashed={last && !lit}
            />
            <SketchEllipse seedKey={`p3/ladder/number/${index}`} cx={60} cy={y + 22} w={30} h={30} stroke={lit ? accent : MUTED} strokeWidth={lit ? 2.4 : 1.8} />
            <Label x={60} y={y + 22} size={16} fill={lit ? INK : MUTED} weight={lit ? 600 : undefined}>
              {String(index + 1)}
            </Label>
            <Label x={270} y={y + 22} size={18} weight={lit ? 600 : undefined} fill={INK}>
              {method}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

type PagePart = 'button' | 'text' | 'field';

/** A mock page with the three things a locator can name; `highlight` marks the one under discussion. */
export function PageMap({ highlight }: { highlight?: PagePart }) {
  const accent = roleColour('accent');
  const primary = roleColour('primary');
  const tag = (part: PagePart) => (highlight === undefined ? accent : highlight === part ? accent : MUTED);
  const lit = (part: PagePart) => highlight === part;
  return (
    <Frame label="หน้าเว็บจำลอง มีปุ่ม เพิ่ม ข้อความราคา และช่องอีเมล พร้อมป้าย getBy">
      <SketchRect seedKey="p3/pagemap/window" x={14} y={18} w={432} h={294} rounded stroke={primary} strokeWidth={2} />
      <SketchLine seedKey="p3/pagemap/header" x1={14} y1={58} x2={446} y2={58} stroke={primary} strokeWidth={1.4} />
      {[32, 50, 68].map((cx) => (
        <SketchEllipse key={cx} seedKey={`p3/pagemap/dot/${cx}`} cx={cx} cy={38} w={9} h={9} stroke={primary} strokeWidth={1.4} />
      ))}
      <Label x={230} y={38} size={18} weight={600}>
        หน้าเว็บ
      </Label>

      <SketchRect
        seedKey="p3/pagemap/button"
        x={34}
        y={86}
        w={120}
        h={52}
        rounded
        stroke={lit('button') ? accent : primary}
        strokeWidth={lit('button') ? 3 : 2}
      />
      <Label x={94} y={112} size={18} fill={INK} weight={lit('button') ? 600 : undefined}>
        เพิ่ม
      </Label>
      <Label x={250} y={112} anchor="start" size={18} fill={tag('button')} weight={lit('button') ? 600 : undefined}>
        getByRole
      </Label>
      <SketchArrow seedKey="p3/pagemap/arrow/button" x1={246} y1={112} x2={160} y2={112} stroke={tag('button')} strokeWidth={1.8} />

      <Label x={34} y={190} anchor="start" size={18} fill={lit('text') ? accent : INK} weight={lit('text') ? 600 : undefined}>
        ราคา 250 บาท
      </Label>
      <Label x={250} y={190} anchor="start" size={18} fill={tag('text')} weight={lit('text') ? 600 : undefined}>
        getByText
      </Label>
      <SketchArrow seedKey="p3/pagemap/arrow/text" x1={246} y1={190} x2={174} y2={190} stroke={tag('text')} strokeWidth={1.8} />

      <Label x={34} y={242} anchor="start" fill={lit('field') ? accent : MUTED} weight={lit('field') ? 600 : undefined}>
        อีเมล
      </Label>
      <SketchRect
        seedKey="p3/pagemap/input"
        x={34}
        y={254}
        w={180}
        h={44}
        rounded
        stroke={lit('field') ? accent : INK}
        strokeWidth={lit('field') ? 3 : 1.8}
      />
      <Label x={46} y={276} anchor="start" fill={lit('field') ? INK : MUTED} weight={lit('field') ? 600 : undefined}>
        you@example.com
      </Label>
      <Label x={250} y={276} anchor="start" size={18} fill={tag('field')} weight={lit('field') ? 600 : undefined}>
        getByLabel
      </Label>
      <SketchArrow seedKey="p3/pagemap/arrow/field" x1={246} y1={276} x2={220} y2={276} stroke={tag('field')} strokeWidth={1.8} />
    </Frame>
  );
}

/** One email field: a label above it and a placeholder inside; `highlight` marks which one the locator uses. */
export function EmailField({ highlight }: { highlight?: 'label' | 'placeholder' }) {
  const accent = roleColour('accent');
  return (
    <Frame label="ช่องอีเมล มี label อยู่ข้างบน และ placeholder อยู่ในช่อง" width={380} height={120}>
      <Label x={16} y={24} anchor="start" size={18} fill={highlight === 'label' ? accent : INK} weight={highlight === 'label' ? 600 : undefined}>
        อีเมล
      </Label>
      <SketchRect seedKey="p3/email/input" x={16} y={42} w={348} h={58} rounded stroke={highlight === 'placeholder' ? accent : EDGE} strokeWidth={highlight === 'placeholder' ? 2.8 : 1.8} />
      <Label x={30} y={71} anchor="start" fill={highlight === 'placeholder' ? INK : MUTED} weight={highlight === 'placeholder' ? 600 : undefined}>
        you@example.com
      </Label>
    </Frame>
  );
}

type MatchHighlight = 'none' | 'both' | 'banana';

/** The list with two rows and two "ลบ" buttons; `highlight` marks both, or the banana row and its button. */
export function MatchBoxes({ highlight = 'none', count = false, tone = 'accent' }: { highlight?: MatchHighlight; count?: boolean; tone?: 'accent' | 'warning' }) {
  const colour = roleColour(tone);
  const row = (name: string, y: number, banana: boolean) => {
    const lit = highlight === 'both' ? false : highlight === 'banana' && banana;
    const buttonLit = highlight === 'both' || (highlight === 'banana' && banana);
    return (
      <g key={name}>
        <SketchRect
          seedKey={`p3/match/row/${name}`}
          x={34}
          y={y}
          w={392}
          h={76}
          rounded
          stroke={lit ? colour : INK}
          strokeWidth={lit ? 3.2 : 1.6}
        />
        <Label x={52} y={y + 38} anchor="start" size={18} fill={INK} weight={lit ? 600 : undefined}>
          {name}
        </Label>
        <SketchRect
          seedKey={`p3/match/button/${name}`}
          x={336}
          y={y + 14}
          w={72}
          h={48}
          rounded
          stroke={buttonLit ? colour : INK}
          strokeWidth={buttonLit ? 3.2 : 1.8}
        />
        <Label x={372} y={y + 38} size={18} fill={INK} weight={buttonLit ? 600 : undefined}>
          ลบ
        </Label>
      </g>
    );
  };
  return (
    <Frame label="รายการของฉัน มีแอปเปิลและกล้วย แต่ละแถวมีปุ่มลบ">
      <SketchRect seedKey="p3/match/card" x={14} y={24} w={432} h={280} rounded stroke={EDGE} strokeWidth={1.6} />
      <SketchLine seedKey="p3/match/header" x1={14} y1={64} x2={446} y2={64} stroke={EDGE} strokeWidth={1.4} />
      <Label x={34} y={46} anchor="start" size={18} weight={600}>
        รายการของฉัน
      </Label>
      {count ? (
        <>
          <SketchEllipse seedKey="p3/match/count" cx={414} cy={46} w={34} h={34} stroke={colour} strokeWidth={2} />
          <Label x={414} y={46} size={18} fill={INK} weight={600}>
            2
          </Label>
        </>
      ) : null}
      {row('แอปเปิล', 82, false)}
      {row('กล้วย', 182, true)}
    </Frame>
  );
}

/** Two buttons, both matching "เพิ่ม" or only the exact one; shown beside the name/exact comparison. */
export function ButtonPair({ mode }: { mode: 'all' | 'one' }) {
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  return (
    <Frame label="สองปุ่ม เพิ่ม กับ เพิ่มลงตะกร้า" width={380} height={120}>
      <SketchRect
        seedKey="p3/buttons/one"
        x={14}
        y={14}
        w={130}
        h={50}
        rounded
        stroke={mode === 'one' ? accent : warning}
        strokeWidth={2.6}
      />
      <Label x={79} y={39} size={18} fill={INK} weight={mode === 'one' ? 600 : undefined}>
        เพิ่ม
      </Label>
      <SketchRect
        seedKey="p3/buttons/two"
        x={156}
        y={14}
        w={180}
        h={50}
        rounded
        stroke={mode === 'one' ? EDGE : warning}
        strokeWidth={mode === 'one' ? 1.6 : 2.6}
        dashed={mode === 'one'}
      />
      <Label x={246} y={39} size={18} fill={mode === 'one' ? MUTED : INK}>
        เพิ่มลงตะกร้า
      </Label>
      <Label x={200} y={94} size={18} fill={mode === 'one' ? accent : warning} weight={600}>
        {mode === 'one' ? '1' : '2'}
      </Label>
    </Frame>
  );
}

const INDEX_CELLS = ['แอปเปิล', 'กล้วย', 'มะม่วง'];
const INDEX_MARKS = ['first()', 'nth(1)', 'last()'];

/** A row of cells with positions from 0 and first/nth(1)/last pointing at them; the chosen cell is an accent outline, not a fill. */
export function IndexCells({ highlight = 1 }: { highlight?: number }) {
  const accent = roleColour('accent');
  const width = 124;
  const gap = 20;
  const left = 16;
  const top = 24;
  const height = 58;
  return (
    <Frame label="ช่อง 0 1 2 ชี้ first nth(1) last" height={220}>
      {INDEX_CELLS.map((label, index) => {
        const x = left + index * (width + gap);
        const lit = highlight === index;
        return (
          <g key={label}>
            <SketchRect
              seedKey={`p3/index/cell/${index}`}
              x={x}
              y={top}
              w={width}
              h={height}
              rounded
              stroke={lit ? accent : INK}
              strokeWidth={lit ? 3.2 : 1.8}
            />
            <Label x={x + width / 2} y={top + height / 2} size={18} fill={INK} weight={lit ? 600 : undefined}>
              {label}
            </Label>
            <Label x={x + width / 2} y={top + height + 22} fill={MUTED}>
              {String(index)}
            </Label>
          </g>
        );
      })}
      {INDEX_MARKS.map((mark, index) => {
        const cx = left + index * (width + gap) + width / 2;
        return (
          <g key={mark}>
            <SketchArrow seedKey={`p3/index/mark/${index}`} x1={cx} y1={top + height + 94} x2={cx} y2={top + height + 40} stroke={accent} strokeWidth={2} />
            <Label x={cx} y={top + height + 110} size={18} fill={accent}>
              {mark}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}
