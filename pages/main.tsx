import React from 'react';
import {createRoot} from 'react-dom/client';
import ClubDashboard from '../app/club-dashboard';
import '../app/globals.css';

createRoot(document.getElementById('root')!).render(<ClubDashboard/>);
