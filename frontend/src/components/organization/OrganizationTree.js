const OrganizationTree = ({ employees }) => {

    const renderTree = (nodes) => {

        return (

            <ul>

                {

                    nodes.map((employee) => (

                        <li key={employee._id}>

                            <strong>{employee.name}</strong>

                            {" "}
                            ({employee.designation})

                            {

                                employee.children &&
                                employee.children.length > 0 &&
                                renderTree(employee.children)

                            }

                        </li>

                    ))

                }

            </ul>

        );

    };

    return renderTree(employees);

};

export default OrganizationTree;