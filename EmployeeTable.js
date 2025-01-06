import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";

const EmployeeTable = ({ employees, editEmployee, deleteEmployee }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
  });

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Department", accessor: "department" },
      { Header: "Position", accessor: "position" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => deleteEmployee(row.original.id)}>Delete</button>
          </>
        ),
      },
    ],
    [deleteEmployee]
  );

  const data = React.useMemo(() => employees, [employees]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData(employee);
  };

  const handleSave = () => {
    editEmployee({ ...formData, id: editingId });
    setEditingId(null);
    setFormData({ name: "", department: "", position: "" });
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingId && (
        <div>
          <h3>Edit Employee</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
