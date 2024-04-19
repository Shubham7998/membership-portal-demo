import React from 'react'
import { SnackbarOrigin } from "@mui/material";

export default function SnackBarGeneric() {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<
        "success" | "error" | "info" | "warning"
    >();

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    function displaySnackbar(message: string, severity: React.SetStateAction<"success" | "error" | "info" | "warning" | undefined>) {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        setSnackbarSeverity(severity);
    }

    return { setSnackbarMessage, setSnackbarOpen, setSnackbarSeverity, handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity,displaySnackbar }
}
