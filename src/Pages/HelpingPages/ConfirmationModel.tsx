import React, { useState } from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show Confirmation</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

