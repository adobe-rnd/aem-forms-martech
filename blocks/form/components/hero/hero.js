import { subscribe } from '../../util.js';

function updatePicture(fieldDiv, field) {
  const { value, name } = field;
  const imageUrl = value || field?.label.value;
  const newPicture = `
    <picture>
      <source srcset="${imageUrl}?width=2000&optimize=medium" media="(min-width: 600px)">
      <source srcset="${imageUrl}?width=750&optimize=medium">
      <img alt="${name}" src="${imageUrl}?width=750&optimize=medium">
    </picture>`;
  const picture = fieldDiv.querySelector('picture');
  if (picture) picture.remove();
  fieldDiv.innerHTML += newPicture;
}

export default function decorateRange(fieldDiv, field) {
  subscribe(fieldDiv, updatePicture);
  updatePicture(fieldDiv, field);
  fieldDiv.classList.add('hero-input');
}
