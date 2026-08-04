/**
 * The browser port must agree with the library on the cases that matter.
 *
 * Not a substitute for the Python test suite — it checks the *logic* port, since the
 * data is generated and cannot drift. Run: npm run smoke:convert
 */
import { convert, convertAuto } from "../src/lib/convert"

const CONVERTS: [string, string][] = [
  ["B¸o c¸o tµi chÝnh", "Báo cáo tài chính"],
  ["QuyÕt ®Þnh cña Bé tr­ëng", "Quyết định của Bộ trưởng"],
  ["Coäng hoøa xaõ hoäi chuû nghóa Vieät Nam", "Cộng hòa xã hội chủ nghĩa Việt Nam"],
  ["Ñoäc laäp - Töï do - Haïnh phuùc", "Độc lập - Tự do - Hạnh phúc"],
  // Full phrases, not fragments. `saün coù` on its own is eight characters and both the
  // library and this port read it as VISCII — detection scores character frequencies and
  // a fragment has nothing to score. That is documented behaviour, not a porting bug.
  [
    "an toaøn saün coù cuûa heä thoáng ñieàu haønh maùy tính",
    "an toàn sẵn có của hệ thống điều hành máy tính",
  ],
  ["Thñ t−íng ChÝnh phñ ban hµnh nghÞ ®Þnh", "Thủ tướng Chính phủ ban hành nghị định"],
]

// Never corrupt good text — the rule that matters more than converting every case.
const UNTOUCHED: [string, string][] = [
  ["already Unicode", "Cộng hòa xã hội chủ nghĩa Việt Nam, Độc lập - Tự do"],
  ["Spanish", "Señor Muñoz vivía en la mañana con niños pequeños en España"],
  ["German", "Müller größer Straße über Fußgänger schön wunderschöne Landschaft"],
  ["French", "François a préféré la crème brûlée à côté de l'hôtel présidentiel"],
  ["plain English", "An ordinary English sentence with nothing unusual in it."],
]

let failed = 0
for (const [input, expected] of CONVERTS) {
  const got = convertAuto(input)
  const ok = got.text === expected
  if (!ok) failed++
  console.log(`  ${ok ? "ok  " : "FAIL"} [${got.encoding}] ${JSON.stringify(got.text.slice(0, 46))}`)
}
for (const [label, input] of UNTOUCHED) {
  const got = convertAuto(input)
  const ok = got.text === input
  if (!ok) failed++
  console.log(`  ${ok ? "ok  " : "FAIL"} untouched: ${label} (${got.reason})`)
}
const forced = convert("lËp", "tcvn3")
if (forced !== "lập") failed++
console.log(`  ${forced === "lập" ? "ok  " : "FAIL"} forced encoding on a fragment: ${JSON.stringify(forced)}`)

console.log(failed ? `\n  ${failed} failure(s)` : "\n  all good")
process.exit(failed ? 1 : 0)
