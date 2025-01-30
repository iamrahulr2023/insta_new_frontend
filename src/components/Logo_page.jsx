import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { faMeta } from '@fortawesome/free-brands-svg-icons';
import './Logo_page.css';
import { Link , useNavigate} from 'react-router-dom';

const Logo_page = () => {

    const navigate = useNavigate();

    setTimeout(() => {
       navigate('login');
    }, 3000);
    
    return (
        <>
            <div className='box'>
           
            <FontAwesomeIcon className='ic' icon={faInstagram} />
            </div>
            <div className="box2">
                <p className='f'>From</p>
                <div className='box3'>             <FontAwesomeIcon className='ic2' icon={faMeta} />
  
                <p className='m'>Meta</p>
                </div>
                {/* <p><Link to="home">Our Team</Link></p> */}
            </div>
        </>
    );
};

export default Logo_page;
