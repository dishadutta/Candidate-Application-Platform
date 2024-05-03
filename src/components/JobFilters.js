import React, { useState } from 'react'

function FilterComponent({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    minExp: [],
    companyName: [],
    location: [],
    remote: [], // if location is remote then set it to true else on-site
    techStack: [],
    jobRole: [],
    minJdSalary: [],
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    if (event.key === 'Enter' && value) {
      // Triggered on Enter
      setFilters((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
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
    onApplyFilters(filters)
  }

  return (
    <div>
      <div>
        <label>Job Role:</label>
        {filters.jobRole.map((role, index) => (
          <span key={index}>
            {role}
            <button onClick={() => handleDelete('jobRole', index)}>×</button>
          </span>
        ))}
        <input
          onKeyPress={(e) => handleChange(e)}
          name='jobRole'
          placeholder='Add and press Enter'
        />
      </div>
      <div>
        <label>Minimum Salary:</label>
        {filters.minJdSalary.map((salary, index) => (
          <span key={index}>
            {salary}
            <button onClick={() => handleDelete('minJdSalary', index)}>
              ×
            </button>
          </span>
        ))}
        <input
          onKeyPress={(e) => handleChange(e)}
          name='minJdSalary'
          placeholder='Add and press Enter'
        />
      </div>
      <button onClick={handleSubmit}>Apply Filters</button>
    </div>
  )
}

export default FilterComponent
