const request = require(`supertest`);
const app = require(`../index`);
const model = require(`../models`);
jest.setTimeout(30000);
var token;

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
	await model.Comment.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	await model.Rating.destroy({
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

describe(`Music post interaction`, () => {
	beforeAll((done) => {
		request(app)
			.post(`/musics`)
			.set(`token`, token)
			.send({
				title: `AAAAAAAAAAAA`,
				musicData: `BBBBBBBBB`,
			})
			.then((data) => {
				console.log(data.body);
				done();
			})
			.catch(done);
	});

	describe(`Rating`, () => {
		test(`User likes a music post, should return 204`, async (done) => {
			request(app)
				.put(`/rates/like/2`)
				.set(`token`, token)
				.expect(204)
				.then(() => {
					done();
				})
				.catch(done);
		});

		test(`User dislike a music post, should return 204`, (done) => {
			request(app)
				.put(`/rates/dislike/2`)
				.set(`token`, token)
				.expect(204)
				.then(() => {
					done();
				})
				.catch(done);
		});

		test(`User remove rating from a music post, should return 204`, (done) => {
			request(app)
				.delete(`/rates/2`)
				.set(`token`, token)
				.expect(204)
				.then(() => {
					done();
				})
				.catch(done);
		});
	});

	describe(`Comments`, () => {
		var commentId;
		test(`User comments on a post, should return 201 and data added`, (done) => {
			request(app)
				.post(`/comments/2`)
				.set(`token`, token)
				.send({
					comment: `The Music sounds like a test`,
					musicId: 1,
				})
				.expect(201)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					commentId = data.body.id;
					done();
				})
				.catch(done);
		});

		test(`Get comments on a post, should return 200 and data`, (done) => {
			request(app)
				.get(`/comments/${commentId}`)
				.set(`token`, token)
				.expect(200)
				.then((data) => {
					compareAllKey(data);
					console.log(data.body);
					done();
				})
				.catch(done);
		});

		test(`User Edit comment on a post, should return 200, original data and edited data`, (done) => {
			request(app)
				.put(`/comments/${commentId}`)
				.set(`token`, token)
				.send({
					comment: `Actually Test sounds like this music`,
				})
				.expect(200)
				.then((data) => {
					expect(data.body).toHaveProperty(`comment`);
					expect(data.body).toHaveProperty(`id`);
					expect(data.body.comment).toBe(data.body.comment);
					expect(data.body.id).toBe(data.body.id);
					done();
				})
				.catch(done);
		});

		test(`User delete comment on a post, should return 200 and data deleted`, (done) => {
			request(app)
				.delete(`/comments/${commentId}`)
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
