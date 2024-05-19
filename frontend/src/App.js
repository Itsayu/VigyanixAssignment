import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Navbar, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CompleteTaskModal from './components/CompleteTaskModal';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [actualHours, setActualHours] = useState('');
  const [finalNotes, setFinalNotes] = useState('');
  const [alert, setAlert] = useState(null);
  const [alertTimeout, setAlertTimeout] = useState(null); // New state to track alert timeout

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      showAlert({ type: 'danger', message: error.message });
    }
  };

  const handleCreateTask = async (taskNumber, estimateHours, estimateNotes) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', {
        taskNumber,
        estimateHours: parseFloat(estimateHours),
        estimateNotes
      });
      setTasks([...tasks, response.data]);
      showAlert({ type: 'success', message: 'Task created successfully' });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      showAlert({ type: 'danger', message: errorMessage });
    }
  };

  const handleCompleteTask = (task) => {
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleCompleteTaskSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${currentTask.taskNumber}`, {
        actualHours: parseFloat(actualHours),
        notes: finalNotes,
        completed: true
      });
      setTasks(tasks.map(t => t.taskNumber === currentTask.taskNumber ? { ...t, actualHours, notes: finalNotes, completed: true } : t));
      setIsModalVisible(false);
      setActualHours('');
      setFinalNotes('');
      showAlert({ type: 'success', message: 'Task completed successfully' });
    } catch (error) {
      showAlert({ type: 'danger', message: error.response.data.message });
    }
  };

  const showAlert = (alert) => {
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }
    setAlert(alert);
    const timeout = setTimeout(() => {
      setAlert(null);
    }, 3000); // Dismiss alert after 3 seconds
    setAlertTimeout(timeout);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4" style={{ paddingLeft: '4rem' }}>
        <Navbar.Brand>Task Manager</Navbar.Brand>
      </Navbar>
      <Container>
        {alert && (
          <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
            {alert.message}
          </Alert>
        )}
        <Row className="my-4">
          <Col>
            <TaskForm onCreateTask={handleCreateTask} />
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
          </Col>
        </Row>
        <CompleteTaskModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleCompleteTaskSubmit}
          actualHours={actualHours}
          setActualHours={setActualHours}
          finalNotes={finalNotes}
          setFinalNotes={setFinalNotes}
        />
      </Container>
      <footer className='footer'>
        <p className="text-center">Design & Developed by <a href="https://www.linkedin.com/in/itsayu">Ayush</a></p>
      </footer>
    </>
  );
};

export default App;
