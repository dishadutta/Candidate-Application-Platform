import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

function ShowMoreModal({ description }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <div className='apply-btn'>
        <button className='show-btn' onClick={handleOpen}>
          Show More
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h4 style={{ paddingBottom: '10px', textAlign: 'center' }}>
            Job Description
          </h4>
          <div className='modal-description'>{description}</div>
        </Box>
      </Modal>
    </div>
  )
}

export default ShowMoreModal
