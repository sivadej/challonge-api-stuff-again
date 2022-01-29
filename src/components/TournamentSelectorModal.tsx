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

export default function TournamentSelectorModal(): JSX.Element {
  const { state } = useContext(AppContext);
  const {
    config: { challongeKey },
    tourney: { domain },
  } = state;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} disabled={!challongeKey || !domain}>My Tournaments</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.5rem' }}>Select Tournament</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <TournamentSelector />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
