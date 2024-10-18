import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [showContent, setShowContent] = useState(false);

  const toggleShowContent = () => {
    setShowContent(!showContent);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleShowContent
    };
  });

  return <>
    {!showContent && <button onClick={toggleShowContent}>{buttonLabel}</button>}
    {showContent && <div>
      {children}
      <button onClick={toggleShowContent}>cancel</button>
    </div>}
  </>;
});

Togglable.displayName = 'Togglable';

export default Togglable;