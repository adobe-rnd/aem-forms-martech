// eslint-disable-next-line no-unused-vars
export default async function decorate(fieldDiv, field) {
  const labelEl = fieldDiv.querySelector('legend');
  fieldDiv.replaceChildren(labelEl);
  const models = field.enum;
  const enumNames = field.enumNames;

  const outerdiv = document.createElement('div');
  outerdiv.classList.add('image-choice-container');
  fieldDiv.appendChild(outerdiv);

  const ul = document.createElement('ul');
  ul.className = 'model-list-wrapper';
  outerdiv.appendChild(ul);
  if (enumNames && models) {
    models.forEach((model, index) => {
      if (index !== 0) {
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

      const input = document.createElement('input');
      input.type = 'radio';
      input.className = 'model-radio';
      input.value = model;
      // input.id = getId(field.name);
      input.dataset.fieldType = field.fieldType;
      input.name = field.id;
      input.tabIndex = '-1';
      li.appendChild(input);

      // fetch icon with name enumNames[index]
      const icon = document.createElement('img');

      /* icon.src = `../../icons/${model}.gif`;
      if (icon.src === 'null') {
        icon.src = `../../icons/${model}.svg`;
      } */

      fetch(`../../icons/${model}.gif`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Image not found');
    }
    icon.src = `../../icons/${model}.gif`;
  })
  .catch(error => {
    icon.src = `../../icons/${model}.svg`;
  });

      icon.alt = `Image for car model ${model}`;
      icon.className = 'team-icon';
      li.appendChild(icon);

      /* const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.srcset = model.source;
      picture.appendChild(source);
      const img = document.createElement('img');
      img.alt = `Image for car model ${model.name}`;
      img.src = model.source;
      picture.appendChild(img);
      li.appendChild(picture); */

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'model-name';
      label.textContent = enumNames[index];
      li.appendChild(label);

      ul.appendChild(li);
    });
  }

  return fieldDiv;
}
