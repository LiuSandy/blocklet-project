import { EnvironmentOutlined, LinkOutlined, MailOutlined, NumberOutlined } from '@ant-design/icons';

const useIcon = (type = '') => {
  if (!type) return null;

  if (type === 'email') {
    return <MailOutlined />;
  }
  if (type === 'company') {
    return <NumberOutlined />;
  }
  if (type === 'location') {
    return <EnvironmentOutlined />;
  }
  return <LinkOutlined />;
};

export default useIcon;
