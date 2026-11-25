import type { Topics } from '../components';
import { A, Anatomy, C, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Summary, Topic } from '../components';
import { DelayCompare, NetworkPath, RouteTimeline, ThreeStates, ToolboxCards } from '../visuals/part-07';
import { listings, meta, outputs } from './part-07.data';

const topics: Topics = {
  topics: [
    { id: 'api', section: 'ดัก API', title: 'ดัก API', components: ['pattern', 'handler', 'fulfill', 'json'] },
    { id: 'states', section: 'error, ว่าง, กำลังโหลด', title: 'error, ว่าง, กำลังโหลด', components: ['error', 'ว่าง', 'กำลังโหลด'] },
    { id: 'tools', section: 'เครื่องมือเสริม', title: 'เครื่องมือเสริม', components: ['waitForRequest', 'abort', 'fetch', 'request'] },
  ],
};

const apiCall = [
  { text: 'await page.route(' },
  { text: 'pattern', n: 1 },
  { text: ', ' },
  { text: '(r) =>', n: 2 },
  { text: ' ' },
  { text: 'r.fulfill(', n: 3 },
  { text: '{ json }', n: 4 },
  { text: '))' },
];

export default function Part07() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover id="7-001" section="Opening" title={<>จำลอง API</>} body={<>Playwright E2E กับ Next.js · Part 7</>} />
      <Objectives
        id="7-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>ดัก API ด้วย <C>page.route</C></>,
          <>เทส error, ว่าง, กำลังโหลด</>,
          <>ตรวจว่าหน้าเรียก API จริง</>,
        ]}
      />
      <Focus
        id="7-003"
        section="Opening"
        title={<>ถ้า API ล้มจริง หน้าเราขึ้นอะไร</>}
        body={<>เราไม่อยากรอให้ API พังจริงเพื่อดู — บังคับให้ล้มในเทสได้เลย</>}
        visual={<NetworkPath mode="direct" />}
      />

      <Topic
        id="7-004"
        section="ดัก API"
        topic="api"
        title={<>ดัก API</>}
        body={<>Playwright ตอบแทน API ให้</>}
        visual={<NetworkPath mode="intercept" />}
      />
      <Explain
        id="7-005"
        section="ดัก API"
        topic="api"
        phase="know"
        title={<>ดักกลางทาง</>}
        body={<>เมื่อหน้าเรียก URL ที่ตรงกับ pattern Playwright ตอบเอง คำขอไม่ไปถึงเซิร์ฟเวอร์</>}
        visual={<NetworkPath mode="intercept" highlight="playwright" />}
      />
      <Anatomy
        id="7-006"
        section="ดัก API"
        topic="api"
        phase="parts"
        title={<>page.route มีอะไรบ้าง</>}
        pieces={apiCall}
        items={[
          <>pattern — URL ที่ดัก</>,
          <>handler — รับ route</>,
          <>fulfill — ตอบแทน API</>,
          <>json — ข้อมูลตอบกลับ</>,
        ]}
      />
      <Explain
        id="7-007"
        section="ดัก API"
        topic="api"
        phase="parts"
        title={<>ตั้งก่อน goto</>}
        body={<>route ต้องพร้อมก่อนหน้าเรียก API จึงตั้งก่อน <C>page.goto</C></>}
        visual={<RouteTimeline />}
      />
      <Example
        id="7-008"
        section="ดัก API"
        topic="api"
        phase="example"
        title={<>mock ให้เหลือ “นม” ชิ้นเดียว</>}
        body={<>ไม่ mock เห็น 2 รายการ · mock แล้วเห็น 1</>}
        snippet="mock-one"
        lines={[[3, 10]]}
        highlight={[[4, 5]]}
      />
      <Error
        id="7-009"
        section="ดัก API"
        topic="api"
        phase="watchout"
        title={<>ตั้ง route หลัง goto</>}
        symptom={<>mock ไม่มีผล หน้าเห็นของจริง</>}
        cause={<>ได้ข้อมูลจริงแทน mock เพราะคำขอผ่านไปแล้ว</>}
        fix={<>ย้าย <C>page.route</C> ขึ้นก่อน <C>page.goto</C></>}
        visual={<NetworkPath mode="late" highlight="playwright" />}
      />

      <Topic
        id="7-010"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        title={<>error, ว่าง, กำลังโหลด</>}
        body={<>สามสถานะที่ทุกหน้าที่ดึงข้อมูลต้องมี</>}
        visual={<ThreeStates />}
      />
      <Explain
        id="7-011"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="know"
        title={<>ทำไมต้องเทสสามสถานะ</>}
        body={<>เทสส่วนใหญ่มองแค่ตอนมีสินค้า — ของหมดก็ต้องมีข้อความ ไม่ใช่หน้าว่าง ยังมี error กับกำลังโหลดอีก</>}
        visual={<ThreeStates highlight={1} />}
      />
      <Explain
        id="7-012"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="parts"
        title={<>error: ตอบ 500</>}
        body={<><C>{'route.fulfill({ status: 500 })'}</C> → หน้าเห็น “เกิดข้อผิดพลาด”</>}
        visual={<ThreeStates highlight={0} />}
      />
      <Explain
        id="7-013"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="parts"
        title={<>ว่าง: ตอบ []</>}
        body={<><C>{'route.fulfill({ json: [] })'}</C> → “ไม่มีสินค้า”</>}
        visual={<ThreeStates highlight={1} />}
      />
      <Explain
        id="7-014"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="parts"
        title={<>กำลังโหลด: หน่วงก่อนตอบ</>}
        body={<>handler รอ 500ms ค่อย fulfill — ระหว่างนั้นหน้าเห็น “กำลังโหลด...”</>}
        visual={<ThreeStates highlight={2} />}
      />
      <Example
        id="7-015"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="example"
        title={<>เทสสามสถานะ</>}
        body={<>เปลี่ยนแค่คำตอบ: 500 · [] · หน่วง 500ms — ผ่านทั้งสาม</>}
        snippet="states"
        lines={[[3, 10]]}
        highlight={[[7, 7]]}
      />
      <Error
        id="7-016"
        section="error, ว่าง, กำลังโหลด"
        topic="states"
        phase="watchout"
        title={<>อย่าใช้ sleep แทนหน่วง</>}
        symptom={<>เทสไม่เห็น “กำลังโหลด...”</>}
        cause={<>sleep ในเทสไม่ได้ทำให้ API ช้า พอตรวจ โหลดหายไปแล้ว</>}
        fix={<>หน่วงใน route handler ก่อน <C>fulfill</C></>}
        visual={<DelayCompare />}
      />

      <Topic
        id="7-017"
        section="เครื่องมือเสริม"
        topic="tools"
        title={<>เครื่องมือเสริม</>}
        body={<>ตรวจ request · จำลองเน็ตล่ม · เรียก API ตรง</>}
        visual={<ToolboxCards />}
      />
      <Example
        id="7-018"
        section="เครื่องมือเสริม"
        topic="tools"
        phase="parts"
        title={<>ตรวจว่าหน้าเรียก API</>}
        body={<>สร้าง promise ก่อน goto แล้วรอ request ที่ตรง URL</>}
        snippet="request-check"
        highlight={[[4, 4]]}
      />
      <Example
        id="7-019"
        section="เครื่องมือเสริม"
        topic="tools"
        phase="parts"
        title={<>route.abort: เน็ตล่ม</>}
        body={<>fetch ล้ม หน้าเห็น “เกิดข้อผิดพลาด”</>}
        snippet="abort"
        highlight={[[4, 4]]}
      />
      <Example
        id="7-020"
        section="เครื่องมือเสริม"
        topic="tools"
        phase="parts"
        title={<>route.fetch: แก้ของจริง</>}
        body={<>ดึงของจริงมาแก้ก่อน fulfill</>}
        snippet="fetch"
        lines={[[3, 10]]}
        highlight={[[5, 6]]}
      />
      <Example
        id="7-021"
        section="เครื่องมือเสริม"
        topic="tools"
        phase="parts"
        title={<>request: เรียก API ตรง</>}
        body={<>ไม่ผ่านหน้าเว็บ — ตรวจ API ได้เร็ว</>}
        snippet="request-fixture"
        highlight={[[4, 4]]}
      />

      <Summary
        id="7-022"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <><C>page.route</C> + <C>fulfill</C> ตอบแทน API</>,
          <>ตั้ง route ก่อน <C>goto</C></>,
          <>เทส error, ว่าง, กำลังโหลด</>,
          <><C>abort</C>, <C>fetch</C>, <C>request</C> เมื่อต้องใช้</>,
        ]}
      />
      <Focus
        id="7-023"
        section="Closing"
        title={<>ต่อไป: จัดเทสให้เป็นระเบียบ</>}
        body={<>Part 8 — describe, hooks, Page Object และ fixtures ให้เทสโตได้โดยไม่รก</>}
      />
      <Sources
        id="7-024"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT — บท 12-13</A></>,
          <><A href="https://playwright.dev/docs/mock">playwright.dev — Mock APIs</A></>,
          <><A href="https://playwright.dev/docs/network">playwright.dev — Network</A></>,
        ]}
      />
    </Deck>
  );
}
