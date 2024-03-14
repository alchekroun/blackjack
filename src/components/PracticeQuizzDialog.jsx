import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";

const PracticeQuizzDialog = ({ openQuizz, setOpenQuizz, handleClose }) => {

    const [userAnswer, setUserAnswer] = useState(0);

    return (
        <Dialog
            open={openQuizz}
            onClose={handleClose}
        >
            <DialogContent>
                <DialogContentText>
                    What is the current count ?
                </DialogContentText>
                <input onChange={e => setUserAnswer(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <button className="action-button" onClick={() => handleClose(userAnswer)}>Answer</button>
            </DialogActions>
        </Dialog>
    )
}

export default PracticeQuizzDialog;