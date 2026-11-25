// Drawings for Part 4: the click counter, the greeting form, the form's two cases, the sign-up controls
// and the four extra actions. Labels only: sentences stay in the slide's text.
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

/** The click lesson's screen: Count, +1 and reset; `next` shows the value after the click. */
export function ClickCounter({
  count = 0,
  next,
  highlight,
  arrowPlus = false,
  covered = false,
}: {
  count?: number;
  next?: number;
  highlight?: 'plus' | 'reset';
  arrowPlus?: boolean;
  covered?: boolean;
}) {
  const primary = roleColour('primary');
  const accent = roleColour('accent');
  const warning = roleColour('warning');
  const plusLit = highlight === 'plus';
  const resetLit = highlight === 'reset';
  return (
    <Frame label={covered ? 'หน้าจอตัวนับ มีแถบปิดปุ่ม +1 และลูกศร force ชี้เข้าปุ่ม' : 'หน้าจอตัวนับ แสดง Count ปุ่ม +1 และปุ่มรีเซ็ต'}>
      <SketchRect seedKey="p4/click/screen" x={22} y={18} w={416} h={294} rounded stroke={primary} strokeWidth={2} />
      <SketchLine seedKey="p4/click/bar" x1={22} y1={52} x2={438} y2={52} stroke={primary} strokeWidth={1.4} />
      {[40, 56, 72].map((x) => (
        <SketchEllipse key={x} seedKey={`p4/click/dot/${x}`} cx={x} cy={35} w={9} h={9} stroke={primary} strokeWidth={1.4} />
      ))}

      <Label x={230} y={covered ? 92 : 104} size={26} weight={600}>
        {next === undefined ? `Count: ${count}` : `Count: ${count} → ${next}`}
      </Label>

      <SketchRect
        seedKey="p4/click/plus"
        x={70}
        y={covered ? 190 : 180}
        w={140}
        h={covered ? 64 : 60}
        rounded
        stroke={plusLit ? accent : INK}
        strokeWidth={plusLit ? 2.8 : 1.8}
        fill={plusLit ? accent : undefined}
        fillStyle="hachure"
      />
      <Label x={140} y={covered ? 238 : 210} size={20} weight={plusLit ? 600 : undefined}>
        +1
      </Label>

      {covered ? null : (
        <g>
          <SketchRect
            seedKey="p4/click/reset"
            x={250}
            y={180}
            w={140}
            h={60}
            rounded
            stroke={resetLit ? accent : INK}
            strokeWidth={resetLit ? 2.8 : 1.8}
            fill={resetLit ? accent : undefined}
            fillStyle="hachure"
          />
          <Label x={320} y={210} size={20} weight={resetLit ? 600 : undefined}>
            รีเซ็ต
          </Label>
        </g>
      )}

      {arrowPlus ? (
        <g>
          <SketchArrow seedKey="p4/click/arrow" x1={140} y1={286} x2={140} y2={244} stroke={accent} strokeWidth={2.4} />
          <Label x={158} y={286} anchor="start" fill={accent} weight={600}>
            คลิก
          </Label>
        </g>
      ) : null}

      {covered ? (
        <g>
          <SketchRect seedKey="p4/click/cover" x={54} y={176} w={156} h={46} rounded stroke={warning} strokeWidth={2.2} fill="#f7e5bd" fillStyle="solid" />
          <Label x={132} y={140} weight={600}>
            แถบบัง
          </Label>
          <SketchLine seedKey="p4/click/force/h" x1={448} y1={162} x2={214} y2={162} stroke={warning} strokeWidth={2.4} />
          <SketchArrow seedKey="p4/click/force/v" x1={214} y1={162} x2={214} y2={238} stroke={warning} strokeWidth={2.4} />
          <Label x={300} y={184} anchor="start" fill={warning} weight={600}>
            force: true
          </Label>
        </g>
      ) : null}
    </Frame>
  );
}

