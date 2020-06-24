const supertest = require('supertest');
const server = require('../../server.js');
const db = require('../../../data/dbConfig.js');

const ALL_EVENT_COMMENTS = {
    query: `
        query getEventComments($id: ID!) {
            getEventComments(id: $id) {
                id
                comment
            }
        }
    `,
    operationName: 'getEventComments',
    variables: { id: 1 }
};

const NEW_COMMENT = {
    query: `
        mutation addComment($input: NewCommentInput!) {
            addComment(input: $input) {
                id,
                comment
            }
        }
    `,
    operationName: 'addComment',
    variables: {
        input: {
            event_id: 1,
            user_id: 2,
            parent_id: -1,
            root_id: -1,
            dateCreated: "2020-06-24 01:35:27.37+00",
            comment: "new comment"
        },
    },
};

describe('comment resolvers', () => {
    let testId;

    test('creates a comment', async () => {
        const created = await supertest(server).post('/graphql').send(NEW_COMMENT);
        const parsed = JSON.parse(created.text);
        testId = parsed.data.addComment.id;
        expect(created.status).toBe(200);
        expect(created.type).toBe('application/json');
        expect(parsed.data.addComment.comment).toEqual('new comment');
    });

    test('gets all event comments', async () => {
        const res = await supertest(server).post('/graphql').send(ALL_EVENT_COMMENTS);
        const parsed = JSON.parse(res.text);
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(parsed.data.getEventComments.length).toBeGreaterThan(0);
    });

    test('comment is updated', async () => {
        const updated = await supertest(server)
            .post('/graphql')
            .send({
                query: `
                mutation updateComment($id:ID!, $input: UpdateCommentInput!) {
                    updateComment(id: $id, input:$input) {
                      id
                      comment
                    }
                }
            `,
                operationName: 'updateComment',
                variables: {
                    id: `${testId}`,
                    input: {
                        comment: 'updated comment'
                    },
                },
            });
        const parsed = JSON.parse(updated.text);
        expect(updated.status).toBe(200);
        expect(parsed.data.updateComment.comment).toEqual('updated comment');
    });

    test('created comment is deleted', async () => {
        const removed = await supertest(server)
            .post('/graphql')
            .send({
                query: `
          mutation removeComment($id: ID!) {
              removeComment(id: $id) {
                  id
              }
          }
        `,
                operationName: 'removeComment',
                variables: { id: `${testId}` },
            });
        const search = await db('Comments').where({ "id": testId }).first();
        expect(search).toBeUndefined();
    });
});