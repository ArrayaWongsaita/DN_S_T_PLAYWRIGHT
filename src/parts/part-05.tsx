import type { Block, Topics } from '../components';
import { A, Anatomy, C, Cells, Code, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Summary, Topic } from '../components';
import { AssertMap, FlakyRace, SleepMistake, SoftChecks, TimeoutLayers, WaitTimeline } from '../visuals/part-05';
import { listings, meta, outputs } from './part-05.data';

const topics: Topics = {
  topics: [
    {
      id: 'expect',
      section: 'expect และ assertion ที่ใช้บ่อย',
      title: 'expect และ assertion ที่ใช้บ่อย',
      components: ['expect', 'locator', 'assertion', 'ค่าที่คาด'],
    },
    {
      id: 'waiting',
      section: 'auto-waiting',
      title: 'auto-waiting',
      components: ['expect ถามซ้ำ', 'action รอพร้อม', 'ไม่ต้อง sleep', 'เทียบ RTL'],
    },
    {
      id: 'timeout',
      section: 'ปรับการรอ',
      title: 'ปรับการรอ',
      components: ['timeout สามชั้น', 'timeout เฉพาะจุด', 'expect.soft', 'expect.poll'],
    },
  ],
};

const hiddenPanel: Block[] = [
  {
    lang: 'html',
    info: 'text',
    text: `<!-- panel ปิด: ไม่มี <p> นี้ -->
<button>แสดงรายละเอียด</button>`,
  },
];

const shownPanel: Block[] = [
  {
    lang: 'html',
    info: 'text',
    text: `<button>ซ่อนรายละเอียด</button>
<p>รายละเอียดสินค้า</p>`,
  },
];

const rtlMapping: Block[] = [
  {
    lang: 'text',
    info: 'text',
    text: `queryBy + not.toBeInTheDocument
getAllBy + toHaveLength
findBy / waitFor`,
  },
];

const playwrightMapping: Block[] = [
  {
    lang: 'text',
    info: 'text',
    text: `toBeHidden()
toHaveCount(3)
toBeVisible() — รอเอง`,
  },
];

const noAwaitBlocks: Block[] = [
  {
    lang: 'typescript',
    info: 'text',
    text: `expect(page.getByText("ชา")).toBeVisible();        // ไม่รอ
await expect(page.getByText("ชา")).toBeVisible();  // รอ`,
  },
];

