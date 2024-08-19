import { Card, Flex } from 'antd';
import PropTypes from 'prop-types';
import { ForkOutlined, StarOutlined } from '@ant-design/icons';
import '../index.css';

function Repo({ repo = {} }) {
  const { title, url, tag, desc, type, start, fork } = repo;
  const cardStyle = {
    body: {
      padding: '16px',
      borderColor: 'rgb(208, 215, 222)',
    },
  };
  return (
    <Card styles={cardStyle}>
      <Flex vertical className="repo-container">
        <div className="repo-title">
          <span>
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </span>
          <span className="repo-type">{type}</span>
        </div>
        <p className="desc">{desc}</p>
        <Flex justify="flex-start" gap="middle" align="center">
          <span className="meta-item">
            <span className="badge" />
            {tag}
          </span>
          {start > 0 ? (
            <span className="meta-item">
              <StarOutlined />
              {start}
            </span>
          ) : null}
          {fork > 0 ? (
            <span className="meta-item">
              <ForkOutlined />
              {fork}
            </span>
          ) : null}
        </Flex>
      </Flex>
    </Card>
  );
}

Repo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  repo: PropTypes.object,
};

export default Repo;
