import type { Topics } from '../components';
import { A, Anatomy, C, Code, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Summary, Topic } from '../components';
import { FixtureFlow, POMFig, PomSplit, RunControl, TestTree } from '../visuals/part-08';
import { listings, meta, outputs } from './part-08.data';

const topics: Topics = {
  topics: [
    { id: 'group', section: 'จัดกลุ่ม', title: 'จัดกลุ่ม', components: ['describe', 'beforeEach', 'test.step', 'hooks อื่น'] },
    { id: 'pom', section: 'Page Object', title: 'Page Object', components: ['class หนึ่งหน้า', 'locator เป็นฟิลด์', 'method เป็นขั้น', 'expect อยู่ที่เทส'] },
    { id: 'fixtures', section: 'fixtures', title: 'fixtures', components: ['test.extend', 'use()', 'import test', 'ใช้ในเทส'] },
    { id: 'run-control', section: 'คุมว่าจะรันอะไร', title: 'คุมว่าจะรันอะไร', components: ['skip', 'fixme', 'tag', 'วนสร้าง'] },
  ],
};

const beforeBlocks = [{ lang: 'typescript', info: 'text', text: listings['compare-before'].code }];
const afterBlocks = [{ lang: 'typescript', info: 'text', text: listings['compare-after'].code }];

