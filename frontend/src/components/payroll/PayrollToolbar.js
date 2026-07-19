import "./PayrollToolbar.css";

const PayrollToolbar = ({
    search,
    setSearch
}) => {

    return (

        <div className="payroll-toolbar">

            <h1>Payroll</h1>

            <input
                placeholder="Search Employee..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

    );

};

export default PayrollToolbar;