// State & Context
import { useState, useContext } from 'react';
import userContext from '../../Context/userContext';

// SVG Import
import { ReactComponent as AddSVG } from '../../Styles/svg/add.svg';

import { uid } from 'uid';

const AddWorkDone = () => {
  const { user, fetchWorkdones } = useContext(userContext);
  const { token } = user;

  const fetchAddWorkdones = async (workdoneid, workdonetext) => {
    const str = `Bearer ${token}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: str,
      },
      body: JSON.stringify({ workdoneid, workdonetext }),
    };
    await fetch(`http://localhost:1212/workdone/add`, requestOptions);
  };

  const [work, setwork] = useState('');
  const onChange = e => {
    setwork(e.target.value);
  };

  const onClick = async e => {
    if (!e.key || (e.key && e.key === 'Enter')) {
      const id = uid();
      await fetchAddWorkdones(id, work);
      setwork('');
      await fetchWorkdones(token);
    }
  };

  return (
    <div className="addInput">
      <input
        className="addInput__input"
        onChange={e => onChange(e)}
        onKeyPress={e => onClick(e)}
        type="text"
        value={work}
        placeholder="Add New Work Done"
      />
      <button className="button" onClick={e => onClick(e)}>
        <AddSVG />
      </button>
    </div>
  );
};

export default AddWorkDone;
