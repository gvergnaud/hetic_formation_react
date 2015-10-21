# Prez React

récuperer le react transform boilerplate. => workflow hot swaping trop cool ;)
```
git clone https://github.com/gvergnaud/prez-react.git TutoReact
npm install
npm start
```

### déclarer un Composant React :

```js
import React, { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <div className="App">
        coucou maman
      </div>
    );
  }
}
```

Les nouveaux stateless Component (v 0.14+)

```js
import React from 'react';
const MyComponent = (props) => (
  <p>Je suis un composant sans états.</p>
);
export default MyComponent;
```

Note : il faut penser a import React, même si il est pas utilisé, sinon le jsx est pas parsé.

### Composer les components :

```js
import React, { Component } from 'react';
import MyComponent from './MyComponent';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <MyComponent {...propsObject} name={name} />
      </div>
    );
  }
}
```

### style guide
 https://github.com/Khan/style-guides/blob/master/style/react.md

En bref :

- lifecycle methode dans l'odre.
- les méthodes créées préfixées par `_` . exemple :   `_myMethode() {}`
- méthode render à la fin.

### Lifecycle
dans l'ordre :
```js
componentWillMount() {}

componentDidMount() {}

componentWillReceiveProps(nextProps) {}

shouldComponentUpdate(nextProps, nextState) {}

componentWillUpdate(nextProps, nextState) {}

componentDidUpdate(prevProps, prevState) {}

componentWillUnmount() {}
```

### `this`

##### `this.state`

on set le state grâce à

```js
this.setState({})
```

##### `this.props`
read only

##### `this.refs`
les références sont un moyen de récupérer un DomNode dans l'une des méthodes du composant. par exemple :

```js
render() {
  return <div>
    <h1 ref="title">Les 10 choses les plus incroyable de tous les temps</h1>
    <ul>
      <li>le marketing</li>
      <li ref="hashtag">Les hashtags</li>
      // ...
    </ul>
  </div>;
}
```

```js
 _myMethode() {
   this.refs.title // -> h1 element
   this.refs.hashtag // -> li element
 }
```

##### `this.context`
permet d'acceder au context créé par un composant parent.

admettons que nous avons une composition de components qui resemble à ça :
```js
<Parent>
  <Bla>
    <Ble>
      <Bli>
        <Child />
      </Bli>
    </Ble>
  </Bla>
</Parent>
```
```js
// <Parent />
static childContextTypes = {
  foo: PropTypes.string
}

getChildContext() {
  return {
    foo: 'bar'
  }
}
```
```js
// <Child />
static contextTypes = {
  foo: PropTypes.string
}

anyMethod() {
  this.context.foo // -> 'baz'
}
```

## PropTypes
Ils déclarent les types des props qui doivent être passés à notre component pour qu'il fonctionne correctement. les props ne respectent pas ce qui à été défini dans le PropTypes, react nous met une petite erreur dans la console, c'est bien pratique pour débugger.

définis comme ça :
```js
import React, { Component, PropTypes } from 'react';
class MyComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    return <p>{name}</p>
  }
}
```

Tout ce qu'il y a à savoir ici : http://ricostacruz.com/cheatsheets/react.html

##### les trucs importants :
les types de base :

```js
{ string, bool, func, number, array, object } = PropTypes
```

la validation :

```js
PropTypes.string.isRequired
```

plusieurs types possible :

```js
PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array
])
```

arrayOf :

```js
PropTypes.arrayOf(PropTypes.number)
```

définir la forme d'une dataStructure :
```js
{
  image: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    link: PropTypes.string
  })
}
```

Composition de propTypes :
```js
list: PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    link: PropTypes.string
  })
).isRequired
```


## ContextTypes




Ressources :

- [Style guide](https://github.com/Khan/style-guides/blob/master/style/react.md)

- [Cheat Sheet](http://ricostacruz.com/cheatsheets/react.html)
