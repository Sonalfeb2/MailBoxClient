import { Card, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewMsg = () => {
  const content = useSelector(state => state.sideBarList.viewContent);
  return (
    <Card>
      <Card.Header>
        {content.active[0].name === "sentbox"
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
        {content.active[0].name !== "sentbox" &&
          <Row>
            <Button variant="primary" size="xs">
              R
            </Button>
            <Button variant="primary" size="xs">
              F
            </Button>
          </Row>}
      </Card.Body>
    </Card>
  );
};
export default ViewMsg;
