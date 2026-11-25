import type { Block, Piece, Topics } from '../components';
import { A, Anatomy, B, C, Code, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Steps, Summary, Topic } from '../components';
import { ConfigMap, InstallFlow, ProjectTree, ServerPick, TestFlow } from '../visuals/part-02';
import { listings, meta, outputs } from './part-02.data';

const topics: Topics = {
  topics: [
    { id: 'install', section: 'ติดตั้ง', title: 'ติดตั้ง', components: ['pnpm create playwright', 'ไฟล์ config', 'เทสตัวอย่าง', 'browser'] },
    { id: 'config', section: 'playwright.config.ts', title: 'playwright.config.ts', components: ['testDir', 'use', 'projects', 'webServer', 'reporter'] },
    { id: 'server', section: 'เปิดแอปให้เทส', title: 'เปิดแอปให้เทส', components: ['Playwright', 'webServer', 'เซิร์ฟเวอร์', 'เบราว์เซอร์'] },
    { id: 'first', section: 'เทสแรกของเรา', title: 'เทสแรกของเรา', components: ['home.spec.ts', 'baseURL', 'แอปเรา', 'ผล'] },
  ],
};

const devBlock: Block[] = [{ lang: 'bash', info: 'text', text: 'pnpm dev' }];
const buildBlock: Block[] = [{ lang: 'bash', info: 'text', text: 'pnpm build && pnpm start' }];
const serverError: Block[] = [
  { lang: 'text', info: 'text', text: 'Error: Timed out waiting 120000ms from config.webServer.' },
];

const webserverPieces: Piece[] = [
  { text: 'webServer: { ' },
  { text: 'command', n: 1 },
  { text: ', ' },
  { text: 'url', n: 2 },
  { text: ', ' },
  { text: 'reuseExistingServer', n: 3 },
  { text: ', ' },
  { text: 'timeout }', n: 4 },
];

