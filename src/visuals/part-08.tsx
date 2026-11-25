// Drawings for Part 8: the describe tree with hooks and steps, the test → Page Object → page chain,
// the fixture flow, the four run-control cards and the Page Object / test split.
// Labels only: sentences stay in the slide's text.
import type { ReactNode } from 'react';
import { SketchArrow, SketchLine, SketchRect } from '../components/sketch';
import { roleColour } from '../theme/roles';

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

const TESTS = ['test: มีสินค้า 4 อย่าง', 'test: เพิ่มชา → ตะกร้า (1)', 'test: เพิ่มชา + กาแฟ → ฿130'];
const STEPS = ['step 1: เพิ่มชา', 'step 2: เพิ่มกาแฟ', 'step 3: ตรวจยอด ฿130'];

/**
 * The describe group: beforeEach and the tests inside it, with the step lines of the long test.
 * `hooks` shows the four hook boxes in place of beforeEach, `order` draws beforeEach reaching every test,
 * `steps` lights the three step lines of the third test.
 */
export function TestTree({ mode = 'tree' }: { mode?: 'tree' | 'order' | 'steps' | 'hooks' }) {
  const accent = roleColour('accent');
  const code = roleColour('secondary');
  const hooks = mode === 'hooks';
  const order = mode === 'order';
  const steps = mode === 'steps';
  return (
    <Frame label="describe กล่องเดียวบรรจุ beforeEach เทส และ hooks">
      <SketchRect seedKey="p8/tree/outer" x={12} y={12} w={436} h={306} rounded stroke={code} strokeWidth={2} />
      <Label x={230} y={30} size={18} weight={600}>
        describe หน้าร้านค้า
      </Label>

      {hooks ? (
        <>
          {[
            { x: 24, y: 46, label: 'beforeAll' },
            { x: 224, y: 46, label: 'beforeEach' },
            { x: 24, y: 98, label: 'afterEach' },
            { x: 224, y: 98, label: 'afterAll' },
          ].map((hook) => (
            <g key={hook.label}>
              <SketchRect seedKey={`p8/tree/hook/${hook.label}`} x={hook.x} y={hook.y} w={184} h={44} rounded stroke={accent} strokeWidth={2.4} />
              <Label x={hook.x + 92} y={hook.y + 22} weight={600}>
                {hook.label}
              </Label>
            </g>
          ))}
          {TESTS.map((label, index) => (
            <g key={label}>
              <SketchRect seedKey={`p8/tree/hook-test/${index}`} x={24} y={168 + index * 48} w={384} h={40} rounded stroke={EDGE} strokeWidth={1.6} />
              <Label x={216} y={188 + index * 48} fill={MUTED}>
                {label}
              </Label>
            </g>
          ))}
        </>
      ) : (
        <>
          <SketchRect seedKey="p8/tree/beforeEach" x={24} y={46} w={384} h={44} rounded stroke={order ? accent : code} strokeWidth={order ? 2.6 : 1.8} />
          <Label x={216} y={68} weight={order ? 600 : undefined}>
            beforeEach: goto /shop
          </Label>

          {TESTS.map((label, index) => {
            const y = index === 2 ? 196 : 100 + index * 48;
            const h = index === 2 ? 112 : 40;
            const lit = steps && index === 2;
            return (
              <g key={label}>
                <SketchRect seedKey={`p8/tree/test/${index}`} x={24} y={y} w={384} h={h} rounded stroke={lit ? accent : code} strokeWidth={lit ? 2.6 : 1.6} />
                <Label x={216} y={y + 22}>
                  {label}
                </Label>
                {index === 2
                  ? STEPS.map((step, stepIndex) => (
                      <Label
                        key={step}
                        x={40}
                        y={y + 48 + stepIndex * 26}
                        anchor="start"
                        fill={steps ? accent : MUTED}
                        weight={steps ? 600 : undefined}
                      >
                        {step}
                      </Label>
                    ))
                  : null}
              </g>
            );
          })}

          {order ? (
            <>
              <SketchLine seedKey="p8/tree/fan/stem" x1={408} y1={68} x2={430} y2={68} stroke={accent} strokeWidth={2} />
              <SketchLine seedKey="p8/tree/fan/spine" x1={430} y1={68} x2={430} y2={252} stroke={accent} strokeWidth={2} />
              {[120, 168, 252].map((y) => (
                <SketchArrow key={y} seedKey={`p8/tree/fan/${y}`} x1={430} y1={y} x2={412} y2={y} stroke={accent} strokeWidth={2} head={9} />
              ))}
            </>
          ) : null}
        </>
      )}
    </Frame>
  );
}

