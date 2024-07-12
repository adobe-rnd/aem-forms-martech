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
  debugEnabled: false,
  defaultConsent: 'in',
  datastreamId: '7044a5f4-2a52-4264-9323-3b6511444188',
  orgId: '908936ED5D35CC220A495CD4@AdobeOrg',
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
  const segments = await getSegments({
    
  }, {});
  return [...applicableAudiences, ...segments];
}
