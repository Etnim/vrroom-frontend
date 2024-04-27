const config = {
  domain: 'dev-kn5zd8et652yeds6.eu.auth0.com',
  clientId: 'zn6VNvD4VCyDx8fCXZsgXc7z5M1NPe6d',
  authorizationParams: {
    audience: 'https://auth0.example.com'
  },
  apiUri: 'http://localhost:3001',
  appUri: 'http://localhost:4200',
  errorPath: '/error'
};

const {
  domain,
  clientId,
  authorizationParams: { audience },
  apiUri,
  errorPath
} = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  };
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  apiHost: 'https://vrroom-backend.onrender.com',
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      redirect_uri: window.location.origin
    },
    errorPath
  }
  // apiHostLocal: 'http://localhost:8080',
};
