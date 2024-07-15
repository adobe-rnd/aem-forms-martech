import { subscribe } from '../../util.js';

function updateImage(fieldDiv, field) {
  console.log(field);
}

export default function decorateRange(fieldDiv, field) {
  subscribe(fieldDiv, updateImage);
  const { value, name } = field;
  const imageUrl = value || field?.label.value;
  const image = `
    <picture>
      <source srcset="${imageUrl}?width=2000&optimize=medium" media="(min-width: 600px)">
      <source srcset="${imageUrl}?width=750&optimize=medium">
      <img alt="${name}" src="${imageUrl}?width=750&optimize=medium">
    </picture>`;
  fieldDiv.innerHTML += image;
  fieldDiv.classList.add('hero-input');
}
