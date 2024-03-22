import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import { DateTime } from "luxon";
const ViewMsg = () => {
  const content = useSelector(state => state.sideBarList.viewContent);
  return (
    <Card>
      <Card.Header>
        {content.active[0].name === "Sentbox"
          ? <div>
              {`<${content.from}>`}
              <div>
                To: {content.to}
              </div>
            </div>
          : <div>
              {`<${content.from}>`}
              <div>To: YOU</div>
            </div>}
      </Card.Header>
      <Card.Body>
        <div style={{textAlign:'right'}}>
          {DateTime.fromISO(content.date).toFormat("MMMM/dd/yyyy")}
        </div>
        <Card.Title>
          {content.subject}
        </Card.Title>
        <Card.Text>
          {content.content}
        </Card.Text>

        <Row xs="auto">
          <Col>
            <Button variant="outline-secondary">
              {" "}<i className="fa fa-regular fa-reply" /> Reply
            </Button>
          </Col>
          <Col>
            <Button variant="outline-secondary">
              <i className=" fa fa-regular fa-share" /> Forward
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default ViewMsg;
