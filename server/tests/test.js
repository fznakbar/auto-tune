const request = require(`supertest`);
// const app = require(`../index`);
const model = require(`../models`);

var token;
var musicPostId;

afterAll((done) => {
	done();
});

test(`Register user, should return status 201 and token`, (done) => {
	// Register User
	done();
});

test(`Login user, should return status 201 and token`, (done) => {
	// Login user
	// Redeclare token with token returned from here
	done();
});

describe(`Music`, () => {
	test(`Add music, should return status 201 and data that is just added`, (done) => {
		// Add music
		done();
	});

	test(`Delete Music, should return status 200 and data that is just deleted`, (done) => {
		// Delete music
		done();
	});
});

describe(`Music post interaction`, () => {
	beforeAll((done) => {
		//add a music post
	});

	afterAll((done) => {
		// clean up
	});

	describe(`Rating`, () => {
		test(`User likes a music post, should return 201`, (done) => {
			// user like 1 post
			done();
		});

		test(`User dislike a music post, should return 201`, (done) => {
			// user dislike 1 post
			done();
		});

		test(`User rating has to only be 1, should return empty`, (done) => {
			// Sequelize Model findAll user rating table
			done();
		});
	});

	describe(`Comments`, () => {
		var commentId;
		test(`User comments on a post, should return 201 and data added`, (done) => {
			// User add comment
			done();
		});

		test(`User Edit comment on a post, should return 200, original data and edited data`, (done) => {
			// user edit comment
			done();
		});

		test(`User delete comment on a post, should return 200 and data deleted`, (done) => {
			// user delete comment
			done();
		});
	});
});
