import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { AppContext } from '../AppContext';
import TournamentSelector from './TournamentSelector';
import TournamentConfig from './TournamentConfig';

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
};

export default function SettingsModal(): JSX.Element {
  const { state, dispatch } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Settings</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.5rem' }}>Configure Challonge</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <TournamentConfig />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
