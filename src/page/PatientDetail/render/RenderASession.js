import ICUDoctor from "./icu-doctor"

const renderASession = function(session){
  if(session === undefined) { return null }
  switch(session.renderEngine){
    case ICUDoctor.KEY:
    default:
      return ICUDoctor.View(session)
  }
}

export default renderASession