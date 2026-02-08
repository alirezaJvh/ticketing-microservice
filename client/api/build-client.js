import axios from 'axios';

export default ({ headers } = {}) => {
  if (typeof window === 'undefined') {
    // Server-side requests from inside the cluster.
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers,
    });
  }

  // Browser-side requests should hit ingress host directly.
  return axios.create({ baseURL: '/' });
};
