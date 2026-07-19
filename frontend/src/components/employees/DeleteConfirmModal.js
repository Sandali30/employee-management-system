import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({
    open,
    onClose,
    onConfirm,
    employee
}) => {

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>Delete Employee</h2>

                <p>

                    Are you sure you want to delete

                    <strong> {employee?.name}</strong>?

                </p>

                <div className="delete-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteConfirmModal;