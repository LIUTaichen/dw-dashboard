import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const apps = [
        { id: 11,
            name: 'Fleetagent',
            url: 'https://portal.fleetagent.co.nz',
            desciption: 'Gps tracking portal',
            imageUrl: 'https://www.google.com/webpagethumbnail?c=63&d=https://portal.fleetagent.co.nz/&r=4&s=154:96&a=iOInTjgwSYbDwNxj-eflOdQN1A8'},
          { id: 12,
            name: 'Mr. Nice12',
            url: '/',
            desciption: 'mock',
            imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*nbJ41jD1-r2Oe6FsLjKaOg.png' },
          { id: 13,
            name: 'Mr. Nice13',
            url: '/',
            desciption: 'mock',
            imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*nbJ41jD1-r2Oe6FsLjKaOg.png' },
          { id: 14,
            name: 'Mr. Nice14',
            url: '/',
            desciption: 'mock',
            imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*nbJ41jD1-r2Oe6FsLjKaOg.png' },
          { id: 15,
            name: 'Mr. Nice15',
            url: '/',
            desciption: 'mock',
            imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*nbJ41jD1-r2Oe6FsLjKaOg.png' },
          { id: 16,
            name: 'Mr. Nice16',
            url: '/',
            desciption: 'mock',
            imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*nbJ41jD1-r2Oe6FsLjKaOg.png' }
    ];
    return {apps};
  }
}