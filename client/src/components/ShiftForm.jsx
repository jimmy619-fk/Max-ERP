import React from "react";
import {
  Form,
  Button,
  TimePicker,
  Select,
  Row,
  Col,
  message,
  DatePicker,
} from "antd";
import { shiftAPI, employeeAPI, apiUtils } from "../services/api";
import toast from "react-hot-toast";

const ShiftForm = ({ onShiftAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    employeeAPI
      .getAll()
      .then((res) => setEmployees(res.data))
      .catch((err) => message.error("Failed to fetch employees"));
  }, []);

  const onFinish = async (values) => {
    console.log("Form values:", values);
    try {
      setLoading(true);

      const payload = {
        employeeId: values.employeeId,
        startTime: values.timeRange[0].format("YYYY-MM-DDTHH:mm:ss"),
        endTime: values.timeRange[1].format("YYYY-MM-DDTHH:mm:ss"),
        shiftType: values.shiftType,
        date: values.date.format("YYYY-MM-DD"),
      };
      console.log("Payload:", payload);

      const response = await shiftAPI.create(payload);
      console.log("API Response:", response);

      if (response.data) {
        toast.success("Shift assigned successfully!");
        form.resetFields();
        if (onShiftAdded) onShiftAdded(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Failed to assign shift");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[12, 2]}>
        <Col xs={12} sm={12} md={8}>
          <Form.Item
            label="Employee"
            name="employeeId"
            rules={[{ required: true, message: "Please select employee" }]}
          >
            <Select placeholder="Select employee">
              {employees.map((emp) => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={8}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            label="Shift Type"
            name="shiftType"
            rules={[{ required: true, message: "Please select shift type" }]}
          >
            <Select placeholder="Select shift type">
              <Select.Option value="Morning">Morning</Select.Option>
              <Select.Option value="Evening">Evening</Select.Option>
              <Select.Option value="Night">Night</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            label="Shift Time"
            name="timeRange"
            rules={[{ required: true, message: "Please select time range" }]}
          >
            <TimePicker.RangePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start">
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Assign Shift
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ShiftForm;
