import "./LeaveModal.css";
import { useState } from "react";

const LeaveModal = ({ open, onClose, onSave }) => {

    const [formData, setFormData] = useState({
        leaveType: "Casual",
        startDate: "",
        endDate: "",
        reason: ""
    });

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const saved = await onSave(formData);

        if (!saved) {
            return;
        }

        setFormData({
            leaveType: "Casual",
            startDate: "",
            endDate: "",
            reason: ""
        });

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Apply Leave</h2>

                <form onSubmit={handleSubmit}>

                    <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                    >

                        <option value="Casual">Casual</option>
                        <option value="Sick">Sick</option>
                        <option value="Earned">Earned</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Paternity">Paternity</option>
                        <option value="Loss of Pay">Loss of Pay</option>

                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        min={formData.startDate || new Date().toISOString().split("T")[0]}
                        required
                    />

                    <textarea
                        name="reason"
                        placeholder="Reason"
                        rows="4"
                        value={formData.reason}
                        onChange={handleChange}
                        minLength="5"
                        required
                    />

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            Apply
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default LeaveModal;
