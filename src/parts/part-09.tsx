import type { Piece, Topics } from '../components';
import { A, Anatomy, C, Code, Cover, Deck, Error, Example, Explain, Focus, Objectives, Output, Sources, Steps, Summary, Topic } from '../components';
import { AuthShare, CourseMap, FlowPyramid, LoginRepeat, NextSteps, ShopFlow, SpecialCases } from '../visuals/part-09';
import { listings, meta, outputs } from './part-09.data';

const topics: Topics = {
  topics: [
    { id: 'auth', section: 'login ครั้งเดียว', title: 'login ครั้งเดียว', components: ['storageState', 'setup project', 'dependencies', 'test.use'] },
    { id: 'flow', section: 'เทสทั้ง flow', title: 'เทสทั้ง flow', components: ['fixtures', 'Page Object', 'test.step', 'expect'] },
    { id: 'special', section: 'สถานการณ์พิเศษ', title: 'สถานการณ์พิเศษ', components: ['dialog', 'popup', 'iframe', 'download'] },
    { id: 'next', section: 'เรียนต่ออะไรดี', title: 'เรียนต่ออะไรดี', components: ['CI', 'หลายเบราว์เซอร์', 'visual snapshot', 'component testing'] },
  ],
};

const storagePieces: Piece[] = [
  { text: 'await ' },
  { text: 'page.context()', n: 1 },
  { text: '.storageState(', n: 2 },
  { text: '{ ' },
  { text: 'path: authFile', n: 3 },
  { text: ' })' },
];

const usePieces: Piece[] = [
  { text: 'test.use(', n: 1 },
  { text: '{ ' },
  { text: 'storageState', n: 2 },
  { text: ': ' },
  { text: '"playwright/.auth/', n: 3 },
  { text: 'user.json"' },
  { text: ' })' },
];

