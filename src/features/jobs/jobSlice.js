import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const filterJobs = (jobs, filters) => {
  return jobs.filter((job) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value.length === 0) return true
      if (key === 'minJdSalary') {
        const minSalary = Math.min(...value.map(Number))
        return job.maxJdSalary >= minSalary
      }
      if (Array.isArray(value)) return value.includes(job[key])
      return job[key] === value
    })
  })
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters, { rejectWithValue }) => {
    try {
      const filteredParams = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value) acc[key] = value
          return acc
        },
        {}
      )
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 10, offset: 0, ...filteredParams }),
      }
      const response = await fetch(
        'https://api.weekday.technology/adhoc/getSampleJdJSON',
        requestOptions
      )
      const data = await response.json()
      const filteredJobs = filterJobs(data.jdList, filteredParams)
      console.log(filteredJobs)
      return { jdList: filteredJobs, totalCount: data.totalCount }
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  }
)

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload.jdList
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default jobSlice.reducer
