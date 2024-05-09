import { useState } from 'react';

const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [],
  );
  return (
    <>
      <div>hello</div>
    </>
  );
};

export default App;

