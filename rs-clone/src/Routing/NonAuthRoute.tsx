import { Route, Routes } from 'react-router-dom';
import { Auth, NotFound, SignIn, SignUp } from '../Pages';

function NonAuthRoute() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<SignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NonAuthRoute;
