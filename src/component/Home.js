import { Button} from "react-bootstrap";
import EmailEditor from "./EmailEditor";
import { useState } from "react";
import Inbox from "./Inbox";
const Home = () => {
    
  const [show, setShow] = useState(false);
  return <div>Welcome to Mail Box - 
    <Button className="mx-2" variant="primary" onClick={() => setShow(true)}>Compose</Button>
    <Button variant="success">Inbox</Button>
    <EmailEditor show={show} onHide={()=>setShow(false)}/>
    <Inbox/>
  </div>;
};
export default Home
