import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      { ...rest }
      component={ (props) => (
        ( isLoggedIn )
        ? ( <Redirect to="/" /> )
        : ( <Component { ...props } /> )
      )}
    />
  );
}

export default PublicRoute;

PublicRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};