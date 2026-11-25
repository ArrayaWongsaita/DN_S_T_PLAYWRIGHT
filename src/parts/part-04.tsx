import type { Topics } from '../components';
import { A, Anatomy, C, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Steps, Summary, Topic } from '../components';
import { ActionMenu, ClickCounter, ControlsForm, FormCases, FormFlow } from '../visuals/part-04';
import { listings, meta, outputs } from './part-04.data';

const topics: Topics = {
  topics: [
    { id: 'click', section: 'คลิก', title: 'คลิก', components: ['click()', 'dblclick()', 'คลิกขวา', 'hover()'] },
    { id: 'form', section: 'กรอกฟอร์ม', title: 'กรอกฟอร์ม', components: ['fill()', 'press()', 'clear()', 'pressSequentially()'] },
    { id: 'controls', section: 'ติ๊ก เลือก', title: 'ติ๊ก เลือก', components: ['check()', 'selectOption()', 'ตรวจสถานะ'] },
    { id: 'extras', section: 'อีกไม่กี่คำสั่ง', title: 'อีกไม่กี่คำสั่ง', components: ['hover()', 'focus()', 'setInputFiles()', 'dragTo()'] },
  ],
};

const rtlBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: `await user.click(button);
await user.type(input, "สมชาย");`,
  },
];

const pwBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: `await page.getByRole("button").click();
await page.getByLabel("ชื่อ").fill("สมชาย");`,
  },
];

const fillBlocks = [{ lang: 'typescript', info: 'text', text: `const name = page.getByLabel("ชื่อ");
await name.fill("สมชาย");` }];
const typeBlocks = [{ lang: 'typescript', info: 'text', text: `const name = page.getByLabel("ชื่อ");
await name.pressSequentially("สมชาย");` }];

