export function efficientPlacement(blocks, container) {
  // Сортування блоків за зменшенням їх площі
  blocks.sort((a, b) => b.width * b.height - a.width * a.height);

  // Ініціалізація контейнера
  const containerWidth = container.width;
  const containerHeight = container.height;
  let remainingSpace = containerWidth * containerHeight;
  let currentIndex = 1;

  // Ініціалізація результатів
  const blockCoordinates = [];
  let fullness = 0;

  // Розміщення блоків в контейнері
  for (const block of blocks) {
    const placedCoordinates = placeBlock(block, blockCoordinates, containerWidth, containerHeight, blocks, currentIndex);

    // Якщо розміщення блоку не вдалося, спробуйте повернути блок і розмістити знову
    if (!placedCoordinates) {
      const rotatedBlock = { width: block.height, height: block.width };
      const rotatedCoordinates = placeBlock(rotatedBlock, blockCoordinates, containerWidth, containerHeight, blocks, currentIndex);

      if (rotatedCoordinates) {
        blockCoordinates.push(rotatedCoordinates);
        remainingSpace -= rotatedBlock.width * rotatedBlock.height;
        currentIndex++;
        continue;
      }
    } else {
      blockCoordinates.push(placedCoordinates);
      remainingSpace -= block.width * block.height;
      currentIndex++;
      continue;
    }
  }

  fullness = 1 - remainingSpace / (containerWidth * containerHeight);

  return {
    fullness,
    blockCoordinates,
  };
}

function placeBlock(block, blockCoordinates, containerWidth, containerHeight, blocks, currentIndex) {
  // Перебір доступних позицій в контейнері
  for (let top = 0; top <= containerHeight - block.height; top++) {
    for (let left = 0; left <= containerWidth - block.width; left++) {
      // Перевірка чи блок можна розмістити на поточній позиції
      if (
        !blockCoordinates.some(
          (existingBlock) =>
            top + block.height > existingBlock.top &&
            top < existingBlock.bottom &&
            left + block.width > existingBlock.left &&
            left < existingBlock.right
        )
      ) {
        return {
          top,
          left,
          right: left + block.width,
          bottom: top + block.height,
          initialOrder: currentIndex,
        };
      }
    }
  }
  return null;
}
