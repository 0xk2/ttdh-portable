import {Box, Typography, Chip} from '@material-ui/core';
import ChipNC from './ChipNC';
import { FileCopy } from "@material-ui/icons";
import dataSource from "../page/PatientInfo/dataSource";
import {renderTimeSinceAnchorDate} from '../utils/index'

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
      {item.lastestSessionTimestamp !== undefined?
      <Box className="pt8">Lần chăm sóc cuối: <span className="text-hightlight">{renderTimeSinceAnchorDate(new Date(parseInt(item.lastestSessionTimestamp)*1000), new Date())}</span>
      </Box>:null
      }
      <Box className="pt8">
        <Box>
          <Typography>{item.gender==='Male'?"Nam":"Nữ"}, {age} tuổi</Typography>
        </Box>
        {item.phoneBelongTo !== 'Tôi' && item.phoneBelongTo !== undefined?
        <Box>
          <Typography>Số điện thoại thuộc về  {item.phoneBelongTo}</Typography>
        </Box>: null
        }
        {item.address !== undefined && item.address !== ''?
        <Typography>Số nhà/tên đường: {item.address}</Typography>:null}
        <Typography>{districtDataSource[item.districtCode] !== undefined ? districtDataSource[item.districtCode].path_with_type: null}</Typography>
        <Typography>Mã khu vực: {item.districtCode}</Typography>
      </Box>
    </Box>
  )
}

export default PatientBriefInfo;