/** The chain test → class ProductListPage → the page it drives; `highlight` marks the place under discussion. */
export function POMFig({ highlight }: { highlight?: 'test' | 'class' | 'page' }) {
  const accent = roleColour('accent');
  const code = roleColour('secondary');
  const neutral = roleColour('neutral');
  const tone = (key: 'test' | 'class' | 'page') => (highlight === key ? accent : key === 'page' ? neutral : code);
  const width = (key: 'test' | 'class' | 'page') => (highlight === key ? 2.8 : 1.8);
  return (
    <Frame label="เทสเรียก class ProductListPage ซึ่งสั่งหน้า /shop">
      <SketchRect seedKey="p8/pom/test" x={70} y={16} w={320} h={64} rounded stroke={tone('test')} strokeWidth={width('test')} />
      <Label x={230} y={38} size={18} weight={600}>
        เทส
      </Label>
      <Label x={230} y={68}>
        list.add(&quot;ชา&quot;)
      </Label>

      <SketchArrow seedKey="p8/pom/arrow/1" x1={230} y1={82} x2={230} y2={116} stroke={INK} strokeWidth={1.6} />
      <Label x={244} y={99} anchor="start" fill={MUTED}>
        เรียก method
      </Label>

      <SketchRect seedKey="p8/pom/class" x={70} y={118} w={320} h={86} rounded stroke={tone('class')} strokeWidth={width('class')} />
      <Label x={230} y={146} size={18} weight={600}>
        class ProductListPage
      </Label>
      <Label x={230} y={178} fill={MUTED}>
        goto · add · cartLink
      </Label>

      <SketchArrow seedKey="p8/pom/arrow/2" x1={230} y1={206} x2={230} y2={234} stroke={INK} strokeWidth={1.6} />
      <Label x={244} y={220} anchor="start" fill={MUTED}>
        สั่งคลิก
      </Label>

      <SketchRect seedKey="p8/pom/page" x={70} y={236} w={320} h={64} rounded stroke={tone('page')} strokeWidth={width('page')} />
      <Label x={230} y={258} size={18} weight={600}>
        หน้า /shop
      </Label>
      <Label x={230} y={288} fill={MUTED}>
        ปุ่มเพิ่มสินค้า
      </Label>
    </Frame>
  );
}

/**
 * The fixture flow: the test asks for productList, Playwright builds the fixture and hands it over,
 * and the fixture wraps the real page. `import` lights the line that must come from ./fixtures.
 */
