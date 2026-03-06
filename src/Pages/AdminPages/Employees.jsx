import EmployeeTable from "../../components/AdminComponents/Employees/EmployeesTable";

export default function Employees() {
    return (
        <section>
            <div className="mb-8">
                <h1 className="text-4xl font-normal text-neutral-800 mb-2">Employees</h1>
            </div>
            <EmployeeTable />
        </section>
    )
}