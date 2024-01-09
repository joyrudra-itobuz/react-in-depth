import Layout from './Layout/ProfileLayout';
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile';

export default function ProfileRouter() {
  return (
    <Layout>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<EditProfile />} />
      </Routes>
    </Layout>
  );
}
