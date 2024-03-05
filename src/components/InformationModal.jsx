import { Box, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ccc',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const InformationModal = ({ informationMessage, showInformationModal }) => {
    return (
        <Modal open={showInformationModal}>
            <Box sx={style}>
                <p color="black">{informationMessage}</p>
            </Box>
        </Modal>
    )
}

export default InformationModal;