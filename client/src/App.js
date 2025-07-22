import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Row, Col, DatePicker } from "antd";
import ShiftForm from "./components/ShiftForm";
import ShiftTable from "./components/ShiftTable";
import { shiftAPI, employeeAPI } from "./services/api";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    fetchShifts();
    fetchEmployees();
  }, []);

  const fetchShifts = () => {
    shiftAPI.getAll().then((res) => setShifts(res.data));
  };

  const fetchEmployees = () => {
    employeeAPI.getAll().then((res) => setEmployees(res.data));
  };

  const handleShiftAdded = (newShift) => {
    setShifts((prev) => [...prev, newShift]);
  };

  const filteredShifts = filterDate
    ? shifts.filter((shift) => shift.date === filterDate.format("YYYY-MM-DD"))
    : shifts;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#fff", padding: "0 24px" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          Shift Management
        </Title>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Row gutter={[16, 16]} align="stretch">
          <Col xs={24} md={24} lg={8}>
            <Card
              title="Assign Shift"
              style={{
                marginBottom: "24px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              bodyStyle={{ flex: 1 }}
            >
              <ShiftForm onShiftAdded={handleShiftAdded} />
            </Card>
          </Col>
          <Col xs={24} md={24} lg={16}>
            <Card
              title="Shift Assignments"
              extra={
                <DatePicker
                  placeholder="Filter by date"
                  onChange={setFilterDate}
                  allowClear
                />
              }
              style={{ height: "100%" }}
            >
              <ShiftTable shifts={filteredShifts} employees={employees} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
