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
    <div>
      <div className='filter-head'>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <label
            style={{
              fontWeight: 'bold',
              fontSize: '13px',
              paddingRight: '2px',
            }}
          >
            Roles:
          </label>
          <div className='input-box'>
            {filters.jobRole.map((role, index) => (
              <span className='typed-filter' key={index}>
                {role}
                <button
                  className='cross-btn'
                  onClick={() => handleDelete('jobRole', index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className='input-style'
              type='text'
              onKeyPress={handleChange}
              name='jobRole'
              placeholder='Add and press Enter'
            />
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
            Company Name:
          </label>
          <div className='input-box'>
            {filters.companyName.map((role, index) => (
              <span className='typed-filter' key={index}>
                {role}
                <button
                  className='cross-btn'
                  onClick={() => handleDelete('companyName', index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className='input-style'
              type='text'
              onKeyPress={handleChange}
              name='companyName'
              placeholder='Add and press Enter'
            />
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
            Location:
          </label>
          <div className='input-box'>
            {filters.location.map((role, index) => (
              <span className='typed-filter' key={index}>
                {role}
                <button
                  className='cross-btn'
                  onClick={() => handleDelete('location', index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className='input-style'
              type='text'
              onKeyPress={handleChange}
              name='location'
              placeholder='Add and press Enter'
            />
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
            Minimum Experience:
          </label>
          <div className='input-box'>
            {filters.minExp.map((role, index) => (
              <span className='typed-filter' key={index}>
                {role}
                <button
                  className='cross-btn'
                  onClick={() => handleDelete('minExp', index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className='input-style'
              type='text'
              onKeyPress={handleChange}
              name='minExp'
              placeholder='Add and press Enter'
            />
          </div>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '13px' }}>
            Minimum Salary:
          </label>
          <div className='input-box'>
            {filters.minJdSalary.map((salary, index) => (
              <span className='typed-filter' key={index}>
                {salary}
                <button
                  className='cross-btn'
                  onClick={() => handleDelete('minJdSalary', index)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className='input-style'
              type='text'
              onKeyPress={handleChange}
              name='minJdSalary'
              placeholder='Add and press Enter'
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }} />
      <div className='apply-btn'>
        <button className='apply-filter' onClick={handleSubmit}>
          <span className='apply-color'>Easy Apply</span>
        </button>
      </div>
    </div>
  )
}

export default FilterComponent
