import { Route, Routes } from 'react-router-dom';
import { Auth, NotFound, SignUp, LoginPage } from '../pages';

function NonAuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<LoginPage />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NonAuthRoute;
