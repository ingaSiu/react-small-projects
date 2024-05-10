import { useState } from 'react';

const App = () => {
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [],
  );

  const eventForDate = (date) => {
    events.find((e) => e.date === date);
  };
  return (
    <>
      <div>hello</div>
    </>
  );
};

export default App;

