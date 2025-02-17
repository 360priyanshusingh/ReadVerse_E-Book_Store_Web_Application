import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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



const UpdateUserProfile = () => {
   

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [contact,setContact]=useState()
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [pic,setPic]=useState([])
    const navigate=useNavigate()
  
    // Function to handle form submission
      const handleSubmit = async (event) => {
          event.preventDefault();
  
          if(!pic || !fname|| !contact ||  !lname || !email){
            alert("Please fill all filds");
            return
          }
        
          const formData = new FormData();
          formData.append('fname', fname);
          formData.append('email', email);
          formData.append('pic', pic); // Pass the file object directly
          formData.append('contact', contact);
          formData.append('lname', lname);
          formData.append('password', password);
        
          console.log(formData);
        
          axios.put(`http://localhost:5000/user/updateProfile`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then((result) => {
              console.log(result.data.message);
              if (result.data.message=== "User successfully updated") {
                  navigate("/userMyProfile");
                  alert("User Successfully Updated");
              } else {
                  alert("User Not Update !");
              }
          })
          .catch((err) => {
              console.error(err);
              alert("Something went wrong");
          });
        }
  
  
      const handleImageChange = (event) => {
          const file = event.target.files[0];
          setPic(file);
      };
      
    //   const hendlClick2 = (e) => {
    //     setGender(e.target.value);
    // }

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/getUser`)
        .then((result)=>{
            console.log(result)
          if(result.data.message==="We get all user"){
            setPic(result.data.result.pic)
            setLname(result.data.result.lname)
            setFname(result.data.result.fname)
            setContact(result.data.result.contact)
            setPassword(result.data.result.password)
            setEmail(result.data.result.email)
      
          }
  
        }).catch((error)=>{
          console.log(error)
        })
      },[])


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20vh"}} >
         <Center style={{padding:"20px"}} > <Title>Update My Profile </Title> </Center>

      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details"> First Name</span>
              <Input type="text" placeholder="Enter your first name" value={fname} onChange={(e)=>setFname(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Last Name</span>
              <Input type="text" placeholder="Enter your last name" value={lname} onChange={(e)=>setLname(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Email</span>
              <Input type="password" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Phone Number</span>
              <Input type="text" placeholder="Enter your number" value={contact} onChange={(e)=>setContact(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Image</span>
              <Input type="file" placeholder="Enter your password" onChange={handleImageChange} required />
            </InputBox>
            <InputBox>
            <InputBox>
              <span className="details"> <Image
                             borderRadius='full'
                             boxSize='100px'
                             src={`http://localhost:5000/images/${pic}`}
                             alt={fname}
                             style={{ marginLeft:"80px"}}
                             /></span>
            </InputBox>
            </InputBox>
    
          </UserDetails>


        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Submit
</button>

</div>
      </div>
    </Container>
    </div>
  );
}
export default UpdateUserProfile;
