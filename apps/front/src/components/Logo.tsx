import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTired } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

export default function Logo() {
  const [flag, useFlag] = useState<boolean>(true);

  function handleClick() {
    useFlag(!flag);
  }
  return (
    <>
      {flag ? (
        <FontAwesomeIcon icon={faBiohazard} spin size="xl" onClick={handleClick} />
      ) : (
        <FontAwesomeIcon
          icon={faBiohazard}
          spin
          spinReverse
          size="xl"
          onClick={handleClick}
        />
      )}
    </>
  );
}
