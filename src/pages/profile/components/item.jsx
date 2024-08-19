import PropTypes from 'prop-types';
import { Flex } from 'antd';
import { getItemTypeByKey } from '../../../utils/utils';
import useIcon from '../hooks/use-icon';
import useLinkTag from '../hooks/use-link-tag';

function DetailItem(props) {
  const { data, property = '' } = props;
  const type = getItemTypeByKey(property);
  const Icon = useIcon(type);
  const linkTag = useLinkTag(type, !property ? data : data[property]);

  return (
    <Flex gap="small" align="center">
      {Icon}
      {linkTag}
    </Flex>
  );
}

DetailItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  property: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default DetailItem;
