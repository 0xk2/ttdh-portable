const dataSource = {
  'local.gender': {
    'Male': {
      'name': 'Nam'
    },
    'Female': {
      'name': 'Nữ'
    }
  },
  'local.vn_province': {
    "79": {
      "name": "Hồ Chí Minh",
      "slug": "ho-chi-minh",
      "type": "thanh-pho",
      "name_with_type": "Thành phố Hồ Chí Minh",
      "code": "79"
    },
    "74": {
      "name": "Bình Dương",
      "slug": "binh-duong",
      "type": "tinh",
      "name_with_type": "Tỉnh Bình Dương",
      "code": "74"
    },
  },
  'local.vn_district': {
    "760": {
      "name": "1",
      "type": "quan",
      "slug": "1",
      "name_with_type": "Quận 1",
      "path": "1, Hồ Chí Minh",
      "path_with_type": "Quận 1, Thành phố Hồ Chí Minh",
      "code": "760",
      "parent_code": "79"
    },
    "761": {
      "name": "12",
      "type": "quan",
      "slug": "12",
      "name_with_type": "Quận 12",
      "path": "12, Hồ Chí Minh",
      "path_with_type": "Quận 12, Thành phố Hồ Chí Minh",
      "code": "761",
      "parent_code": "79"
    },
    "764": {
      "name": "Gò Vấp",
      "type": "quan",
      "slug": "go-vap",
      "name_with_type": "Quận Gò Vấp",
      "path": "Gò Vấp, Hồ Chí Minh",
      "path_with_type": "Quận Gò Vấp, Thành phố Hồ Chí Minh",
      "code": "764",
      "parent_code": "79"
    },
    "765": {
      "name": "Bình Thạnh",
      "type": "quan",
      "slug": "binh-thanh",
      "name_with_type": "Quận Bình Thạnh",
      "path": "Bình Thạnh, Hồ Chí Minh",
      "path_with_type": "Quận Bình Thạnh, Thành phố Hồ Chí Minh",
      "code": "765",
      "parent_code": "79"
    },
    "766": {
      "name": "Tân Bình",
      "type": "quan",
      "slug": "tan-binh",
      "name_with_type": "Quận Tân Bình",
      "path": "Tân Bình, Hồ Chí Minh",
      "path_with_type": "Quận Tân Bình, Thành phố Hồ Chí Minh",
      "code": "766",
      "parent_code": "79"
    },
    "767": {
      "name": "Tân Phú",
      "type": "quan",
      "slug": "tan-phu",
      "name_with_type": "Quận Tân Phú",
      "path": "Tân Phú, Hồ Chí Minh",
      "path_with_type": "Quận Tân Phú, Thành phố Hồ Chí Minh",
      "code": "767",
      "parent_code": "79"
    },
    "768": {
      "name": "Phú Nhuận",
      "type": "quan",
      "slug": "phu-nhuan",
      "name_with_type": "Quận Phú Nhuận",
      "path": "Phú Nhuận, Hồ Chí Minh",
      "path_with_type": "Quận Phú Nhuận, Thành phố Hồ Chí Minh",
      "code": "768",
      "parent_code": "79"
    },
    "769": {
      "name": "Thủ Đức",
      "type": "thanh-pho",
      "slug": "thu-duc",
      "name_with_type": "Thành phố Thủ Đức",
      "path": "Thủ Đức, Hồ Chí Minh",
      "path_with_type": "Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
      "code": "769",
      "parent_code": "79"
    },
    "770": {
      "name": "3",
      "type": "quan",
      "slug": "3",
      "name_with_type": "Quận 3",
      "path": "3, Hồ Chí Minh",
      "path_with_type": "Quận 3, Thành phố Hồ Chí Minh",
      "code": "770",
      "parent_code": "79"
    },
    "771": {
      "name": "10",
      "type": "quan",
      "slug": "10",
      "name_with_type": "Quận 10",
      "path": "10, Hồ Chí Minh",
      "path_with_type": "Quận 10, Thành phố Hồ Chí Minh",
      "code": "771",
      "parent_code": "79"
    },
    "772": {
      "name": "11",
      "type": "quan",
      "slug": "11",
      "name_with_type": "Quận 11",
      "path": "11, Hồ Chí Minh",
      "path_with_type": "Quận 11, Thành phố Hồ Chí Minh",
      "code": "772",
      "parent_code": "79"
    },
    "773": {
      "name": "4",
      "type": "quan",
      "slug": "4",
      "name_with_type": "Quận 4",
      "path": "4, Hồ Chí Minh",
      "path_with_type": "Quận 4, Thành phố Hồ Chí Minh",
      "code": "773",
      "parent_code": "79"
    },
    "774": {
      "name": "5",
      "type": "quan",
      "slug": "5",
      "name_with_type": "Quận 5",
      "path": "5, Hồ Chí Minh",
      "path_with_type": "Quận 5, Thành phố Hồ Chí Minh",
      "code": "774",
      "parent_code": "79"
    },
    "775": {
      "name": "6",
      "type": "quan",
      "slug": "6",
      "name_with_type": "Quận 6",
      "path": "6, Hồ Chí Minh",
      "path_with_type": "Quận 6, Thành phố Hồ Chí Minh",
      "code": "775",
      "parent_code": "79"
    },
    "776": {
      "name": "8",
      "type": "quan",
      "slug": "8",
      "name_with_type": "Quận 8",
      "path": "8, Hồ Chí Minh",
      "path_with_type": "Quận 8, Thành phố Hồ Chí Minh",
      "code": "776",
      "parent_code": "79"
    },
    "777": {
      "name": "Bình Tân",
      "type": "quan",
      "slug": "binh-tan",
      "name_with_type": "Quận Bình Tân",
      "path": "Bình Tân, Hồ Chí Minh",
      "path_with_type": "Quận Bình Tân, Thành phố Hồ Chí Minh",
      "code": "777",
      "parent_code": "79"
    },
    "778": {
      "name": "7",
      "type": "quan",
      "slug": "7",
      "name_with_type": "Quận 7",
      "path": "7, Hồ Chí Minh",
      "path_with_type": "Quận 7, Thành phố Hồ Chí Minh",
      "code": "778",
      "parent_code": "79"
    },
    "783": {
      "name": "Củ Chi",
      "type": "huyen",
      "slug": "cu-chi",
      "name_with_type": "Huyện Củ Chi",
      "path": "Củ Chi, Hồ Chí Minh",
      "path_with_type": "Huyện Củ Chi, Thành phố Hồ Chí Minh",
      "code": "783",
      "parent_code": "79"
    },
    "784": {
      "name": "Hóc Môn",
      "type": "huyen",
      "slug": "hoc-mon",
      "name_with_type": "Huyện Hóc Môn",
      "path": "Hóc Môn, Hồ Chí Minh",
      "path_with_type": "Huyện Hóc Môn, Thành phố Hồ Chí Minh",
      "code": "784",
      "parent_code": "79"
    },
    "785": {
      "name": "Bình Chánh",
      "type": "huyen",
      "slug": "binh-chanh",
      "name_with_type": "Huyện Bình Chánh",
      "path": "Bình Chánh, Hồ Chí Minh",
      "path_with_type": "Huyện Bình Chánh, Thành phố Hồ Chí Minh",
      "code": "785",
      "parent_code": "79"
    },
    "786": {
      "name": "Nhà Bè",
      "type": "huyen",
      "slug": "nha-be",
      "name_with_type": "Huyện Nhà Bè",
      "path": "Nhà Bè, Hồ Chí Minh",
      "path_with_type": "Huyện Nhà Bè, Thành phố Hồ Chí Minh",
      "code": "786",
      "parent_code": "79"
    },
    "718": {
      "name": "Thủ Dầu Một",
      "type": "thanh-pho",
      "slug": "thu-dau-mot",
      "name_with_type": "Thành phố Thủ Dầu Một",
      "path": "Thủ Dầu Một, Bình Dương",
      "path_with_type": "Thành phố Thủ Dầu Một, Tỉnh Bình Dương",
      "code": "718",
      "parent_code": "74"
    },
    "719": {
      "name": "Bàu Bàng",
      "type": "huyen",
      "slug": "bau-bang",
      "name_with_type": "Huyện Bàu Bàng",
      "path": "Bàu Bàng, Bình Dương",
      "path_with_type": "Huyện Bàu Bàng, Tỉnh Bình Dương",
      "code": "719",
      "parent_code": "74"
    },
    "720": {
      "name": "Dầu Tiếng",
      "type": "huyen",
      "slug": "dau-tieng",
      "name_with_type": "Huyện Dầu Tiếng",
      "path": "Dầu Tiếng, Bình Dương",
      "path_with_type": "Huyện Dầu Tiếng, Tỉnh Bình Dương",
      "code": "720",
      "parent_code": "74"
    },
    "721": {
      "name": "Bến Cát",
      "type": "thi-xa",
      "slug": "ben-cat",
      "name_with_type": "Thị xã Bến Cát",
      "path": "Bến Cát, Bình Dương",
      "path_with_type": "Thị xã Bến Cát, Tỉnh Bình Dương",
      "code": "721",
      "parent_code": "74"
    },
    "722": {
      "name": "Phú Giáo",
      "type": "huyen",
      "slug": "phu-giao",
      "name_with_type": "Huyện Phú Giáo",
      "path": "Phú Giáo, Bình Dương",
      "path_with_type": "Huyện Phú Giáo, Tỉnh Bình Dương",
      "code": "722",
      "parent_code": "74"
    },
    "723": {
      "name": "Tân Uyên",
      "type": "thi-xa",
      "slug": "tan-uyen",
      "name_with_type": "Thị xã Tân Uyên",
      "path": "Tân Uyên, Bình Dương",
      "path_with_type": "Thị xã Tân Uyên, Tỉnh Bình Dương",
      "code": "723",
      "parent_code": "74"
    },
    "724": {
      "name": "Dĩ An",
      "type": "thanh-pho",
      "slug": "di-an",
      "name_with_type": "Thành phố Dĩ An",
      "path": "Dĩ An, Bình Dương",
      "path_with_type": "Thành phố Dĩ An, Tỉnh Bình Dương",
      "code": "724",
      "parent_code": "74"
    },
    "725": {
      "name": "Thuận An",
      "type": "thanh-pho",
      "slug": "thuan-an",
      "name_with_type": "Thành phố Thuận An",
      "path": "Thuận An, Bình Dương",
      "path_with_type": "Thành phố Thuận An, Tỉnh Bình Dương",
      "code": "725",
      "parent_code": "74"
    },
    "726": {
      "name": "Bắc Tân Uyên",
      "type": "huyen",
      "slug": "bac-tan-uyen",
      "name_with_type": "Huyện Bắc Tân Uyên",
      "path": "Bắc Tân Uyên, Bình Dương",
      "path_with_type": "Huyện Bắc Tân Uyên, Tỉnh Bình Dương",
      "code": "726",
      "parent_code": "74"
    },
  },
  'local.testReason': {
    '0': {
      'name': 'Sàng lọc diện rộng'
    },
    '1': {
      'name': 'Truy vết F0'
    }
  },
  'local.vn_ward': {}
}

export default dataSource;