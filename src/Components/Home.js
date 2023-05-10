import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="homeMain p-1 d-flex justify-content-center flex-column">
        <div className='d-flex justify-content-between align-items-center mx-3'>
          <div className='w-50 m-5 codeIconDiv'>
            <h1><ion-icon className="icon" name="code-slash-outline"></ion-icon></h1>
          </div>
          <div className='w-50 m-4'>
            <h1 className='text-light m-5'>A New Way to Learn</h1>
            <p><h6>Best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</h6></p>
          </div>
        </div>
        <div className='m-5'>
          <Link to={"/SelectAll"} className='text-decoration-none text-white fs-5'>Start Learning <ion-icon name="chevron-forward-outline"></ion-icon></Link>
        </div>
      </div>
    </>
  )
}

export default Home
