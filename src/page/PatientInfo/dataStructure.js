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
      title: 'Cơ bản',
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
        'phone': {
          label: 'Số điện thoại',
          name: 'phone',
          type: Type.PHONE,
          validation: Validation.REQUIRED
        },
        'covidStatus': {
          label: 'Tình trạng nhiễm covid',
          name: 'covidStatus',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.REQUIRED,
          dataSource: 'local.covid_status'
        },
        'lastPostiveTestDate': {
          label: 'Lần xét nghiệm DƯƠNG TÍNH gần nhất',
          name: 'lastPostiveTestDate',
          type: Type.DATE,
          validation: Validation.RECOMMENDED
        },
        'provinceCode': {
          label: 'Tỉnh',
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
          parent_code: 'provinceCode'
        },
        'address': {
          label: 'Phường xã, đường, số nhà',
          name: 'address',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        }
      }
    },
    'test_info':{
      title: 'Xét nghiệm gần nhất',
      inputs: {
        'testCode': {
          label: 'Mã xét nghiệm gần nhất',
          name: 'testCode',
          type: Type.TEXT,
          validation: Validation.RECOMMENDED
        },
        'testDate': {
          label: 'Ngày xét nghiệm gần nhất',
          name: 'testDate',
          type: Type.DATE,
          validation: Validation.RECOMMENDED
        },
        'testReason': {
          label: 'Lý do xét nghiệm',
          name: 'testReason',
          type: Type.DROPDOWN_SINGLE,
          validation: Validation.RECOMMENDED,
          dataSource: 'local.testReason'
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
        'note': {
          label: 'Ghi chú',
          name: 'note',
          type: Type.TEXT_LONG,
          validation: Validation.OPTIONAL
        }
      }
    }
  }
}

const dataStructure = {
  Validation, Type, frmdata
}

export default dataStructure;