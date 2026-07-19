import { useEffect, useState } from "react";

import {
    getOrganizationTree
} from "../../services/organizationService";

import OrganizationTree from "../../components/organization/OrganizationTree";
import AssignManager from "../../components/organization/AssignManager";

const OrganizationPage = () => {

    const [organization, setOrganization] = useState([]);

    const loadTree = async () => {

        try {

            const res = await getOrganizationTree();

            setOrganization(res.data.organization);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadTree();

    }, []);

    return (

        <>

            <h1>Organization Hierarchy</h1>

            <AssignManager
                refresh={loadTree}
            />

            <OrganizationTree
                employees={organization}
            />

        </>

    );

};

export default OrganizationPage;