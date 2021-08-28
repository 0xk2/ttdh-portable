import province from './local_geo/local_province';
import district from './local_geo/local_district';

const dataSource = {
  'local.gender': {
    'Male': {
      'name': 'Nam'
    },
    'Female': {
      'name': 'Nữ'
    }
  },
  'local.covid_status': {
    'Dương tính': {
      'name': 'Có, đang dương tính'
    },
    'Chưa từng nhiễm': {
      'name': 'Chưa nhiễm bao giờ'
    },
    'Nhiễm và đã khỏi': {
      'name': 'Đã nhiễm và đã khỏi'
    }
  },
  'local.vn_province': province,
  'local.vn_district': district,
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