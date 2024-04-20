import React from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AddButtonProps {
    btnName : string,
    handleSubmit : () => void
}
export default function GenericButton({btnName, handleSubmit} : AddButtonProps) {

  return (
    <div >
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              style={{ alignItems: "left" }}

            >
              {btnName}
            </Button>
          </div>
  )
}
