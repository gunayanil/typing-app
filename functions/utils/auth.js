const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const { promisify } = require('util');

const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTH0_AUDIENCE,
});

const getAccessToken = headers => {
  const rawAuthorization = headers.authorization;
  if (!rawAuthorization) {
    return null;
  }
  const authorizationParts = rawAuthorization.split(' ');

  if (authorizationParts[0] !== 'Bearer' || authorizationParts.length !== 2) {
    return null;
  }

  const accessToken = authorizationParts[1];
  return accessToken;
};

const validateAccessToken = async token => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;
    const getSigningKey = promisify(jwksClient.getSigningKey);
    const key = await getSigningKey(kid);
    const signingKey = key.publicKey;
    const options = { algorithms: 'RS256' };

    jwt.verify(token, signingKey, options);
    return decodedToken.payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  getAccessToken,
  validateAccessToken,
};
