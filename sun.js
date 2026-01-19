
// sun.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/* ================== CONFIG ================== */
const API_URL = "https://sunwinsaygex-pcl2.onrender.com/api/sun"; // <-- API GỐC
const POLL_TIME = 3000;

/* ================== STATE ================== */
let lastPhien = null;
let history = [];

let state = {
  phien: 0,
  phien_hien_tai: 0,
  tong_diem: 0,
  tong_xuc_xac: [],
  ket_qua: "Chưa Có",
  chuoi_cau: "",
  du_doan: "Chờ Đủ Dữ Liệu",
  do_tin_cay: "0%"
};

/* ================== PATTERN BẺ CẦU ================== */
const BREAK_PATTERNS = {
"TXXTTXTX": "Xỉu",
"XXTTXTXX": "Tài",
"XTTXTXXT": "Tài",
"TTXTXXTT": "Tài",
"TXTXXTTT": "Xỉu",
"XTXXTTTX": "Xỉu",
"TXXTTTXX": "Tài",
"XXTTTXXT": "Xỉu",
"XTTTXXTX": "Xỉu",
"TTTXXTXX": "Xỉu",
"TTXXTXXX": "Xỉu",
"TXXTXXXX": "Xỉu",
"XXTXXXXX": "Tài",
"XTXXXXXT": "Xỉu",
"TXXXXXTX": "Xỉu",
"XXXXXTXX": "Xỉu",
"XXXXTXXX": "Tài",
"XXXTXXXT": "Xỉu",
"XXTXXXTX": "Xỉu",
"XTXXXTXX": "Xỉu",
"TXXXTXXX": "Tài",
"XXXTXXXT": "Xỉu",
"XXTXXXTX": "Xỉu",
"XTXXXTXX": "Xỉu",
"TXXXTXXX": "Xỉu",
"XXXTXXXX": "Tài",
"XXTXXXXT": "Tài",
"XTXXXXTT": "Xỉu",
"TXXXXTTX": "Xỉu",
"XXXXTTXX": "Xỉu",
"XXXTTXXX": "Tài",
"XXTTXXXT": "Xỉu",
"XTTXXXTX": "Tài",
"TTXXXTXT": "Xỉu",
"TXXXTXTX": "Tài",
"XXXTXTXT": "Tài",
"XXTXTXTT": "Tài",
"XTXTXTTT": "Tài",
"TXTXTTTT": "Tài",
"XTXTTTTT": "Tài",
"TXTTTTTT": "Xỉu",
"XTTTTTTX": "Tài",
"TTTTTTXT": "Xỉu",
"TTTTTXTX": "Tài",
"TTTTXTXT": "Tài",
"TTTXTXTT": "Xỉu",
"TTXTXTTX": "Tài",
"TXTXTTXT": "Xỉu",
"XTXTTXTX": "Tài",
"TXTTXTXT": "Tài",
"XTTXTXTT": "Xỉu",
"TTXTXTTX": "Tài",
"TXTXTTXT": "Xỉu",
"XTXTTXTX": "Xỉu",
"TXTTXTXX": "Xỉu",
"XTTXTXXX": "Tài",
"TTXTXXXT": "Tài",
"TXTXXXTT": "Xỉu",
"XTXXXTTX": "Xỉu",
"TXXXTTXX": "Tài",
"XXXTTXXT": "Xỉu",
"XXTTXXTX": "Xỉu",
"XTTXXTXX": "Xỉu",
"TTXXTXXX": "Tài",
"TXXTXXXT": "Tài",
"XXTXXXTT": "Tài",
"XTXXXTTT": "Tài",
"TXXXTTTT": "Tài",
"XXXTTTTT": "Tài",
"XXTTTTTT": "Xỉu",
"XTTTTTTX": "Xỉu",
"TTTTTTXX": "Xỉu",
"TTTTTXXX": "Tài",
"TTTTXXXT": "Xỉu",
"TTTXXXTX": "Tài",
"TTXXXTXT": "Tài",
"TXXXTXTT": "Xỉu",
"XXXTXTTX": "Xỉu",
"XXTXTTXX": "Tài",
"XTXTTXXT": "Tài",
"TXTTXXTT": "Tài",
"XTTXXTTT": "Xỉu",
"TTXXTTTX": "Tài",
"TXXTTTXT": "Xỉu",
"XXTTTXTX": "Xỉu",
"XTTTXTXX": "Xỉu",
"TTTXTXXX": "Tài",
"TTXTXXXT": "Tài",
"TXTXXXTT": "Xỉu",
"XTXXXTTX": "Xỉu",
"TXXXTTXX": "Xỉu",
"XXXTTXXX": "Tài",
"XXTTXXXT": "Xỉu",
"XTTXXXTX": "Tài",
"TTXXXTXT": "Tài",
"TXXXTXTT": "Xỉu",
"XXXTXTTX": "Xỉu",
"XXTXTTXX": "Xỉu",
"XTXTTXXX": "Tài",
"TXTTXXXT": "Xỉu",
"XTTXXXTX": "Xỉu",
"TTXXXTXX": "Tài",
"TXXXTXXT": "Xỉu",
"XXXTXXTX": "Tài",
"XXTXXTXT": "Xỉu",
"XTXXTXTX": "Tài",
"TXXTXTXT": "Tài",
"XXTXTXTT": "Xỉu",
"XTXTXTTX": "Tài",
"TXTXTTXT": "Tài",
"XTXTTXTT": "Tài",
"TXTTXTTT": "Xỉu",
"XTTXTTTX": "Tài",
"TTXTTTXT": "Tài",
"TXTTTXTT": "Xỉu",
"XTTTXTTX": "Tài",
"TTTXTTXT": "Xỉu",
"TTXTTXTX": "Xỉu",
"TXTTXTXX": "Tài",
"XTTXTXXT": "Xỉu",
"TTXTXXTX": "Tài",
"TXTXXTXT": "Tài",
"XTXXTXTT": "Tài",
"TXXTXTTT": "Tài",
"XXTXTTTT": "Tài",
"XTXTTTTT": "Xỉu",
"TXTTTTTX": "Xỉu",
"XTTTTTXX": "Xỉu",
"TTTTTXXX": "Xỉu",
"TTTTXXXX": "Xỉu",
"TTTXXXXX": "Xỉu",
"TTXXXXXX": "Tài",
"TXXXXXXT": "Tài",
"XXXXXXTT": "Xỉu",
"XXXXXTTX": "Xỉu",
"XXXXTTXX": "Tài",
"XXXTTXXT": "Xỉu",
"XXTTXXTX": "Tài",
"XTTXXTXT": "Tài",
"TTXXTXTT": "Tài",
"TXXTXTTT": "Tài",
"XXTXTTTT": "Xỉu",
"XTXTTTTX": "Tài",
"TXTTTTXT": "Xỉu",
"XTTTTXTX": "Xỉu",
"TTTTXTXX": "Tài",
"TTTXTXXT": "Xỉu",
"TTXTXXTX": "Tài",
"TXTXXTXT": "Xỉu",
"XTXXTXTX": "Tài",
"TXXTXTXT": "Tài",
"XXTXTXTT": "Tài",
"XTXTXTTT": "Xỉu",
"TXTXTTTX": "Xỉu",
"XTXTTTXX": "Tài",
"TXTTTXXT": "Tài",
"XTTTXXTT": "Tài",
"TTTXXTTT": "Tài",
"TTXXTTTT": "Xỉu",
"TXXTTTTX": "Tài",
"XXTTTTXT": "Xỉu",
"XTTTTXTX": "Tài",
"TTTTXTXT": "Tài",
"TTTXTXTT": "Xỉu",
"TTXTXTTX": "Xỉu",
"TXTXTTXX": "Xỉu",
"XTXTTXXX": "Xỉu",
"TXTTXXXX": "Tài",
"XTTXXXXT": "Xỉu",
"TTXXXXTX": "Tài",
"TXXXXTXT": "Xỉu",
"XXXXTXTX": "Tài",
"XXXTXTXT": "Tài",
"XXTXTXTT": "Tài",
"XTXTXTTT": "Tài",
"TXTXTTTT": "Xỉu",
"XTXTTTTX": "Xỉu",
"TXTTTTXX": "Tài",
"XTTTTXXT": "Xỉu",
"TTTTXXTX": "Xỉu",
"TTTXXTXX": "Xỉu",
"TTXXTXXX": "Tài",
"TXXTXXXT": "Xỉu",
"XXTXXXTX": "Xỉu",
"XTXXXTXX": "Tài",
"TXXXTXXT": "Tài",
"XXXTXXTT": "Tài",
"XXTXXTTT": "Xỉu",
"XTXXTTTX": "Tài",
"TXXTTTXT": "Tài",
"XXTTTXTT": "Xỉu",
"XTTTXTTX": "Xỉu",
"TTTXTTXX": "Xỉu",
"TTXTTXXX": "Xỉu",
"TXTTXXXX": "Xỉu",
"XTTXXXXX": "Tài",
"TTXXXXXT": "Tài",
"TXXXXXTT": "Tài",
"XXXXXTTT": "Tài",
"XXXXTTTT": "Xỉu",
"XXXTTTTX": "Tài",
"XXTTTTXT": "Xỉu",
"XTTTTXTX": "Tài",
"TTTTXTXT": "Tài",
"TTTXTXTT": "Xỉu",
"TTXTXTTX": "Tài",
"TXTXTTXT": "Xỉu",
"XTXTTXTX": "Tài",
"TXTTXTXT": "Xỉu",
"XTTXTXTX": "Tài",
"TTXTXTXT": "Xỉu",
"TXTXTXTX": "Tài",
"XTXTXTXT": "Xỉu",
"TXTXTXTX": "Tài",
"XTXTXTXT": "Xỉu",
"TXTXTXTX": "Xỉu",
"XTXTXTXX": "Tài",
"TXTXTXXT": "Xỉu",
"XTXTXXTX": "Tài",
"TXTXXTXT": "Xỉu",
"XTXXTXTX": "Tài",
"TXXTXTXT": "Xỉu",
"XXTXTXTX": "Tài",
"XTXTXTXT": "Tài",
"TXTXTXTT": "Tài",
"XTXTXTTT": "Xỉu",
"TXTXTTTX": "Xỉu",
"XTXTTTXX": "Xỉu",
"TXTTTXXX": "Xỉu",
"XTTTXXXX": "Tài",
"TTTXXXXT": "Tài",
"TTXXXXTT": "Xỉu",
"TXXXXTTX": "Xỉu",
"XXXXTTXX": "Xỉu",
"XXXTTXXX": "Tài",
"XXTTXXXT": "Xỉu",
"XTTXXXTX": "Tài",
"TTXXXTXT": "Xỉu",
"TXXXTXTX": "Xỉu",
"XXXTXTXX": "Xỉu",
"XXTXTXXX": "Tài",
"XTXTXXXT": "Tài",
"TXTXXXTT": "Xỉu",
"XTXXXTTX": "Xỉu",
"TXXXTTXX": "Tài",
"XXXTTXXT": "Tài",
"XXTTXXTT": "Tài",
"XTTXXTTT": "Tài",
"TTXXTTTT": "Tài",
"TXXTTTTT": "Tài",
"XXTTTTTT": "Xỉu",
"XTTTTTTX": "Tài",
"TTTTTTXT": "Tài",
"TTTTTXTT": "Tài",
"TTTTXTTT": "Tài",
"TTTXTTTT": "Xỉu",
"TTXTTTTX": "Tài",
"TXTTTTXT": "Xỉu",
"XTTTTXTX": "Xỉu",
"TTTTXTXX": "Tài",
"TTTXTXXT": "Tài",
"TTXTXXTT": "Tài",
"TXTXXTTT": "Tài",
"XTXXTTTT": "Xỉu",
"TXXTTTTX": "Tài",
"XXTTTTXT": "Tài",
"XTTTTXTT": "Tài",
"TTTTXTTT": "Tài",
"TTTXTTTT": "Xỉu",
"TTXTTTTX": "Xỉu",
"TXTTTTXX": "Xỉu",
"XTTTTXXX": "Xỉu",
"TTTTXXXX": "Tài",
"TTTXXXXT": "Tài",
"TXTXTXTX": "Xỉu",
"XTXTXTXT": "Tài"
};

