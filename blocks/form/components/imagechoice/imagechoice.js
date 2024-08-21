// eslint-disable-next-line no-unused-vars
export default async function decorate(fieldDiv, field) {
  const labelEl = fieldDiv.querySelector('legend');
  fieldDiv.replaceChildren(labelEl);
  const models = field.enum;
  const enumNames = field.enumNames;
  const variant = field.properties.variant;

  const outerdiv = document.createElement('div');
  outerdiv.classList.add('image-choice-container');
  outerdiv.classList.add(variant);
  fieldDiv.appendChild(outerdiv);

  const ul = document.createElement('ul');
  ul.className = 'model-list-wrapper';
  outerdiv.appendChild(ul);
  if (enumNames && models) {
    models.forEach((model, index) => {
      if (variant === 'winning-team' && index !== 0) {
        const outerDiv = document.createElement('div');
        outerDiv.className = 'vs-container';
        const div1 = document.createElement('div');
        div1.className = 'vertical-line';
        div1.innerHTML = '&nbsp;';
        const vsText = document.createElement('p');
        // const vsText = document.createTextNode('VS');
        vsText.innerHTML = 'VS';
        const div2 = document.createElement('div');
        div2.className = 'vertical-line';
        div2.innerHTML = '&nbsp;';
        outerDiv.appendChild(div1);
        outerDiv.appendChild(vsText);
        outerDiv.appendChild(div2);
        ul.appendChild(outerDiv);
        // ul.appendChild(vsText);
      }

      const li = document.createElement('li');
      li.className = 'model-block';
      li.tabIndex = '0';

      // fetch icon with name enumNames[index]
      const icon = document.createElement('img');

      if (variant === 'winning-team') {
        icon.src = `https://main--aem-forms-martech--adobe-rnd.hlx.live/icons/${model}.gif`;
      } else if (variant === 'favourite-team') {
        icon.src = `https://main--aem-forms-martech--adobe-rnd.hlx.live/icons/${model}.svg`;
      }

      icon.alt = `Image for car model ${model}`;
      icon.className = 'team-icon';
      li.appendChild(icon);

      const input = document.createElement('input');
      input.type = 'radio';
      input.classList.add('model-radio');
      // input.classList.add(variant);
      input.value = model;
      // input.id = getId(field.name);
      input.dataset.fieldType = field.fieldType;
      input.name = field.id;
      input.tabIndex = '-1';
      li.appendChild(input);

      /* const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.srcset = model.source;
      picture.appendChild(source);
      const img = document.createElement('img');
      img.alt = `Image for car model ${model.name}`;
      img.src = model.source;
      picture.appendChild(img);
      li.appendChild(picture); */

      if (variant === 'winning-team') {
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.className = 'model-name';
        label.textContent = enumNames[index];
        li.appendChild(label);
      }

      ul.appendChild(li);
    });
  }

  return fieldDiv;
}