export default function Part02() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="2-001"
        section="Opening"
        title={<>ติดตั้ง Playwright กับ Next.js</>}
        body={<>Part 2 ทำตามไปพร้อมกันกับโปรเจกต์ของคุณเอง</>}
      />
      <Objectives
        id="2-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>ติดตั้งในโปรเจกต์ Next.js ได้</>,
          <>ตั้ง <C>playwright.config.ts</C> ได้</>,
          <>ให้ Playwright เปิดแอปเอง</>,
          <>รันเทสแรกกับแอปตัวเอง</>,
        ]}
      />
      <Steps
        id="2-003"
        section="Opening"
        title={<>ต้องมีอะไรก่อน</>}
        items={[
          <>Node 20 ขึ้นไป</>,
          <>pnpm หรือ npm (ตัวอย่างใช้ pnpm)</>,
          <>โปรเจกต์ Next.js ที่รัน <C>next dev</C> ได้</>,
        ]}
      />

      <Topic
        id="2-004"
        section="ติดตั้ง"
        topic="install"
        title={<>ติดตั้ง</>}
        body={<>คำสั่งเดียว</>}
        visual={<InstallFlow />}
      />
      <Explain
        id="2-005"
        section="ติดตั้ง"
        topic="install"
        phase="know"
        title={<>คำสั่งเดียวทำสามอย่าง</>}
        body={<>เพิ่มแพ็กเกจ สร้าง config กับเทสตัวอย่าง และ (ถ้าเลือก) โหลด browser</>}
        visual={<InstallFlow highlight="all" />}
      />
      <Steps
        id="2-006"
        section="ติดตั้ง"
        topic="install"
        phase="parts"
        title={<>ตอนติดตั้งจะถามอะไร</>}
        items={[
          <><B>ภาษา</B> — เลือก TypeScript</>,
          <><B>โฟลเดอร์เทส</B> — ค่าเริ่มต้น tests · แนะนำ e2e</>,
          <><B>GitHub Actions</B> — ข้ามก่อน</>,
          <><B>โหลด browser</B> — ใช่</>,
        ]}
      />
      <Explain
        id="2-007"
        section="ติดตั้ง"
        topic="install"
        phase="parts"
        title={<>ไฟล์ที่เพิ่มมา</>}
        body={<>install สร้าง config กับโฟลเดอร์เทส เพิ่ม devDependency และเติม .gitignore</>}
        visual={<ProjectTree variant="install" />}
      />
      <Explain
        id="2-008"
        section="ติดตั้ง"
        topic="install"
        phase="parts"
        title={<>browser โหลดแยก</>}
        body={
          <>
            ติดตั้งครั้งเดียวต่อเครื่อง
            <br />
            <C>pnpm exec playwright install chromium</C>
            <br />
            บน CI เพิ่ม <C>--with-deps</C>
          </>
        }
        visual={<InstallFlow highlight={3} />}
      />
      <Example
        id="2-009"
        section="ติดตั้ง"
        topic="install"
        phase="example"
        title={<>รันในโปรเจกต์ของคุณ</>}
        body={<>เปิด terminal ที่โฟลเดอร์โปรเจกต์</>}
        snippet="install"
        notice={<>ตัวอย่างใช้ <C>--quiet --browser=chromium --lang=ts --no-browsers</C> · ปกติมีคำถามให้ตอบ</>}
      />
      <Error
        id="2-010"
        section="ติดตั้ง"
        topic="install"
        phase="watchout"
        title={<>ตัวอย่างที่ได้ไปเปิดเว็บคนอื่น</>}
        symptom={<>รันผ่าน แต่ไม่ได้ทดสอบแอปคุณ</>}
        cause={<><C>example.spec.ts</C> เปิด playwright.dev ไม่ใช่แอปเรา</>}
        fix={<>ลบหรือแทนด้วยเทสที่เปิดแอปเรา</>}
        visual={<ProjectTree variant="error" />}
      />

      <Topic
        id="2-011"
        section="playwright.config.ts"
        topic="config"
        title={<>playwright.config.ts</>}
        body={<>ไฟล์เดียวบอกว่าเทสอยู่ไหน รันยังไง</>}
        visual={<ConfigMap mode="zones" />}
      />
      <Explain
        id="2-012"
        section="playwright.config.ts"
        topic="config"
        phase="know"
        title={<>config คือแผนผังการรันเทส</>}
        body={<>แบ่ง 5 โซน แต่ละโซนตอบหนึ่งคำถาม</>}
        visual={<ConfigMap mode="questions" />}
      />
      <Explain
        id="2-013"
        section="playwright.config.ts"
        topic="config"
        phase="parts"
        title={<>testDir และการรันขนาน</>}
        body={<><C>testDir</C> บอกโฟลเดอร์เทส · <C>fullyParallel</C> ให้หลายเทสรันพร้อมกัน</>}
        visual={<ConfigMap mode="questions" highlight={0} />}
      />
      <Explain
        id="2-014"
        section="playwright.config.ts"
        topic="config"
        phase="parts"
        title={<>use: ค่ากลางของทุกเทส</>}
        body={<><C>baseURL</C> ให้ goto ใส่แค่ path · <C>trace</C> เก็บตอน retry · <C>screenshot</C> ถ่ายตอนพัง</>}
        visual={<ConfigMap mode="questions" highlight={1} />}
      />
      <Explain
        id="2-015"
        section="playwright.config.ts"
        topic="config"
        phase="parts"
        title={<>projects: เบราว์เซอร์ที่ใช้</>}
        body={<>หนึ่ง project = หนึ่งชุดเบราว์เซอร์หรืออุปกรณ์ เริ่มที่ <C>chromium</C> เพิ่ม Firefox/WebKit ภายหลังได้</>}
        visual={<ConfigMap mode="questions" highlight={2} />}
      />
      <Explain
        id="2-016"
        section="playwright.config.ts"
        topic="config"
        phase="parts"
        title={<>reporter, retries, workers</>}
        body={<>reporter สร้างรายงาน · บน CI retry 2 ครั้ง workers 1 · <C>forbidOnly</C> ห้าม test.only หลุด</>}
        visual={<ConfigMap mode="questions" highlight={4} />}
      />
      <Anatomy
        id="2-017"
        section="playwright.config.ts"
        topic="config"
        phase="parts"
        title={<>webServer เปิดแอปให้เอง</>}
        pieces={webserverPieces}
        items={[
          <>คำสั่งเปิดแอป</>,
          <>url ที่รอจนตอบ</>,
          <>ใช้เซิร์ฟเวอร์เดิมได้</>,
          <>รอ 120 วินาที</>,
        ]}
      />
      <Code
        id="2-018"
        section="playwright.config.ts"
        topic="config"
        phase="example"
        title={<>config ที่ใช้กับ Next.js</>}
        body={<>config ย่อที่ใช้ได้จริงกับโปรเจกต์ Next.js</>}
        snippet="next-config"
      />

      <Topic
        id="2-019"
        section="เปิดแอปให้เทส"
        topic="server"
        title={<>เปิดแอปให้เทส</>}
        body={<>เทสต้องมีแอปรันอยู่</>}
        visual={<ServerPick />}
      />
      <Explain
        id="2-020"
        section="เปิดแอปให้เทส"
        topic="server"
        phase="know"
        title={<>Playwright ไม่รู้จัก Next.js</>}
        body={<>เราบอกคำสั่งเปิดแอป มันรันแล้วรอจน url ตอบ ค่อยเริ่มเทส</>}
        visual={<ServerPick highlight={1} />}
      />
      <Compare
        id="2-021"
        section="เปิดแอปให้เทส"
        topic="server"
        phase="parts"
        title={<>next dev หรือ build + start</>}
        left={<>dev — เริ่มเร็ว compile ตามหน้า</>}
        right={<>build+start — ใกล้ production แต่ build ช้า</>}
        takeaway={<>เขียนใช้ dev · ก่อน merge ใช้ build+start</>}
        leftBlocks={devBlock}
        rightBlocks={buildBlock}
      />
      <Explain
        id="2-022"
        section="เปิดแอปให้เทส"
        topic="server"
        phase="parts"
        title={<>ใช้พอร์ตแยกจาก pnpm dev</>}
        body={<>เรโปตัวอย่างให้ Playwright ใช้ 3100 ส่วน pnpm dev อยู่ 3000 กัน reuse dev server โดยไม่รู้ตัว</>}
        visual={<ServerPick mode="ports" />}
      />
      <Code
        id="2-023"
        section="เปิดแอปให้เทส"
        topic="server"
        phase="example"
        title={<>webServer สองแบบ</>}
        body={<>เลือกแบบเดียว: dev เร็วตอนเขียน · build+start ใกล้ production</>}
        snippet="webserver-two"
      />
      <Error
        id="2-024"
        section="เปิดแอปให้เทส"
        topic="server"
        phase="watchout"
        title={<>เซิร์ฟเวอร์ไม่ขึ้น</>}
        symptom={<>เทสไม่เริ่ม</>}
        blocks={serverError}
        cause={<>url ไม่ตรงพอร์ตที่เซิร์ฟเวอร์เปิด หรือ command ไม่ขึ้น</>}
        fix={<>เช็ก command กับ url ให้พอร์ตตรงกัน แล้วลองรันเอง</>}
      />

      <Topic
        id="2-025"
        section="เทสแรกของเรา"
        topic="first"
        title={<>เทสแรกของเรา</>}
        body={<>แทนเทสตัวอย่างด้วยเทสที่เปิดแอปเรา</>}
        visual={<TestFlow />}
      />
      <Explain
        id="2-026"
        section="เทสแรกของเรา"
        topic="first"
        phase="know"
        title={<>เทสหน้าแรก</>}
        body={<>เปิด / ตรวจว่าหน้าขึ้น นี่คือ smoke test เล็กๆ ที่บอกว่า setup ถูก</>}
        visual={<TestFlow highlight={1} />}
      />
      <Code
        id="2-027"
        section="เทสแรกของเรา"
        topic="first"
        phase="parts"
        title={<>เพิ่มสคริปต์ใน package.json</>}
        body={<>เรียกใช้สั้นๆ จาก package.json</>}
        snippet="scripts"
      />
      <Explain
        id="2-028"
        section="เทสแรกของเรา"
        topic="first"
        phase="parts"
        title={<>อย่าให้ชนกับ Vitest</>}
        body={<>Vitest อาจเก็บ *.spec.ts ของ Playwright ไปรัน → exclude โฟลเดอร์ e2e และแยก tsconfig ถ้า type ชน</>}
        visual={<ProjectTree variant="vitest" />}
      />
      <Example
        id="2-029"
        section="เทสแรกของเรา"
        topic="first"
        phase="example"
        title={<>home.spec.ts</>}
        body={<>เปิดหน้าแรกของ create-next-app แล้วตรวจหัวข้อกับข้อความ</>}
        snippet="home-test"
        highlight={[[4, 4]]}
      />
      <Explain
        id="2-030"
        section="เทสแรกของเรา"
        topic="first"
        phase="check"
        title={<>ลองเปิด UI mode</>}
        body={<><C>pnpm test:e2e:ui</C> เปิดหน้าต่างรวมเทสให้กดรัน (รายละเอียด Part 6) · มีส่วนขยาย VS Code</>}
      />
      <Steps
        id="2-031"
        section="เทสแรกของเรา"
        topic="first"
        phase="check"
        title={<>เช็กลิสต์ก่อนไปต่อ</>}
        items={[
          <>ติดตั้งแล้ว</>,
          <>config มี baseURL + webServer</>,
          <>เทสแรกผ่าน</>,
          <>scripts พร้อม</>,
        ]}
      />

      <Summary
        id="2-032"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>ติดตั้งด้วยคำสั่งเดียว</>,
          <>config 5 โซน: testDir, use, projects, webServer, reporter</>,
          <>webServer เปิดแอปให้เทส</>,
          <>เทสแรกผ่าน และ scripts พร้อม</>,
        ]}
      />
      <Focus
        id="2-033"
        section="Closing"
        title={<>ต่อไป: เขียนเทสจริง</>}
        body={<>Part 3 หา element ในหน้าด้วย locator</>}
      />
      <Sources
        id="2-034"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://playwright.dev/docs/intro">playwright.dev — Introduction</A></>,
          <><A href="https://playwright.dev/docs/test-webserver">playwright.dev — Test web server</A></>,
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A></>,
        ]}
      />
    </Deck>
  );
}
