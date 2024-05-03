import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../features/jobs/jobSlice'
import JobCard from '../components/JobCard'

function JobList() {
  const dispatch = useDispatch()
  const { jobs, loading, error } = useSelector((state) => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs(10, 0))
  }, [dispatch]) // Empty dependency array means this runs once on mount

  return (
    <div>
      {console.log(jobs)}
      {console.log(loading)}
      {/* will implement spinner to show data loading */}
      {loading ? <p>loading</p> : <p>loaded</p>}
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.jdUid} job={job} />)
      ) : (
        <p>No jobs found.</p>
      )}
      {error && <h1>encountered a error please try again after sometime</h1>}
    </div>
  )
}

export default JobList
