import "./EmployeeSearch.css";

const EmployeeSearch = ({ search, setSearch }) => {

    return (
        <div className="employee-search">

            <input
                type="text"
                placeholder="Search by ID, Name or Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>
    );

};

export default EmployeeSearch;