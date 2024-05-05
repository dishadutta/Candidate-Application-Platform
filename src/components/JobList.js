import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../features/jobs/jobSlice'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import ShowMoreModal from './ShowMoreModal'

function JobList() {
  // const dispatch = useDispatch()
  // const { jobs, loading, error } = useSelector((state) => state.jobs)

  // useEffect(() => {
  //   dispatch(fetchJobs(10, 0))
  // }, [dispatch]) // Empty dependency array means this runs once on mount
  const dispatch = useDispatch()
  const { jobs, loading, error } = useSelector((state) => state.jobs)

  dispatch(fetchJobs({}))

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
                  sx={{ borderRadius: 5, padding: '8px 16px' }}
                  variant='outlined'
                >
                  <CardContent>
                    <div className='card1-section'>
                      <img
                        height={25}
                        width={25}
                        src={job.logoUrl}
                        alt={job.companyName}
                      />
                      <div>
                        <div className='company-name'>{job.companyName}</div>
                        <div className='job-role'>{job.jobRole}</div>
                        <div className='job-loc'>{job.location}</div>
                      </div>
                    </div>
                    <p className='est-salary'>
                      Estimated Salary: $
                      {job.minJdSalary !== null && `${job.minJdSalary} - `}{' '}
                      {job.maxJdSalary} {job.salaryCurrencyCode}
                    </p>
                    <p className='abt-com'>
                      {job.jobDetailsFromCompany.substring(0, 400)}...
                    </p>
                    <ShowMoreModal description={job.jobDetailsFromCompany} />
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
