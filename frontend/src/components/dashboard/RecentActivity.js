import "./RecentActivity.css";

const RecentActivity = ({ recentEmployees = [] }) => {

    const activities = recentEmployees.map((employee) => ({
        title: `${employee.name} joined ${employee.department}`,
        time: new Date(employee.joiningDate).toLocaleDateString()
    }));

    return (

        <div className="activity-card">

            <h2>Recent Activities</h2>

            {activities.length > 0 ? activities.map((activity, index) => (

                <div
                    key={index}
                    className="activity-item"
                >

                    <h4>{activity.title}</h4>

                    <p>{activity.time}</p>

                </div>

            )) : (

                <div className="activity-item">

                    <h4>No recent activity</h4>

                    <p>New employee activity will appear here</p>

                </div>

            )}

        </div>

    );

};

export default RecentActivity;
