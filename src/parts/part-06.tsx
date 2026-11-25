import type { Topics } from '../components';
import { A, C, Code, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Steps, Summary, Topic } from '../components';
import { AfterRun, DebugLadder, ModeCompare, RunFilter, ToolPair } from '../visuals/part-06';
import { listings, meta, outputs } from './part-06.data';

const topics: Topics = {
  topics: [
    { id: 'run-filter', section: 'รันเฉพาะที่ต้องการ', title: 'รันเฉพาะที่ต้องการ', components: ['โฟลเดอร์/ไฟล์', 'ชื่อเทส', 'โปรเจกต์'] },
    { id: 'watch-run', section: 'ดูเทสทำงาน', title: 'ดูเทสทำงาน', components: ['--headed', 'UI mode', '--project'] },
    { id: 'after-run', section: 'ดูหลังเกิดเหตุ', title: 'ดูหลังเกิดเหตุ', components: ['HTML report', 'trace', 'screenshot'] },
    { id: 'write-debug', section: 'ช่วยเขียนและหาสาเหตุ', title: 'ช่วยเขียนและหาสาเหตุ', components: ['codegen', '--debug', 'page.pause()'] },
  ],
};

const traceOnBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: 'use: {\n  trace: "on",\n}',
  },
];

const traceFailureBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: 'use: {\n  trace: "retain-on-failure",\n}',
  },
];

