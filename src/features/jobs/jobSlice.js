import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters, { rejectWithValue }) => {
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    )
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit: 10, offset: 0, ...filteredParams }),
    }
    console.log(filteredParams)

    try {
      const response = await fetch(
        'https://api.weekday.technology/adhoc/getSampleJdJSON',
        requestOptions
      )
      const data = await response.json()
      console.log(data)

      // Filter jobs based on criteria
      // const filteredJobs = data.jdList.filter(
      //   (job) =>
      //     job.jobRole === 'frontend' ||
      //     (job.minJdSalary && parseInt(job.minJdSalary) >= 200000)
      // )
      // const filteredJobs = {
      //   jdList: data.jdList.filter(
      //     (job) =>
      //       job.jobRole === 'frontend' ||
      //       (job.minJdSalary && parseInt(job.minJdSalary) >= 200000)
      //   ),
      // }
      const filteredJobs = {
        jdList: data.jdList.filter(
          (job) =>
            job.jobRole === filteredParams.jobRole ||
            (job.minJdSalary && parseInt(job.minJdSalary) >= 200000)
        ),
      }
      console.log(filteredJobs)

      // return filteredJobs
      return data
    } catch (error) {
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
        if (action.payload.jdList && Array.isArray(action.payload.jdList)) {
          state.jobs = [...state.jobs, ...action.payload.jdList] // Map jdList to jobs
          state.totalCount = action.payload.totalCount
        } else {
          console.error('Job data is not iterable:', action.payload)
        }
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default jobSlice.reducer