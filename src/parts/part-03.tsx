import type { Topics } from '../components';
import { A, Anatomy, C, Compare, Cover, Deck, Error, Example, Explain, Focus, Objectives, Sources, Steps, Summary, Topic } from '../components';
import { BaseUrlFig, ButtonPair, EmailField, IndexCells, LocatorLadder, MatchBoxes, NoAwaitFig, PageMap, TestAnatomyFig } from '../visuals/part-03';
import { listings, meta, outputs } from './part-03.data';

const topics: Topics = {
  topics: [
    { id: 'first-test', section: 'เทสแรก', title: 'เทสแรก', components: ['test', 'page', 'goto', 'expect'] },
    { id: 'find', section: 'หา element', title: 'หา element', components: ['getByRole', 'getByText', 'getByLabel', 'getByPlaceholder', 'getByTestId'] },
    { id: 'many', section: 'เจอหลายตัว', title: 'เจอหลายตัว', components: ['exact', 'filter', 'parent', 'first/last/nth'] },
  ],
};

const rtlBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: `screen.getByRole("button", { name: "เพิ่ม" })
screen.getByLabelText("อีเมล")
screen.getByPlaceholderText("you@example.com")
screen.getByText("ราคา 250 บาท")`,
  },
];

const pwBlocks = [
  {
    lang: 'typescript',
    info: 'text',
    text: `page.getByRole("button", { name: "เพิ่ม" })
page.getByLabel("อีเมล")
page.getByPlaceholder("you@example.com")
page.getByText("ราคา 250 บาท")`,
  },
];

