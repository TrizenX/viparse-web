/**
 * Vietnamese copy for `/vi`.
 *
 * Written, not translated. The English page is aimed at someone choosing a document
 * loader for a RAG stack; this one is aimed at someone who just opened a `.doc` and
 * found `B¸o c¸o tµi chÝnh` in it, and whose next move is to search — in Vietnamese —
 * for *chuyển bảng mã TCVN3 sang Unicode*. Those are different readers, so the pages
 * argue differently rather than saying the same thing twice.
 *
 * The vocabulary follows what Vietnamese developers actually say: **bảng mã** rather
 * than "encoding", **phông chữ cũ**, **Unicode dựng sẵn** for NFC. And the product is
 * anchored to Unikey's *Công cụ → Chuyển mã*, which every Vietnamese developer has
 * used — it locates viparse in one sentence, where a paragraph of explanation would not.
 *
 * Every measured figure is imported from `content.ts` rather than restated here. Prose
 * differs by language; a number that differs by language is a number that has drifted.
 */

import { File, Layers, Rows3, Shield, Terminal, Type } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { PlaygroundCopy } from "@/components/sections/playground"
import type { Feature, FaqItem, Step } from "@/lib/content"

export const VI_HERO = {
  badge: "Mã nguồn mở · MIT · Python 3.11+",
  tagline: "Tài liệu tiếng Việt bị lỗi phông, đọc được bằng một dòng.",
  description:
    "viparse chuyển file dùng bảng mã cũ — TCVN3, VNI, VISCII, VPS — sang Unicode dựng sẵn (NFC), giữ nguyên bảng biểu và cấu trúc. Đọc được .doc, .xls, .ppt đời cũ, RTF, PDF và cả PDF scan.",
  githubCta: "Xem trên GitHub →",
} as const

export const VI_PROBLEM = {
  eyebrow: "Vấn đề",
  title: "File không hỏng. Máy bạn thiếu phông.",
  body: "Trước khi Unicode phổ biến ở Việt Nam, chữ có dấu được lưu bằng các byte Latin thông thường và chỉ hiện đúng khi máy có đúng bộ phông đó. Không có .VnTime, bạn thấy đúng những byte đang nằm trong file — nên mọi thư viện đọc tài liệu thông thường đều đọc đúng mà vẫn sai.",
  inputLabel: "Thứ bạn nhận được",
  inputNote: "phông .VnTime, bảng mã TCVN3",
  outputLabel: "Thứ đáng lẽ phải có",
  outputNote: "Unicode dựng sẵn (NFC)",
  aside:
    "Về bản chất đây là việc mà chức năng Công cụ → Chuyển mã của Unikey vẫn làm — nhưng chạy được trên cả file, giữ nguyên bảng biểu, và gọi được từ trong code.",
} as const

export const VI_STEPS: Step[] = [
  {
    number: "01",
    title: "Nhận dạng",
    body: "Tên phông trong file và điểm tần suất âm tiết cho biết đó là TCVN3, VNI, VISCII hay VPS — xét theo từng đoạn chứ không theo cả file, nên tài liệu trộn nhiều bảng mã vẫn ra đúng.",
  },
  {
    number: "02",
    title: "Chuyển",
    body: "Các chuỗi byte cũ được ánh xạ sang đúng chữ cái tiếng Việt rồi chuẩn hoá về NFC. Phần đã là Unicode không bao giờ bị đụng tới.",
  },
  {
    number: "03",
    title: "Nạp",
    body: "Nhận về Markdown, text hoặc JSON kèm tiêu đề, bảng và nguồn gốc — đã chia chunk cho retrieval, có sẵn adapter LangChain và LlamaIndex.",
  },
]