export default function Part09() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="9-001"
        section="Opening"
        title={<>login ครั้งเดียวและเทสทั้ง flow</>}
        body={<>Part 9 · เก็บ session แล้วเล่าเรื่องทั้งร้านในเทสเดียว</>}
      />
      <Objectives
        id="9-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>login ครั้งเดียวด้วย <C>storageState</C></>,
          <>เขียนเทส flow เต็ม</>,
          <>รู้จัก dialog, แท็บใหม่, iframe, download</>,
          <>รู้ว่าเรียนอะไรต่อ</>,
        ]}
      />
      <Focus
        id="9-003"
        section="Opening"
        title={<>50 เทส login 50 ครั้ง</>}
        body={<>เทส checkout ทุกอันต้อง login ผ่านหน้าเว็บก่อน — เปิดฟอร์ม พิมพ์รหัส กดปุ่ม ซ้ำทุกครั้ง</>}
        visual={<LoginRepeat />}
      />

      <Topic
        id="9-004"
        section="login ครั้งเดียว"
        topic="auth"
        title={<>login ครั้งเดียว</>}
        body={<>เก็บ session ไว้ใช้ซ้ำ</>}
        visual={<AuthShare />}
      />
      <Explain
        id="9-005"
        section="login ครั้งเดียว"
        topic="auth"
        phase="know"
        title={<>เก็บสภาพการ login ลงไฟล์</>}
        body={<>storageState คือ cookies กับ localStorage ตอนนั้น เซฟเป็นไฟล์ <C>user.json</C> แล้วเทสอื่นโหลดไปใช้ได้</>}
        visual={<AuthShare highlight="file" />}
      />
      <Anatomy
        id="9-006"
        section="login ครั้งเดียว"
        topic="auth"
        phase="parts"
        title={<>setup login ครั้งเดียว</>}
        pieces={storagePieces}
        items={[
          <>context ที่เก็บ cookies</>,
          <>สั่งเซฟลงไฟล์</>,
          <>path ปลายทาง</>,
        ]}
      />
      <Explain
        id="9-007"
        section="login ครั้งเดียว"
        topic="auth"
        phase="parts"
        title={<>setup project รันก่อนเสมอ</>}
        body={<>setup รัน <C>auth.setup.ts</C> ก่อน · chromium ประกาศ <C>dependencies: [&quot;setup&quot;]</C> จึงรอ setup เสร็จ</>}
        visual={<AuthShare highlight="projects" />}
      />
      <Code
        id="9-008"
        section="login ครั้งเดียว"
        topic="auth"
        phase="parts"
        title={<>config ส่วน projects</>}
        body={<>จาก playwright.config.ts ของเรโป — setup กับ chromium ผูกด้วย dependencies</>}
        snippet="config-projects"
        highlight={[[6, 6]]}
      />
      <Anatomy
        id="9-009"
        section="login ครั้งเดียว"
        topic="auth"
        phase="parts"
        title={<>ใช้ session ในเทส</>}
        pieces={usePieces}
        items={[
          <>ใช้กับเทสใน describe นี้</>,
          <>โหลด session ก่อนเปิดหน้า</>,
          <>ไฟล์ที่ setup สร้างไว้</>,
        ]}
      />
      <Example
        id="9-010"
        section="login ครั้งเดียว"
        topic="auth"
        phase="example"
        title={<>ไม่ login กับ login แล้ว</>}
        body={<>ไม่ login → ถูกส่งไป <C>/shop/login</C> · ใช้ session → เข้า checkout ได้เลย</>}
        snippet="login-storagestate"
        lines={[[3, 9]]}
        highlight={[[4, 4]]}
      />
      <Error
        id="9-011"
        section="login ครั้งเดียว"
        topic="auth"
        phase="watchout"
        title={<>อย่า commit ไฟล์ auth</>}
        symptom={<>git add . พา user.json ไปด้วย</>}
        cause={<>มี cookie จริง ใครได้ไปก็เข้าแทนได้</>}
        fix={<>ไฟล์นี้ต้องอยู่ใน .gitignore — มีให้แล้ว</>}
        blocks={[{ lang: 'text', info: 'text', text: '# Playwright\nplaywright/.auth/' }]}
        visual={<AuthShare leak />}
      />

      <Topic
        id="9-012"
        section="เทสทั้ง flow"
        topic="flow"
        title={<>เทสทั้ง flow</>}
        body={<>จากเลือกสินค้าถึงสั่งซื้อสำเร็จ</>}
        visual={<ShopFlow />}
      />
      <Explain
        id="9-013"
        section="เทสทั้ง flow"
        topic="flow"
        phase="know"
        title={<>หนึ่งเทส เล่าหนึ่งเรื่อง</>}
        body={<>flow เต็มคือเรื่องที่ผู้ใช้ทำจริง ตั้งแต่ต้นจนจบ แบ่ง step ให้อ่านออก — จบที่ผลสำเร็จ</>}
        visual={<ShopFlow highlight={5} />}
      />
      <Explain
        id="9-014"
        section="เทสทั้ง flow"
        topic="flow"
        phase="parts"
        title={<>ใช้ของที่เรียนมารวมกัน</>}
        body={<><C>locator/action</C> · Page Object · fixtures · step · expect — ของที่เรียนมา รวมในเทสเดียว</>}
        visual={<ShopFlow annotate />}
      />
      <Code
        id="9-015"
        section="เทสทั้ง flow"
        topic="flow"
        phase="parts"
        title={<>เทส flow ฉบับย่อ</>}
        body={<>จาก <C>18-full-flow.spec.ts</C> — เจาะช่วงเปิดกับช่วงปิด</>}
        snippet="full-flow"
        lines={[[3, 8], [25, 30]]}
      />
      <Output
        id="9-016"
        section="เทสทั้ง flow"
        topic="flow"
        phase="example"
        title={<>ผลรันจริง</>}
        body={<>5 step ผ่านครบ — login ที่ step 4 แล้วกลับมา checkout สั่งซื้อสำเร็จ</>}
        snippet="full-flow"
      />
      <Explain
        id="9-017"
        section="เทสทั้ง flow"
        topic="flow"
        phase="watchout"
        title={<>อย่าให้ flow เต็มเยอะเกิน</>}
        body={<>flow เต็มใช้กับเรื่องสำคัญไม่กี่เรื่อง ที่เหลือเทสเล็กๆ เร็วๆ — ตามพีระมิดจาก Part 1</>}
        visual={<FlowPyramid />}
      />

      <Topic
        id="9-018"
        section="สถานการณ์พิเศษ"
        topic="special"
        title={<>สถานการณ์พิเศษ</>}
        body={<>dialog · หลายแท็บ · iframe · download</>}
        visual={<SpecialCases />}
      />
      <Example
        id="9-019"
        section="สถานการณ์พิเศษ"
        topic="special"
        phase="parts"
        title={<>dialog: ตอบก่อนกด</>}
        body={<>alert เด้งตอนกด ตั้ง handler รับก่อน แล้วสั่ง accept เอง</>}
        snippet="special-dialog"
        lines={[[5, 9]]}
        highlight={[[5, 5]]}
      />
      <Example
        id="9-020"
        section="สถานการณ์พิเศษ"
        topic="special"
        phase="parts"
        title={<>แท็บใหม่: รอ popup</>}
        body={<>เริ่มรอ event ก่อนกด เปิดมาแล้วค่อยหยิบ page ใหม่ไปตรวจ</>}
        snippet="special-popup"
        lines={[[5, 9]]}
        highlight={[[5, 5]]}
      />
      <Example
        id="9-021"
        section="สถานการณ์พิเศษ"
        topic="special"
        phase="parts"
        title={<>iframe: เข้าไปข้างใน</>}
        body={<>element อยู่ในกรอบคนละ document ใช้ frameLocator แทน page</>}
        snippet="special-iframe"
        lines={[[5, 7]]}
        highlight={[[5, 5]]}
      />
      <Example
        id="9-022"
        section="สถานการณ์พิเศษ"
        topic="special"
        phase="parts"
        title={<>ดาวน์โหลดไฟล์</>}
        body={<>เริ่มรอ download ก่อนกด แล้วตรวจชื่อไฟล์ที่ได้</>}
        snippet="special-download"
        lines={[[5, 8]]}
        highlight={[[5, 5]]}
      />

      <Topic
        id="9-023"
        section="เรียนต่ออะไรดี"
        topic="next"
        title={<>เรียนต่ออะไรดี</>}
        body={<>4 เรื่องที่คอร์สนี้ยังไม่ได้พูด</>}
        visual={<NextSteps />}
      />
      <Steps
        id="9-024"
        section="เรียนต่ออะไรดี"
        topic="next"
        phase="parts"
        title={<>ลำดับที่แนะนำ</>}
        items={[
          <>CI — GitHub Actions รันทุก push</>,
          <>หลายเบราว์เซอร์ + sharding</>,
          <>visual snapshot — <C>toHaveScreenshot</C></>,
          <>component testing</>,
        ]}
        visual={<NextSteps numbered />}
      />

      <Summary
        id="9-025"
        section="Closing"
        title={<>สรุปทั้งคอร์ส</>}
        items={[
          <>Part 1–3: E2E · ติดตั้ง · หา element</>,
          <>Part 4–6: สั่ง · ตรวจ/รอ · ดูผล</>,
          <>Part 7–9: mock API · จัดโครง · login</>,
        ]}
        visual={<CourseMap />}
      />
      <Focus
        id="9-026"
        section="Closing"
        title={<>ไปลองเขียนเทสแอปของคุณ</>}
        body={<>เริ่มจาก 1 flow ที่สำคัญที่สุด: login → ทำงานหลัก → เห็นผลสำเร็จ</>}
      />
      <Sources
        id="9-027"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A></>,
          <><A href="https://playwright.dev/docs/auth">playwright.dev — Authentication</A></>,
          <><A href="https://playwright.dev/docs/dialogs">playwright.dev — Dialogs</A></>,
          <><A href="https://playwright.dev/docs/pages">playwright.dev — Pages</A></>,
        ]}
      />
    </Deck>
  );
}
