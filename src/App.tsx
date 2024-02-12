import * as React from 'react';
import { AxesBlotter } from './AdaptableAgGrid';
import { IOConnectContext } from '@interopio/react-hooks';

function App() {
  const io = React.useContext(IOConnectContext);

  (window as any).io = io;

  return (
    <div className="selection:bg-green-900">
      <AxesBlotter></AxesBlotter>
    </div>
  );
}

export default App;
