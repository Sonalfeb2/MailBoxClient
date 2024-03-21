import { Card, Button, Row ,Col} from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewMsg = () => {
  const content = useSelector(state => state.sideBarList.viewContent);
  return (
    <Card>
      <Card.Header>
        {content.active[0].name === "Sentbox"
          ? <p>
              To:{content.to}
            </p>
          : <p>
              from- {content.from}
            </p>}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {content.subject}
        </Card.Title>
        <Card.Text>
          {content.content}
        </Card.Text>
        {content.active[0].name !== "Sentbox" &&
          <Row xs="auto">
            <Col>
              <Button variant="primary">R</Button>
            </Col>
            <Col>
              <Button variant="primary">F</Button>
            </Col>
          </Row>}
      </Card.Body>
    </Card>
  );
};
export default ViewMsg;