export const VI_FEATURES: Feature[] = [
  {
    title: "Bảng mã cũ",
    body: "TCVN3 · VNI · VISCII · VPS → Unicode NFC, có kiểm tra chuyển đi chuyển lại.",
    icon: Type as LucideIcon,
  },
  {
    title: "Mọi định dạng",
    body: "DOCX, XLSX, PDF, PDF scan (OCR), RTF, và .doc/.xls/.ppt đời cũ.",
    icon: File as LucideIcon,
  },
  {
    title: "Chia chunk cho RAG",
    body: "Chunk bám theo mục, không cắt đôi dòng bảng, và lặp lại tiêu đề bảng.",
    icon: Rows3 as LucideIcon,
  },
  {
    title: "Lõi không phụ thuộc",
    body: "Thuần stdlib; engine nặng nằm sau extras như viparse[ocr].",
    icon: Layers as LucideIcon,
  },
  {
    title: "An toàn với file lạ",
    body: "Giới hạn kích thước, chặn zip bomb, timeout theo từng engine.",
    icon: Shield as LucideIcon,
  },
  {
    title: "Có sẵn CLI",
    body: "viparse ./docs/**/*.pdf -o md, và viparse doctor.",
    icon: Terminal as LucideIcon,
  },
]

export const VI_QUICKSTART = {
  eyebrow: "Bắt đầu",
  title: "Hai dòng là ra chữ sạch.",
  note: "fix() nhận chuỗi chứ không nhận đường dẫn, nên ghép được với bất cứ thứ gì đã đọc file trước đó. Chữ đã là Unicode, và chữ không phải tiếng Việt, được trả lại nguyên vẹn.",
  code: `import viparse

viparse.fix("B¸o c¸o tµi chÝnh")   # 'Báo cáo tài chính'

docs = viparse.load("bao_cao_2003.doc")   # list[Document], đã NFC`,
} as const

export const VI_BENCHMARK = {
  eyebrow: "Đo đạc",
  title: "Đo trên file hỏng thật.",
  description:
    "96 văn bản nhà nước Việt Nam từ 2002–2009 — Word, Excel, RTF, PDF và PowerPoint — được chép tay lại rồi chấm điểm trên độ chính xác dấu thanh. Corpus, cách đo, kết quả thô và câu lệnh tạo lại chúng đều công khai.",
  columns: ["Cách đọc", "Ký tự", "Dấu thanh", "Âm tiết"] as const,
  rowNotes: {
    "No conversion": "đọc byte trung thực, không chuyển mã",
    "viparse 0.1.24": "96 tài liệu, từ file đến kết quả",
  } as Record<string, string>,
  caveat:
    "Hàng 0.019 mới là con số đáng nói: văn bản trông còn nguyên 77% nhưng chỉ mang 1,9% lượng tiếng Việt. Hàng của viparse yếu hơn vẻ ngoài của nó — bản chép tay và bảng chuyển mã cùng rút ra từ một corpus, nên nó đo tính nhất quán với chính mình cũng nhiều như đo tính đúng. Cả hai con số, cách đo, từng tài liệu và câu lệnh tạo lại đều được công bố để có thể tranh luận lại.",
  links: {
    corpus: "Corpus",
    metric: "Cách chấm điểm",
    results: "Kết quả đầy đủ, kể cả chỗ sai của nó",
  },
} as const

export const VI_STRUCTURE = {
  heading: "Và với tài liệu Unicode bình thường",
  columns: ["Tài liệu", "Thứ tự", "Đầy đủ", "Tiêu đề"] as const,
  rowLabels: {
    "PDF, one column": "PDF một cột",
    "PDF, two columns": "PDF hai cột",
  } as Record<string, string>,
  note: "Không bao giờ mất chữ — cột đầy đủ bằng 1.000 ở mọi nơi. Cả hai chỗ hỏng đều là hỏng về sắp xếp, loại khó phát hiện hơn hẳn. PDF không có tiêu đề, nên mọi chunk từ PDF đều có section rỗng; và PDF nhiều cột bị đọc ngang trang chứ không đọc dọc theo cột. Lấy lại đúng cột nghĩa là phải phân tích bố cục, việc mà viparse cố ý không làm: với những file đó hãy dùng bộ đọc hiểu bố cục rồi đưa kết quả qua viparse.fix().",
} as const

