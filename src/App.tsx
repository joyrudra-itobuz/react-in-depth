import './App.scss';
import Router from './Router';
import ProfileRouter from './pages/Profile/ProfileRouter';

// import '@mantine/core/styles.css';

// import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    // <MantineProvider>
    <>
      <Router />
    </>
    // </MantineProvider>
  );
}
