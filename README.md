# React, la base

## Un peu de théorie
React, en vrai ça fait un seul truc. Ça permet d'aborder le DOM comme une simple fonction. Plus précisement une composition de fonctions pures, qui définissent chacune un composant.

#### Une fonction pure ?
Une fonction pure est une fonction qui respect quelques règles. C'est une fonction qui :
- prend des paramètres et retourne un résultat unique
- n'altère pas les paramètres qui lui sont passés
- n'intéragit pas avec le scope dans lequel elle se trouve directement.
- n'a pas d'effet de bord (side effects).

Le respect de ces règles permet de définir des fonctions au sujet desquelles il est très facile de raisonner. Cela permet de réfléchir sous forme de petites unités logiques séparés et de les utiliser en sachant ce quelle font sans savoir comment elle le font. Pas mal hein ?

pour en savoir plus => [Mostly Adequate Guid To Functionnal Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/)

#### Du HTML, une fonction ? WTF

Pas si déconant que ça en fait. Pour construire des applications web, le HTML est assez limité, puisqu'il a été conçu pour décrire une structure de page qui ne change pas au cours du temps. React, c'est une solution très efficace pour répondre à cette problématique d'UI évolutive.

#### Découper l'interfaces en composants

React permet de découper son UI en composants imbriqués les uns dans les autres.

![Components explained](http://coenraets.org/blog/wp-content/uploads/2014/12/uimockscript.png)

Cette application peut donc être exprimée comme ceci :

```html
<App>
  <HomePage>
    <Header />
    <SearchBar />
    <EmployeeList>
      <EmployeeListItem />
      ...
    </EmployeeList>
  </HomePage>
  <EmployeePage>
    <Header />
    <ContentLayout />
  </EmployeePage>
</App>
```

Chacun de ces tags définis en XML représentent un composant, qui ne s'occupe que de lui même, **sans avoir conscience de l'application dans laquelle il se trouve**. C'est ça qui rend la logique de composants vraiment puissante, elle permet de pouvoir réfléchir une interface aussi complexe qu'elle puisse être comme une composition de petite briques simples.

#### Une UI Réactive ©

React utilise la notion de state, c'est à dire l'état actuel de notre application. Ce `state` est représenté par un objet. À chaque fois que cet objet est modifié, notre UI est à nouveau rendu. On peut donc se concentrer sur la modification de l'état de notre application, sans avoir à penser du tout à la manière dont elle est rendu. Mine de rien, c'est une petite révolution.

![](http://i.imgur.com/aLVWGPe.png)

( *re-render de l'arbre de composants lors d'une modification du state* )

#### Et niveau perf ?

React fait le minimum de manipulation de DOM possible, sachant que les opérations de modification du DOM sont les plus lentes. À priori c'est pas mal donc, mais ce n'est pas gratuit. Pour savoir ce qui doit être modifié, React garde constamment en mémoire une représentation du DOM sous forme de d'object JS. C'est le fameux **virtual DOM**. Grâce à lui, on peut faire des diffs entre le DOM avant et après une modification de state, et donc savoir quels elements doivent être refresh.

Le petit bémole, c'est que ce virtual DOM peut consommer pas mal de mémoire cache, ce qui pose problèmes pour des grosses applications consultés sur téléphone.

## On veut du code

Ok.

#### Pratique

récuperer le react transform boilerplate. => workflow hot swaping trop cool ;)
```
git clone https://github.com/gvergnaud/prez-react.git
cd TutoReact
npm install
npm start
```
le repo de base : https://github.com/gaearon/react-transform-boilerplate


#### JSX

React vient avec une nouvelle syntaxe, le jsx. Elle permet de définir le DOM de ses composants avec du XML, à même ses fichiers javascript.

```html
<div>
  <!-- Hello world -->
  <div class="awesome" style="border: 1px solid red">
    <label for="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>Enter your HTML here</p>
</div>
```
peut donc s'écrire comma ça :

```js
render() {
  return (
    <div>
      {/* Hello world */}
      <div className="awesome" style={{border: '1px solid red'}}>
        <label htmlFor="name">Enter your name: </label>
        <input type="text" id="name" />
      </div>
      <p>Enter your HTML here</p>
    </div>
  );
}
```

###### Gotchas :

certains attributs varient :
`class="awesome"` => `className="awesome"`
`for="name"` => `htmlFor="name"`
les commentaires :
`<!-- Hello world -->` => `{/* Hello world */}`



###### React sans JSX :
JSX n'est que du syntax-sugar, qui est compilé en javascript valide. On peut utiliser react sans JSX, mais ça devient vite assez fastidieux.  Voila la définition du DOM en javascript normal :

```js
render() {
  return (
    React.createElement('div', [
      React.createElement('div', {  className: 'awesome',  style: { border: '1px solid red' }  }, [
        React.createElement('label', { htmlFor: 'name' }, 'Enter your name:'),
        React.createElement('input', { type: 'text', id: 'name' })
      ]),
      React.createElement('p', 'Enter your HTML here')
    ])
  )
}
```

C'est toujours cool de savoir comment ça marche.


#### déclarer un Composant React :

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

#### Composer les components :

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

#### style guide
 https://github.com/Khan/style-guides/blob/master/style/react.md

En bref :

- lifecycle methode dans l'odre.
- les méthodes créées préfixées par `_` . exemple :   `_myMethode() {}`
- méthode render à la fin.

#### Lifecycle
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

#### `this`

###### `this.state`

on set le state grâce à

```js
this.setState({})
```

###### `this.props`
read only

###### `this.refs`
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

###### `this.context`
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

###### les trucs importants :
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
Component.propTypes = {
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

```js
Component.contextTypes = {
  // défini de la même manière que les propTypes:
  onAddTodo: PropTypes.func.isRequired
  // ...
}
```


Ressources :

- [Style guide](https://github.com/Khan/style-guides/blob/master/style/react.md)

- [Cheat Sheet](http://ricostacruz.com/cheatsheets/react.html)
