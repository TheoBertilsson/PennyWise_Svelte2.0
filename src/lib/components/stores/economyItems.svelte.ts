let count = $state(0);

export function getCounter() {

	function increment() {
		count += 1;
	}

	return {
		get count() {
			return count;
		},
		increment
	};
}
