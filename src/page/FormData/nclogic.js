const frmdata = 
{
  sections :
  [
    {
      title: 'Các câu hỏi về bệnh',
      subtitle: 'Kể từ khi xác định bị nhiễm hoặc có nguy cơ nhiễm CoViD-19, bác/anh/chị có các triệu chứng nào sau đây không?',
      questions: [
        {
          title: 'Các triệu chứng ít gặp',
          options: [
            {
              title: 'Tiêu chảy',
              base: 2,
              value: 0
            },
            {
              title: 'Viêm kết mạc',
              base: 2,
              value: 0
            },
            {
              title: 'Mất vị giác hoặc khứu giác',
              base: 2,
              value: 0
            },
            {
              title: 'Da nổi mẩn hay ngón tay hoặc ngón chân bị tấy đỏ hoặc tím tái',
              base: 2,
              value: 0
            },
          ]
        },
        {
          title: 'Các triệu chứng thường gặp (khởi phát)',
          options: [
            {
              title: 'Sốt dưới 39 độ C',
              base: 1,
              value: 0
            },
            {
              title: 'Ho khan',
              base: 1,
              value: 0
            },
            {
              title: 'Mệt mỏi nhưng vẫn sinh hoạt bình thường',
              base: 1,
              value: 0
            },
            {
              title: 'Đau nhức cơ thể',
              base: 1,
              value: 0
            },
            {
              title: 'Đau họng',
              base: 1,
              value: 0
            },
            {
              title: 'Đau đầu',
              base: 1,
              value: 0
            },
          ]
        }
      ]
    },
    {
      title: 'BÊN NỀN/BỆNH KHÁC',
      subtitle: 'Từ trước tới nay, anh/chị có các bệnh nền hoặc tình trạng nào sau đây hay không?',
      questions: [
        {
          title: 'Các yếu tố tăng nặng',
          options: [
            {
              title: 'Có bệnh nền tim mạch, hô hấp đang điều trị',
              base: 4,
              value: 0
            },
            {
              title: 'Có bệnh lý ung thư mạn tính đang điều trị',
              base: 4,
              value: 0
            },
            {
              title: 'Có bệnh lý suy thận mạn tính đang điều trị',
              base: 4,
              value: 0
            },
            {
              title: 'Viêm gan đang hoạt động, suy giảm chức năng gan',
              base: 4,
              value: 0
            },
            {
              title: 'Người cao tuổi từ 65 tuổi trở lên',
              base: 4,
              value: 0
            },
            {
              title: 'Thừa cân, béo phì với BMI từ 25 kg/cm2 trở lên',
              base: 4,
              value: 0
            }
          ]
        }
      ]
    },
    {
      title: 'CÂU HỎI SÀNG LỌC',
      subtitle: 'Trong 24h vừa qua, bác/anh/chị có các triệu chứng/dấu hiệu nào sau đây không?',
      questions: [
        {
          title: 'Các triệu chứng nặng',
          options: [
            {
              title: 'Các triệu chứng thường gặp (khởi phát) nặng lên liên tục không đỡ (VD: ho kéo dài thành tràng không dứt, ho xong phải thở dốc)',
              base: 4,
              value: 0
            },
            {
              title: 'Sốt cao từ 39 độ C không đáp ứng với thuốc hạ sốt (sốt trở lại trong vòng 02h sau dùng thuốc)',
              base: 4,
              value: 0
            },
            {
              title: 'Khó thở không thể làm việc được phải nghỉ ngơi',
              base: 4,
              value: 0
            },
            {
              title: 'Mệt mỏi, sinh hoạt khó khăn',
              base: 4,
              value: 0
            },
            {
              title: 'Huyết áp tăng cao từ 160/100 mmHg không đáp ứng với thuốc thường dùng',
              base: 4,
              value: 0
            }
          ],
        },
        {
          title: 'Các triệu chứng/dấu hiệu nghiêm trọng (biến chứng/toàn phát)',
          options: [
            {
              title: 'Đo huyết áp 2 lần có giá trị trung bình dưới 85/55 mmHg',
              base: 6,
              value: 0
            },
            {
              title: 'Nhịp tim tăng cao trên 120 lần/phút hoặc xuống dưới 50 lần/phút, hoặc nhịp thở từ 21 lần/phút với người lớn, từ 30 lần/phút với trẻ em',
              base: 6,
              value: 0
            },
            {
              title: 'Khó thở nhiều không thể nằm để thở',
              base: 6,
              value: 0
            },
            {
              title: 'Đau tức ngực thành cơn kéo dài từ 5’',
              base: 6,
              value: 0
            },
            {
              title: 'Mất khả năng nói hoặc cử động',
              base: 6,
              value: 0
            },
            {
              title: 'Lơ mơ, không tỉnh táo',
              base: 6,
              value: 0
            },
            {
              title: 'Sp02 < 90% khi nghỉ hoặc tụt Sp02 xuống < 90% sau gắng sức (nếu có thiết bị đo Sp02 tại nhà) dù đang thở Oxy, hoặc Sp02 < 94% không cải thiện khi thở Oxy tại nhà.',
              base: 6,
              value: 0
            },
          ]
        },
      ]
    }
  ]
}