export default function Part05() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover id="5-001" section="Opening" title={<>ตรวจผลและการรอ</>} body={<>Part 5 · Playwright E2E กับ Next.js</>} />
      <Objectives
        id="5-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>เลือก assertion ให้ตรงกับสิ่งที่ตรวจ</>,
          <>expect รอและลองซ้ำให้เอง ไม่ต้อง sleep</>,
          <>ปรับ timeout/soft/poll เมื่อจำเป็น</>,
        ]}
      />
      <Focus
        id="5-003"
        section="Opening"
        title={<>เทสที่ผ่านบ้างพังบ้าง</>}
        body={<>หน้าโหลดช้ากว่าที่เทสคิด เทสจึงเช็กก่อนข้อมูลมา บางรอบผ่าน บางรอบพัง ทั้งที่โค้ดไม่ได้แก้</>}
        visual={<FlakyRace />}
      />

      <Topic
        id="5-004"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        title={<>expect</>}
        body={<>ถามหน้าเว็บว่าเป็นอย่างที่คาดไหม</>}
        visual={<AssertMap />}
      />
      <Explain
        id="5-005"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="know"
        title={<>expect + locator + assertion</>}
        body={
          <>
            สามชิ้น: <C>expect(locator)</C> ตรวจอะไร · <C>.toHaveText()</C> ถามอะไร · <C>("ชา")</C> ค่าที่คาด
          </>
        }
        visual={<AssertMap mode="pieces" />}
      />
      <Anatomy
        id="5-006"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="parts"
        title={<>อ่านหนึ่งบรรทัด</>}
        pieces={[
          { text: 'await ' },
          { text: 'expect(', n: 1 },
          { text: 'page.getByText(', n: 2 },
          { text: '"ราคา 250 บาท")' },
          { text: ')' },
          { text: '.toBeVisible();', n: 3 },
        ]}
        items={[
          <>expect — เริ่มตรวจ</>,
          <>locator — ตรวจตัวไหน</>,
          <>toBeVisible — เห็นไหม</>,
        ]}
      />
      <Compare
        id="5-007"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="parts"
        title={<>เห็นกับไม่เห็นใช้คนละคำ</>}
        left={<><C>toBeHidden()</C> — panel ยังไม่แสดง</>}
        right={<><C>toBeVisible()</C> — panel แสดงและเห็นได้</>}
        leftBlocks={hiddenPanel}
        rightBlocks={shownPanel}
        takeaway={<>สลับสถานะแล้วตรวจให้ตรง</>}
      />
      <Explain
        id="5-008"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="parts"
        title={<>ตรวจจำนวนและข้อความ</>}
        body={
          <>
            <C>toHaveCount(3)</C> นับรายการ · <C>first().toHaveText("ชา")</C> ตรวจข้อความของตัวแรก
          </>
        }
        visual={<Cells cells={['ชา', 'กาแฟ', 'นม']} highlight={0} marks={[{ at: 0, label: 'first()' }]} />}
      />
      <Explain
        id="5-009"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="parts"
        title={<>ตรวจสถานะ ค่า และ attribute</>}
        body={
          <>
            สถานะ: <C>toBeDisabled</C>/<C>toBeEnabled</C> · ติ๊ก: <C>toBeChecked</C> · ค่า: <C>toHaveValue</C> · attr: <C>toHaveAttribute("href", "/")</C>
          </>
        }
        visual={<AssertMap mode="state" />}
      />
      <Explain
        id="5-010"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="parts"
        title={<>.not กลับความหมาย</>}
        body={
          <>
            <C>expect(x).not.toBeDisabled()</C> อ่านว่า “ปุ่มนี้กดได้” — ใช้ .not เมื่อสิ่งที่ต้องการคือ “ต้องไม่เป็น…”
          </>
        }
      />
      <Example
        id="5-011"
        section="expect และ assertion ที่ใช้บ่อย"
        topic="expect"
        phase="example"
        title={<>panel รายละเอียด</>}
        body={<>ซ่อน → คลิก → เห็น → คลิก → ซ่อน ครบในเทสเดียว</>}
        snippet="detail-panel"
        lines={[[3, 10]]}
        highlight={[[7, 7]]}
      />

      <Topic
        id="5-012"
        section="auto-waiting"
        topic="waiting"
        title={<>auto-waiting</>}
        body={<>Playwright รอให้เอง</>}
        visual={<WaitTimeline />}
      />
      <Explain
        id="5-013"
        section="auto-waiting"
        topic="waiting"
        phase="know"
        title={<>expect ถามซ้ำจนผ่าน</>}
        body={<><C>expect</C> ไม่ถามครั้งเดียว: ลองซ้ำจนผ่านหรือครบ 5 วินาที พอข้อมูลมาก็ผ่านทันที ไม่ต้องรอครบเวลา</>}
        visual={<WaitTimeline highlight="expect" />}
      />
      <Explain
        id="5-014"
        section="auto-waiting"
        topic="waiting"
        phase="parts"
        title={<>action ก็รอเหมือนกัน</>}
        body={<><C>click</C> รอให้ element มองเห็นและกดได้ก่อน จึงคลิก — ไม่ต้องมี <C>waitFor</C> แบบ RTL</>}
        visual={<WaitTimeline highlight="action" />}
      />
      <Compare
        id="5-015"
        section="auto-waiting"
        topic="waiting"
        phase="parts"
        title={<>RTL กับ Playwright</>}
        left={<>RTL: เลือก <C>findBy</C> หรือเขียน <C>waitFor</C> เอง</>}
        right={<>Playwright: <C>expect</C> ทุกตัวรอเอง</>}
        leftBlocks={rtlMapping}
        rightBlocks={playwrightMapping}
        takeaway={<>คำถามเดียวกัน แต่อีกฝั่งไม่ต้องรอเอง</>}
      />
      <Example
        id="5-016"
        section="auto-waiting"
        topic="waiting"
        phase="example"
        title={<>API ช้า 1.5 วินาที</>}
        body={<>ไม่มี <C>sleep</C> เลย: <C>expect</C> รอจนข้อความมาถึง (~2 วินาที)</>}
        snippet="wait-api"
        lines={[[3, 6]]}
        highlight={[[5, 5]]}
      />
      <Example
        id="5-017"
        section="auto-waiting"
        topic="waiting"
        phase="example"
        title={<>“กำลังโหลด” ต้องหายไป</>}
        body={<>เห็น <C>loading</C> ก่อน แล้วรอให้หายและเห็นข้อมูล โดยไม่ต้อง <C>sleep</C></>}
        snippet="wait-loading"
        lines={[[3, 8]]}
        highlight={[[6, 6]]}
      />
      <Error
        id="5-018"
        section="auto-waiting"
        topic="waiting"
        phase="watchout"
        title={<>อย่าใช้ waitForTimeout</>}
        symptom={<>ผ่านบ้างพังบ้างทั้งที่โค้ดเดิม</>}
        cause={<><C>sleep</C> เดาเวลา: 1 วิ ไม่ทัน 1.5 วิ · 3 วิ ก็ช้าเกิน</>}
        fix={<>ใช้ <C>expect</C> รอ ผ่านทันทีที่ของจริงมา</>}
        visual={<SleepMistake />}
      />
      <Error
        id="5-019"
        section="auto-waiting"
        topic="waiting"
        phase="watchout"
        title={<>ลืม await หน้า expect</>}
        symptom={<>เทสไม่รอผล: ค่าผ่านตอนนั้นก็ผ่านเลย</>}
        cause={<><C>expect</C> คืน promise ที่ไม่ <C>await</C> — ถ้ายังไม่ผ่านจะได้ <C>Test ended</C></>}
        fix={<>ใส่ <C>await</C> ทุกครั้ง</>}
        blocks={noAwaitBlocks}
      />

      <Topic
        id="5-020"
        section="ปรับการรอ"
        topic="timeout"
        title={<>ปรับการรอ</>}
        body={<>ช้ากว่า 5 วินาทีจริงๆ หรืออยากเห็นหลายข้อพร้อมกัน</>}
        visual={<TimeoutLayers />}
      />
      <Explain
        id="5-021"
        section="ปรับการรอ"
        topic="timeout"
        phase="parts"
        title={<>timeout สามชั้น</>}
        body={<>expect 5 วิ · test 30 วิ (ค่าเริ่มต้น) · action รอจนพร้อม — ปรับที่ assertion, test หรือ config</>}
        visual={<TimeoutLayers />}
      />
      <Example
        id="5-022"
        section="ปรับการรอ"
        topic="timeout"
        phase="parts"
        title={<>รอนานขึ้นเฉพาะจุด</>}
        body={<><C>{'toBeVisible({ timeout: 10_000 })'}</C> เผื่อเวลาถึง 10 วินาทีเฉพาะ assertion นี้</>}
        snippet="slow-timeout"
        lines={[[3, 6]]}
        highlight={[[5, 5]]}
      />
      <Explain
        id="5-023"
        section="ปรับการรอ"
        topic="timeout"
        phase="parts"
        title={<>expect.soft</>}
        body={<><C>expect.soft(...)</C> ล้มแล้วไปต่อ เก็บทุกข้อที่ผิดมารายงานทีเดียว</>}
        visual={<SoftChecks />}
      />
      <Code
        id="5-024"
        section="ปรับการรอ"
        topic="timeout"
        phase="parts"
        title={<>expect.poll</>}
        body={<>ถามซ้ำกับค่าที่ไม่ใช่ locator เช่นสถานะจาก API</>}
        snippet="poll-status"
        highlight={[[5, 6]]}
      />

      <Summary
        id="5-025"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <><C>expect(locator)</C> ตรวจและรอผลให้เอง</>,
          <><C>action</C> รอ element พร้อมก่อนทำ</>,
          <>ไม่ต้อง <C>sleep</C> — ใช้ <C>expect</C> แทน</>,
          <>ช้ากว่าค่าเริ่มต้น: ปรับ <C>timeout</C>/<C>soft</C>/<C>poll</C></>,
        ]}
      />
      <Focus
        id="5-026"
        section="Closing"
        title={<>ต่อไป: ดูว่าเทสทำอะไรอยู่</>}
        body={<>Part 6 เปิด headed และ UI mode, อ่าน report, ดู trace ย้อนทีละขั้น และ codegen</>}
      />
      <Sources
        id="5-027"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <>
            <A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT — บท 07, 11</A>
          </>,
          <>
            <A href="https://playwright.dev/docs/test-assertions">playwright.dev — Test assertions</A>
          </>,
          <>
            <A href="https://playwright.dev/docs/actionability">playwright.dev — Actionability</A>
          </>,
        ]}
      />
    </Deck>
  );
}
