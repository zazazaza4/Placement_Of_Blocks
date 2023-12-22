import blocksData from '../inputs/blocks.json' assert { type: "json" };

import { efficientPlacement } from './algorithms/efficientPlacement.js';
import Render from './lib/render.js';

import Block from './components/block.js';
import Container from './components/container.js';

import { getRandomColorBy2Values } from './utils/generateColor.js';
import { debounce } from './utils/debounce.js';

function main(blocks) {
  const container = new Container(window.innerWidth, window.innerHeight);

  const containerElement = document.getElementById('container');
  containerElement.innerHTML = '';

  const data = efficientPlacement(blocks, container);

  if (blocks.length !== data.blockCoordinates.length) {
    alert('У розміщенні відсутні деякі блоки.')
  }

  data.blockCoordinates.forEach((coord) => {
    const width = coord.right - coord.left;
    const height = coord.bottom - coord.top

    const block = new Block(
      width,
      height,
      coord.initialOrder,
      getRandomColorBy2Values(width, height),
      { ...coord }
    );

    Render.renderBlock(block, containerElement);
  });

  Render.renderFullness(data.fullness);
}


main(blocksData);

window.addEventListener('resize', debounce(() => {
  main(blocksData);
}, 150));


