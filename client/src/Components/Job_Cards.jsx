import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Components_CSS/Job_Cards.css';
import calender from '../Components_CSS/calendar.svg';
import Indian_rupee from '../Components_CSS/Indian_rupee.svg';
import map_pin from '../Components_CSS/map_pin.svg'
import { useNavigate } from 'react-router-dom';
const Job_Cards=({Title,subTitle,item1,item2,item3})=>{
    const navigate=useNavigate();
    return(
        <div>
            <Card className="Cards">
            <Card.Body>
                <Card.Title className="head">{Title}</Card.Title>
                <Card.Subtitle>{subTitle}</Card.Subtitle>
                <Card.Text><img src={map_pin} style={{width:"12px", height:"12px"}}/>&nbsp; &nbsp;{item1}</Card.Text>
                <Card.Text><img src={Indian_rupee} style={{width:"12px", height:"12px",fill:"white"}}/>&nbsp; &nbsp;{item2}</Card.Text>
                <Card.Text className="Last"><img src={calender} style={{width:"12px", height:"12px"}}/>&nbsp; &nbsp;{item3}</Card.Text>
                <Button onClick={()=>{
                    localStorage.setItem('jobTitle',Title);
                    navigate('/job-info');
                    }}>Apply Now</Button>
            </Card.Body>
            </Card>
        </div>
    );
};
export default Job_Cards;