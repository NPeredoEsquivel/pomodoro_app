import React from 'react'

type ErrorProps = {
  errorMessage? : string
}

const Error: React.FC<ErrorProps> =  ({errorMessage}) => {
  return (
    <div>Error: {errorMessage || ''}</div>
  )
}

export default Error;