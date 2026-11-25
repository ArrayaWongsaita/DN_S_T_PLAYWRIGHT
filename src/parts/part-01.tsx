import type { Topics } from '../components';
import { A, B, C, Compare, Cover, Deck, Example, Explain, Focus, Objectives, Sources, Steps, Summary, Topic } from '../components';
import { CapabilityMap, ControlDiagram, E2EFlow, Part1Overlay, TestPyramid, Toolbox } from '../visuals/part-01';
import { listings, meta, outputs } from './part-01.data';

const topics: Topics = {
  topics: [
    { id: 'e2e', section: 'E2E test คืออะไร', title: 'E2E test คืออะไร', components: ['ผู้ใช้จำลอง', 'เบราว์เซอร์จริง', 'แอป Next.js', 'ผลที่เห็น'] },
    { id: 'playwright', section: 'Playwright', title: 'Playwright', components: ['test runner', 'locator', 'action', 'expect', 'เครื่องมือดูผล'] },
    { id: 'capabilities', section: 'ทำอะไรได้บ้าง', title: 'ทำอะไรได้บ้าง', components: ['สั่งหน้าเว็บ', 'รอเอง', 'mock API', 'ดูผล', 'จัดโครงสร้าง', 'ขนาน/หลายเบราว์เซอร์'] },
  ],
};

const compareLeft = [
  {
    lang: 'text',
    info: 'text',
    text: 'test\n  └ jsdom\n     ├ ไม่มี CSS จริง\n     └ <Button />',
  },
];

const compareRight = [
  {
    lang: 'text',
    info: 'text',
    text: 'test\n  └ Chromium\n     ├ CSS + layout จริง\n     └ Next.js server',
  },
];

