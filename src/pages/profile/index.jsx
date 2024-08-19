import { Button, Col, message, Row, Skeleton, Tooltip, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.css';
import { useEffect, useState } from 'react';
import Avatar from './components/avatar';
import { delay, isArray } from '../../utils/utils';
import DetailItem from './components/item';
import Repo from './components/repo';
import Editor from './components/editor';
import { getItem, MOCK_PROFILE_ID, openDb, updateItem } from '../../utils/indexed-db';

const extraKeys = ['company', 'location', 'email', 'website', 'socials'];

function Index() {
  const [state, setState] = useState('preview');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(undefined);
  const [messageApi, contextHolder] = message.useMessage();

  const loadItems = async () => {
    const profileStore = await getItem(MOCK_PROFILE_ID);
    setProfile(profileStore);
  };

  useEffect(() => {
    const initializeDb = async () => {
      await openDb();
      await loadItems();
    };

    initializeDb();
  }, []);

  const { repos = [] } = profile ?? {};

  const onValueChange = async (value) => {
    try {
      setLoading(true);
      const newProfile = { ...profile, ...value };
      // mock fetch api
      await delay();
      await updateItem(newProfile);
      setProfile(newProfile);
      setState('preview');
      setLoading(false);
      messageApi.open({
        type: 'success',
        content: '更新成功',
      });
    } catch (e) {
      messageApi.open({
        type: 'success',
        content: '更新失败，请稍后重试',
      });
    }
  };

  if (!profile) {
    return <Skeleton loading active avatar />;
  }
  return (
    <>
      {contextHolder}
      <div className="wrapper">
        <Row>
          <Col md={24} lg={8} xl={7}>
            <div className="base-info">
              <div className="avatar">
                <Avatar />
              </div>
              {state === 'preview' ? (
                <div className="profile-editor-area">
                  <div className="base-profile">
                    <Tooltip title={profile.name}>
                      <span className="name">{profile.name}</span>
                    </Tooltip>
                    <div className="bio">
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 3,
                        }}>
                        {profile.bio}
                      </Typography.Paragraph>
                    </div>
                  </div>
                  <div className="preview">
                    <Button onClick={() => setState('edit')}>Edit Profile</Button>
                    <div className="follow-info">
                      <UserOutlined />
                      <div className="follow-data">
                        <span className="followers">
                          <span className="count">4</span> followers
                        </span>
                        <span className="following">
                          <span className="count">1</span> following
                        </span>
                      </div>
                    </div>
                    <div className="extra-data">
                      {extraKeys.map((key) => {
                        if (Object.prototype.hasOwnProperty.call(profile, key)) {
                          if (isArray(profile[key])) {
                            return profile[key].map((item) => <DetailItem key={item} data={item} />);
                          }
                          return <DetailItem key={key} property={key} data={profile} />;
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Editor
                  loading={loading}
                  value={profile}
                  valueChange={(value) => onValueChange(value)}
                  onCancel={() => setState('preview')}
                />
              )}
            </div>
          </Col>
          <Col md={24} lg={16} xl={17}>
            <div className="repos">Popular repositories</div>
            <Row gutter={[16, 16]}>
              {repos.map((repo) => (
                <Col key={repo.url} md={24} lg={12} style={{ width: '100%' }}>
                  <Repo repo={repo} loading={loading} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Index;
