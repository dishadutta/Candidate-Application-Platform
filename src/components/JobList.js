import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../features/jobs/jobSlice'
import { Box, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Modal from '@mui/material/Modal'
import { Backdrop } from '@mui/material'

function CustomBackdrop(props) {
  return (
    <Backdrop {...props} sx={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }} />
  )
}

function JobList() {
  const dispatch = useDispatch()
  const { jobs, loading, error } = useSelector((state) => state.jobs)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(fetchJobs(10, 0))
  }, [dispatch]) // Empty dependency array means this runs once on mount

  return (
    <div>
      {console.log(jobs)}
      {loading ? <p>loading</p> : <p>loaded</p>}
      {jobs.length > 0 ? (
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.jdUid}>
              <div
                style={
                  {
                    // padding: 20,
                    // textAlign: 'center',
                  }
                }
              >
                <Card
                  className='card-hover-effect'
                  sx={{ borderRadius: 4, padding: '8px 16px' }}
                  variant='outlined'
                >
                  <CardContent>
                    <div className='card1-section'>
                      <img
                        height={40}
                        width={25}
                        src={job.logoUrl}
                        alt={job.companyName}
                      />
                      <div>
                        <div className='info'>
                          <h3>{job.companyName}</h3>
                          <h2>{job.jobRole}</h2>
                        </div>
                        <p className='job-loc'>{job.location}</p>
                      </div>
                    </div>
                    <p className='est-salary'>
                      Estimated Salary:{' '}
                      {job.minJdSalary !== null && `${job.minJdSalary} - `}{' '}
                      {job.maxJdSalary} {job.salaryCurrencyCode}
                    </p>
                    <p className='abt-com'>
                      {job.jobDetailsFromCompany.substring(0, 100)}...
                    </p>
                    <div onClick={handleOpen} className='show-more'>
                      Show more
                    </div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'
                      BackdropComponent={CustomBackdrop}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'white',
                          border: '2px solid #000',
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        {job.jobDetailsFromCompany}
                      </Box>
                    </Modal>
                    {job.minExp && (
                      <div className='info' style={{ marginTop: '10px' }}>
                        <h3>Minimum Experience</h3>
                        <h2>{job.minExp}</h2>
                      </div>
                    )}
                  </CardContent>
                  <CardActions className='apply-btn'>
                    <button className='btn-style'>Easy Apply</button>
                  </CardActions>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No jobs found.</p>
      )}
      {/* will implement spinner to show data loading */}
      {error && <h1>encountered a error please try again after sometime</h1>}
    </div>
  )
}

export default JobList
