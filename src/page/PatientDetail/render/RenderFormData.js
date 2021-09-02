import { Fragment } from "react"

const renderFormData = function(frmData){
  const sections = frmData.sections
  return (
    sections.map((section,sidx) => {
      return (
        <ul key={sidx}>
          {
            Object.keys(section.questions).map((question_id, qidx) => {
              const question = section.questions[question_id]
              const options = question.options
              return (
                <Fragment key={qidx}>
                {
                  options.map((option,oidx) => {
                    if(option.value > 0){
                      return (
                        <li key={oidx}>{option.title}</li>
                      )
                    }
                    return null
                  })
                }    
                </Fragment>
              )
            })
          }
        </ul>
      )
    })
  )
}

export default renderFormData;