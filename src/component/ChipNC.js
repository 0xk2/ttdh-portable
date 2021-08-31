import { Chip } from "@material-ui/core";

function ChipNC(props){
  if(props.nc==='nc3'){
    return <Chip color="secondary" variant="outlined" label="NC3" />
  }else if(props.nc==='nc4'){
    return <Chip color="secondary" variant="default" label="NC4" />
  }else {
    return <Chip color="primary" variant="outlined" label={props.nc} />
  }
}

export default ChipNC;