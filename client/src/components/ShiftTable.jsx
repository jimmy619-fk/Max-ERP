import { Table } from "antd";
import dayjs from "dayjs";

const ShiftTable = ({ shifts, employees }) => {
  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.name : "Unknown";
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (id) => getEmployeeName(id),
      responsive: ["sm"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["sm"],
    },
    {
      title: "Shift",
      render: (_, record) => (
        <div>
          <div>
            <strong>Employee:</strong>{" "}
            {record.Employee
              ? record.Employee.name
              : getEmployeeName(record.employeeId)}
          </div>
          <div>
            <strong>Date:</strong> {record.date}
          </div>
          <div>
            <strong>Type:</strong> {record.shiftType}
          </div>
          <div>
            <strong>Start:</strong> {dayjs(record.startTime).format("h:mm A")}
          </div>
          <div>
            <strong>End:</strong> {dayjs(record.endTime).format("h:mm A")}
          </div>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      responsive: ["sm"],
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => dayjs(text).format("h:mm A"),
      responsive: ["sm"], // Show from sm breakpoint (576px) and up
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => dayjs(text).format("h:mm A"),
      responsive: ["sm"], // Show from sm breakpoint (576px) and up
    },
  ];

  return (
    <Table
      dataSource={shifts}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      scroll={{ x: true }}
    />
  );
};

export default ShiftTable;
