import React from 'react'
// import { Card, CardContent, Typography, Button } from '@material-ui/core'

const JobCard = ({ job }) => {
  return (
    // <Card variant='outlined'>
    //   <CardContent>
    //     <Typography variant='h5' component='h2'>
    //       {job.jobRole}
    //     </Typography>
    //     <Typography color='textSecondary'>{job.location}</Typography>
    //     <Typography variant='body2' component='p'>
    //       {job.jobDetailsFromCompany.substring(0, 100)}...
    //     </Typography>
    //     <Button size='small'>Apply</Button>
    //   </CardContent>
    // </Card>
    <div variant='outlined'>
      <div>
        <div variant='h5' component='h2'>
          {job.jobRole}
        </div>
        <div color='textSecondary'>{job.location}</div>
        <div variant='body2' component='p'>
          {job.jobDetailsFromCompany.substring(0, 100)}...
        </div>
        <button size='small'>Apply</button>
      </div>
    </div>
  )
}

export default JobCard
