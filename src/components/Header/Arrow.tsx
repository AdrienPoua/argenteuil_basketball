import React from 'react'
import { Box } from '@mui/material'

export default function Arrow() {
  return (
    <Box
    component="span"
    sx={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "6px",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "5px 5px 0",
      borderColor: "#000 transparent transparent transparent",
    }}
  />
  )
}
