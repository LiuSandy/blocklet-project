// db.js
const DB_NAME = 'ARCBLOCK_PROFILE';
const STORE_NAME = 'profile';
export const MOCK_PROFILE_ID = 'lius_profile';
const MOCK_PROFILE = {
  id: MOCK_PROFILE_ID,
  name: 'Lius',
  bio: '',
  company: 'Company',
  location: 'Location',
  email: 'nsiliushuang@gmail.com',
  website: 'website.com',
  socials: ['https://www.youtube.com/', 'https://bilibili.com/'],
  repos: [
    {
      title: 'react-pdf-render',
      url: 'https://github.com/LiuSandy/react-pdf-render',
      desc: '使用 PDF.js 在 react页面渲染 pdf 文件，不使用官方提供的viewe.html 工具，实现简单的工具栏操作',
      type: 'public',
      start: 12,
      fork: 3,
      tag: 'React',
    },
    {
      title: 'web-learning',
      url: 'https://github.com/LiuSandy/web-learning',
      desc: 'WEB 前端学习路径',
      type: 'private',
      start: 0,
      fork: 3,
      tag: 'javascript',
    },
  ],
};
let db;

// 获取项
export const updateItem = (body) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ ...body });

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error('Error getting items:', event);
      reject(event);
    };
  });
};

// 获取项
export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error('Error getting items:', event);
      reject(event);
    };
  });
};

// 添加项
export const addItem = (item) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error adding item:', event);
      reject(event);
    };
  });
};

// 删除项
export const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error deleting item:', event);
      reject(event);
    };
  });
};
// 打开数据库
export const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      console.error('Database error:', event);
      reject(event);
    };

    request.onsuccess = async (event) => {
      db = event.target.result;
      const profile = await getItem(MOCK_PROFILE_ID);
      if (!profile) {
        addItem(MOCK_PROFILE);
      }
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      if (!db || !db.objectStoreNames.contains(STORE_NAME)) {
        db = event.target.result;
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};
