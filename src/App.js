import React from 'react'
import { useDispatch } from 'react-redux'
import JobFilters from './components/JobFilters'
import JobList from './components/JobList'
import { fetchJobs } from './features/jobs/jobSlice'

function App() {
  const dispatch = useDispatch()

  const handleApplyFilters = (filters) => {
    dispatch(fetchJobs(filters))
  }

  return (
    <div style={{ margin: '20px' }}>
      <div className='loader-body'>
        <div className='platform'>Candidate Application Platform</div>
      </div>
      <JobFilters nApplyFilters={handleApplyFilters} />
      <JobList />
    </div>
  )
}

export default App
