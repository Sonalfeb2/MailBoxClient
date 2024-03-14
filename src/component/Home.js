import { Button } from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
const Home = () => {
    
  const [show, setShow] = useState(false);
  return <h1>Welcome to Mail Box - 
    <Button variant="primary" onClick={() => setShow(true)}>Send a Mail</Button>
    <EmailEditor show={show} onHide={()=>setShow(false)}/>
  </h1>;
};
export default Home
