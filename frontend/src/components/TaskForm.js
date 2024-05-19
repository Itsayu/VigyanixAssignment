import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TaskForm = ({ onCreateTask }) => {
  const [taskNumber, setTaskNumber] = useState('');
  const [estimateHours, setEstimateHours] = useState('');
  const [estimateNotes, setEstimateNotes] = useState('');

  const handleEstimateHoursChange = (e) => {
    let value = e.target.value;
    const regex = /^\d+(\.\d{0,2})?$/; // Allows up to 2 decimal places

    if (!regex.test(value)) {
      return;
    }

    const [integerPart, decimalPart] = value.split('.');

    if (decimalPart && decimalPart > 59) {
      value = (parseInt(integerPart) + 1).toString(); // Increment the integer part
    }

    setEstimateHours(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(taskNumber, estimateHours, estimateNotes);
    setTaskNumber('');
    setEstimateHours('');
    setEstimateNotes('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-2">
        <Col xs={12} md={4} className="mb-3">
          <Form.Group controlId="formTaskNumber">
            <Form.Label>Task Number</Form.Label>
            <Form.Control
              type="text"
              value={taskNumber}
              onChange={(e) => setTaskNumber(e.target.value)}
              placeholder="e.g., T1"
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Form.Group controlId="formEstimateHours">
            <Form.Label>Estimate Hours</Form.Label>
            <Form.Control
              type="text"
              value={estimateHours}
              onChange={handleEstimateHoursChange}
              placeholder="e.g., 1.59"
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Form.Group controlId="formEstimateNotes">
            <Form.Label>Estimate Notes</Form.Label>
            <ReactQuill
              value={estimateNotes}
              onChange={setEstimateNotes}
              theme="snow"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Create Task
      </Button>
    </Form>
  );
};

export default TaskForm;
