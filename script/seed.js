const db = require('../server/db');
const { User } = require('../server/db/models');

const seed = async () => {
	await db.sync({ force: true });
	console.log('db synced!');

	const users = await Promise.all([
		User.create({ email: 'e1@email.com', password: '123' }),
		User.create({ email: 'e2@email.com', password: '123' })
	]);

	console.log(`seeded ${users.length} users`);
	console.log(`
      Seed success!
		`);
};

// separate `seed` and `runSeed` fns so we can isolate error handling and exit trapping
const runSeed = async () => {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
};

// Execute `seed` fn if module ran directly (`node seed`)
if (module === require.main) {
	runSeed();
}

module.exports = seed;
