import React from 'react'
import withoutAuthUser from '../../utils/lib/withoutAuthUser'

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
    <div>ForgotPassword</div>
  )
}

const EnhancedForgotPassword = withoutAuthUser(ForgotPassword)
export default EnhancedForgotPassword