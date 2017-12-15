Run app by running

----
yarn install

yarn run start

Open http://localhost:3001/ in browser

Demo
----
![alt text](https://imgur.com/a/pBbFb)

----
// basic idea

Our App dom looks like
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

Four elements are kept per row due to this CSS:
```css
.board__item {
    /* */
      flex-grow: 1;
      width: calc(100% * (1/4) - 10px - 1px);
      /* */
}
```
---

Board is deemed complete if you can traverse the list consecutively to 14. (check [util](https://github.com/farahabdi/isobar/blob/ad6ce40567d460ef30a3f72f10a6f2e78946053e/src/containers/utils.js#L9) function)

----

Valid positions at each position in board is [hardcoded](https://github.com/farahabdi/isobar/blob/ad6ce40567d460ef30a3f72f10a6f2e78946053e/src/containers/utils.js#L20). It's still modular though as it could be swapped out later.

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

Empty index is always used to keep tracking of number 15 in the dom. Empty index could be 5 if it is the fifth child in the dom. It starts off last.

You can use this class to make it keep the space.

```css
        &.board__item--empty {
            visibility: hidden;
        }
```

The trickiest part is finding correct positions of items. Getting Item[4] for item 4 is wrong as that node could be:

      <div id="2" class="board__item board__item--valid">
         <div class="board__text">2</div>
      </div>

 You need a nested search to find correct key in dom (using lodash [._findIndex](https://lodash.com/docs/4.17.4#findIndex)).