import React, { useState } from 'react'

function FilterComponent({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    minExp: [],
    companyName: [],
    location: [],
    remote: [],
    jobRole: [],
    minJdSalary: [],
  })

  // Adjusted handleChange to check specifically for 'Enter' key press
  const handleChange = (event) => {
    const { name, value } = event.target
    if (event.key === 'Enter' && value.trim()) {
      // Check for 'Enter' key and non-empty trimmed value
      event.preventDefault() // Prevents the default action to handle correctly
      setFilters((prev) => ({
        ...prev,
        [name]: [...prev[name], value.trim()],
      }))
      event.target.value = '' // Clear input field after adding to tags
    }
  }

  const handleDelete = (name, index) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    console.log(filters)
    onApplyFilters(filters)
  }

  return (
    <div className='filter-head'>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '13px' }}>Roles:</label>
        {filters.jobRole.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('jobRole', index)}>×</button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='jobRole'
          placeholder='Add and press Enter'
        />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
          Company Name:
        </label>
        {filters.companyName.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('companyName', index)}>
              ×
            </button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='companyName'
          placeholder='Add and press Enter'
        />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
          Location:
        </label>
        {filters.location.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('location', index)}>×</button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='location'
          placeholder='Add and press Enter'
        />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
          Minimum Experience:
        </label>
        {filters.minExp.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('minExp', index)}>×</button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='minExp'
          placeholder='Add and press Enter'
        />
      </div>
      {/* <div>
        <label style={{fontWeight:'bold, fontSize: '13px''}}>Job Role:</label>
        {filters.jobRole.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('jobRole', index)}>×</button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='jobRole'
          placeholder='Add and press Enter'
        />
      </div> */}
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
          Minimum Salary:
        </label>
        {filters.minJdSalary.map((salary, index) => (
          <span key={index}>
            {salary}
            <button onClick={() => handleDelete('minJdSalary', index)}>
              ×
            </button>
          </span>
        ))}
        <input
          type='text'
          onKeyPress={handleChange}
          name='minJdSalary'
          placeholder='Add and press Enter'
        />
      </div>
      <button onClick={handleSubmit}>Apply Filters</button>
    </div>
  )
}

export default FilterComponent
