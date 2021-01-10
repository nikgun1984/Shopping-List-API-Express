$('form#submit-form').on('submit', async (evt) => {
  evt.preventDefault();
  const product = $('#product').val();
  const amount = $('#amount').val();
  const res = await axios.post('/items/', {
    body: {
      product,
      amount,
    },
  });
});

/*
<tbody>
    <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
    </tr>
</tbody>
*/

const fetchItems = async () => {
  const res = await axios.get('/items/');
  const items = res.data.items;

  console.log(res.data);
  const body = $('tbody');
  if (items.length) {
    $('table#products').removeClass('is-hidden');
    for (let item of items) {
      const time = res.data.timeAdded;
      body.append(`
        <tr id="${item.id}">
            <th scope="row">${item.id}</th>
                <td>${item.body.product}</td>
                <td>${item.body.amount}</td>
                <td><i class="fas fa-edit"></i></td>
                <td><i class="fas fa-trash-alt"></i></td>
        </tr>
    `);
    }
  }
};

fetchItems();
