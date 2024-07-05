import { toClassName } from '../../../scripts/aem.js';
import { AUDIENCES as audiences } from '../../../scripts/scripts.js';
import { getSegments, initWebSDK } from './event.js';

export const DEFAULT_OPTIONS = {
  audiencesDataAttribute: '__audience__',
  audiencesMetaTagPrefix: 'audience',
  audiencesQueryParameter: 'audience',
};

const config = {
  clickCollectionEnabled: false,
  debugEnabled: true,
  defaultConsent: 'in', // 'in' or 'out' or 'pending'
  datastreamId: 'd97acdd2-5385-4a50-aa99-84e507bedf6f',
  orgId: '52C418126318FCD90A494134@AdobeOrg',
};
const temp = {
  datastreamId: '8de17894-839d-47a4-b461-130a4842c769',
  orgId: '296721E263867A380A494123@AdobeOrg',
};

const alloyLoadedPromise = initWebSDK('../../../scripts/alloy.js', config); // load only when personalization is enbaled

function getAudienceFromUrl() {
  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(DEFAULT_OPTIONS.audiencesQueryParameter)
    ? toClassName(usp.get(DEFAULT_OPTIONS.audiencesQueryParameter))
    : null;
  return forcedAudience;
}

export async function resolveAudiences() {
  if (!audiences || !Object.keys(audiences).length) {
    return null;
  }
  // If we have a forced audience set in the query parameters (typically for simulation purposes)
  // we check if it is applicable
  const forcedAudience = getAudienceFromUrl();
  if (forcedAudience) {
    return forcedAudience;
  }

  const applicableAudiences = [];
  const promises = Object.keys(audiences).reduce((acc, key) => {
    if (audiences[key] && typeof audiences[key] === 'function') {
      if (audiences[key]()) {
        acc.push(key);
      }
    }
    return acc;
  }, applicableAudiences);
  await alloyLoadedPromise;
  await Promise.all([promises, alloyLoadedPromise]);
  const response = await getSegments({}, {});
  console.log('Response:', response);
  return applicableAudiences;
}
