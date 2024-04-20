import React from 'react';

interface CustomHelperTextProps {
    children: React.ReactNode | null;
}

const CustomHelperText: React.FC<CustomHelperTextProps> = ({ children }) => (
    <div style={{ color: 'red' , fontSize : 10}}>{children}</div>
);

export default CustomHelperText;