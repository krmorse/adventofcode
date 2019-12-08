const inputUtils = require('../utils/input');

const W = 25, H = 6;

const computeChecksum = (pixels) => {
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

    return layers[resultLayer][1] * layers[resultLayer][2]
};

const decodeImage = (pixels) => {
    const layerSize = W*H, numLayers = pixels.length / layerSize;
    const image = [];
    
    for(let layer = 0; layer < numLayers; layer++) {
        for(let pixel = layer*layerSize; pixel < layer*layerSize+layerSize; pixel++) {
            const color = pixels[pixel];
            if (color != 2) {
                const imageIndex = pixel % layerSize;
                if (!image[imageIndex]) {
                    image[imageIndex] = color === 0 ? '\x1b[30m0\x1b[0m' : '\x1b[37m0\x1b[0m';
                }
            }
        }
    }

    return image;
};

inputUtils.getInput().then((input) => {
    const pixels = input[0].split('').map(p => parseInt(p, 10));
    console.log('result:', computeChecksum(pixels));

    const image = decodeImage(pixels);

    console.log('image:');
    for(let row = 0; row < H; row++) {
        let str = '';
        for(let col = 0; col < W; col++) {
            const pixel = image[row*W+col];
            str += pixel;
        }
        console.log(str);
    }
});
