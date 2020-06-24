const commentModel = require("../../models/comments/comment-models.js");
const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getEventComments = async (_, args, context) => {
    const authenticated = await context.authenticated;
    if (!authenticated.success)
        throw new AuthenticationError(
            `AUTHENTICATION FAILED ${authenticated.error}`
        );

    const event = await eventModel.findById(args.id);
    if (event) {
        const comments = await commentModel.findAllEventComments(args.id);
        const commentsWithUsers = comments.map(async (comment) => {
            const user = await userModel.findById(comment.user_id);
            return {
                ...comment,
                user: user,
            }
        })
        return commentsWithUsers;
    } else {
        throw new Error("The specified event id does not exist");
    }
};


const addComment = async (_, args, context) => {
    const authenticated = await context.authenticated;
    if (!authenticated.success)
        throw new AuthenticationError(
            `AUTHENTICATION FAILED ${authenticated.error}`
        );

    const event = await eventModel.findById(args.input.event_id);
    if (event) {
        const newComment = await commentModel.add(args.input);
        return newComment;
    } else {
        throw new Error("The specified event id does not exist");
    }
};

const updateComment = async (_, args, context) => {
    const authenticated = await context.authenticated;
    if (!authenticated.success)
        throw new AuthenticationError(
            `AUTHENTICATION FAILED ${authenticated.error}`
        );

    const comment = await commentModel.findById(args.id);
    if (comment) {
        const updated = await commentModel.update(args.id, args.input);
        const user = await userModel.findById(args.input.user_id);
        return {
            ...updated,
            user: user
        }
    } else {
        throw new Error("The specified event id does not exist");
    }
};

const removeComment = async (_, args, context) => {
    const authenticated = await context.authenticated;
    if (!authenticated.success)
        throw new AuthenticationError(
            `AUTHENTICATION FAILED ${authenticated.error}`
        );

    const comment = await commentModel.findById(args.id)
    if (comment) {
        await commentModel.remove(args.id);
        return comment;
    } else {
        throw new Error("The specified event id does not exist");
    }
};



module.exports = {
    getEventComments,
    addComment,
    updateComment,
    removeComment,
};