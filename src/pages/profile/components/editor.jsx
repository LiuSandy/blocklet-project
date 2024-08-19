import { Button, Form, Input, Space, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../index.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Editor({ value, loading = false, valueChange, onCancel }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [form, value]);

  const onFinish = (values) => {
    valueChange(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <Input.TextArea placeholder="Add Bio" rows={4} />
        </Form.Item>
        <Form.Item label="Company" name="company">
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              type: 'url',
              message: 'Please enter a valid url address',
            },
          ]}
          label="Website"
          name="website">
          <Input />
        </Form.Item>
        <Form.Item label="Socials" name="socials">
          <Form.List label="Socials" name="socials">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Form.Item className="field-item" label="" required={false} key={field.key}>
                    <Form.Item
                      rules={[
                        {
                          type: 'url',
                          message: 'Please enter a valid url address',
                        },
                      ]}
                      {...field}
                      noStyle>
                      <Input placeholder="Link to social profile" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: '100%',
                    }}
                    icon={<PlusOutlined />}>
                    Add Social Link
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
          }}>
          <Space>
            <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
              Save
            </Button>
            <Button loading={loading} disabled={loading} onClick={() => onCancel()}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}

Editor.prototype = {
  value: PropTypes.object,
  loading: PropTypes.bool,
  valueChange: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Editor;
