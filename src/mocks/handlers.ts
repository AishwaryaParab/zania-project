import { http, HttpResponse } from 'msw';
import { DocumentItem } from '../utils/model';
import cat1 from '../assets/cat1.jpg';
import cat2 from '../assets/cat2.jpg';
import cat3 from '../assets/cat3.jpg';
import cat4 from '../assets/cat4.jpg';
import cat5 from '../assets/cat5.jpg';

const initialData: DocumentItem[] = [
  { type: "bank-draft", title: "Bank Draft", imageUrl: cat1, position: 0 },
  { type: "bill-of-lading", title: "Bill of Lading", imageUrl: cat2, position: 1 },
  { type: "invoice", title: "Invoice", imageUrl: cat3, position: 2 },
  { type: "bank-draft-2", title: "Bank Draft 2", imageUrl: cat4, position: 3 },
  { type: "bill-of-lading-2", title: "Bill of Lading 2", imageUrl: cat5, position: 4 }
];

function getStoredData(): DocumentItem[] {
    return localStorage.getItem('mock-data') ? JSON.parse(localStorage.getItem('mock-data')!) : initialData;
}

function storeData(data: any) {
    localStorage.setItem('mock-data', JSON.stringify(data));
}

export const handlers = [
    http.get('/api/items', () => {
        return HttpResponse.json(getStoredData());
    }),
    http.post('/api/items', async ({ request }) => {
        const updatedItems = await request.json();
        storeData(updatedItems);

        return HttpResponse.json(updatedItems, { status: 201 });
    }),
    http.put('/api/items/:position', async ({ params, request }) => {
        const position = parseInt(params.position as string);

        try {
            const updatedItem = await request.json() as DocumentItem;
            const storedData: DocumentItem[] = getStoredData();
            const updatedItems = storedData.map((item) => (
                item.position === position ? { ...item, ...updatedItem } : item
            ))
            storeData(updatedItems);
    
            return HttpResponse.json(updatedItems);
        } catch(err) {
            console.log(err);
        }
    }),
    http.delete('/api/items/:position', ({ params }) => {
        const position = parseInt(params.position as string);
        const storedData = getStoredData();
        const updatedItems = storedData.filter((item) => item.position !== position);
        storeData(updatedItems);

        return HttpResponse.json(updatedItems, { status: 204 });
    })
]