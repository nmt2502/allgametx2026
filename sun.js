module.exports = (app) => {
  app.get("/api/sun", (req, res) => {
    // Dữ liệu mẫu (sau này bạn gắn thuật toán vào đây)
    const data = {
      ID: "Bi Trum Api",
      game: "SUNWIN",
      phien: 0,
      tong_xuc_xac: "0-0-0",
      tong_diem: 0,
      ket_qua: "CHUA_CO",
      phien_hien_tai: 0,
      du_doan: "CHO",
      do_tin_cay: "0%",
      chuoi_cau: ""
    };

    res.json(data);
  });
};