export default function Part08() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover id="8-001" section="Opening" title={<>จัดโครงสร้างเทส</>} body={<>Part 8</>} />
      <Objectives
        id="8-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>จัดกลุ่มด้วย describe และ hooks</>,
          <>แยกวิธีใช้หน้าเป็น Page Object</>,
          <>สร้าง fixture ใช้ซ้ำ</>,
          <>คุมเทสด้วย skip/tag</>,
        ]}
      />
      <Compare
        id="8-003"
        section="Opening"
        title={<>เทสเดียวกัน ก่อนและหลังจัด</>}
        left={<>ก่อน: goto กับ locator ยาวซ้ำทุกเทส</>}
        right={<>หลัง: เทสสั้น อ่านเป็นเรื่อง</>}
        takeaway={<>ย้ายความซ้ำออกจากเทส เก็บไว้ที่เดียว</>}
        leftBlocks={beforeBlocks}
        rightBlocks={afterBlocks}
      />

      <Topic
        id="8-004"
        section="จัดกลุ่ม"
        topic="group"
        title={<>จัดกลุ่ม</>}
        body={<>รวมเทสที่เกี่ยวกัน</>}
        visual={<TestTree />}
      />
      <Explain
        id="8-005"
        section="จัดกลุ่ม"
        topic="group"
        phase="know"
        title={<>describe + beforeEach</>}
        body={<>รวมเทสที่ใช้หน้าเดียวกัน · <C>beforeEach</C> ทำงานก่อนทุกเทส</>}
        visual={<TestTree mode="order" />}
      />
      <Anatomy
        id="8-006"
        section="จัดกลุ่ม"
        topic="group"
        phase="parts"
        title={<>โครงของกลุ่ม</>}
        pieces={[
          { text: 'test.describe', n: 1 },
          { text: '("หน้าร้านค้า", () => {', n: 2 },
          { text: ' test.beforeEach(…)', n: 3 },
          { text: ' test(…)', n: 4 },
          { text: ' })' },
        ]}
        items={[
          <><C>test.describe</C> — ชื่อกลุ่ม</>,
          <>ในปีกกา — เทส</>,
          <><C>beforeEach</C> — ก่อนทุกเทส</>,
          <><C>test</C> — แต่ละอัน</>,
        ]}
      />
      <Explain
        id="8-007"
        section="จัดกลุ่ม"
        topic="group"
        phase="parts"
        title={<>test.step: แบ่งเทสยาวเป็นขั้น</>}
        body={<>แต่ละขั้นมีชื่อ เห็นใน report และ trace</>}
        visual={<TestTree mode="steps" />}
      />
      <Explain
        id="8-008"
        section="จัดกลุ่ม"
        topic="group"
        phase="parts"
        title={<>hooks อื่น</>}
        body={<>afterEach เก็บกวาด · beforeAll/afterAll ครั้งเดียวต่อกลุ่ม</>}
        visual={<TestTree mode="hooks" />}
      />
      <Example
        id="8-009"
        section="จัดกลุ่ม"
        topic="group"
        phase="example"
        title={<>เพิ่มสินค้าแล้วตรวจยอดรวม</>}
        body={<>ต่อจาก beforeEach · สามขั้นมีชื่อ</>}
        snippet="story-steps"
        lines={[[8, 15]]}
      />

      <Topic
        id="8-010"
        section="Page Object"
        topic="pom"
        title={<>Page Object</>}
        body={<>หนึ่งหน้า = หนึ่ง class</>}
        visual={<POMFig />}
      />
      <Explain
        id="8-011"
        section="Page Object"
        topic="pom"
        phase="know"
        title={<>เก็บวิธีใช้หน้าไว้ที่เดียว</>}
        body={<>locator และขั้นตอนอยู่ใน class · เทสเรียก method แล้วเล่าเรื่อง</>}
        visual={<POMFig highlight="class" />}
      />
      <Anatomy
        id="8-012"
        section="Page Object"
        topic="pom"
        phase="parts"
        title={<>ส่วนประกอบของ class</>}
        pieces={[
          { text: 'constructor(', n: 1 },
          { text: 'page: Page', n: 2 },
          { text: ') {' },
          { text: ' this.total = ' },
          { text: 'page.getByText(', n: 3 },
          { text: '/^รวม ฿/); }' },
        ]}
        items={[
          <><C>constructor</C> — รับ page</>,
          <>page — ใช้ทั้ง class</>,
          <><C>getByText</C> — หา element</>,
        ]}
      />
      <Code
        id="8-013"
        section="Page Object"
        topic="pom"
        phase="parts"
        title={<>CartPage ฉบับจริง</>}
        body={<>total, items, goto, checkout อยู่ที่เดียว</>}
        snippet="cart-page"
        lines={[[3, 14]]}
      />
      <Example
        id="8-014"
        section="Page Object"
        topic="pom"
        phase="example"
        title={<>เทสที่ใช้ Page Object</>}
        body={<>new ครั้งเดียว แล้วเทสอ่านเป็นเรื่อง</>}
        snippet="po-test"
        lines={[[5, 12]]}
      />
      <Error
        id="8-015"
        section="Page Object"
        topic="pom"
        phase="watchout"
        title={<>expect อยู่ในเทส ไม่ใช่ class</>}
        cause={<>expect ผูกกับค่าเทสเดียว</>}
        fix={<>class หา/ทำ · เทสตรวจ — แนวปฏิบัติ ไม่ใช่กฎ</>}
        visual={<PomSplit />}
      />

      <Topic
        id="8-016"
        section="fixtures"
        topic="fixtures"
        title={<>fixtures</>}
        body={<>Playwright ส่งของที่เทสต้องการให้</>}
        visual={<FixtureFlow />}
      />
      <Explain
        id="8-017"
        section="fixtures"
        topic="fixtures"
        phase="know"
        title={<>เทสบอกว่าต้องการอะไร</>}
        body={<>เห็น <C>{'{ page }'}</C> มาแล้วใช่ไหม นั่นคือ fixture · เราสร้างของเราเองได้</>}
        visual={<FixtureFlow highlight="fixture" />}
      />
      <Anatomy
        id="8-018"
        section="fixtures"
        topic="fixtures"
        phase="parts"
        title={<>test.extend</>}
        pieces={[
          { text: 'base.extend', n: 1 },
          { text: '({ ' },
          { text: 'cart', n: 2 },
          { text: ': async (' },
          { text: '{ page }, use', n: 3 },
          { text: ') => {' },
          { text: ' await use(', n: 4 },
          { text: 'new CartPage(page)' },
          { text: '); } })' },
        ]}
        items={[
          <><C>base</C> คือ test เดิม</>,
          <><C>cart</C> — ชื่อ fixture</>,
          <>page · use</>,
          <><C>use</C> — ส่งค่าให้เทส</>,
        ]}
      />
      <Explain
        id="8-019"
        section="fixtures"
        topic="fixtures"
        phase="parts"
        title={<>export test และ expect</>}
        body={<>import test จากไฟล์ fixtures ไม่ใช่ @playwright/test</>}
        visual={<FixtureFlow highlight="import" />}
      />
      <Example
        id="8-020"
        section="fixtures"
        topic="fixtures"
        phase="example"
        title={<>ใช้ fixture ได้เลย</>}
        body={<>ไม่ต้อง new — เขียนชื่อในวงเล็บปีกกา</>}
        snippet="fixtures-test"
        lines={[[3, 9]]}
      />
      <Error
        id="8-021"
        section="fixtures"
        topic="fixtures"
        phase="watchout"
        title={<>import test ผิดที่</>}
        symptom={<>รันแล้วขึ้น unknown parameter</>}
        blocks={[outputs['wrong-import']]}
        cause={<>test จาก @playwright/test ไม่รู้จัก fixture เรา</>}
        fix={<>import จาก ./fixtures แทน</>}
      />

      <Topic
        id="8-022"
        section="คุมว่าจะรันอะไร"
        topic="run-control"
        title={<>คุมว่าจะรันอะไร</>}
        body={<>skip, fixme, only, tag</>}
        visual={<RunControl />}
      />
      <Example
        id="8-023"
        section="คุมว่าจะรันอะไร"
        topic="run-control"
        phase="parts"
        title={<>ข้ามเทสที่ยังไม่พร้อม</>}
        body={<>skip พร้อมเหตุผล · fixme ทำทีหลัง</>}
        snippet="skip"
        lines={[[3, 10]]}
        highlight={[[4, 4]]}
      />
      <Example
        id="8-024"
        section="คุมว่าจะรันอะไร"
        topic="run-control"
        phase="parts"
        title={<>ติด tag แล้วเลือกกลุ่ม</>}
        body={<>รันเฉพาะ @smoke ด้วย --grep</>}
        snippet="tag"
        highlight={[[3, 3]]}
      />
      <Example
        id="8-025"
        section="คุมว่าจะรันอะไร"
        topic="run-control"
        phase="parts"
        title={<>วนสร้างเทสจากข้อมูล</>}
        body={<>สินค้า 3 อย่าง → 3 เทส ไม่ต้อง copy เอง</>}
        snippet="loop"
        lines={[[5, 10]]}
        highlight={[[5, 5]]}
      />

      <Summary
        id="8-026"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>describe, hooks, step</>,
          <>Page Object เก็บวิธีใช้หน้า</>,
          <>fixture ส่งของให้เทส</>,
          <>skip, tag คุมว่าจะรันอะไร</>,
        ]}
      />
      <Focus
        id="8-027"
        section="Closing"
        title={<>ต่อไป: login ครั้งเดียว</>}
        body={<>Part 9 เก็บ session ไว้ใช้ซ้ำ ไม่ต้อง login ทุกเทส</>}
      />
      <Sources
        id="8-028"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A></>,
          <><A href="https://playwright.dev/docs/pom">playwright.dev — Page Object models</A></>,
          <><A href="https://playwright.dev/docs/test-fixtures">playwright.dev — Fixtures</A></>,
          <><A href="https://playwright.dev/docs/test-annotations">playwright.dev — Annotations</A></>,
        ]}
      />
    </Deck>
  );
}