export default function Part03() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs} topics={topics}>
      <Cover
        id="3-001"
        section="Opening"
        title={<>เทสแรกและการหา element</>}
        body={<>คอร์ส Playwright E2E กับ Next.js · Part 3</>}
      />
      <Objectives
        id="3-002"
        section="Opening"
        title={<>จบ Part นี้คุณจะ…</>}
        items={[
          <>เขียนเทสแรก เปิดหน้าแล้วตรวจผล</>,
          <>หา element ด้วย getBy… ให้ถูกตัว</>,
          <>แก้ locator ที่เจอหลายตัวให้เหลือตัวเดียว</>,
        ]}
      />
      <Compare
        id="3-003"
        section="Opening"
        title={<>getBy… ที่คุ้นมือจาก RTL</>}
        left={<>RTL เรียกผ่าน <C>screen</C></>}
        right={<>Playwright เรียกผ่าน <C>page</C></>}
        takeaway={<>ชื่อคล้ายกัน แต่ทุกคำสั่งต้อง <C>await</C></>}
        leftBlocks={rtlBlocks}
        rightBlocks={pwBlocks}
      />

      <Topic
        id="3-004"
        section="เทสแรก"
        topic="first-test"
        title={<>เทสแรก</>}
        body={<>เปิดหน้า แล้วตรวจ</>}
        visual={<TestAnatomyFig />}
      />
      <Explain
        id="3-005"
        section="เทสแรก"
        topic="first-test"
        phase="know"
        title={<>เทสคือฟังก์ชันที่ได้หน้าเบราว์เซอร์ใหม่</>}
        body={<>แต่ละ <C>test</C> ได้ <C>page</C> สะอาดๆ คนละใบ ไม่ปนกัน แม้รันพร้อมกัน</>}
        visual={<TestAnatomyFig highlight="page" />}
      />
      <Anatomy
        id="3-006"
        section="เทสแรก"
        topic="first-test"
        phase="parts"
        title={<>goto: ไปหน้าไหน</>}
        pieces={[
          { text: 'await ', n: 1 },
          { text: 'page', n: 2 },
          { text: '.goto(', n: 3 },
          { text: '"/lessons/01-first-test"', n: 4 },
          { text: ')' },
        ]}
        items={[
          <>await — รอให้จบก่อน</>,
          <>page — หน้าของเทสนี้</>,
          <>goto — สั่งเปิด URL</>,
          <>path — ที่อยู่ที่ต่อกับ baseURL</>,
        ]}
      />
      <Explain
        id="3-007"
        section="เทสแรก"
        topic="first-test"
        phase="parts"
        title={<>ทำไมใส่แค่ path</>}
        body={
          <>
            <C>baseURL</C> ใน <C>playwright.config.ts</C> ต่อให้เอง เรโปตั้ง <C>http://localhost:3100</C>
          </>
        }
        visual={<BaseUrlFig />}
      />
      <Anatomy
        id="3-008"
        section="เทสแรก"
        topic="first-test"
        phase="parts"
        title={<>expect: ตรวจ title</>}
        body={<><C>toHaveURL</C> รับ regex ได้</>}
        pieces={[
          { text: 'await ' },
          { text: 'expect', n: 1 },
          { text: '(' },
          { text: 'page', n: 2 },
          { text: ')' },
          { text: '.toHaveTitle(', n: 3 },
          { text: '"…"', n: 4 },
          { text: ')' },
        ]}
        items={[
          <>expect — เริ่มตรวจ</>,
          <>page — ที่ตรวจ</>,
          <>toHaveTitle — ชื่อหน้า</>,
          <>ค่าที่ต้องการ — ตรงเป๊ะ</>,
        ]}
      />
      <Example
        id="3-009"
        section="เทสแรก"
        topic="first-test"
        phase="example"
        title={<>เทสแรกครบชุด</>}
        body={<>เปิดหน้า ตรวจ title, URL, หัวข้อ — รันแล้วผ่าน</>}
        snippet="first"
      />
      <Error
        id="3-010"
        section="เทสแรก"
        topic="first-test"
        phase="watchout"
        title={<>ลืม await</>}
        symptom={
          <>
            <C>toHaveTitle(expected) failed</C> แล้วปิดท้ายด้วย <C>Test ended.</C>
          </>
        }
        cause={<>เทสจบก่อนคำสั่งจะตอบ</>}
        fix={<>await ทุกคำสั่งที่คืน Promise</>}
        visual={<NoAwaitFig />}
      />

      <Topic
        id="3-011"
        section="หา element"
        topic="find"
        title={<>หา element</>}
        body={<>บอก Playwright ว่าจะหาอะไร ในภาษาที่ผู้ใช้เห็น</>}
        visual={<LocatorLadder />}
      />
      <Explain
        id="3-012"
        section="หา element"
        topic="find"
        phase="know"
        title={<>locator = คำอธิบายว่าจะหาอะไร</>}
        body={<>ยังไม่ได้หา จนกว่าจะสั่งทำ (คลิก/ตรวจ) แล้วจะหาให้ตอนนั้น</>}
        visual={<PageMap />}
      />
      <Anatomy
        id="3-013"
        section="หา element"
        topic="find"
        phase="parts"
        title={<>getByRole: หาด้วยหน้าที่และชื่อ</>}
        pieces={[
          { text: 'page', n: 1 },
          { text: '.getByRole(', n: 2 },
          { text: '"button"', n: 3 },
          { text: ', { name: "เพิ่ม" }', n: 4 },
          { text: ')' },
        ]}
        items={[
          <>page — ในหน้านี้</>,
          <>getByRole — ตามบทบาท</>,
          <>"button" — ชนิดที่ต้องการ</>,
          <>name — ชื่อที่เห็น</>,
        ]}
      />
      <Compare
        id="3-014"
        section="หา element"
        topic="find"
        phase="parts"
        title={<>name แบบมีคำ กับ exact</>}
        left={
          <>
            <C>{'name: "เพิ่ม"'}</C> เจอ 2 ปุ่ม
            <ButtonPair mode="all" />
          </>
        }
        right={
          <>
            <C>exact: true</C> เจอ 1 ปุ่ม
            <ButtonPair mode="one" />
          </>
        }
        takeaway={<>exact: true แปลว่า “ตรงทั้งชื่อ”</>}
      />
      <Explain
        id="3-015"
        section="หา element"
        topic="find"
        phase="parts"
        title={<>getByText: หาจากข้อความ</>}
        body={<><C>{'getByText("ราคา 250 บาท")'}</C> ใช้กับข้อความที่ไม่ใช่ปุ่มหรือช่อง</>}
        visual={<PageMap highlight="text" />}
      />
      <Compare
        id="3-016"
        section="หา element"
        topic="find"
        phase="parts"
        title={<>getByLabel กับ getByPlaceholder</>}
        left={
          <>
            getByLabel: ใช้ label
            <EmailField highlight="label" />
          </>
        }
        right={
          <>
            getByPlaceholder: ข้อความในช่อง
            <EmailField highlight="placeholder" />
          </>
        }
        takeaway={<>มี label ใช้ label ก่อน</>}
      />
      <Steps
        id="3-017"
        section="หา element"
        topic="find"
        phase="parts"
        title={<>แล้วเลือกตัวไหนก่อน</>}
        items={[
          <><C>getByRole</C> — รู้ว่ามันคืออะไร</>,
          <><C>getByLabel</C> — มี label</>,
          <><C>getByPlaceholder</C> — ไม่มี label</>,
          <><C>getByText</C> — ข้อความทั่วไป</>,
          <><C>getByTestId</C> — ทางสุดท้าย</>,
        ]}
        visual={<LocatorLadder />}
      />
      <Example
        id="3-018"
        section="หา element"
        topic="find"
        phase="example"
        title={<>หาช่องอีเมลแล้วกรอก</>}
        body={<><C>getByLabel</C> หาช่อง แล้ว <C>fill</C> ค่า — ตรวจด้วย <C>toHaveValue</C></>}
        snippet="labels"
      />

      <Topic
        id="3-019"
        section="เจอหลายตัว"
        topic="many"
        title={<>เจอหลายตัว</>}
        body={<>locator อาจตรงกับหลาย element</>}
        visual={<MatchBoxes />}
      />
      <Explain
        id="3-020"
        section="เจอหลายตัว"
        topic="many"
        phase="know"
        title={<>locator เจอได้มากกว่าหนึ่ง</>}
        body={<>ปุ่ม “ลบ” มี 2 ตัว นับได้ด้วย <C>toHaveCount(2)</C></>}
        visual={<MatchBoxes highlight="both" count />}
      />
      <Steps
        id="3-021"
        section="เจอหลายตัว"
        topic="many"
        phase="parts"
        title={<>3 วิธีทำให้เจาะจง</>}
        items={[
          <><C>exact: true</C> — ชื่อต้องตรงทั้งชื่อ</>,
          <><C>filter</C> — เลือกจากข้อความข้างใน</>,
          <>หาใน parent — เฉพาะแถว “กล้วย”</>,
        ]}
        visual={<MatchBoxes highlight="banana" />}
      />
      <Anatomy
        id="3-022"
        section="เจอหลายตัว"
        topic="many"
        phase="parts"
        title={<>filter ตามข้อความ</>}
        pieces={[
          { text: 'page', n: 1 },
          { text: '.getByRole(', n: 2 },
          { text: '"listitem"', n: 3 },
          { text: ')' },
          { text: '.filter(', n: 4 },
          { text: '{ hasText: "กล้วย" }', n: 5 },
          { text: ')' },
        ]}
        items={[
          <>page — หน้านี้</>,
          <>getByRole — รายการ</>,
          <>"listitem" — แถว</>,
          <>filter — เหลือแถว</>,
          <>hasText — ข้อความ</>,
        ]}
      />
      <Explain
        id="3-023"
        section="เจอหลายตัว"
        topic="many"
        phase="parts"
        title={<>first, last, nth</>}
        body={<>เลือกตามลำดับ นับ <C>nth</C> จาก 0 ใช้เมื่อเลือกตามเนื้อหาไม่ได้</>}
        visual={<IndexCells />}
      />
      <Example
        id="3-024"
        section="เจอหลายตัว"
        topic="many"
        phase="example"
        title={<>ลบรายการกล้วย</>}
        body={<><C>filter</C> เหลือแถวกล้วย แล้วหาปุ่มลบในแถวนั้น</>}
        snippet="delete"
        highlight={[[5, 6]]}
      />
      <Error
        id="3-025"
        section="เจอหลายตัว"
        topic="many"
        phase="watchout"
        title={<>strict mode violation</>}
        symptom={<><C>resolved to 2 elements</C></>}
        cause={<><C>{'getByRole("button", { name: "ลบ" })'}</C> เจอ 2 ปุ่ม</>}
        fix={<>exact, filter หรือหาใน parent</>}
        visual={<MatchBoxes highlight="both" tone="warning" />}
      />

      <Summary
        id="3-026"
        section="Closing"
        title={<>สรุป</>}
        items={[
          <>test + page + goto + expect</>,
          <>getByRole / getByText / getByLabel / getByPlaceholder</>,
          <>เจอหลายตัว: exact, filter, parent, nth</>,
        ]}
      />
      <Focus
        id="3-027"
        section="Closing"
        title={<>ต่อไป: สั่งทำกับ element ที่หาเจอ</>}
        body={<>Part 4: click, fill, check, select</>}
      />
      <Sources
        id="3-028"
        section="Closing"
        title={<>แหล่งอ้างอิง</>}
        items={[
          <><A href="https://playwright.dev/docs/locators">playwright.dev — Locators</A></>,
          <><A href="https://github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT">github.com/ArrayaWongsaita/DN_T_PLAYWRIGHT — บท 01-03</A></>,
        ]}
      />
    </Deck>
  );
}
