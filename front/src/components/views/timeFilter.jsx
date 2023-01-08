import React from "react";
import { useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const TimeFilter = () => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);


  return (
    <>
      <RangePicker
        picker="month"
        value={value}
        onChange={(val) => {
          let cal = val[0].format("YYYY-MM-DD") + "_" + val[1].format("YYYY-MM-DD")
          setDates(cal);
        }}
      />
      <div id="time-filter-brush"></div>
    </>
  );
};

export default TimeFilter;
