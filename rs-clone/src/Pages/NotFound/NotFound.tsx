import { Link } from 'react-router-dom';
import { Button } from '../../components';

import './NotFound.scss';

function NotFound() {
  return (
    <div className="NotFound">
      <p className="NotFound-code">404</p>
      <h1 className="NotFound-title">The page you are looking for is not exist</h1>

      <Link className="NotFound-link" to="/">
        <Button>Go to homepage</Button>
      </Link>
    </div>
  );
}

export default NotFound;
