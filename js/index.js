import { efficientPlacement } from './algorithms/efficientPlacement.js';
import Render from './lib/render.js';

import Block from './components/block.js';
import Container from './components/container.js';

import { getRandomColorBy2Values } from './utils/generateColor.js';
import { debounce } from './utils/debounce.js';
import { loadJson } from './utils/jsonLoader.js';

const DEBOUNCE_DELAY = 150;

async function handleResize() {
  try {
    await main();
  } catch (error) {
    console.error('Error handling resize:', error);
  }
}

function renderBlocks(data, containerElement) {
  containerElement.innerHTML = '';

  data.blockCoordinates.forEach((coord) => {
    const width = coord.right - coord.left;
    const height = coord.bottom - coord.top;

    const block = new Block(
      width,
      height,
      coord.initialOrder,
      getRandomColorBy2Values(width, height),
      { ...coord }
    );

    Render.renderBlock(block, containerElement);
  });

}

async function main() {
  const blocks = await loadJson('../inputs/blocks.json');

  const container = new Container(window.innerWidth, window.innerHeight);
  const containerElement = document.getElementById('container');

  const data = efficientPlacement(blocks, container);

  if (blocks.length !== data.blockCoordinates.length) {
    alert('У розміщенні відсутні деякі блоки.')
  }

  renderBlocks(data, containerElement);
  Render.renderFullness(data.fullness);
}


main();
window.addEventListener('resize', debounce(handleResize, DEBOUNCE_DELAY));
