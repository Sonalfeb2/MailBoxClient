import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewMsg = () => {
  const content = useSelector(state => state.inboxList.viewContent);
  return (
    <Card>
      <Card.Header>
        from- {content.from}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {content.subject}
        </Card.Title>
        <Card.Text>
          {content.content}
        </Card.Text>
        <Button variant="primary" size="xs">
          R
        </Button>
        <Button variant="primary" size="xs">
          F
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ViewMsg;
