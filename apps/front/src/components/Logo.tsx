import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Logo() {
  const [flag, setFlag] = useState<boolean>(true);

  function handleClick() {
    setFlag(!flag);
  }

  return (
    <div>
      {flag ? (
        <FontAwesomeIcon icon={faDharmachakra} spin size="2x" onClick={handleClick} />
      ) : (
        <FontAwesomeIcon
          icon={faDharmachakra}
          spin
          spinReverse
          size="2x"
          onClick={handleClick}
        />
      )}
    </div>
  );
}
