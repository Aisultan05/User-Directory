import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserModal = ({ show, user, onHide }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`${user.first_name} ${user.last_name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={user.avatar}
          className="img-fluid mb-3"
          alt={`${user.first_name} ${user.last_name}`}
        />
        <p><strong>Email:</strong> {user.email}</p>
        {/* Добавьте дополнительные данные если будет нужно */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