export default function Part01() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="1-001"
        section="Opening"
        title={<>Playwright คืออะไร</>}
        body={<>คอร์ส Playwright E2E กับ Next.js · Part 1</>}
      />
      <Objectives
        id="1-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>อธิบายได้ว่า E2E test คืออะไร ต่างจาก RTL อย่างไร</>,
          <>บอกได้ว่า Playwright คืออะไร และทำอะไรได้</>,
          <>รู้ว่าเมื่อไรควรเขียน E2E เมื่อไรไม่ควร</>,
        ]}
      />
      <Focus
        id="1-003"
        section="Opening"
        title={<>unit test ผ่านหมด แต่ปุ่มจ่ายเงินกดไม่ได้</>}
        body={<>แก้ CSS ทับปุ่ม ทุก unit test ยังเขียว แต่ผู้ใช้กดไม่ได้ ใครจะจับได้ก่อนลูกค้า</>}
        visual={<Part1Overlay />}
      />

      <Topic
        id="1-004"
        section="E2E test คืออะไร"
        topic="e2e"
        title={<>E2E test คืออะไร</>}
        body={<>เทสที่ใช้แอปจริงเหมือนผู้ใช้</>}
        visual={<E2EFlow />}
      />
      <Explain
        id="1-005"
        section="E2E test คืออะไร"
        topic="e2e"
        phase="know"
        title={<>เทสที่ “ใช้แอปแทนคน”</>}
        body={
          <>
            <B>E2E</B> (end-to-end) เปิดแอปจริงในเบราว์เซอร์จริง กด พิมพ์ แล้วตรวจสิ่งที่เห็น เหมือนจ้างคนมาไล่ทดสอบทุกครั้ง
          </>
        }
        visual={<E2EFlow highlight={0} />}
      />
      <Compare
        id="1-006"
        section="E2E test คืออะไร"
        topic="e2e"
        phase="parts"
        title={<>RTL ต่างจาก Playwright ตรงไหน</>}
        left={<>RTL เรนเดอร์ component ใน <C>jsdom</C></>}
        right={<>Playwright เปิด Chromium จริง เข้าแอปที่รันอยู่</>}
        takeaway={<>คำถามคือ: component ถูกไหม หรือ ผู้ใช้ทำได้ไหม</>}
        leftBlocks={compareLeft}
        rightBlocks={compareRight}
      />
      <Explain
        id="1-007"
        section="E2E test คืออะไร"
        topic="e2e"
        phase="parts"
        title={<>ใช้แต่ละแบบเมื่อไร</>}
        body={
          <>
            unit/RTL: เยอะ เร็ว ตรวจ logic เล็กๆ · <B>E2E</B>: น้อย ช้ากว่า ตรวจ flow สำคัญ เช่น login, สั่งซื้อ
          </>
        }
        visual={<TestPyramid highlight={2} />}
      />
      <Explain
        id="1-008"
        section="E2E test คืออะไร"
        topic="e2e"
        phase="watchout"
        title={<>E2E ไม่ได้มาแทน unit test</>}
        body={<>E2E ช้ากว่าและพังง่ายกว่า อย่าเขียนทุกเรื่องเป็น E2E เลือกแค่ทางที่เงินและผู้ใช้พึ่งพา</>}
        visual={<TestPyramid overflow />}
      />

      <Topic
        id="1-009"
        section="Playwright"
        topic="playwright"
        title={<>Playwright</>}
        body={<>เครื่องมือให้โค้ดสั่งเบราว์เซอร์จริง</>}
        visual={<ControlDiagram />}
      />
      <Explain
        id="1-010"
        section="Playwright"
        topic="playwright"
        phase="know"
        title={<>โค้ดของคุณเป็นรีโมท เบราว์เซอร์คือทีวี</>}
        body={<>เขียนเทสด้วย TypeScript แล้วสั่งเบราว์เซอร์จริงเปิดหน้า คลิก พิมพ์ ตรวจผล</>}
        visual={<ControlDiagram mode="send" />}
      />
      <Steps
        id="1-011"
        section="Playwright"
        topic="playwright"
        phase="parts"
        title={<>ในกล่องเดียวมีอะไร</>}
        items={[
          <><B>test runner</B> — รันเทส</>,
          <><B>locator</B> — หา element</>,
          <><B>action</B> — กด พิมพ์</>,
          <><B>expect</B> — ตรวจผล</>,
          <><B>เครื่องมือ</B> — report, trace, codegen</>,
        ]}
        visual={<Toolbox />}
      />
      <Example
        id="1-012"
        section="Playwright"
        topic="playwright"
        phase="example"
        title={<>เทสที่เล็กที่สุด</>}
        body={<>เปิดหน้า ตรวจ title รันแล้วเห็น passed</>}
        snippet="first-test"
        highlight={[[5, 5]]}
      />
      <Explain
        id="1-013"
        section="Playwright"
        topic="playwright"
        phase="watchout"
        title={<>ทุกคำสั่งต้อง await</>}
        body={<>คำสั่งของ Playwright คุยกับเบราว์เซอร์จริง จึงใช้เวลา ต้อง <C>await</C> ทุกครั้ง ไม่งั้นได้ค่าที่ยังไม่มา</>}
        visual={<ControlDiagram mode="wait" />}
      />

      <Topic
        id="1-014"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        title={<>ทำอะไรได้บ้าง</>}
        body={<>ภาพรวมความสามารถ ก่อนไปเรียนทีละอย่าง</>}
        visual={<CapabilityMap />}
      />
      <Explain
        id="1-015"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>สั่งหน้าเว็บเหมือนคนใช้</>}
        body={<>คลิก พิมพ์ ติ๊ก เลือก hover อัปโหลดไฟล์ — Part 3-4</>}
        visual={<CapabilityMap highlight={0} />}
      />
      <Explain
        id="1-016"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>รอให้เอง ไม่ต้องเดาเวลา</>}
        body={<>หน้าโหลดช้า? Playwright รอ element พร้อมและตรวจซ้ำให้เอง ไม่ต้อง sleep — Part 5</>}
        visual={<CapabilityMap highlight={1} />}
      />
      <Explain
        id="1-017"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>จำลอง API ได้</>}
        body={<>ทำให้ API ตอบ 500 หรือรายการว่างได้ตามสั่ง เพื่อเทสทุกสถานะ — Part 7</>}
        visual={<CapabilityMap highlight={2} />}
      />
      <Explain
        id="1-018"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>ดูผลได้หลายแบบ</>}
        body={<>เปิดหน้าต่างดู, UI mode, รายงาน HTML, Trace ย้อนดูทีละขั้น, codegen อัดเป็นโค้ด — Part 6</>}
        visual={<CapabilityMap highlight={3} />}
      />
      <Explain
        id="1-019"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>จัดระเบียบและใช้ซ้ำ</>}
        body={<>describe/hooks, Page Object, fixtures, login ครั้งเดียวแล้วใช้ซ้ำ — Part 8-9</>}
        visual={<CapabilityMap highlight={4} />}
      />
      <Explain
        id="1-020"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>รันเร็วและข้ามเบราว์เซอร์</>}
        body={<>รันหลาย test พร้อมกัน และเปลี่ยนไปใช้ Firefox/WebKit/มือถือได้ด้วยการตั้งค่า (คอร์สนี้ใช้ Chromium)</>}
        visual={<CapabilityMap highlight={5} />}
      />
      <Explain
        id="1-021"
        section="ทำอะไรได้บ้าง"
        topic="capabilities"
        phase="know"
        title={<>ที่คอร์สนี้ยังไม่พูดถึง</>}
        body={<>CI, sharding, visual snapshot, component testing เป็นเรื่องต่อยอด ไว้ค่อยไปต่อ</>}
        visual={<CapabilityMap future />}
      />

      <Summary
        id="1-022"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>E2E = ใช้แอปจริงแทนคน</>,
          <>Playwright = โค้ดสั่งเบราว์เซอร์จริง</>,
          <>ทำได้: สั่ง รอ mock ดูผล จัดโครง</>,
          <>ใช้กับ flow สำคัญ ไม่ใช่ทุกเรื่อง</>,
        ]}
      />
      <Focus
        id="1-023"
        section="Closing"
        title={<>ต่อไป: ติดตั้งกับ Next.js</>}
        body={<>Part 2 ติดตั้ง Playwright ในโปรเจกต์ Next.js ของคุณเอง ให้ใช้งานได้จริง</>}
      />
      <Sources
        id="1-024"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://playwright.dev/docs/intro">playwright.dev — Introduction</A></>,
          <><A href="https://playwright.dev">playwright.dev</A></>,
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A></>,
        ]}
      />
    </Deck>
  );
}