export default function Part06() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="6-001"
        section="Opening"
        title={<>รันดูผลและแก้บั๊ก</>}
        body={<>Part 6 · ดูเทสทำงาน อ่านรายงาน และหาสาเหตุ</>}
      />
      <Objectives
        id="6-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>รันเฉพาะโฟลเดอร์ ไฟล์ หรือชื่อเทส</>,
          <>ดูเทสทำงานด้วย <C>--headed</C> และ UI mode</>,
          <>อ่านรายงาน HTML และ trace</>,
          <>ใช้ codegen, <C>--debug</C> และ <C>page.pause()</C></>,
        ]}
      />
      <Focus
        id="6-003"
        section="Opening"
        title={<>เทสแดง แล้วไงต่อ</>}
        body={<>ไต่จากเบาไปหนัก: error → report → trace → UI mode → debug อย่าเพิ่งเดาแล้วแก้มั่ว</>}
        visual={<DebugLadder />}
      />

      <Topic
        id="6-004"
        section="รันเฉพาะที่ต้องการ"
        topic="run-filter"
        title={<>รันเฉพาะที่ต้องการ</>}
        body={<>ไม่ต้องรันทั้งหมดทุกครั้ง</>}
        visual={<RunFilter />}
      />
      <Explain
        id="6-005"
        section="รันเฉพาะที่ต้องการ"
        topic="run-filter"
        phase="know"
        title={<>ยิ่งแคบยิ่งเร็ว</>}
        body={<>ต่อท้ายคำสั่งด้วยโฟลเดอร์ ไฟล์ หรือชื่อเทส ยิ่งแคบ ยิ่งรันน้อยและเร็วขึ้น</>}
        visual={<RunFilter highlight={3} />}
      />
      <Steps
        id="6-006"
        section="รันเฉพาะที่ต้องการ"
        topic="run-filter"
        phase="parts"
        title={<>คำสั่งที่ใช้บ่อย</>}
        items={[
          <><C>pnpm test:e2e</C> — ทั้งหมด</>,
          <><C>pnpm test:e2e e2e/04-click</C> — โฟลเดอร์</>,
          <><C>pnpm test:e2e -g &quot;สองครั้ง&quot;</C> — ชื่อ</>,
          <><C>pnpm test:e2e --project=chromium</C> — โปรเจกต์</>,
        ]}
      />
      <Example
        id="6-007"
        section="รันเฉพาะที่ต้องการ"
        topic="run-filter"
        phase="example"
        title={<>รันบทเดียว</>}
        body={<>คำสั่งเดียวจบ เฉพาะโฟลเดอร์ 04 ไม่ต้องรันทั้งคอร์ส</>}
        snippet="run-chapter"
      />
      <Error
        id="6-008"
        section="รันเฉพาะที่ต้องการ"
        topic="run-filter"
        phase="watchout"
        title={<>-g เป็น regex</>}
        symptom={<><C>-g &quot;กด +1&quot;</C> ขึ้น <C>No tests found</C></>}
        blocks={[{ lang: 'bash', info: 'text', text: listings['grep-regex'].code }, outputs['grep-regex']]}
        cause={<>-g เป็น regex เครื่องหมาย + คือ “ซ้ำ”</>}
        fix={<>escape: <C>-g &quot;กด \+1&quot;</C></>}
      />

      <Topic
        id="6-009"
        section="ดูเทสทำงาน"
        topic="watch-run"
        title={<>ดูเทสทำงาน</>}
        body={<>เห็นเบราว์เซอร์ลงมือจริง</>}
        visual={<ModeCompare />}
      />
      <Explain
        id="6-010"
        section="ดูเทสทำงาน"
        topic="watch-run"
        phase="know"
        title={<>ปกติเทสมองไม่เห็น</>}
        body={<>headless คือรันเบราว์เซอร์โดยไม่เปิดหน้าต่าง เร็วและเหมาะกับ CI</>}
        visual={<ModeCompare highlight={0} />}
      />
      <Explain
        id="6-011"
        section="ดูเทสทำงาน"
        topic="watch-run"
        phase="parts"
        title={<>--headed: เปิดหน้าต่าง</>}
        body={<>เติม <C>--headed</C> ท้ายคำสั่ง เปิดหน้าต่างดูตอนเทสทำงาน เหมาะดูผ่านๆ</>}
        visual={<ModeCompare highlight={1} />}
      />
      <Explain
        id="6-012"
        section="ดูเทสทำงาน"
        topic="watch-run"
        phase="parts"
        title={<>--ui: UI mode</>}
        body={<><C>pnpm test:e2e:ui</C> รายการเทสซ้าย กดรันทีละอัน ย้อนดูแต่ละขั้นพร้อมภาพหน้าเว็บ</>}
        visual={<ModeCompare highlight={2} />}
      />
      <Code
        id="6-013"
        section="ดูเทสทำงาน"
        topic="watch-run"
        phase="example"
        title={<>ลองรันบท 08</>}
        body={<>headed เปิดหน้าต่าง · ui เปิดหน้าจอให้กดรันเอง</>}
        notice={<>สองคำสั่งนี้เปิดหน้าต่างบนเครื่องคุณ — ลองรันเองเพื่อดู</>}
        snippet="headed-ui"
      />

      <Topic
        id="6-014"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        title={<>ดูหลังเกิดเหตุ</>}
        body={<>รายงานกับ trace</>}
        visual={<AfterRun />}
      />
      <Explain
        id="6-015"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="know"
        title={<>เทสล้มแล้วเก็บอะไรไว้</>}
        body={<>config ของเรโปเก็บ screenshot และ trace เมื่อเทสล้ม เทสผ่านไม่เก็บ</>}
        visual={<AfterRun highlight="run" />}
      />
      <Explain
        id="6-016"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="parts"
        title={<>HTML report</>}
        body={<><C>pnpm report</C> เปิดรายงาน ดูผลรายเทส ข้อความ error และภาพตอนล้ม</>}
        visual={<AfterRun highlight={0} />}
      />
      <Explain
        id="6-017"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="parts"
        title={<>Trace Viewer</>}
        body={<><C>pnpm exec playwright show-trace trace.zip</C> ย้อนดูทุกขั้น: ก่อน/หลัง network console</>}
        visual={<AfterRun highlight={1} />}
      />
      <Compare
        id="6-018"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="parts"
        title={<>ค่าของ trace</>}
        left={<>เก็บทุกครั้ง: <C>on</C></>}
        right={<>เก็บเมื่อล้ม: <C>retain-on-failure</C></>}
        takeaway={<><C>on-first-retry</C> เก็บเมื่อลองใหม่ · <C>off</C> ไม่เก็บ — เลือกตามความถี่ที่ต้องย้อนดู</>}
        leftBlocks={traceOnBlocks}
        rightBlocks={traceFailureBlocks}
      />
      <Example
        id="6-019"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="example"
        title={<>เปิด trace บท 09</>}
        body={<>ใส่ <C>test.use({'{ trace: "on" }'})</C> ในไฟล์ รันแล้ว trace อยู่ใน test-results</>}
        snippet="trace-on"
        lines={[[3, 3], [5, 7], [9, 11]]}
        highlight={[[3, 3]]}
      />
      <Error
        id="6-020"
        section="ดูหลังเกิดเหตุ"
        topic="after-run"
        phase="watchout"
        title={<>อ่าน Expected กับ Received</>}
        symptom={<><C>toHaveCount(4)</C> แต่เจอ 3</>}
        blocks={[outputs['fail-count']]}
        cause={<>Expected = ที่คาด, Received = ที่เจอจริง</>}
        fix={<>แก้ให้ตรงกัน · Timeout = รอครบแล้วไม่เจอ</>}
      />

      <Topic
        id="6-021"
        section="ช่วยเขียนและหาสาเหตุ"
        topic="write-debug"
        title={<>ช่วยเขียนและหาสาเหตุ</>}
        body={<>อัดเป็นโค้ด · ไล่ทีละขั้น</>}
        visual={<ToolPair />}
      />
      <Explain
        id="6-022"
        section="ช่วยเขียนและหาสาเหตุ"
        topic="write-debug"
        phase="know"
        title={<>codegen: ใช้เว็บแล้วได้โค้ด</>}
        body={<><C>pnpm exec playwright codegen localhost:3000</C> — คลิกในเว็บ แล้วมันเขียนให้ (เปิดเซิร์ฟเวอร์ก่อน)</>}
        visual={<ToolPair highlight="codegen" />}
      />
      <Compare
        id="6-023"
        section="ช่วยเขียนและหาสาเหตุ"
        topic="write-debug"
        phase="parts"
        title={<>โค้ดที่ได้ต้องตกแต่ง</>}
        left={<>codegen ให้ locator ที่ใช้ได้</>}
        right={<>เราเติมชื่อเทสและ <C>expect</C> เอง</>}
        takeaway={<>เริ่มจากโค้ดที่ได้ แล้วจัดให้อ่านง่าย</>}
      />
      <Explain
        id="6-024"
        section="ช่วยเขียนและหาสาเหตุ"
        topic="write-debug"
        phase="parts"
        title={<>--debug: ไล่ทีละคำสั่ง</>}
        body={<><C>pnpm test:e2e --debug</C> เปิด Inspector หยุดทีละขั้น ดู locator ก่อนไปต่อ</>}
        visual={<ToolPair highlight="debug" />}
      />
      <Example
        id="6-025"
        section="ช่วยเขียนและหาสาเหตุ"
        topic="write-debug"
        phase="parts"
        title={<>page.pause(): หยุดตรงนี้</>}
        body={<>แทรก <C>page.pause()</C> ให้หยุดตรงบรรทัดนั้น แล้วเล่นต่อใน Inspector</>}
        notice={<>คำสั่งนี้เปิด Inspector บนเครื่องคุณ — ลองรันเองเพื่อดู</>}
        snippet="pause"
        highlight={[[5, 5]]}
      />

      <Summary
        id="6-026"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>อยากเร็ว: รันเฉพาะโฟลเดอร์/ไฟล์/ชื่อ</>,
          <>อยากเห็น: <C>--headed</C> หรือ UI mode</>,
          <>อยากรู้สาเหตุ: report, trace</>,
          <>อยากเขียน/ไล่: codegen, <C>--debug</C>, <C>page.pause()</C></>,
        ]}
      />
      <Focus
        id="6-027"
        section="Closing"
        title={<>ต่อไป: เทสที่ต้องคุยกับ API</>}
        body={<>Part 7 จำลอง API ให้ตอบ 500 หรือรายการว่าง เพื่อเทสทุกสถานะ</>}
      />
      <Sources
        id="6-028"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A></>,
          <><A href="https://playwright.dev/docs/running-tests">playwright.dev — Running tests</A></>,
          <><A href="https://playwright.dev/docs/trace-viewer">playwright.dev — Trace Viewer</A></>,
          <><A href="https://playwright.dev/docs/codegen">playwright.dev — Codegen</A></>,
        ]}
      />
    </Deck>
  );
}
