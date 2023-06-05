import React from "react";

function DateAndTime({ date }) {
  var d = new Date(date);
  //   console.log(d);
  const timing = JSON.stringify(d);
  //   console.log(timing);
  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const seconds = d.getSeconds();
  var newDate = date + "/" + month + "/" + year;
  //   var newDate =
  //     date + "/" + month + "/" + year + "-----" + "" + "" + hour + ":" + minute;
  //   console.log(newDate);

  return <>{newDate} </>;
}
export default DateAndTime;