/** The greeting form: a name field, the submit button and the message it produces. */
export function FormFlow({
  value = '',
  message = '',
  mode = 'fill',
  highlight,
}: {
  value?: string;
  message?: string;
  mode?: 'fill' | 'enter' | 'empty';
  highlight?: 'field' | 'button' | 'message';
}) {
  const accent = roleColour('accent');
  const danger = roleColour('danger');
  const neutral = roleColour('neutral');
  const fieldLit = highlight === 'field';
  const buttonLit = highlight === 'button';
  const messageLit = highlight === 'message';
  const empty = mode === 'enter' ? false : !value;
  return (
    <Frame label="ฟอร์มทักทาย มีช่องชื่อ ปุ่มทักทาย และข้อความทักทาย">
      <SketchRect seedKey="p4/form/card" x={22} y={18} w={416} h={294} rounded stroke={EDGE} strokeWidth={1.4} dashed />
      <Label x={44} y={64} anchor="start" fill={MUTED}>
        ชื่อ
      </Label>

      <SketchRect
        seedKey="p4/form/input"
        x={44}
        y={80}
        w={236}
        h={54}
        rounded
        stroke={fieldLit ? accent : empty ? EDGE : INK}
        strokeWidth={fieldLit ? 2.8 : 1.8}
      />
      {value ? (
        <Label x={58} y={107} anchor="start" size={18} weight={fieldLit ? 600 : undefined}>
          {value}
        </Label>
      ) : null}

      <SketchRect
        seedKey="p4/form/button"
        x={300}
        y={80}
        w={118}
        h={54}
        rounded
        stroke={buttonLit ? accent : neutral}
        strokeWidth={buttonLit ? 2.8 : 1.8}
        fill={buttonLit ? accent : undefined}
        fillStyle="hachure"
      />
      <Label x={359} y={107} size={18} weight={buttonLit ? 600 : undefined}>
        ทักทาย
      </Label>

      <SketchArrow seedKey="p4/form/arrow/1" x1={282} y1={107} x2={296} y2={107} stroke={INK} strokeWidth={1.6} />

      {mode === 'enter' ? (
        <g>
          <SketchRect seedKey="p4/form/enter" x={44} y={150} w={120} h={42} rounded stroke={accent} strokeWidth={2.4} />
          <Label x={104} y={171} size={17} fill={accent} weight={600}>
            Enter ↵
          </Label>
          <SketchLine seedKey="p4/form/enter/line" x1={166} y1={171} x2={288} y2={171} stroke={accent} strokeWidth={2.2} />
          <SketchArrow seedKey="p4/form/arrow/enter" x1={288} y1={171} x2={310} y2={142} stroke={accent} strokeWidth={2.2} />
        </g>
      ) : null}

      <SketchArrow seedKey="p4/form/arrow/2" x1={359} y1={136} x2={359} y2={202} stroke={EDGE} strokeWidth={1.5} />

      <SketchRect
        seedKey="p4/form/message"
        x={44}
        y={206}
        w={374}
        h={76}
        rounded
        stroke={mode === 'empty' ? danger : messageLit ? accent : EDGE}
        strokeWidth={mode === 'empty' || messageLit ? 2.4 : 1.4}
        dashed={mode !== 'empty' && !messageLit}
      />
      <Label x={231} y={244} size={18} fill={mode === 'empty' ? danger : message ? INK : MUTED} weight={messageLit || mode === 'empty' ? 600 : undefined}>
        {message || 'ยังไม่มีข้อความ'}
      </Label>
    </Frame>
  );
}

/** The same form as two cases: a filled name passes, an empty one shows the warning. */
export function FormCases() {
  const success = roleColour('success');
  const danger = roleColour('danger');
  return (
    <Frame label="สองเคสของฟอร์ม เคสกรอกชื่อผ่าน เคสว่างขึ้นคำเตือน">
      <SketchRect seedKey="p4/cases/1" x={24} y={36} w={412} h={110} rounded stroke={success} strokeWidth={1.8} />
      <Label x={44} y={64} anchor="start" size={18} fill={success} weight={600}>
        ✓ สมชาย
      </Label>
      <SketchRect seedKey="p4/cases/box/1" x={44} y={84} w={372} h={48} rounded stroke={success} strokeWidth={1.6} />
      <Label x={230} y={108} size={18} fill={success}>
        สวัสดี, สมชาย
      </Label>

      <SketchRect seedKey="p4/cases/2" x={24} y={166} w={412} h={110} rounded stroke={danger} strokeWidth={1.8} />
      <Label x={44} y={194} anchor="start" size={18} fill={danger} weight={600}>
        ✗ ว่าง
      </Label>
      <SketchRect seedKey="p4/cases/box/2" x={44} y={214} w={372} h={48} rounded stroke={danger} strokeWidth={1.6} />
      <Label x={230} y={238} size={18} fill={danger}>
        กรุณากรอกชื่อ
      </Label>
    </Frame>
  );
}

