# Overview

## What this is?

There are 3 **(ES6 only Environments)** scripts in this repository

1. [`nodeList.js`](https://github.com/eorroe/NodeList-Prototype-Extension/blob/master/nodeList.js) (the one that extends the `NodeList.prototype` and `HTMLCollections.prototype`)
2. [`nodelistLib.js`](https://github.com/eorroe/NodeList-Prototype-Extension/blob/master/nodeListLib.js) (the **library** one)
3. [`ProxiedNodeList.js`](https://github.com/eorroe/NodeList-Prototype-Extension/blob/master/ProxiedNodeList.js) (a work in progress **prollyfill** for `document.querySelectorAll`)

These scripts allow you to manipulate a `NodeList` the same way you would with any `Node` plus more.

## Inheriting from `Array.prototype`

`NodeList.prototype` has the `Array` methods: `forEach`, `entries`, `keys`, `indexOf`, `lastIndexOf`, `every`, `some`, `reduce`,
`reduceRight`, `slice`, `map`, `filter`, and `concat`. Notice all those methods work just how they would on an `Array` by not changing the actual
`NodeList`. Therefore `NodeList.prototype` does not have the methods: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse`.

The `join` method would be completely useless.

I'm not sure `pushing`, `popping`, `shifting`, `unshifting`, `splicing`, `sorting`, `reversing` the `NodeList` would be a good thing or necessary. Also the way `NodeList` and `HTMLCollections` work internally don't allow me to extend these methods to work properly.

# Examples Uses:

**ATTENTION**: Use any browser with the all DOM properties on the prototype I'm using chrome 43+.

First let's consider that this line is being used in the following: `$ = document.querySelectorAll.bind(document);`.

## The `HTML` we'll manipulate
```HTML
<body>
	<div id="container">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</body>
```

**Here's a [jsbin](http://jsbin.com/cehosinomu/edit?html,js,output) using some examples that I'll show in the following**

## Setting a `class` to `#container` children
```JS
$('#container div').setAttribute('class', 'shape'); // Method 1 call setAttribute on NodeList

$('#container div').className = 'shape'; // Method 2 set the className of the NodeList

$('#container').children // returns all child elements of container

$('#container').children.setAttribute('class', 'shape'); // Method 3 selecting children and doing same as Method 1

$('#container').children.className = 'shape'; // Method 4 selecting children and doing same as Method 2
```

## Removing/Emptying `class` attributes to `#container` children
```JS
$('#container div').removeAttribute('class'); // Method 1 remove the entire attribute by calling removeAttribute on NodeList

$('#container div').className = ''; // Method 2 empty the className by setting the className of NodeList
```

## Setting `data-*` attributes to `#container` children
```JS
// Method 1 call setAttribute on NodeList
$('#container div').setAttribute('data-shape', 'square');

// Method 2 Loop through NodeList and call setAttribute on each element
for(var div of $('#container div')) div.setAttribute('data-shape', 'square');

// Method 3 call forEach on NodeList
$('#container div').forEach(div => {
	div.dataset.shape = 'square'; // set dataset.shape
	div.setAttribute('data-shape', 'square'); // call setAttribute
});

// Method 3 Loop through array of dataset DOMStringMap object
for(var dataset of $('#container div').dataset) dataset.shape = 'square';

// Method 5 call forEach on array of dataset DOMStringMap
$('#container div').dataset.forEach(dataset => dataset.shape = 'square');
```

## Setting `textContent/innerText/innerHTML` of `#container` children
```JS
// Method 1 for textContent: set textContent of nodeList
$('#container div').textContent = "This is the text between each div";

// Method 2 for textContent: loop through each element and manipulate the textContent
for(var div of $('#container div')) div.textContent = "This is the text between each div";

// Method 3 for textContent: call forEach on NodeList and set textContent of each element
$('#container div').forEach( (div, index) => div.textContent = `This is div number ${index + 1}`);

// Method 1 for innerHTML: set innerHTML of NodeList
$('#container div').innerHTML = '<div class="square">';

// Method 2 for innerHTML: loop through NodeList and set innerHTML of each element
for(var div of $('#container div')) div.innerHTML = '<div class="square">';

// Method 3 for innerHTML: call forEach on NodeList
$('#container div').forEach( (div, index) => div.innerHTML = '<div class="square">');
```

## Styling `#container` children
```JS
// Method 1 loop through elements
for(var div of $('#container div')) div.style.color = 'red';

// Method 2 call forEach on NodeList
$('#container div').forEach(div => div.style.color = 'red');

// Method 3 loop through array of style objects
for(var style of $('#container div').style) style.color = 'red'; // Using style object

// Method 4 loop through style objects by calling forEach on array of style objects
$('#container div').style.forEach(style => style.color = 'red');
```

## Adding Event listeners
```JS
// Method 1 call addEventListener on NodeList
$('#container div').addEventListener('click', evt => alert(evt.target.textContent));

// Method 2 set onclick of NodeList
$('#container div').onclick = function(evt) {
	alert(evt.target.textContent);
}
```

## Slicing
```JS
$('#container div').slice(0, 1); // Returns NodeList with first element;
```

## Mapping
```JS
// Mapping is easy just get the property just like you would on a node

$('#container div').id // Returns array of id for each element in NodeList

// No need for:
$('#container div').map(div => div.id);

$('#container div').map(div => div.firstChild); // Checks if array is populated with nodes so returns a NodeList populated with firstChld nodes

// Map the firstChild node and remove it.
$('#container div').map(div => div.firstChild).remove();

// Or:
$('#container div').firstChild.remove();

$('#container div').textContent = ''; // Or remove by setting textContent of NodeList to an empty string
```

## Filtering
```JS
$('div').filter(div => !div.matches('#container')); // Returns #container childElements NodeList
```

## Reducing
```JS
// Useless example:
var unique = $('div').reduce(function(set, div) {
	set.add(div.parentElement);
	return set;
}, new Set);

// Yea that's horrible, but I have no good use of reduce on NodeList
```

## Concatenating
```JS
var divs = $('div');

var divsAndBody = divs.concat(document.body); // Method 1 passing Node

var divsAndBody = divs.concat([document.body]); // Method 2 passing array of Nodes

var divsAndBody = divs.concat($('body')); // Method 3 passing a NodeList

var divsAndBody = divs.concat([$('body')]); // Method 4 passing an array of NodeList

var divsAndBodyAndHTML = divs.concat(document.body, document.documentHTML); // Method 5 passing multiple Nodes as arguments

var divsAndBodyAndHTML = divs.concat([document.body], [document.documentHTML]); // Method 6 passing arrays of Nodes as arguments

var divsAndBodyAndHTML = divs.concat([$('body')], [$('html')]); // Method 7 passing arrays of NodeList as are arguments

var divsAndBody = divs.concat([[document.body]]); // Error!! No array of arrays
```

## Includes
```JS
$('body').includes(document.body); // Returns true if Node is in NodeList
```

Ok now how about dealing with elements that have unique properties. Like `HTMLAnchorElement(s)` they have the `href` property which is not inherited from `HTMLElement`. There are no `HTMLAnchorElements` in this example but here's how you'll deal with it.

## Get
```JS
$('a').href // undefined because it's a unique property that every element does not inherit

$('a').get('href'); // returns array of href values
```

## Set
```JS
$('a').set('href', 'https://www.example.com/');
```

You can also call `set` for any property that **DOES NOT** exist on the actual elements.

```JS
$('div').set('thisIsAPropertyThatDoesntExistOnEachElement', 'whateverValue');

$('div').get('thisIsAPropertyThatDoesntExistOnEachElement'); // ['whateverValue', 'whateverValue', 'whateverValue', ...]

$('div').set('className', 'these are the classes being set');

// Would be the same as

$('div').className = 'these are the classes being set';
```

# The future

## The current problem

```JS
$('#container div').style.background = 'red'; // Not possible
```

`$('#container div').style` returns an array of `CSSStyleDeclaration` objects so I can't set background on it

There's obviously more problems, the above is just one big feature that would be totally awesome.

The solution would be (ES6 Proxies) which will allow the above to be possible.

# The Library (Has the following methods)

When I extend the `NodeList.prototype` and `HTMLCollection.prototype` these methods don't work because of how `NodeList` work internally.

In the library I'm using `Arrays` therefore these methods can be used, where when I extend `NodeList` and `HTMLCollections`'s prototypes `document.querySelectorAll` is still returning a `NodeList` instead of `Arrays` like the library edition does.

If this becomes a **native implementation** `NodeList` internally would be changed to be able to use these methods on them.
## Library Additional Methods

- Push

```JS
var divs = $('div');

divs.push(document.body); // Returns length of NodeList, and accepts parameters just like `concat`. Now divs contains document.body
```

- Pop

```JS
var divs = $('div');

divs.pop(); // Returns last div in NodeList and removes it from NodeList
```

- Shift
```JS
var divs = $('div');

divs.shift(); // Returns first div in NodeList and removes it from NodeList
```

- Unshift
```JS
var divs = $('div');

divs.unshift(document.body); // Returns length of NodeList, and accepts parameters just like `concat`. Now divs contains document.body
```

- Splice
```JS
var divs = $('div');

// Let's replace the first element which would be #container with document.body

divs.splice(0, 1, document.body); // Returns the same NodeList with the first element being document.body
```

- Sort

**I have no Idea why you would want to sort a `NodeList`**

```JS
var divs = $('#container div');

// Let's give each div a data-index attribute
divs.forEach( (div, index) => div.dataset.index = index);

// Reverse the NodeList (pretty useless example again I'm not sure why you would want to sort a NodeList)
divs.sort( (div1, div2) => div2.dataset.index - div1.dataset.index);
```

- Reverse
```JS
$('div').reverse(); // Simply returns a reversed NodeList (USELESS!! IMO)
```

**NO JOIN METHOD** Completely useless!!

## New Methods

**There's most likely other methods that should exist that I can't think of right now feedback please!**

# My wish

My wish would be to have all modern browsers implement `NodeList` like how this script does. Obviously in a much better way (because this is technically a hack IMO).

# Who/What is this for?

This should probably be on top but I feel the ending is better, but again my wish is to change how `NodeList` works in Web Browsers. I mean I don't see why this would hurt if it grows with help/feedback. As of right now `NodeList` don't do anything but store `nodes`.

So the library edition IMO would be for Web Developers who don't use `jQuery` and like using native API's like myself or who use `jQuery` but only for DOM manipulation, this is a much smaller and very powerful alternative.

Getting this natively, I would need tons of help. I don't know anything about writing specs and getting things standardized. Those of you who somewhat know me, I only throw out "good" Ideas (you know "good" IMO duh).

I tweeted at [@paul_irish][1], [@addyosmani][2], [@jeresig][3], [@simevidas][4], [@BrendanEich][5] about this because those are people I admire in the Web Development Community. So Thank You Guys.

[1]: https://www.twitter.com/paul_irish/
[2]: https://www.twitter.com/addyosmani/
[3]: https://www.twitter.com/jeresig/
[4]: https://www.twitter.com/simevidas/
[5]: https://www.twitter.com/BrendanEich/

# **My Apolgies**

This is the first repository I've ever written for others to use. So bare with me, this is not professionally done. As well as I'm not that good at writing, I'm much better at speaking/talks.

I would like some feedback on editing this repository as well, like the name it's pretty bad. Perhaps **NodeList.js**?
