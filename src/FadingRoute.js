import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import './index.css';

const FadingRoute = ({comp: Comp, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      <CSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <Comp {...props} />
      </CSSTransitionGroup>
    )}
  />
);

export default FadingRoute;
