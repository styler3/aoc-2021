const input = require('./input.js');

const layout = {};

input.forEach((inputString) => {
	[node1, node2] = inputString.split('-');

	if (node1 in layout) {
		layout[node1].push(node2);
	} else {
		layout[node1] = [node2];
	}

	if (node2 in layout) {
		layout[node2].push(node1);
	} else {
		layout[node2] = [node1];
	}
});

/**
 * Test if a cave is "small". Also counts if it's the start or end cave
 * (because we only visit them once, too)
 */
function isSmallCave(caveName) {
	return caveName === caveName.toLowerCase();
}

let paths = [];

function findPaths(steps = ['start'], visitedSmallCaves = []) {
	const lastStep = steps[steps.length - 1];
	if (lastStep === 'end') {
		return steps;
	}
	const nextVisitedSmallCaves = isSmallCave(lastStep) ? [...visitedSmallCaves, lastStep] : [...visitedSmallCaves];
	const nextSteps = layout[lastStep].filter(cave => !visitedSmallCaves.includes(cave));
	if (!nextSteps.length) {
		return null;
	}
	for (step of nextSteps) {
		paths.push(findPaths([...steps, step], nextVisitedSmallCaves))
	}
}

function partOne() {
	findPaths();
	paths = paths.filter(isTruthy => isTruthy);
	console.log(paths.length);
}

partOne();

