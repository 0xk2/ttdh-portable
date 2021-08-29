import { Button } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const ResetPhoneButton = function(props){
  return (
    <Button startIcon={<Refresh />} variant="outlined" color="secondary" disabled={props.disabled} onClick={props.onClick}>Đổi</Button>
  )
}

export default ResetPhoneButton;