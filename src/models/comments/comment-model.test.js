const db = require('../../../data/dbConfig.js');
const commentModel = require('./comment-models.js');

const newComment = {
    event_id: 1,
    user_id: 2,
    parent_id: -1,
    root_id: -1,
    dateCreated: "2020-06-24 01:35:27.37+00",
    comment: "new comment"
};

describe('comment models', () => {
    let createdCommentId;

    test('creates a new comment', async () => {
        const created = await commentModel.add(newComment);
        createdCommentId = created.id;
        const found = await db('Comments').where({ id: createdCommentId }).first();
        expect(found).toBeDefined();
        expect(found.event_id).toEqual(1)
    });

    test('finds all event comments', async () => {
        const comments = await commentModel.findAllEventComments(1);
        expect(comments.length).toBeGreaterThan(0);
    });

    test('finds comment by id', async () => {
        const comment = await commentModel.findById(createdCommentId);
        expect(comment).toBeDefined();
        expect(comment.comment).toEqual('new comment');
    });

    test('comment is updated', async () => {
        const updated = await commentModel.update(createdCommentId, {
            comment: "updated comment"
        });
        expect(updated.comment).toEqual('updated comment');
    });

    test('comment is deleted', async () => {
        const removed = await commentModel.remove(createdCommentId);
        const deleted = await db('Comments').where({ id: createdCommentId }).first();
        expect(deleted).toBeUndefined();
    });
});