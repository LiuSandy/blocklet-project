import { useState } from 'react';
import { Col, Row } from 'antd';
import './index.css';
import { BackwardOutlined, PhoneOutlined } from '@ant-design/icons';

const datasource = [
  {
    mainChar: '1',
    subChar: '',
  },
  {
    mainChar: '2',
    subChar: 'ABC',
  },
  {
    mainChar: '3',
    subChar: 'DEF',
  },
  {
    mainChar: '4',
    subChar: 'CHI',
  },
  {
    mainChar: '5',
    subChar: 'JKL',
  },
  {
    mainChar: '6',
    subChar: 'MON',
  },
  {
    mainChar: '7',
    subChar: 'PQRS',
  },
  {
    mainChar: '8',
    subChar: 'TUV',
  },
  {
    mainChar: '9',
    subChar: 'WXYZ',
  },
  {
    mainChar: '*',
    subChar: '',
  },
  {
    mainChar: '0',
    subChar: '+',
  },
  {
    mainChar: '#',
    subChar: '',
  },
];

function Phone() {
  const [data] = useState(datasource);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastClicked, setLastClicked] = useState({
    key: null,
    clickCount: 0,
    timeStamp: 0,
  });
  const onClickNumber = (item, event) => {
    const clickKey = item.mainChar;
    if (clickKey !== lastClicked.key || !item.subChar) {
      setLastClicked({
        key: clickKey,
        clickCount: 1,
        timeStamp: event.timeStamp,
      });
      setPhoneNumber(phoneNumber + item.mainChar);
    } else {
      const { timeStamp } = event;
      if (timeStamp - lastClicked.timeStamp < 500) {
        const count = lastClicked.clickCount + 1;
        setLastClicked({
          key: clickKey,
          clickCount: count,
          timeStamp: event.timeStamp,
        });
        // count: 1 2 3 4 5 6
        // 余数    3 2 1 0 1 2
        // index  0 1 2 3 0 1 2
        const index = (count - 1) % (item.subChar.length + 1);

        const char = (item.mainChar + item.subChar)[index];
        const number = phoneNumber.slice(0, phoneNumber.length - 1) + char;
        setPhoneNumber(number);
      } else {
        setLastClicked({
          key: clickKey,
          clickCount: 0,
          timeStamp: event.timeStamp,
        });
        setPhoneNumber(phoneNumber + item.mainChar);
      }
    }
  };

  const onRemove = () => {
    if (phoneNumber) {
      const newPhoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
      setPhoneNumber(newPhoneNumber);
    }
  };
  return (
    <div className="container">
      <div className="display">{phoneNumber}</div>
      <div className="enter">
        <Row gutter={[16, 16]}>
          {data.map((item) => {
            return (
              <Col key={item.mainChar} className="col-item" span={8}>
                <div className="item" onClick={(event) => onClickNumber(item, event)}>
                  <span className="main-char">{item.mainChar}</span>
                  <span className="sub-char">{item.subChar}</span>
                </div>
              </Col>
            );
          })}
          <Col className="col-item" span={8} offset={8}>
            <div className="confirm">
              <PhoneOutlined />
            </div>
          </Col>
          <Col className="col-item" span={8}>
            <div className="remove" onClick={() => onRemove()}>
              <BackwardOutlined />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Phone;
