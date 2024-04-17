import { Snackbar, SnackbarOrigin } from "@mui/material";
import Alert from "@mui/material/Alert";
import SnackBarGeneric from "./SnackBarGeneric";
import React from "react";



interface GenericSnackbarProps {
  open: boolean;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  severity: "success" | "error" | "info" | "warning" | any;
  message: string
}

// const {} = SnackBarGeneric();

function GenericSnackbar({ open, onClose, severity, message }: GenericSnackbarProps) {
  const [snackbarPosition, setSnackbarPosition] =
        React.useState<SnackbarOrigin>({
            vertical: "top",
            horizontal: "center",
        });
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<
        "success" | "error" | "info" | "warning"
    >();

    
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      anchorOrigin={snackbarPosition}>
      <Alert onClose={onClose}
        severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GenericSnackbar;


