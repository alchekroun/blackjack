import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

const ConfirmationDialog = ({ confiramtionMessage, showConfirmationDialog, setShowConfirmationDialog, setResult}) => {

    const handleClose = (value) => {
        setShowConfirmationDialog(false);
        setResult(value);
    };

    return (
        <Dialog
            open={showConfirmationDialog}
            onClose={handleClose}
        >
            <DialogContent>
                <DialogContentText>
                    {confiramtionMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={() => handleClose(true)}>Yes</button>
                <button onClick={() => handleClose(false)}>No</button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;