import React from 'react'
import {Link} from 'react-router-dom'
const Nav = () => {
  
  return (
    <div className=' overflow-scroll'>
      <div
        className='btn-group'
        role='group'
        aria-label='Basic example'
        style={{ whiteSpace: 'nowrap' }}
      >
        <Link to='/'>
          <button type='button' className='btn bg-grey text-white'>
            All
          </button>
        </Link>

        <Link to='/high'>
          <button
            id='high'
            onClick={high}
            type='button'
            className='btn btn-transparent'
          >
            High Risk <span className='badge bg-red rounded-pill'>3</span>
          </button>
        </Link>

        <Link to='/medium'>
          <button
            id='medium'
            onClick={medium}
            type='button'
            className='btn btn-transparent'
          >
            Medium Risk <span className='badge bg-orange rounded-pill'>46</span>
          </button>
        </Link>

        <Link to='/low'>
          <button
            id='low'
            onClick={low}
            type='button'
            className='btn btn-transparent'
          >
            Low Risk <span className='badge bg-yellow rounded-pill'>51</span>
          </button>
        </Link>
      </div>
    </div>
  );

  function high() {
    document.getElementById('high').style.backgroundColor = 'grey';
  }
  function medium() {
    document.getElementById('medium').style.backgroundColor = 'grey';
  }
  function low() {
    document.getElementById('low').style.backgroundColor = 'grey';
  }
}

export default Nav




