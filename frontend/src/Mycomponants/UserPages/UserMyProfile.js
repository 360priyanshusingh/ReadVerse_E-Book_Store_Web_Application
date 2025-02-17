import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus, &:valid {
    border-color: #9b59b6;
  }
`;

const GenderDetails = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Category = styled.div`
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
`;



const UserMyProfile = () => {
   
    const [user,setUser]=useState([])
  
    const navigate=useNavigate()
  
    // Function to handle form submission
    useEffect(()=>{
      axios.get(`http://localhost:5000/user/getUser`)
      .then((result)=>{
          console.log(result)
        if(result.data.message==="We get all user"){
          setUser(result.data.result)
        }

      }).catch((error)=>{
        console.log(error)
      })
    },[])

      const handleSubmit = async (event) => {
          event.preventDefault();
          navigate("/updateUserProfile")
         
        }
  
        const [showUsername, setShowUsername] = useState(false);

        const toggleUsernameVisibility = () => {
         setShowUsername(!showUsername)
        };
        const [showNumber, setShowNumber] = useState(false);
       
        const toggleNumberVisibility = () => {
            setShowNumber(!showNumber);
        };
        const [adharNumber, setAdharShowNumber] = useState(false);
       
        const toggleAdharNumberVisibility = () => {
         setAdharShowNumber(!adharNumber);
        };
       


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20vh"}} >
     <Center style={{padding:"20px"}} > <Title> My Profile </Title> </Center>
      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details"> <h3>Image   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <Image
                             borderRadius='full'
                             boxSize='100px'
                             src={`http://localhost:5000/images/${user?.pic}`}
                             alt={user?.fname}
                             /></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>First Name   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{user?.fname}</h5></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Last Name   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{user?.lname}</h5></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Email  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 > {showUsername ? user?.email : "*******"}
                    <FontAwesomeIcon
                      icon={showUsername? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleUsernameVisibility()}
                      style={{margin:'2px'}}
                    /> </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Mobile Number  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5  > {showNumber ? user?.contact : "*******"}
                    <FontAwesomeIcon
                      icon={showNumber? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleNumberVisibility()}
                      style={{margin:'2px'}}
                    /> </h5>
                    </span>
            </InputBox>



          </UserDetails>

        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Update Profile
</button>

</div>
      </div>
    </Container>
    </div>
  );
}
export default UserMyProfile;
