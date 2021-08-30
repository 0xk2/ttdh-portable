import { Box } from "@material-ui/core"
import classnames from 'classnames'

const TabPanel = (props) => {
  const {value, index, children} = props;
  return <Box hidden={value !== index} className={classnames("tab-panel",props.className)}>
    {children}
  </Box>
}

export default TabPanel;