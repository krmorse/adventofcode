const inputUtils = require('../utils/input');

inputUtils.getInput().then((input) => {
    const pixels = input[0].split('').map(p => parseInt(p, 10));
    const W = 25, H = 6, layerSize = W*H, numLayers = pixels.length / layerSize;

    const layers = {};
    let minZeroes = pixels.length, resultLayer;
    for(let layer = 0; layer < numLayers; layer++) {
        const counts = {};
        for(let pixel = layer*layerSize; pixel < layer*layerSize+layerSize; pixel++) {
            counts[pixels[pixel]] = counts[pixels[pixel]] || 0;
            counts[pixels[pixel]]++;
        }
        layers[layer] = counts;
        if (counts[0] < minZeroes) {
            resultLayer = layer;
            minZeroes = counts[0];
        }
    }

    console.log('result:', layers[resultLayer][1] * layers[resultLayer][2]);
});
