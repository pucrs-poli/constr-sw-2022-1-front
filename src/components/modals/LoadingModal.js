import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center !important'
};

export default function LoadingModal(props) {

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.isLoading ? <CircularProgress /> : (
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{ marginBottom: '20px' }}>
                                {props.messageAfterLoaded}
                            </Typography>

                            <Button variant="contained" color='primary' sx={{ marginRight: '20px' }} onClick={() => props.openCloseModal(false)}>OK</Button>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
