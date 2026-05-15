'use client';

import { IconButton, Input, InputAddon } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';

export const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Input
        {...props}
        ref={ref}
        type={show ? 'text' : 'password'}
        pr="40px"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        style={{
          position: 'absolute',
          right: '2px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#888',
          fontSize: '12px',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-inter)',
        }}
        tabIndex={-1}
      >
        {show ? 'OCULTAR' : 'MOSTRAR'}
      </button>
    </div>
  );
});