export default function Part04() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="4-001"
        section="Opening"
        title={<>ลงมือทำกับหน้าเว็บ</>}
        body={<>Part 4 · Playwright E2E กับ Next.js</>}
      />
      <Objectives
        id="4-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>คลิกและกรอกฟอร์มด้วย <C>click()</C> <C>fill()</C> <C>press()</C> <C>clear()</C></>,
          <>ติ๊กและเลือกด้วย <C>check()</C> <C>selectOption()</C></>,
          <>ใช้ <C>hover()</C> <C>focus()</C> และอัปโหลดไฟล์</>,
        ]}
      />
      <Compare
        id="4-003"
        section="Opening"
        title={<>จาก userEvent เป็น locator.action()</>}
        left={<>React Testing Library</>}
        right={<>Playwright</>}
        leftBlocks={rtlBlocks}
        rightBlocks={pwBlocks}
        takeaway={<>เหมือนกัน: ต้อง <C>await</C> · ต่างกัน: Playwright รอ element ให้</>}
      />

      <Topic
        id="4-004"
        section="คลิก"
        topic="click"
        title={<>คลิก</>}
        body={<>กดปุ่มเหมือนผู้ใช้</>}
        visual={<ClickCounter />}
      />
      <Explain
        id="4-005"
        section="คลิก"
        topic="click"
        phase="know"
        title={<>click: หาแล้วกด</>}
        body={<>Playwright เลื่อนปุ่มให้เห็น รอจนพร้อม แล้วคลิกกลางปุ่มให้เอง</>}
        visual={<ClickCounter count={0} next={1} highlight="plus" arrowPlus />}
      />
      <Anatomy
        id="4-006"
        section="คลิก"
        topic="click"
        phase="parts"
        title={<>หนึ่งบรรทัดของ click</>}
        pieces={[
          { text: 'await ', n: 1 },
          { text: 'page.getByRole("button",', n: 2 },
          { text: ' { name: "+1" })' },
          { text: '.click()', n: 3 },
          { text: ';' },
        ]}
        items={[
          <><C>await</C> — รอคำสั่งจบก่อนไปต่อ</>,
          <>locator — หาปุ่มจากชื่อ</>,
          <><C>click()</C> — กดปุ่ม</>,
        ]}
      />
      <Steps
        id="4-007"
        section="คลิก"
        topic="click"
        phase="parts"
        title={<>คลิกแบบอื่น</>}
        items={[
          <><C>dblclick()</C> — ดับเบิลคลิก</>,
          <><C>{'click({ button: "right" })'}</C> — คลิกขวา</>,
          <><C>hover()</C> — เอาเมาส์ชี้</>,
          <><C>{'click({ modifiers: ["Shift"] })'}</C> — Shift ค้าง</>,
        ]}
      />
      <Example
        id="4-008"
        section="คลิก"
        topic="click"
        phase="example"
        title={<>กด +1 สองครั้งแล้วรีเซ็ต</>}
        body={<>กดสองครั้งเห็น Count: 2 แล้วรีเซ็ตกลับเป็น 0</>}
        snippet="click-reset"
        lines={[[3, 10]]}
        highlight={[[7, 7], [9, 9]]}
      />
      <Error
        id="4-009"
        section="คลิก"
        topic="click"
        phase="watchout"
        title={<>อย่า force: true ถ้ายังไม่ต้อง</>}
        visual={<ClickCounter count={1} covered />}
        cause={<>force ข้ามการตรวจว่าปุ่มพร้อมกด</>}
        fix={<>รอป้ายหายแล้ว <C>click()</C> ตามปกติ</>}
      />

      <Topic
        id="4-010"
        section="กรอกฟอร์ม"
        topic="form"
        title={<>กรอกฟอร์ม</>}
        body={<>ใส่ค่า กดปุ่มคีย์บอร์ด ล้างค่า</>}
        visual={<FormFlow />}
      />
      <Explain
        id="4-011"
        section="กรอกฟอร์ม"
        topic="form"
        phase="know"
        title={<>fill: ใส่ทั้งช่องในครั้งเดียว</>}
        body={<>fill เขียนทับค่าเดิมทั้งหมด ไม่ได้พิมพ์ทีละตัว</>}
        visual={<FormFlow value="สมชาย" highlight="field" />}
      />
      <Anatomy
        id="4-012"
        section="กรอกฟอร์ม"
        topic="form"
        phase="parts"
        title={<>fill</>}
        pieces={[
          { text: 'await ', n: 1 },
          { text: 'page.getByLabel("ชื่อ")', n: 2 },
          { text: '.fill("สมชาย")', n: 3 },
          { text: ';' },
        ]}
        items={[
          <><C>await</C> — รอให้ช่องถูกกรอกเสร็จ</>,
          <><C>getByLabel</C> — หาช่องจาก label ที่เห็น</>,
          <><C>fill</C> — ใส่ค่าทั้งช่องทีเดียว</>,
        ]}
      />
      <Explain
        id="4-013"
        section="กรอกฟอร์ม"
        topic="form"
        phase="parts"
        title={<>press: กดปุ่มคีย์บอร์ด</>}
        body={<><C>press("Enter")</C> ส่งฟอร์มได้ ใช้กับ Tab, Escape, ArrowDown ฯลฯ</>}
        visual={<FormFlow value="สมหญิง" message="สวัสดี, สมหญิง" mode="enter" highlight="button" />}
      />
      <Explain
        id="4-014"
        section="กรอกฟอร์ม"
        topic="form"
        phase="parts"
        title={<>clear: ล้างช่อง</>}
        body={<>เรียก <C>clear()</C> แล้วช่องว่าง ใช้ตรวจกรณีไม่กรอก</>}
        visual={<FormFlow mode="empty" message="กรุณากรอกชื่อ" highlight="message" />}
      />
      <Compare
        id="4-015"
        section="กรอกฟอร์ม"
        topic="form"
        phase="parts"
        title={<>fill กับ pressSequentially</>}
        left={<>fill — ใส่ทีเดียว</>}
        right={<>pressSequentially — พิมพ์ทีละตัว</>}
        leftBlocks={fillBlocks}
        rightBlocks={typeBlocks}
        takeaway={<>ใช้ <C>fill</C> ปกติ · <C>pressSequentially</C> เมื่อเว็บฟังทีละ key</>}
      />
      <Example
        id="4-016"
        section="กรอกฟอร์ม"
        topic="form"
        phase="example"
        title={<>กรอกชื่อแล้วทักทาย</>}
        body={<>fill ชื่อแล้วกด ทักทาย เห็นคำทักทาย</>}
        snippet="fill-greet"
        lines={[[3, 8]]}
        highlight={[[5, 5]]}
      />
      <Error
        id="4-017"
        section="กรอกฟอร์ม"
        topic="form"
        phase="watchout"
        title={<>clear แล้วลืมตรวจผล</>}
        visual={<FormCases />}
        symptom={<>เคสว่างพังโดยเทสไม่รู้</>}
        cause={<>เขียนเทสแค่เคสที่กรอกชื่อ</>}
        fix={<>เพิ่มเคส: <C>clear()</C> → ส่ง → เห็น กรุณากรอกชื่อ</>}
      />

      <Topic
        id="4-018"
        section="ติ๊ก เลือก"
        topic="controls"
        title={<>ติ๊ก เลือก</>}
        body={<>checkbox, radio, dropdown</>}
        visual={<ControlsForm />}
      />
      <Explain
        id="4-019"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="know"
        title={<>ใช้คำสั่งที่ตรงชนิด</>}
        body={<>checkbox/radio ใช้ check() · dropdown ใช้ selectOption() ไม่ต้อง click</>}
        visual={<ControlsForm commands />}
      />
      <Anatomy
        id="4-020"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="parts"
        title={<>check</>}
        pieces={[
          { text: 'await ', n: 1 },
          { text: 'page.getByLabel(', n: 2 },
          { text: '"ยอมรับเงื่อนไข")' },
          { text: '.check()', n: 3 },
          { text: ';' },
        ]}
        items={[
          <><C>await</C> — รอจนติ๊กเสร็จ</>,
          <><C>getByLabel</C> — หา checkbox</>,
          <><C>check()</C> — ติ๊ก (ติ๊กแล้วไม่ทำ) · <C>uncheck()</C> — ยกเลิก</>,
        ]}
      />
      <Explain
        id="4-021"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="parts"
        title={<>radio ก็ใช้ check</>}
        body={<>เลือก ส่งด่วน แล้ว ส่งปกติ หลุดเอง — radio เลือกได้ทีละตัว</>}
        visual={<ControlsForm shipping="ส่งด่วน" highlight="radio" />}
      />
      <Anatomy
        id="4-022"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="parts"
        title={<>selectOption</>}
        pieces={[
          { text: 'await ', n: 1 },
          { text: 'page.getByLabel("จังหวัด")', n: 2 },
          { text: '.selectOption("เชียงใหม่")', n: 3 },
          { text: ';' },
        ]}
        items={[
          <><C>await</C> — รอจนเลือกเสร็จ</>,
          <><C>getByLabel</C> — หา dropdown</>,
          <><C>selectOption</C> — เลือกจากข้อความ</>,
        ]}
      />
      <Explain
        id="4-023"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="parts"
        title={<>ตรวจสถานะ</>}
        body={<>ใช้ <C>toBeChecked</C> <C>toBeDisabled</C> <C>toBeEnabled</C> <C>toHaveValue</C> ตรวจผล</>}
        visual={<ControlsForm accepted highlight="submit" />}
      />
      <Example
        id="4-024"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="example"
        title={<>ติ๊กแล้วปุ่มสมัครใช้ได้</>}
        body={<>ปุ่มสมัครปิดอยู่ ติ๊ก ยอมรับเงื่อนไข แล้วจึงใช้ได้</>}
        snippet="controls-enable"
        lines={[[3, 9]]}
        highlight={[[7, 7]]}
      />
      <Error
        id="4-025"
        section="ติ๊ก เลือก"
        topic="controls"
        phase="watchout"
        title={<>fill กับ dropdown ไม่ได้</>}
        symptom={<>ช่องจังหวัดไม่ยอมรับค่า</>}
        blocks={[outputs['select-error']]}
        cause={<>select ไม่ใช่ช่องพิมพ์ fill จึงใช้ไม่ได้</>}
        fix={<>dropdown ใช้ <C>selectOption()</C> · checkbox ใช้ <C>check()</C></>}
      />

      <Topic
        id="4-026"
        section="อีกไม่กี่คำสั่ง"
        topic="extras"
        title={<>อีกไม่กี่คำสั่ง</>}
        body={<>hover, focus, upload, drag</>}
        visual={<ActionMenu />}
      />
      <Example
        id="4-027"
        section="อีกไม่กี่คำสั่ง"
        topic="extras"
        phase="parts"
        title={<>hover และ focus</>}
        body={<>hover เปิดเมนู focus ใส่ช่อง — ตรวจด้วย toBeVisible และ toBeFocused</>}
        snippet="hover-focus"
        lines={[[3, 10]]}
        highlight={[[6, 6], [8, 8]]}
      />
      <Example
        id="4-028"
        section="อีกไม่กี่คำสั่ง"
        topic="extras"
        phase="parts"
        title={<>อัปโหลดไฟล์</>}
        body={<>setInputFiles ใส่ไฟล์ให้ input type="file"</>}
        snippet="upload-file"
        lines={[[3, 8]]}
        highlight={[[6, 6]]}
      />
      <Example
        id="4-029"
        section="อีกไม่กี่คำสั่ง"
        topic="extras"
        phase="parts"
        title={<>ลากแล้วปล่อย</>}
        body={<>dragTo ลากจากต้นทางไปปลายทาง</>}
        snippet="drag-drop"
        lines={[[3, 10]]}
        highlight={[[8, 8]]}
      />

      <Summary
        id="4-030"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>ปุ่ม ลิงก์ → <C>click()</C></>,
          <>ช่องข้อความ → <C>fill()</C> <C>clear()</C> <C>press()</C></>,
          <>checkbox/radio → <C>check()</C></>,
          <>dropdown → <C>selectOption()</C></>,
          <>hover focus upload drag → คำสั่งเฉพาะ</>,
        ]}
      />
      <Focus
        id="4-031"
        section="Closing"
        title={<>ต่อไป: ตรวจผลให้แน่น</>}
        body={<>Part 5 ต่อจาก action สู่ expect และการรอ — ให้เทสไม่พลาดจังหวะ</>}
      />
      <Sources
        id="4-032"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT</A> — บท 04-06</>,
          <><A href="https://playwright.dev/docs/input">playwright.dev/docs/input</A></>,
        ]}
      />
    </Deck>
  );
}
