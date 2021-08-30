const sample = {
  "patients": {
    "098723405-123273494": { //098723405: user key & phone number;123273494: timestamp
      "name": "hieu",
      "gender": "MALE",
      "phone": "0915585266",
      "dob": 1988,
      "provinceCode": "79",
      "districtCode": "760",
      "address": "1/1/3",
      "imported_callio": false,
      "created_at": 123273494, // timestamp
      "history": {
        "2021-08-28:08:30:10":{
          "covidStatus": "YES",
          "lastPositiveTestDate": "2021-08-03",
          "testCode":"",
          "testDate":"",
          "testReason": "",
          "ctValue": "10",
          "ctLevel": "32",
          "getOutOfHospitalDate": "2021-08-15",
          "fieldDoctor": "Ms Giang",
          "fieldDoctorPhone":"01275203",
          "note": "NO",
          "nc": "nc3",
          "frmdata": {},
          "status": "waiting",
          "user": "098723405"
        },
        "2021-08-28:09:00:10":{
          "nc": "nc3",
          "note": "Chưa gọi được",
          "status": "processing",
          "user": "12348560"
        },
        "2021-08-28:09:30:10":{
          "nc": "nc2",
          "note": "Chuyển về nhóm BS",
          "status": "done",
          "doctor": "12348560"
        }
      }
    }
  },
  "users": {
    "12348560": {
      "name": "Ms Lien",
      "created_at": "2021-08-01",
      "type": "icu-doctor", //["icu-doctor", "medical-staff", "callio-staff"],
      "expertise": "Bác Sỹ",
      "region":"Quận 3"
    }
  },
  "nc0":{
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  },
  "nc1":{
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  },
  "nc2":{
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  },
  "nc3":{
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  },
  "nc4":{
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  },
  "processing": {
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu", "nc":"nc3"},
    "098723405-123273495": {"phone":"0915585266", "name":"Hieu", "nc":"nc4"}
  },
  "waiting": {
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu", "nc":"nc3"},
    "098723405-123273495": {"phone":"0915585266", "name":"Hieu", "nc":"nc4"}
  },
  "dataWaitingForImport": {
    "098723405-123273494": {"phone":"0915585266", "name":"Hieu"}
  }
}