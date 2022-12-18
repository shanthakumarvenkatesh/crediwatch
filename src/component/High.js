import React, { useState } from 'react';
import data from './data';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const [inputdata, setInputdata] = useState('');
  const [currentParties, setCurrentParties] = useState(1);
  const [partiesPerPage, setPartiesPerPage] = useState(10);
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(false);
  const parties = data.data;
let highParties = parties
  .filter((data) => {
    return data.score > 10;
  })
  .map((data) => {
    return data;
  });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const handleChange = (e) => {
    e.preventDefault();
    setInputdata(e.target.value);
  };
  const handleNumber = (e) => {
    e.preventDefault();
    setPartiesPerPage(e.target.value);
  };

  const colorChange = (value) => {
    let ui = '';
    if (value === 0 || value === 'NA') {
      ui = (
        <div
          style={{
            backgroundColor: '#E1E5E9',
            padding: '3px 5px 3px 10px',
            color: 'black',
          }}
        >
          {'NA'}
        </div>
      );
    } else if (value <= 5) {
      ui = (
        <div
          style={{
            backgroundColor: '#69C97C',
            padding: '3px 5px 3px 10px',
            color: 'white',
          }}
        >
          {'Low'}
        </div>
      );
    } else if (value <= 10) {
      ui = (
        <div
          style={{
            backgroundColor: '#F2A639',
            padding: '3px 5px 3px 10px',
            color: 'white',
          }}
        >
          {'Medium'}
        </div>
      );
    } else if (value <= 15) {
      ui = (
        <div
          style={{
            backgroundColor: '#ED585D',
            padding: '3px 5px 3px 10px',
            color: 'white',
          }}
        >
          {'High'}
        </div>
      );
    }
    return ui;
  };

  const indexofLastParty = currentParties * partiesPerPage;
  const indexofFirstParty = indexofLastParty - partiesPerPage;
  const currentparties = parties.slice(indexofFirstParty, indexofLastParty);


 

  window.onload = () => {
    var selectAge = document.getElementById('selectAge');
    var contents;

    for (let i = 0; i <= highParties.length; i++) {
      contents += '<option>' + i + '</option>';
    }

    selectAge.innerHTML = contents;
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentparties[index].display_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li>
            <b>Financial Score: </b>
            {currentparties[index].financial_risks.score}
          </li>
          <li>
            <b>business_type: </b>
            {currentparties[index].non_financial_risks.business_type}
          </li>
          <li>
            <b>Override </b>
            {currentparties[index].override.label}
          </li>
          <li>
            <b>Overall Score: </b>
            {currentparties[index].score}
          </li>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <section>
        <div className='container'>
          <div className='row mb-4'>
            <div className='col-lg-2 mb-lg-0 mb-3 align-self-center'>
              <span className='fw-bold'>Show</span>{' '}
              <select
                name='age'
                id='selectAge'
                onChange={handleNumber}
                className=''
              ></select>
              <span className='fw-bold'> entries</span>
            </div>
            <div className='col-lg-8'></div>
            <div className='col-lg-2 float-end'>
              <span className='ml-4'>
                <input
                  type='text'
                  placeholder='Search for party'
                  onChange={handleChange}
                  className='form-control'
                ></input>
              </span>
            </div>
          </div>

          <div className='table-responsive'>
            <table className='table'>
              <thead className='bg-header'>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Finance</th>
                  <th>Public</th>
                  <th>Private</th>
                  <th>OverAll</th>
                </tr>
              </thead>
              <tbody>
                {highParties.map((tableData, i) => {
                  let display = tableData.display_name.toLocaleLowerCase();
                  if (display.includes(inputdata) || inputdata === '') {
                    return (
                      <>
                        <tr key={i} className='align-middle'>
                          <th>
                            <button
                              onClick={(event) => {
                                setIndex(i);
                                handleShow();
                              }}
                              className='btn btn-transparent fw-bold fs-4'
                            >
                              +
                            </button>
                          </th>
                          <th className='align-middle text-blue'>
                            {tableData.display_name}
                          </th>
                          <td>
                            {colorChange(tableData.financial_risks.score)}
                          </td>
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
          </div>
          <div className='d-flex justify-content-between flex-lg-row flex-column'>
            <p id='hidden' className='mb-0 fw-bold mt-3 mt-lg-0 mb-3 mb-lg-0'>
              Displaying {highParties.length} parties in {parties.length}
            </p>
            <div className='overflow-scroll'></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