const nextstep = {
  exception: {
    title: 'Kết quả không tính được',
    consult: 'Vui lòng chờ nhân viên y tế liên lạc lại',
    action: 'Liên hệ kỹ thuật'
  },
  NC0: {
    type: 'nc0',
    title: 'Tự theo dõi tại nhà (NC0)',
    consults: [
      'Nên ngủ đủ giác uống đủ 2l nước/ngày, ăn uống đúng bữa và đầy đủ dinh dưỡng',
      'Thực hiện các bài tập thể dục tại nhà: yoga, gym, bài tập vận động tay chân phù hợp,…; đi nhón mũi chân, hóp bụng, hít thở đều, ít nhất 30p/ngày',
      'Tập hít thở 3 lần/ngày',
      'Súc miệng, khử khuẩn họng ít nhất 4 lần/ngày bằng nước muối, nước sát khuẩn an toàn',
      'Cần bảo đảm vệ sinh trong ăn uống, sinh hoạt. Làm sạch các bề mặt, mở cửa thông thoáng, đón ánh nắng trực tiếp vào nhà',
      'Luôn đeo khẩu trang kể cả lúc đi vệ sinh, rửa tay thường xuyên',
      'Đo nhiệt độ, nhịp thở, huyết áp 2 lần/ngày',
      'Nên ở phòng riêng,  Luôn giữ khoảng cách với những người xung quanh',
      'Nâng sức khỏe tinh thần, bằng cách tự học thiền, nghe kinh phật, kinh thánh,pháp thoại,…có yếu tố tích cực',
      'Chuẩn bị 1 số thuốc như: hạ sốt, tiêu chảy, thuốc/kẹo giúp giảm đau họng, viên bù nước oresol, nước muối súc miệng, xịt rửa mũi, vitamin tăng đề kháng',
      'Trường hợp của (Bác) sẽ vào BV thu dung, hiện tại có thể rất động BN, vì đây là nơi dành cho BN nhẹ, như trường hợp cùa Bác. Sẽ không thoải mái như tự chăm sóc ở nhà. Nên Bác cố gắng nha',
      'Tuy nhiên, khi có các dấu hiệu khó thở, mệt hơn, đau ngực, lạnh đầu ngón tay chân,…. cần liên hệ với số 18001119 hoặc 1022 hoặc với số điện thoại đang gọi đến (bác/anh/chị) để được hỗ trợ kịp thời'
    ],
    action: 'Gọi 18001119 để được tạo hồ sơ; sẽ có bác sỹ gọi thăm khám hàng ngày',
  },
  NC1: {
    type: 'nc1',
    title: 'Ở tại nhà-theo dõi y tế (NC1)',
    consults: [
      'Tich cực sử dụng các loại thuốc điều trị triệu chứng: hạ sốt, tiêu chảy , thuốc/kẹo giúp giảm đau họng, viên bù nước oresol, nước muối súc miệng, xịt rửa mũi, vitamin tăng đề kháng',
      'Nên ngủ đủ giác uống đủ 2l nước/ngày, ăn uống đúng bữa và đầy đủ dinh dưỡng',
      'Thực hiện các bài tập thể dục tại nhà: yoga, gym, bài tập vận động tay chân phù hợp,…; đi nhón mũi chân, hóp bụng, hít thở đều, ít nhất 30p/ngày',
      'Tập hít thở 3 lần/ngày',
      'Súc miệng, khử khuẩn họng ít nhất 4 lần/ngày bằng nước muối, nước sát khuẩn an toàn',
      'Cần bảo đảm vệ sinh trong ăn uống, sinh hoạt. Làm sạch các bề mặt, mở cửa thông thoáng, đón ánh nắng trực tiếp vào nhà',
      'Luôn đeo khẩu trang kể cả lúc đi vệ sinh, rửa tay thường xuyên',
      'Đo nhiệt độ, nhịp thở, huyết áp 2 lần/ngày',
      'Nên ở phòng riêng,  Luôn giữ khoảng cách với những người xung quanh',
      'Nâng sức khỏe tinh thần, bằng cách tự học thiền, nghe kinh phật, kinh thánh,pháp thoại,…có yếu tố tích cực',
      'Trường hợp của (Bác) sẽ vào BV thu dung, hiện tại có thể rất động BN, vì đây là nơi dành cho BN nhẹ, như trường hợp cùa Bác. Sẽ không thoải mái như tự chăm sóc ở nhà. Nên Bác cố gắng nha',
      'Tuy nhiên, khi có các dấu hiệu khó thở, mệt hơn, đau ngực, lạnh đầu ngón tay chân,…. cần liên hệ với số 18001119 hoặc 1022 hoặc với số điện thoại đang gọi đến (bác/anh/chị) để được hỗ trợ kịp thời'
    ],
    action: 'Gọi 18001119 để được tạo hồ sơ; sẽ có bác sỹ gọi thăm khám hàng ngày',
  },
  NC2: {
    type: 'nc2',
    title: 'Ở tại nhà-theo dõi sát y tế (NC2)',
    consults: [
      'Tìm ngay TTYT địa phương và ghi nhớ đề phòng khi cần nhập viện',
      'Bác Sỹ sẽ gọi chăm sóc 2 lần/ngày',
      'Tich cực sử dụng các loại thuốc điều trị triệu chứng: hạ sốt, tiêu chảy , thuốc/kẹo giúp giảm đau họng, viên bù nước oresol, nước muối súc miệng, xịt rửa mũi, vitamin tăng đề kháng',
      'Nên ngủ đủ giác uống đủ 2l nước/ngày, ăn uống đúng bữa và đầy đủ dinh dưỡng',
      'Thực hiện các bài tập thể dục tại nhà: yoga, gym, bài tập vận động tay chân phù hợp,…; đi nhón mũi chân, hóp bụng, hít thở đều, ít nhất 30p/ngày',
      'Tập hít thở 3 lần/ngày',
      'Súc miệng, khử khuẩn họng ít nhất 4 lần/ngày bằng nước muối, nước sát khuẩn an toàn',
      'Cần bảo đảm vệ sinh trong ăn uống, sinh hoạt. Làm sạch các bề mặt, mở cửa thông thoáng, đón ánh nắng trực tiếp vào nhà',
      'Luôn đeo khẩu trang kể cả lúc đi vệ sinh, rửa tay thường xuyên',
      'Đo nhiệt độ, nhịp thở, huyết áp 2 lần/ngày',
      'Nên ở phòng riêng,  Luôn giữ khoảng cách với những người xung quanh',
      'Nâng sức khỏe tinh thần, bằng cách tự học thiền, nghe kinh phật, kinh thánh,pháp thoại,…có yếu tố tích cực',
      'Trường hợp của (Bác) sẽ vào BV thu dung, hiện tại có thể rất động BN, vì đây là nơi dành cho BN nhẹ, như trường hợp cùa Bác. Sẽ không thoải mái như tự chăm sóc ở nhà. Nên Bác cố gắng nha',
      'Tuy nhiên, khi có các dấu hiệu khó thở, mệt hơn, đau ngực, lạnh đầu ngón tay chân,…. cần liên hệ với số 18001119 hoặc 1022 hoặc với số điện thoại đang gọi đến (bác/anh/chị) để được hỗ trợ kịp thời'
    ],
    action: ['Gọi 18001119 để được tạo hồ sơ; sẽ có bác sỹ gọi thăm khám 2 lần/ngày', 'Thông báo về đường dây nóng của Quận/Huyện']
  },
  NC3: {
    type: 'nc3',
    title: 'Bắt buộc nhập viện (NC3)',
    consults: [
      'Đây là trường hợp cần phối hợp với nhân viên y tế để nhập viện',
      'Người nhà cần chuẩn bị thiết bị hỗ trợ, thuốc và đồ dùng để  sẵn sàng nhập viện'
    ],
    action: [
      'Liên hệ TTYT báo: tình trạng nguy cơ cao, cần người trực tiếp thăm khám, mang theo SpO2',
      'Chủ động kiểm tra tình trạng giường trống tại BV Tầng 2,3 tại địa phương',
      'Phối hợp TTYT, 115 chuyển NB đến BV nếu đúng nguy cơ',
      'Chuyển thông tin bệnh nhân cho bác sỹ chuyên khoa Covid theo dõi hoặc gọi 18001119 để được hỗ trợ khẩn cấp'
    ]
  },
  NC4: {
    type: 'nc4',
    title: 'Bắt buộc nhập viện (NC4)',
    consults: [
      'Đây là trường hợp cần phối hợp với nhân viên y tế để nhập viện khẩn cấp',
      'Người nhà cần chuẩn bị thiết bị hỗ trợ, thuốc và đồ dùng để  sẵn sàng nhập viện'
    ],
    action: [
      'Liên hệ TTYT báo: tình trạng nguy cơ cao, cần người trực tiếp thăm khám, mang theo SpO2',
      'Chủ động kiểm tra tình trạng giường trống tại BV Tầng 2,3 tại địa phương',
      'Phối hợp TTYT, 115 chuyển NB đến BV nếu đúng nguy cơ',
      'Chuyển thông tin bệnh nhân cho bác sỹ chuyên khoa Covid theo dõi hoặc gọi 18001119 để được hỗ trợ khẩn cấp'
    ]
  }
}

const calc = function(frmdata){
  var trieu_chung = 0, tang_nang = 0, nguy_hiem = 0;
  var sections = frmdata.sections;
  sections[0].questions.map((question, idx) => {  
    question.options.map((option, oidx) => {
      trieu_chung += option.base * option.value
    })
    return 0;
  })
  sections[1].questions.map((question, idx) => {
    question.options.map((option, oidx) => {
      tang_nang += option.base * option.value
      return 0;
    })
    return 0;
  })
  sections[2].questions.map((question, idx) => {
    question.options.map((option, oidx) => {
      nguy_hiem += option.base * option.value
      return 0;
    })
    return 0;
  })
  var total = trieu_chung + tang_nang + nguy_hiem
  if(nguy_hiem > 0 || total > 30){
    return nextstep.NC4
  } else if (tang_nang >= 8 || total >= 23){
    return nextstep.NC3
  } else if (total >= 15 || tang_nang >= 4){
    return nextstep.NC2
  } else if (total >= 7){
    return nextstep.NC1
  } else if (total <= 6) {
    return nextstep.NC0
  }
  return nextstep.exception
}

module.exports = {
  getFrmdata: () => {
    return JSON.parse(JSON.stringify(frmdata))
  },
  nextstep, calc
}