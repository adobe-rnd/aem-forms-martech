export function initWebSDK(path, config) {
  // Preparing the alloy queue
  if (!window.alloy) {
    // eslint-disable-next-line no-underscore-dangle
    (window.__alloyNS ||= []).push('alloy');
    window.alloy = (...args) => new Promise((resolve, reject) => {
      window.setTimeout(() => {
        window.alloy.q.push([resolve, reject, args]);
      });
    });
    window.alloy.q = [];
  }
  // Loading and configuring the websdk
  return new Promise((resolve) => {
    import(path)
      .then(() => window.alloy('configure', config))
      .then(resolve);
  });
}

export async function getSegments(xdm, data) {
  const response = await window.alloy('sendEvent', {
    type: 'form.view',
    renderDecisions: false,
    data,
    xdm,
    decisionScopes: ['eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE5MWI5ZDM5OWRiNDUyOTgiLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTkxYjk3ZjJmZjMzOTU5NiJ9'],
  });
  const segmentIds = response.destinations
    .flatMap((destination) => destination.segments.map((segment) => segment.id));

  console.log('Response:', response, segmentIds);
  return segmentIds;
}
