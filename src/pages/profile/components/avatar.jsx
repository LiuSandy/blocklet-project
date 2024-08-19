import { Avatar as AntdAvatar } from 'antd';
import PropTypes from 'prop-types';
import useWindowSize from '../hooks/use-window-size';

// eslint-disable-next-line react/prop-types
function Avatar({ url = 'https://i.postimg.cc/fbQMLfnF/rust-logo.png' }) {
  const windowSize = useWindowSize(296);
  let size = 296;
  if (windowSize.width < 1200) {
    size = 180;
  }
  if (windowSize.width < 900) {
    size = 100;
  }
  return <AntdAvatar size={size} src={<img src={url} alt="avatar" />} />;
}

Avatar.prototype = {
  url: PropTypes.string,
};

export default Avatar;
