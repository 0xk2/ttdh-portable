import {Box, Typography, Chip} from '@material-ui/core';
import ChipNC from './ChipNC';
import { FileCopy } from "@material-ui/icons";
import dataSource from "../page/PatientInfo/dataSource";

const districtDataSource = dataSource['local.vn_district']
function PatientBriefInfo({item, age, clipboardHandler, className}) {
  return (
    <Box className={className}>
      <Box className="icu-card-name">
        <Typography variant="h5" component="h2" gutterBottom>{item.name}</Typography>
        <ChipNC nc={item.nc} />
      </Box>
      <Box>
        <Chip icon={<FileCopy />} onClick={clipboardHandler} label={item.phone} />
      </Box>
      <Box className="pt8">
        <Box>
          <Typography>{item.gender==='Male'?"Nam":"Nữ"}, {age} tuổi</Typography>
        </Box>
        {item.phoneBelongTo !== 'Tôi'?
        <Box>
          <Typography>Số điện thoại thuộc về  {item.phoneBelongTo}</Typography>
        </Box>: null
        }
        <Typography>Số nhà/tên đường: {item.address}</Typography>
        <Typography>{districtDataSource[item.districtCode] !== undefined ? districtDataSource[item.districtCode].path_with_type: null}</Typography>
        <Typography>Mã khu vực: {item.districtCode}</Typography>
      </Box>
    </Box>
  )
}

export default PatientBriefInfo;