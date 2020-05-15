const oktaJwtVerifier = require('../utils/oktaJwtVerifier');


async function authenticationRequired(token = "") {

    try {

        if (process.env.NODE_ENV === 'development') {
            return {
                success: true
            }
        }

        const match = token.match(/Bearer (.+)/);

        if (!match) return { success: false, error: "Authorization Header has invalid syntax or does not exist" }

        const accessToken = match[1];

        await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');

        return { success: true }

    } catch (err) {
        return { success: false, error: err.message }
    }
}

module.exports = authenticationRequired;