/* ================== SO KHỚP MỀM ================== */
function fuzzyMatch(chuoi, patterns) {
  let best = null;

  for (const [pattern, result] of Object.entries(patterns)) {
    if (pattern.length !== chuoi.length) continue;

    let score = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === chuoi[i]) score++;
    }

    if (!best || score > best.score) {
      best = {
        result,
        score,
        percent: Math.round((score / pattern.length) * 100)
      };
    }
  }
  return best;
}

/* ================== UPDATE NGẦM ================== */
async function updateSunData() {
  try {
    const r = await fetch(API_URL);
    const api = await r.json();

    const phien = api.phien;
    const phien_hien_tai = api.phien_hien_tai; // ✅ LẤY TỪ API GỐC
    const tong = api.tong;

    // 🔒 chỉ khi qua phiên mới
    if (phien === lastPhien) return;
    lastPhien = phien;

    const tx = tong >= 11 ? "T" : "X";

    history.push(tx);
    if (history.length > 20) history.shift();

    const chuoi_cau = history.slice(-8).join("");

    let du_doan = state.du_doan;
    let do_tin_cay = state.do_tin_cay;

    const match = fuzzyMatch(chuoi_cau, BREAK_PATTERNS);

    if (match && match.score >= 5) {
      du_doan = match.result.toUpperCase();
      do_tin_cay = match.percent + "%";
    }

    state = {
  phien,
  phien_hien_tai,
  tong_diem: tong,
  tong_xuc_xac: `[ ${x1}-${x2}-${x3} ]`,
  ket_qua: tx === "T" ? "TAI" : "XIU",
  chuoi_cau,
  du_doan,
  do_tin_cay
};

    console.log(
      `[SUN] Phiên ${phien_hien_tai} | ${chuoi_cau} | ${du_doan} | ${do_tin_cay}`
    );

  } catch (e) {
    console.log("[SUN] Lỗi API gốc:", e.message);
  }
}

setInterval(updateSunData, POLL_TIME);

/* ================== API SUN ================== */
module.exports = (app) => {
  app.get("/api/sun", (req, res) => {
  res.json({
    ID: "Bi Trum Api",
    game: "SUNWIN",
    phien: state.phien,
    tong_xuc_xac: state.tong_xuc_xac,
    tong_diem: state.tong_diem,
    ket_qua: state.ket_qua,
    phien_hien_tai: state.phien_hien_tai,
    du_doan: state.du_doan,
    do_tin_cay: state.do_tin_cay,
    chuoi_cau: state.chuoi_cau
  });
});
};