/** The sign-up form: acceptance checkbox, shipping radios, province select and the submit button. */
export function ControlsForm({
  accepted = false,
  shipping = 'ส่งปกติ',
  province = 'กรุงเทพ',
  highlight,
  commands = false,
}: {
  accepted?: boolean;
  shipping?: string;
  province?: string;
  highlight?: 'checkbox' | 'radio' | 'select' | 'submit';
  commands?: boolean;
}) {
  const secondary = roleColour('secondary');
  const accent = roleColour('accent');
  const success = roleColour('success');
  const lit = (role: 'checkbox' | 'radio' | 'select' | 'submit') => highlight === role;
  const pill = (x: number, y: number, w: number, text: string) => (
    <g key={text}>
      <SketchRect seedKey={`p4/controls/pill/${x}/${y}`} x={x} y={y} w={w} h={30} rounded stroke={secondary} strokeWidth={1.3} />
      <Label x={x + w / 2} y={y + 15} size={16} fill={secondary}>
        {text}
      </Label>
    </g>
  );
  return (
    <Frame label="ฟอร์มสมัครสมาชิก มี checkbox การจัดส่ง dropdown จังหวัด และปุ่มสมัคร">
      <SketchRect seedKey="p4/controls/card" x={16} y={16} w={428} h={298} rounded stroke={EDGE} strokeWidth={1.4} dashed />

      <SketchRect seedKey="p4/controls/check" x={44} y={40} w={24} h={24} rounded stroke={lit('checkbox') ? accent : INK} strokeWidth={lit('checkbox') ? 2.8 : 1.7} />
      {accepted ? <SketchPath seedKey="p4/controls/tick" d="M49 52 l6 6 l13 -15" stroke={success} strokeWidth={2.6} /> : null}
      <Label x={80} y={52} anchor="start" size={17} weight={lit('checkbox') ? 600 : undefined}>
        ยอมรับเงื่อนไข
      </Label>
      {commands ? pill(304, 37, 114, 'check()') : null}

      <Label x={44} y={86} anchor="start" fill={MUTED}>
        การจัดส่ง
      </Label>

      {[
        { cy: 120, name: 'ส่งด่วน' },
        { cy: 154, name: 'ส่งปกติ' },
      ].map((radio) => (
        <g key={radio.name}>
          <SketchEllipse
            seedKey={`p4/controls/radio/${radio.cy}`}
            cx={56}
            cy={radio.cy}
            w={20}
            h={20}
            stroke={lit('radio') ? accent : INK}
            strokeWidth={lit('radio') ? 2.6 : 1.7}
          />
          {shipping === radio.name ? <SketchEllipse seedKey={`p4/controls/dot/${radio.cy}`} cx={56} cy={radio.cy} w={8} h={8} stroke={accent} strokeWidth={2} fill={accent} fillStyle="solid" /> : null}
          <Label x={78} y={radio.cy} anchor="start" size={17} weight={lit('radio') ? 600 : undefined}>
            {radio.name}
          </Label>
        </g>
      ))}
      {commands ? pill(304, 105, 114, 'check()') : null}

      <Label x={44} y={196} anchor="start" size={17} weight={lit('select') ? 600 : undefined}>
        จังหวัด
      </Label>
      <SketchRect seedKey="p4/controls/select" x={104} y={176} w={160} h={40} rounded stroke={lit('select') ? accent : INK} strokeWidth={lit('select') ? 2.8 : 1.7} />
      <Label x={118} y={196} anchor="start" size={17}>
        {province}
      </Label>
      <Label x={248} y={194} fill={MUTED}>
        ▾
      </Label>
      {commands ? pill(276, 181, 148, 'selectOption()') : null}

      <SketchRect
        seedKey="p4/controls/submit"
        x={44}
        y={246}
        w={150}
        h={46}
        rounded
        stroke={lit('submit') ? accent : accepted ? success : EDGE}
        strokeWidth={lit('submit') ? 2.8 : 1.8}
        dashed={!accepted}
        fill={lit('submit') ? accent : undefined}
        fillStyle="hachure"
      />
      <Label x={119} y={269} size={17} fill={accepted ? INK : MUTED} weight={lit('submit') ? 600 : undefined}>
        สมัคร
      </Label>
    </Frame>
  );
}

