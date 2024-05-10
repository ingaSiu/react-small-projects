/* eslint-disable react/prop-types */
const Day = ({ day, onClick }) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  return (
    <div className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.event && <div className="event">{day.event.title}</div>}
    </div>
  );
};

export default Day;
