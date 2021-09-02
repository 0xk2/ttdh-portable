# Phiên bản portable của Thầy thuốc đồng hành

## 1. Mục tiêu

## 2. Đối tượng

## 3. Kỹ thuật

### Dự án sử dụng tech stack: firebase & reactjs. Nên đi kèm các giới hạn/best practise sau:
1. Trong 1 UI thì chỉ có 1 init request lấy data và không bị phụ thuộc nhau.
2. Document trong firebase phải lưu được hết data cho 1 request từ UI.
3. Với Firebase; việc lưu data thừa, lặp là tốt phù hợp với cơ chế update hàng loạt