const ACTIONS = [
  { x: 20, y: 24, title: 'hover()', note: 'เมนูโผล่' },
  { x: 240, y: 24, title: 'focus()', note: 'ช่องรับ focus' },
  { x: 20, y: 170, title: 'setInputFiles()', note: 'เลือกไฟล์' },
  { x: 240, y: 170, title: 'dragTo()', note: 'ลากไปวาง' },
] as const;

/** Four cards, one per extra action, each with a small shape that shows what it does. */
export function ActionMenu({ highlight }: { highlight?: number }) {
  const secondary = roleColour('secondary');
  const accent = roleColour('accent');
  return (
    <Frame label="การ์ดสี่ใบ hover focus setInputFiles และ dragTo">
      {ACTIONS.map((action, index) => {
        const lit = highlight === index;
        const cx = action.x + 100;
        return (
          <g key={action.title}>
            <SketchRect
              seedKey={`p4/actions/card/${index}`}
              x={action.x}
              y={action.y}
              w={200}
              h={130}
              rounded
              stroke={lit ? accent : EDGE}
              strokeWidth={lit ? 2.6 : 1.5}
            />
            <Label x={cx} y={action.y + 34} size={17} fill={secondary} weight={600}>
              {action.title}
            </Label>
            <Label x={cx} y={action.y + 112} fill={MUTED}>
              {action.note}
            </Label>

            {index === 0 ? (
              <g>
                <SketchRect seedKey="p4/actions/hover/menu" x={action.x + 68} y={action.y + 58} w={64} h={28} rounded stroke={INK} strokeWidth={1.5} />
                {[66, 72, 78].map((dy) => (
                  <SketchLine key={dy} seedKey={`p4/actions/hover/line/${dy}`} x1={action.x + 78} y1={action.y + dy} x2={action.x + 122} y2={action.y + dy} stroke={EDGE} strokeWidth={1.3} />
                ))}
              </g>
            ) : null}

            {index === 1 ? (
              <g>
                <SketchRect seedKey="p4/actions/focus/input" x={action.x + 66} y={action.y + 66} w={68} h={26} rounded stroke={INK} strokeWidth={1.5} />
                <SketchEllipse seedKey="p4/actions/focus/ring" cx={cx} cy={action.y + 79} w={86} h={44} stroke={accent} strokeWidth={2} />
              </g>
            ) : null}

            {index === 2 ? (
              <g>
                <SketchRect seedKey="p4/actions/upload/file" x={action.x + 56} y={action.y + 56} w={52} h={36} rounded stroke={INK} strokeWidth={1.5} />
                <SketchArrow seedKey="p4/actions/upload/arrow" x1={action.x + 124} y1={action.y + 94} x2={action.x + 124} y2={action.y + 58} stroke={accent} strokeWidth={2.2} />
              </g>
            ) : null}

            {index === 3 ? (
              <g>
                <SketchRect seedKey="p4/actions/drag/src" x={action.x + 26} y={action.y + 62} w={44} h={30} rounded stroke={INK} strokeWidth={1.5} />
                <SketchRect seedKey="p4/actions/drag/dst" x={action.x + 130} y={action.y + 62} w={44} h={30} rounded stroke={INK} strokeWidth={1.5} />
                <SketchArrow seedKey="p4/actions/drag/arrow" x1={action.x + 74} y1={action.y + 77} x2={action.x + 126} y2={action.y + 77} stroke={accent} strokeWidth={2.2} />
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}
