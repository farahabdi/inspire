Run app by running

----
yarn install

yarn run start

Open http://localhost:3001/ in browser

Demo
----
https://imgur.com/a/pBbFb
----
// basic idea

App dom looks like after shuffle
```html
<div class="container">
   <div class="board">
      <div id="4" class="board__item">
         <div class="board__text">4</div>
      </div>
      <div id="10" class="board__item">
         <div class="board__text">10</div>
      </div>
      <div id="7" class="board__item">
         <div class="board__text">7</div>
      </div>
      <div id="1" class="board__item">
         <div class="board__text">1</div>
      </div>
      <div id="3" class="board__item">
         <div class="board__text">3</div>
      </div>
      <div id="11" class="board__item">
         <div class="board__text">11</div>
      </div>
      <div id="8" class="board__item">
         <div class="board__text">8</div>
      </div>
      <div id="9" class="board__item">
         <div class="board__text">9</div>
      </div>
      <div id="0" class="board__item">
         <div class="board__text">0</div>
      </div>
      <div id="13" class="board__item">
         <div class="board__text">13</div>
      </div>
      <div id="12" class="board__item">
         <div class="board__text">12</div>
      </div>
      <div id="6" class="board__item board__item--valid">
         <div class="board__text">6</div>
      </div>
      <div id="5" class="board__item">
         <div class="board__text">5</div>
      </div>
      <div id="14" class="board__item">
         <div class="board__text">14</div>
      </div>
      <div id="2" class="board__item board__item--valid">
         <div class="board__text">2</div>
      </div>
      <div id="15" class="board__item board__item--empty">
         <div class="board__text">15</div>
      </div>
   </div>
</div>
</dl>
```

CSS Grid layout used to keep board like layout. Css here
```css
.board__item {
    /* */
    display: grid;
    grid-template-columns: repeat(4, 1fr);    
    margin: 0.8em;
      /* */
}
```
---

Board is complete if you can traverse key values in list consecutively to 14. (check [util](https://github.com/farahabdi/isobar/blob/97647c18b7a906c740c198b7d7073034eabcdb1a/src/utils/utils.js#L20) function)

----

Valid positions at each position in board is [hardcoded] using a lookup table.(https://github.com/farahabdi/isobar/blob/master/src/utils/rules.js).
----


State has these main properties
```js
    this.state = {
        items: [],
        validPositions: [],
        emptyIndex: 15,
        boardComplete: false
    };
```

You can use this class to make it keep the space.

```css
        &.board__item--empty {
            visibility: hidden;
        }
```


Empty index is always used to keep track of node with key value 15. It's not position of node in list array that matters but they key value inside the element. i.e Item[4] could have a key value of 12. 

You need a nested property search to find correct key in dom (using lodash [._findIndex](https://lodash.com/docs/4.17.4#findIndex)).