export function FixtureFlow({ highlight }: { highlight?: 'test' | 'fixture' | 'page' | 'import' }) {
  const accent = roleColour('accent');
  const code = roleColour('secondary');
  const neutral = roleColour('neutral');
  const tone = (key: 'test' | 'fixture' | 'page') => (highlight === key ? accent : key === 'page' ? neutral : code);
  const width = (key: 'test' | 'fixture' | 'page') => (highlight === key ? 2.8 : 1.8);
  return (
    <Frame label="เทสขอ productList แล้ว Playwright สร้าง fixture จาก page จริง">
      <SketchRect
        seedKey="p8/fix/import"
        x={14}
        y={14}
        w={432}
        h={44}
        rounded
        stroke={highlight === 'import' ? accent : EDGE}
        strokeWidth={highlight === 'import' ? 2.6 : 1.6}
        dashed={highlight !== 'import'}
      />
      <Label x={230} y={36} fill={highlight === 'import' ? accent : MUTED} weight={highlight === 'import' ? 600 : undefined}>
        import {'{ test, expect }'} from &quot;./fixtures&quot;
      </Label>

      <SketchRect seedKey="p8/fix/test" x={70} y={78} w={320} h={58} rounded stroke={tone('test')} strokeWidth={width('test')} />
      <Label x={230} y={98} size={18} weight={600}>
        เทส
      </Label>
      <Label x={230} y={124}>async ({'{ productList }'})</Label>

      <SketchArrow seedKey="p8/fix/ask" x1={150} y1={138} x2={150} y2={164} stroke={EDGE} strokeWidth={1.5} dashed />
      <Label x={138} y={151} anchor="end" fill={MUTED}>
        ขอ
      </Label>
      <SketchArrow seedKey="p8/fix/give" x1={310} y1={164} x2={310} y2={138} stroke={accent} strokeWidth={2} />
      <Label x={322} y={151} anchor="start" fill={accent}>
        ได้เลย
      </Label>

      <SketchRect seedKey="p8/fix/fixture" x={70} y={166} w={320} h={58} rounded stroke={tone('fixture')} strokeWidth={width('fixture')} />
      <Label x={230} y={186} size={18} weight={600}>
        fixture: productList
      </Label>
      <Label x={230} y={212} fill={MUTED}>
        new ProductListPage(page)
      </Label>

      <SketchArrow seedKey="p8/fix/build" x1={230} y1={226} x2={230} y2={250} stroke={INK} strokeWidth={1.5} />
      <Label x={242} y={238} anchor="start" fill={MUTED}>
        สร้าง
      </Label>

      <SketchRect seedKey="p8/fix/page" x={70} y={252} w={320} h={58} rounded stroke={tone('page')} strokeWidth={width('page')} />
      <Label x={230} y={272} size={18} weight={600}>
        หน้า /shop
      </Label>
      <Label x={230} y={298} fill={MUTED}>
        page จริง
      </Label>
    </Frame>
  );
}

const CARDS = [
  { name: 'test.skip', note: 'ข้ามพร้อมเหตุผล' },
  { name: 'test.fixme', note: 'ยังไม่ทำ' },
  { name: 'test.only', note: 'รันเฉพาะอันนี้' },
  { name: 'tag: @smoke', note: 'เลือกด้วย --grep' },
];

/** The four ways to control which tests run, as cards. */
export function RunControl() {
  const code = roleColour('secondary');
  return (
    <Frame label="การ์ดสี่ใบ: test.skip test.fixme test.only และ tag @smoke">
      {CARDS.map((card, index) => {
        const x = 14 + (index % 2) * 228;
        const y = 38 + Math.floor(index / 2) * 142;
        return (
          <g key={card.name}>
            <SketchRect seedKey={`p8/run/card/${index}`} x={x} y={y} w={204} h={110} rounded stroke={code} strokeWidth={1.8} />
            <Label x={x + 102} y={y + 44} size={20} weight={600}>
              {card.name}
            </Label>
            <Label x={x + 102} y={y + 78} fill={MUTED}>
              {card.note}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}

/** The split the watchout asks for: the class finds and acts, the test is the only place that expects. */
export function PomSplit() {
  const code = roleColour('secondary');
  const success = roleColour('success');
  const danger = roleColour('danger');
  return (
    <Frame label="Page Object เก็บ locator กับ method ส่วนเทสเป็นคน expect">
      <SketchRect seedKey="p8/split/class" x={14} y={40} w={204} h={230} rounded stroke={code} strokeWidth={1.8} />
      <Label x={116} y={78} size={20} weight={600}>
        Page Object
      </Label>
      <Label x={116} y={126} size={18}>
        locator
      </Label>
      <Label x={116} y={164} size={18}>
        method
      </Label>
      <Label x={116} y={210} size={18} fill={danger} weight={600}>
        expect ✗
      </Label>

      <SketchLine seedKey="p8/split/divide" x1={230} y1={56} x2={230} y2={254} stroke={EDGE} strokeWidth={1.4} dashed />

      <SketchRect seedKey="p8/split/test" x={242} y={40} w={204} h={230} rounded stroke={code} strokeWidth={1.8} />
      <Label x={344} y={78} size={20} weight={600}>
        เทส
      </Label>
      <Label x={344} y={126} size={18} fill={success} weight={600}>
        expect ✓
      </Label>
      <Label x={344} y={176} size={18}>
        ชื่อเทส
      </Label>
    </Frame>
  );
}
