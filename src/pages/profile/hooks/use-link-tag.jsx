import { Tooltip } from 'antd';

const useLinkTag = (type, value) => {
  if (type === 'website') {
    return (
      <Tooltip title={value}>
        <a className="plain-txt" href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      </Tooltip>
    );
  }
  if (type === 'email') {
    const href = `mailto:${value}`;
    return (
      <Tooltip title={value}>
        <a className="plain-txt" href={href}>
          {value}
        </a>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  );
};

export default useLinkTag;
