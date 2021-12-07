const inputUtils = require("../utils/input");

const allRoutes = {};
let graph;

const findPaths = ({ path, distance }) => {
  if (path.length === Object.keys(graph).length) {
    allRoutes[path.join(' -> ')] = distance;
    return;
  }

  const currentCity = path[path.length-1];
  const nextCities = Object.keys(graph[currentCity]);

  nextCities.forEach(nextCity => {
    const nextPath = path.slice();
    if (!path.includes(nextCity)) {
      nextPath.push(nextCity);
      findPaths({ path: nextPath, distance: distance + graph[currentCity][nextCity]})
    }
  });
};

const part1 = () => {
  inputUtils.getInput().then((routes) => {
    graph = {};

    routes.forEach((route) => {
      const [from, , to, , dist] = route.split(" ");
      if (!graph[from]) {
        graph[from] = {};
      }
      if (!graph[to]) {
        graph[to] = {};
      }
      graph[from][to] = parseInt(dist, 10);
      graph[to][from] = parseInt(dist, 10);
    });

    const allCities = Object.keys(graph);

    allCities.forEach((city) => {
      findPaths({
        path: [city],
        distance: 0,
      });
    });

    console.log(Math.max(...Object.values(allRoutes)));
  });
};

part1();
