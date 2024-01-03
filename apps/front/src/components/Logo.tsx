import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Logo() {
  const [flag, useFlag] = useState<boolean>(true);

  function handleClick() {
    useFlag(!flag);
  }
  return (
    <>
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
    </>
  );
}
