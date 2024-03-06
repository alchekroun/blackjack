import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";


const InformationSnack = ({ informationMessage, showInformationSnack, setShowInformationSnack, informationMessageType }) => {

    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        updateSeverity()
    }, [informationMessageType]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowInformationSnack(false);
    };

    const updateSeverity = () => {
        switch (informationMessageType) {
            case 1:
                setSeverity("success");
                break;
            case 0:
                setSeverity("info");
                break;
            case -1:
                setSeverity("error");
                break;
        }
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showInformationSnack}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                icon={false}
                sx={{ width: '100%' }}
            >
                {informationMessage}
            </Alert>
        </Snackbar>
    )
}

export default InformationSnack;