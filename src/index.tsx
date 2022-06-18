import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(<div style={{ backgroundColor: 'red' }}>Hello World</div>);
