import "./LeaveToolbar.css";

const LeaveToolbar = ({
    canApply,
    onApply
}) => {

    return (

        <div className="leave-toolbar">

            <h1>Leave Management</h1>

            {

                canApply &&

                <button
                    className="apply-btn"
                    onClick={onApply}
                >
                    Apply Leave
                </button>

            }

        </div>

    );

};

export default LeaveToolbar;