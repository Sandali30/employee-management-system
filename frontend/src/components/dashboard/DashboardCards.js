import "./DashboardCards.css";
import {
    FaUsers,
    FaCalendarCheck,
    FaMoneyCheckAlt,
    FaPlaneDeparture
} from "react-icons/fa";

const DashboardCards = ({ statistics }) => {

    const cards = [
        {
            title: "Employees",
            value: statistics?.totalEmployees ?? "-",
            icon: <FaUsers />,
            color: "#2563eb"
        },
        {
            title: "Active",
            value: statistics?.activeEmployees ?? "-",
            icon: <FaCalendarCheck />,
            color: "#16a34a"
        },
        {
            title: "Inactive",
            value: statistics?.inactiveEmployees ?? "-",
            icon: <FaPlaneDeparture />,
            color: "#ea580c"
        },
        {
            title: "HR Managers",
            value: statistics?.hrManagers ?? "-",
            icon: <FaMoneyCheckAlt />,
            color: "#9333ea"
        }
    ];

    return (

        <div className="dashboard-cards">

            {cards.map((card) => (

                <div
                    className="dashboard-card"
                    key={card.title}
                >

                    <div
                        className="card-icon"
                        style={{
                            background: card.color
                        }}
                    >
                        {card.icon}
                    </div>

                    <div>

                        <h4>{card.title}</h4>

                        <h2>{card.value}</h2>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default DashboardCards;
