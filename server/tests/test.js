const request = require(`supertest`);
const app = require(`../index`);
const model = require(`../models`);
jest.setTimeout(30000);
var token;
var errorToken;

function compareAllKey(data) {
	for (var key in data.body) {
		expect(key).toBe(key);
	}
}

afterAll(async (done) => {
	await model.User.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	await model.Music.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	done();
});

test(`home`, (done) => {
	request(app)
		.get(`/`)
		.expect(200)
		.then((data) => {
			expect(data.body).toBe(`home`);
			done();
		})
		.catch(done);
});

describe(`success`, () => {
	describe(`User`, () => {
		test(`Register user, should return status 201 and token`, (done) => {
			request(app)
				.post(`/users/register`)
				.send({
					username: `testMan`,
					password: `testPassword`,
				})
				.expect(201)
				.then((data) => {
					expect(data.body).toHaveProperty(`token`);
					expect(data.body.token).toBe(data.body.token);
					done();
				})
				.catch(done);
		});

		test(`Login user, should return status 201 and token`, (done) => {
			request(app)
				.post(`/users/login`)
				.send({
					username: `testMan`,
					password: `testPassword`,
				})
				.expect(200)
				.then((data) => {
					expect(data.body).toHaveProperty(`token`);
					expect(data.body.token).toBe(data.body.token);
					token = data.body.token;
					console.log(token);
					done();
				})
				.catch(done);
		});

		test(`get User data, should return status 201 and user data`, (done) => {
			request(app)
				.get(`/users/1`)
				.expect(200)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					done();
				})
				.catch(done);
		});
	});

	describe(`Music`, () => {
		test(`Add music, should return status 201 and data that is just added`, (done) => {
			request(app)
				.post(`/musics`)
				.set(`token`, token)
				.send({
					title: `Jam Test`,
					musicData: `data`,
				})
				.expect(201)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					done();
				})
				.catch(done);
		});

		test(`Get Music, should return status 200 and data sort descending by like`, (done) => {
			request(app)
				.get(`/musics`)
				.expect(200)
				.then((data) => {
					let sorted = data.body.sort((a, b) => a.rating - b.rating);
					expect(data.body).not.toHaveLength(0);
					expect(data.body).toBe(sorted);
					done();
				})
				.catch(done);
		});

		test(`Get Music with ID as params, should return status 200 and data`, (done) => {
			request(app)
				.get(`/musics/1`)
				.expect(200)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					done();
				})
				.catch(done);
		});

		test(`Delete Music, should return status 200 and data that is just deleted`, (done) => {
			request(app)
				.delete(`/musics/1`)
				.set(`token`, token)
				.expect(200)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					done();
				})
				.catch(done);
		});
	});
});

describe(`errors`, () => {
	beforeAll((done) => {
		request(app)
			.post(`/users/register`)
			.send({
				username: `no.2`,
				password: `2222`,
			})
			.then((data) => {
				errorToken = data.body.token;
				done();
			})
			.catch(done);
	});
	describe(`User`, () => {
		test(`Register user, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/users/register`)
				.send({
					username: ``,
					password: ``,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([
							`Password can't be empty!`,
							`Username can't be empty!`,
						])
					);
					done();
				})
				.catch(done);
		});

		test(`Register user that is already used, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/users/register`)
				.send({
					username: `no.2`,
					password: `2222`,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Username is already used`])
					);
					done();
				})
				.catch(done);
		});

		test(`Login user with no username and password, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/users/login`)
				.send({
					username: ``,
					password: ``,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Wrong Username/Password`])
					);
					done();
				})
				.catch(done);
		});

		test(`Login user with wrong password, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/users/login`)
				.send({
					username: `testMan`,
					password: `1234`,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Wrong Username/Password`])
					);
					done();
				})
				.catch(done);
		});

		test(`Login user with wrong username, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/users/login`)
				.send({
					username: `wrongMan`,
					password: `testPassword`,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Wrong Username/Password`])
					);
					done();
				})
				.catch(done);
		});

		test(`User not found, should return status 404 and error message`, (done) => {
			request(app)
				.get(`/users/99`)
				.expect(404)
				.then((data) => {
					expect(data.body).toEqual(expect.arrayContaining([`User not found`]));
					done();
				})
				.catch(done);
		});
	});

	describe(`Music`, () => {
		test(`Add music empty title and musicData, should return status 400 and error message`, (done) => {
			request(app)
				.post(`/musics`)
				.set(`token`, token)
				.send({
					title: ``,
					musicData: ``,
				})
				.expect(400)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([
							`Title can't be empty!`,
							`musicData can't be empty!`,
						])
					);
					done();
				})
				.catch(done);
		});

		test(`Music not found, should return status 404 and error message`, (done) => {
			request(app)
				.get(`/musics/99`)
				.expect(404)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Music of ID 99 not found`])
					);
					done();
				})
				.catch(done);
		});

		test(`Delete Music, should return status 404 and error message`, (done) => {
			request(app)
				.delete(`/musics/99`)
				.set(`token`, token)
				.expect(404)
				.then((data) => {
					expect(data.body).toEqual(
						expect.arrayContaining([`Music not found`])
					);
					done();
				})
				.catch(done);
		});
	});

	describe(`token errors`, () => {
		test(`Invalid token, should return 401`, (done) => {
			request(app)
				.post(`/musics`)
				.set(
					`token`,
					`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg3NjM2ODIyfQ.i8rseAK6B2Ifti6rcwUoURHEMtC15DbbbRT0U4pqu3I`
				)
				.send({
					title: ``,
					musicData: ``,
				})
				.expect(401)
				.then((data) => {
					expect(data.body).toEqual(expect.arrayContaining([`Invalid Token`]));
					done();
				})
				.catch(done);
		});

		test(`Invalid token, should return 401`, (done) => {
			request(app)
				.post(`/musics`)
				.set(`token`, `grr`)
				.send({
					title: ``,
					musicData: ``,
				})
				.expect(401)
				.then((data) => {
					expect(data.body).toEqual(expect.arrayContaining([`Invalid Token`]));
					done();
				})
				.catch(done);
		});
	});
});
