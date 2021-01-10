const body = $('tbody');

$('form#submit-form').on('submit', async (evt) => {
  evt.preventDefault();
  const product = $('#product').val();
  const amount = $('#amount').val();
  const res = await axios.post('/items/', { product, amount });
  if (res.data.items) {
    $('table#products').removeClass('is-hidden');
    console.log(res.data.items.item);
    appendItem(res.data.items.item);
  }
});

$(document).on('click', 'i.fas.fa-trash-alt', async function () {
  const tr = $(this).closest('tr');
  const id = parseInt($(this).closest('tr').attr('id'));
  const res = await axios.delete(`/items/${id}`, { id });
  console.log('DELETED');
  tr.remove();
  if (body.children().length == 0) {
    $('table#products').addClass('is-hidden');
  }
});

$(document).on('click', 'i.fas.fa-edit', async function () {
  const tr = $(this).closest('tr');
  console.log('Im in edit');
  const id = parseInt($(this).closest('tr').attr('id'));
  console.log(id);
  const product = $(this).closest('tr').children()[1].textContent;
  console.log(product);
  const amount = $(this).closest('tr').children()[2].textContent;
  console.log(amount);
  const res = await axios.patch(`/items/${id}`, { product, amount });
});

const fetchItems = async () => {
  const res = await axios.get('/items/');
  const items = res.data.items;
  if (items.length) {
    $('table#products').removeClass('is-hidden');
  }
  for (let item of items) {
    appendItem(item);
  }
};

fetchItems();

function appendItem(item) {
  console.log('I am in..........');
  body.append(`
    <tr id="${item.id}">
        <th scope="row">${item.id}</th>
            <td class="product" contenteditable='true'>${item.product}</td>
            <td class="amount" contenteditable='true'>${item.amount}</td>
            <td><i class="fas fa-edit"></i></td>
            <td><i class="fas fa-trash-alt"></i></td>
    </tr>
  `);
}
