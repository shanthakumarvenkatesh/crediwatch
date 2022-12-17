import React, { useState } from 'react';
import data from './data';
import Pagination from './Pagination';

const Home = () => {
  const [inputdata, setInputdata] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const posts = data.data;

  const handleChange = (e) => {
    e.preventDefault();
    setInputdata(e.target.value);
  };
  const handleNumber = (e) => {
    e.preventDefault()
    setPostsPerPage(e.target.value);
  }

  const colorChange = (value) => {
    let ui = '';
    if (value === 0 || value === 'NA') {
      ui = <div style={{ backgroundColor: 'grey' }}>{'NA'}</div>;
    } else if (value <= 5) {
      ui = <div style={{ backgroundColor: 'green' }}>{'Low'}</div>;
    } else if (value <= 10) {
      ui = <div style={{ backgroundColor: 'yellow' }}>{'Medium'}</div>;
    } else if (value <= 15) {

      ui = <div style={{ backgroundColor: 'red' }}>{'High'}</div>;
      
    }
    return ui;
  };

  const indexofLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexofLastPost - postsPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }



  window.onload = () => {
  var selectAge = document.getElementById('selectAge');
  var contents;

    for (let i = 0; i <= posts.length; i++) {

    contents += '<option>' + i + '</option>';
  }

  selectAge.innerHTML = contents;
}


  return (
    <>
      <div className='btn-group' role='group' aria-label='Basic example'>
        <button type='button' className='btn btn-secondary'>
          All
        </button>
        <button type='button' className='btn btn-secondary'>
          High Risk <span>3</span>
        </button>
        <button type='button' className='btn btn-secondary'>
          Medium Risk<span>46</span>
        </button>
        <button type='button' className='btn btn-secondary'>
          Low Risk<span>50</span>
        </button>
      </div>
      <span>show</span>{' '}
      <select name='age' id='selectAge' onChange={handleNumber}></select>
      <span>entries</span>
      <span className='ml-4'>
        <label for='search'>search</label>
        <input type='text' placeholder='search' onChange={handleChange}></input>
      </span>
      <table className='table w-75'>
        <thead>
          <tr className='bg-primary'>
            <th></th>
            <th></th>
            <th>Finance</th>
            <th>Public</th>
            <th>Private</th>
            <th>OverAll</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((tableData, i) => {
            let display = tableData.display_name.toLocaleLowerCase();
            if (display.includes(inputdata) || inputdata === '') {
              return (
                <>
                  <tr key={i}>
                    <button>+</button>
                    <th>{tableData.display_name}</th>
                    <td>{colorChange(tableData.financial_risks.score)}</td>
                    <td id='non_financial'>
                      {colorChange(tableData.non_financial_risks.score)}
                    </td>
                    <td id='private'>
                      {colorChange(tableData.private_data_risks.score)}
                    </td>
                    <td id='total'>{colorChange(tableData.score)}</td>
                  </tr>
                </>
              );
            }
          })}
        </tbody>
      </table>
      <p>
        displaying {postsPerPage} parties in {posts.length}
      </p>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};

export default Home;
