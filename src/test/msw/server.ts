import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const API_URL = 'http://fakestock.everys.com/api/v1/Stock';

export const server = setupServer(
  http.get(API_URL, ({ request }) => {
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get('Skip') || 0);
    const take = Number(url.searchParams.get('Take') || 3);
    const filter = (url.searchParams.get('Filter') || '').toLowerCase();

    if (filter.includes('servererror')) {
      return HttpResponse.json(
        { status: 'Error', errors: 'Looks like the service is overloaded. Try again please.' },
        { status: 200 }
      );
    }

    const dataset = [
      {
        code: '10',
        title: 'Lorem title',
        manufacturer: 'Manufacturer Name',
        description: 'Description Description Description Description',
        price: '10P',
        stock: 100,
      },
      {
        code: '20',
        title: 'Another item',
        manufacturer: 'Factory',
        description: 'Text',
        price: '20P',
        stock: 50,
      },
      {
        code: '30',
        title: 'More item',
        manufacturer: 'Factory',
        description: 'Text',
        price: '30P',
        stock: 10,
      },
      {
        code: '40',
        title: 'Second page',
        manufacturer: 'Second',
        description: 'Text',
        price: '40P',
        stock: 5,
      },
    ];

    const filtered = filter.includes('lorem')
      ? dataset.filter((item) =>
          `${item.title} ${item.description} ${item.manufacturer}`.toLowerCase().includes('lorem')
        )
      : dataset;

    const items = filtered.slice(skip, skip + take);

    return HttpResponse.json({
      status: 'Ok',
      result: {
        totalItems: filtered.length,
        items,
      },
    });
  })
);
