# Phiên bản portable của Thầy thuốc đồng hành

## 1. Mục tiêu

## 2. Đối tượng

## 3. Kỹ thuật

### Dự án sử dụng tech stack: firebase & reactjs. Nên đi kèm các giới hạn/best practise sau:
1. Trong 1 UI thì chỉ có 1 init request lấy data và không bị phụ thuộc nhau.
2. Document trong firebase phải lưu được hết data cho 1 request từ UI.
3. Với Firebase; việc lưu data thừa, lặp là tốt phù hợp với cơ chế update hàng loạt

### TODO: 3 Sep 2021
Còn 3 tính năng là cần thiết:
- Autosave khi kết thúc phiên chăm sóc
- SV có thể chấm lại form, từ đó: update info của bệnh nhân (patientInfo) và thêm 1 formdata mới (chấm điểm NC)
- Auto đẩy data sang TTDH
#### Cách giải quyết ĐẸP:
- Ghép các page chấm điểm thành 1 page và component hóa các phần đang là page
- Tạo component InputRender để tập trung việc render data vào 1 nơi
- Restruct lại code để đạt được (a,b)
- Đọc api của TTDH
#### Cách giải quyết ra kết quả:
- Sửa page Result để autosave khi mở page + xóa phần back lại page trước
- Không có cách nào dễ và ngắn làm được việc chấm lại form cả

Next step: code đã nhiều, nhưng chưa có ai dùng. Chờ người dùng rồi tính tiếp.