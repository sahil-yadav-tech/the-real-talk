import React from 'react'
import { useForm } from 'react-hook-form'

const VerifyForm = () => {
  const {} = useForm({
    mode:"onTouched",
    defaultValues:{
      
    }
  })
  return (
    <div>VerifyForm</div>
  )
}

export default VerifyForm