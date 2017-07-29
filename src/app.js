import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, NavLink, Prompt, Redirect } from 'react-router-dom';
import FadingRoute from './FadingRoute';
import { withRouter } from 'react-router';

const CompoGenerator = (name) => {
  return ({match, location, history, className, ...other}) => { // eslint-disable-line no-unused-vars
    // console.log(match, location, history);
    return <div className={className}>{name}:{JSON.stringify(match)}</div>;
  };
};

const Hello = CompoGenerator('Hello');
const About = CompoGenerator('About');
const Home = CompoGenerator('Home');
const User = CompoGenerator('User');
const Fade = CompoGenerator('Fade');
const Whatever = CompoGenerator('Whatever');
const Redi = () => {
  return (
    <Redirect to="/user/jack" />
  );
};

class Game extends Component {
  sayHello() {
    console.log('hello');
  }
  render() {
    const {match, location, history} = this.props;
    return (
      <div style={{border: '1px solid green', padding: '5px'}}>
        <Prompt
          message={(location, action) => {
            console.log(action);
            return `Are you sure you want to go to ${location.pathname}?`;
          }}
          when={location.pathname === '/hello'}
        />
        <div>Game withRouter</div>
        <div>match:{JSON.stringify(match)}</div>
        <div>location:{JSON.stringify(location)}</div>
        <div>history:{JSON.stringify(history)}</div>
      </div>
    );
  }
}

const GameWithRouter = withRouter(Game);

class Test extends Component {
  componentWillUnmount() {
    const {history, location} = this.props;
    // notice: before unmount the history.location.pathname is already the next one. (because history is mutable).
    // but the location.pathname is still the old one (because location is immutable)
    console.log(history.location.pathname);
    console.log(location.pathname);
  }

  render() {
    if (this.props.a) {
      this.props.a = 2;
    }
    return (
      <div>Test</div>
    );
  }
}

class App extends Component {
  state = {
    value1: 1,
  }

  componentDidMount() {
    this.game.sayHello();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{display: 'flex'}}>
            <Link style={{width: '100px'}} to="/about">About</Link>
            <Link style={{width: '100px'}} to="/hello">Hello</Link>
            <NavLink style={{width: '100px'}} to="/home" activeClassName="active">Home</NavLink>
            <Link style={{width: '100px'}} to="/user">User</Link>
            <Link style={{width: '100px'}} to="/whatever">Whatever</Link>
            <Link style={{width: '100px'}} to="/redi">Redirect</Link>
            <Link style={{width: '100px'}} to="/test">test</Link>
          </div>
          <GameWithRouter wrappedComponentRef={(el) => this.game = el} />
          <Route path="/hello" component={Hello} />
          <Route path="/user/:username" component={User} />
          <Route path="/about" component={About} />
          <Route path="/home" component={Home} />
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/redi" component={Redi} />
          <Route
            path="/whatever" children={({match, location, history}) => (
              <Whatever
                className={match ? 'active' : ''}
                location={location}
                history={history}
                match={match}
              />
            )}
          />
          <FadingRoute comp={Fade} path="/fade" />
          <Route path="/test" component={Test} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById( 'app' ));

export default App;
