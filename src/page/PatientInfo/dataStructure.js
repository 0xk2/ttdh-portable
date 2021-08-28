const Validation = {
  REQUIRED: 'required',
  RECOMMENDED: 'recommended',
  OPTIONAL:'optional'
}
const Type = {
  TEXT: 'text',
  TEXT_LONG: 'text.long',
  NUMBER: 'number',
  PHONE: 'text.phone',
  EMAIL: 'text.email',
  DROPDOWN_SINGLE: 'dropdown.single',
  DROPDOWN_MULTIPLE: 'dropdown.multiple',
  BOOL: 'bool',
  DATE: 'date'
}
const frmdata = {
  sections: {
    'basic_info': {
      title: 'Thông tin cơ bản',
      inputs: {
        'name' : {
          label: 'Họ và tên',
          name: 'name',
          type: Type.TEXT,
          validation: Validation.REQUIRED
        },
        'age': {
          label: 'Tuổi',
          name: 'age',
          type: Type.NUMBER,
          validation: Validation.RECOMMENDED
        },
        'gender': {
          label: 'Giới tính',
          name: 'gender',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.RECOMMENDED,
          dataSource: 'local.gender'
        },
        'testCode': {
          label: 'Mã xét nghiệm',
          name: 'testCode',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        },
        'phone': {
          label: 'Số điện thoại',
          name: 'phone',
          type: Type.PHONE,
          validation: Validation.REQUIRED
        },
        'provinceCode': {
          label: 'Tỉnh thành',
          name: 'provinceCode',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.REQUIRED,
          dataSource: 'local.vn_province'
        },
        'districtCode': {
          label: 'Quận/Huyện',
          name: 'districtCode',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.REQUIRED,
          dataSource: 'local.vn_district',
          parent: 'provinceCode'
        },
        'wardCode': {
          label: 'Mã phường/Xã',
          name: 'wardCode',
          type: Type.TEXT,
          validation: Validation.REQUIRED
        },
        'address': {
          label: 'Số nhà',
          name: 'address',
          type: Type.TEXT,
          validation: Validation.OPTIONAL,
          dataSource: 'local.vn_ward'
        }
      }
    },
    'test_info':{
      title: 'Thông tin xét nghiệm',
      inputs: {
        'testDate': {
          label: 'Ngày lấy mẫu',
          name: 'testDate',
          type: Type.DATE,
          validation: Validation.RECOMMENDED
        },
        'testReason': {
          label: 'Lý do xét nghiệm',
          name: 'testReason',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.RECOMMENDED
        },
        'ctValue': {
          label: 'CT Value',
          name: 'ctValue',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        },
        'ctLevel': {
          label: 'Mức CT',
          name: 'ctLevel',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        },
        'hasBeenInHospital': {
          label: 'Đã đi Bệnh Viện/Khu cách ly?',
          name: 'hasBeenInHospital',
          type: Type.BOOL,
          validation: Validation.RECOMMENDED
        },
        'getOutOfHospitalDate': {
          label: 'Ngày ra khỏi Bệnh Viện/Khu cách ly',
          name: 'getOutOfHospitalDate',
          type: Type.DATE,
          validation: Validation.RECOMMENDED
        },
      }
    },
    'note':{
      title: 'Ghi chú',
      inputs: {
        'fieldDoctor': {
          label: 'Họ tên Bác Sỹ phụ trách/ người phụ trách',
          name: 'fieldDoctor',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        },
        'fieldDoctorPhone': {
          label: 'Điện thoại Bác Sỹ phụ trách/ người phụ trách',
          name: 'fieldDoctorPhone',
          type: Type.PHONE,
          validation: Validation.RECOMMENDED
        },
        'fieldDoctorPhone': {
          label: 'Ghi chú',
          name: 'fieldDoctorPhone',
          type: Type.TEXT_LONG,
          validation: Validation.OPTIONAL
        }
      }
    }
  }
}

export default {
  Validation, Type, frmdata
}