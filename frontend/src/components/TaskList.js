import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TaskList = ({ tasks, onCompleteTask }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th className='bg-primary text-light'>Task Number</th>
        <th className='bg-primary text-light'>Estimate Hours</th>
        <th className='bg-primary text-light'>Estimate Notes</th>
        <th className='bg-primary text-light'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>{task.taskNumber}</td>
          <td>{task.estimateHours}</td>
          <td dangerouslySetInnerHTML={{ __html: task.estimateNotes }} />
          <td style={{ textAlign: 'center' }}>
            <Button
              variant="success"
              onClick={() => onCompleteTask(task)}
              disabled={task.completed}
            >
              Complete Task
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TaskList;
