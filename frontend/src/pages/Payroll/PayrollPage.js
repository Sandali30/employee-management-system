import { useCallback, useEffect, useState } from "react";

import {
    getPayrolls
} from "../../services/payrollService";

import PayrollToolbar from "../../components/payroll/PayrollToolbar";
import PayrollTable from "../../components/payroll/PayrollTable";

const PayrollPage = () => {

    const [payrolls, setPayrolls] = useState([]);
    const [search, setSearch] = useState("");

    const loadPayrolls = useCallback(async () => {

        try {

            const res = await getPayrolls(search);

            setPayrolls(res.data.payrolls);

        }

        catch (err) {

            console.log(err);

        }

    }, [search]);

    useEffect(() => {

        loadPayrolls();

    }, [loadPayrolls]);

    return (

        <>

            <PayrollToolbar
                search={search}
                setSearch={setSearch}
            />

            <PayrollTable
                payrolls={payrolls}
            />

        </>

    );

};

export default PayrollPage;
