
import React from 'react';

export const Stethoscope: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 8v5a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V8"></path>
        <path d="M8 8V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6"></path>
        <path d="M13 17a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1"></path>
        <circle cx="20" cy="10" r="2"></circle>
    </svg>
);
