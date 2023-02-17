<script lang="ts">
	import _ from 'lodash';

	const groupList = [
		{ group: '1', date: '2022-02-01' },
		{ group: '1', date: '2022-02-02' },
		{ group: '2', date: '2022-02-04' },
		{ group: '2', date: '2022-02-05' },
		{ group: '2', date: '2022-02-06' },
		{ group: '3', date: '2022-02-07' },
		{ group: '3', date: '2022-02-08' },
		{ group: '3', date: '2022-02-09' },
		{ group: '3', date: '2022-02-10' }
	];

	const group = _.chain(groupList)
		.groupBy('group')
		.map((v, i) => {
			console.log(i, v);
			return { group: i, length: v.length };
		})
		.orderBy(['length'], ['desc'])
		.value();

	console.log(group);
</script>

<h1>about test</h1>
