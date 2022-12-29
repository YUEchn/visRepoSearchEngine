import { useState } from "react";
import { Typography } from "antd";
const { Paragraph } = Typography;

const ResultList = () => {
  const [rows, setRows] = useState(1);
  const [expandable, setExpandable] = useState(true);
  const [key, setKey] = useState(0);
  const [fold, setFold] = useState(true);
  const onExpand = () => {
    setFold(false);
  };
  const onCollapse = () => {
    setFold(true);
    setKey(key + 1);
  };

  const article =
    "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";
  return (
    <>
      <Paragraph
        key={key}
        ellipsis={{
          rows,
          // symbol: '111',
          expandable,
          expandable: true,
          onExpand: onExpand,
        }}
      >
        {article}
        {!fold && (
          <span className="value-collapse" onClick={onCollapse}>
            <a> 收起</a>
          </span>
        )}
      </Paragraph>
    </>
  );
};

export default ResultList;
