import React from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AddButtonProps {
    path : string
}
export default function AddButton({path} : AddButtonProps) {

    const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => navigate(path)}
              style={{ alignItems: "right" }}
            >
              Add
              <AddCircleOutlineRoundedIcon />
            </Button>
          </div>
  )
}
