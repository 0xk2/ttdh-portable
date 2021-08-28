import { Box } from "@material-ui/core";

const TabPanel = (props) => {
  const {value, index, children} = props;
  return <Box hidden={value !== index} className="tab-pane">
    {children}
  </Box>
}

export default TabPanel;