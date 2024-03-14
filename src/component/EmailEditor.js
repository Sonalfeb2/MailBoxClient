
import {Modal, Button,Form ,Row, Col}from 'react-bootstrap';
import EditContainer from './EditContainer';
function EmailEditor({show ,onHide}) {

  return (
    <>

      <Modal
      
      size="xl"
        show={show}
        onHide={onHide}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title className='w-100'>
          <Form.Group as={Row}>
        <Col sm="12">
          <Form.Control type="text" placeholder='To' className='border-0'/>
        </Col>
      </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Header>

        <Modal.Title className='w-100'>
            
      <Form.Group as={Row}>
        <Col sm="12">
          <Form.Control type="text" placeholder='Subject'className='border-0' />
        </Col>
      </Form.Group>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <EditContainer/>
        
        {/* <Form.Control as="textarea" rows={12} className='border-0' placeholder='write your mail here...'/> */}
      
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="primary">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmailEditor;