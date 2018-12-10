const inputUtils = require('../utils/input');

let metadataTotal = 0;

function buildTree(input) {
    const node = {
        children: [],
        metadata: []
    };
    const childrenCount = input.shift();
    const metadataCount = input.shift();
    for (let i = 0; i < childrenCount; i++) {
        node.children.push(buildTree(input))
    }
    for (let i = 0; i < metadataCount; i++) {
        const metadata = input.shift();
        node.metadata.push(metadata);
        metadataTotal += metadata;
    }

    if (node.children.length) {
        node.value = node.metadata.reduce((accum, val) => {
            const childNode = node.children[val-1];
            return childNode ? accum + childNode.value : accum;
        }, 0);
    } else {
        node.value = node.metadata.reduce((accum, val) => accum + val, 0);
    }

    return node;
}

inputUtils.getInput().then((input) => {
    const tree = buildTree(input[0].split(' ').map(val => parseInt(val, 10)));
    console.log('Part 1 Answer:', metadataTotal);
    console.log('Part 2 Answer:', tree.value);
});