export const VI_FAQ: FaqItem[] = [
  {
    question: "Chính xác đến đâu?",
    answer:
      "0.982 độ chính xác dấu thanh trên 96 văn bản nhà nước Việt Nam từ 2002–2009 — Word, Excel, RTF, PDF, PowerPoint — so với bản chép tay. Chính bộ đọc đó khi tắt phần chuyển bảng mã chỉ được 0.019 trên đúng 96 file ấy. Corpus, cách đo, kết quả thô và câu lệnh tạo lại đều công khai, kèm cả những chỗ con số này yếu hơn vẻ ngoài.",
  },
  {
    question: "Với tài liệu Unicode bình thường thì sao?",
    answer:
      "Với DOCX, XLSX và PPTX thì tốt — thứ tự, độ đầy đủ và việc nhận tiêu đề đều đạt 1.000 trên benchmark cấu trúc đã công bố. Với PDF thì lấy được chữ và bảng nhưng không lấy được cấu trúc: không có tiêu đề, và PDF nhiều cột bị đọc ngang trang chứ không đọc dọc theo cột, nên đoạn 1 rồi đến đoạn 19. Cả hai trường hợp đều không mất chữ — chính điều đó khiến nó đáng được nói ra.",
  },
  {
    question: "Có mất phí không?",
    answer:
      "Giấy phép MIT, miễn phí vĩnh viễn ở dạng thư viện. Bản API cho đội nhóm đang trong kế hoạch.",
  },
  {
    question: "Chữ đã đúng Unicode rồi có bị đổi không?",
    answer:
      "Không. Việc nhận dạng chạy theo từng đoạn, và đoạn đã là Unicode đi qua nguyên vẹn từng byte.",
  },
  {
    question: "Khác gì so với chuyển mã bằng Unikey?",
    answer:
      "Unikey chuyển mã trên đoạn văn bản bạn dán vào. viparse làm cùng việc đó nhưng chạy thẳng trên file — mở .doc, .xls, .ppt đời cũ, RTF, PDF — giữ nguyên tiêu đề và bảng biểu, tự nhận bảng mã theo từng đoạn nên file trộn nhiều bảng mã vẫn ra đúng, và gọi được từ trong code hay từ AI agent.",
  },
  {
    question: "PDF scan thì sao?",
    answer:
      "Cài viparse[ocr] (cần Tesseract) để dùng OCR có nhận dấu tiếng Việt.",
  },
  {
    question: "Ai làm?",
    answer:
      "Một kỹ sư người Việt đã nhiều năm dọn dẹp các pipeline tài liệu doanh nghiệp. Rất hoan nghênh issue và PR trên GitHub.",
  },
]

export const VI_PLAYGROUND: PlaygroundCopy = {
  eyebrow: "Thử ngay",
  title: "Dán chữ lỗi vào, lấy Unicode ra.",
  description:
    "Chạy ngay trong trình duyệt — không gửi gì lên server, và vẫn chạy được khi mất mạng sau lần tải đầu.",
  tryLabel: "Thử",
  inputLabel: "Đầu vào",
  outputLabel: "Kết quả",
  sampleLabels: {
    "Already Unicode": "Đã đúng Unicode",
    "Not Vietnamese": "Không phải tiếng Việt",
  },
  note: "Bảng chuyển mã và các ngưỡng nhận dạng ở đây được sinh ra từ chính viparse {version}, nên không thể lệch khỏi thư viện. Phần chạy trong trang chỉ là đường xử lý chuỗi — các engine đọc .doc, PDF và bảng tính cần có file, và đó mới là phần lớn thứ bạn nhận được khi pip install viparse.",
  status: {
    forced: "Đã chuyển theo bảng mã {encoding}.",
    converted: "Nhận ra bảng mã {encoding} và đã chuyển.",
    notVietnamese:
      "Có bảng mã cũ khớp với các byte này, nhưng kết quả không phải tiếng Việt — nên giữ nguyên.",
    alreadyUnicode: "Không thấy bảng mã cũ nào. Văn bản được trả lại nguyên vẹn.",
  },
}

export const VI_PLAYGROUND_IDLE = "Dán gì đó vào, hoặc chọn một mẫu."
