import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CompleteTaskModal = ({ visible, onClose, onSubmit, actualHours, setActualHours, finalNotes, setFinalNotes }) => {
  const handleActualHoursChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+(\.\d{0,2})?$/; // Allows up to 2 decimal places

    if (regex.test(value)) {
      setActualHours(value);
    }
  };

  const handleBlur = () => {
    const [integerPart, decimalPart] = actualHours.split('.');
    if (decimalPart && parseInt(decimalPart) > 59) {
      setActualHours((parseInt(integerPart) + 1).toString());
    }
  };

  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Complete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formActualHours">
            <Form.Label>Actual Hours</Form.Label>
            <Form.Control
              type="text"
              value={actualHours}
              onChange={handleActualHoursChange}
              onBlur={handleBlur}
              placeholder="e.g., 1.59"
              required
            />
          </Form.Group>
          <Form.Group controlId="formFinalNotes">
            <Form.Label>Final Notes</Form.Label>
            <ReactQuill
              value={finalNotes}
              onChange={setFinalNotes}
              theme="snow"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteTaskModal;
