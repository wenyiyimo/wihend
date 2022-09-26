export default class DB {
    private DB_NAME: string;
    private db: any;

    constructor(DB_NAME: string) {
        this.DB_NAME = DB_NAME;
    }

    public openDB(storeName: string, keyPath: string,indexs?: Array<string>) {
        const request = window.indexedDB.open(this.DB_NAME, 1);

        request.onerror = (event: any) => {
            console.log('error: form openDB');
        }
        request.onsuccess = (event: any) => {
            console.log('success: form openDB');
             this.db = event.target.result;
        };
        request.onupgradeneeded = (event: any) => {
            console.log('success: form onupgradeneeded');
            const {result}:any = event.target;
            const store = result.createObjectStore(storeName, { autoIncrement:true, keyPath });
            if (indexs && indexs.length) {
                indexs.forEach((index) => {
                    store.createIndex(index, index, { unique: false });
                });
            }
            store.transaction.oncomplete = function (event:any) {
                console.log('success: form oncomplete');
            }
        };
    }

    /*新增/修改*/
    updateData(storeName: string, data: any) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
        request.onsuccess = function (event:any) {
            console.log('success: form updateData');
        };
        request.onerror = function (event:any) {
            console.log('error: form updateData');
        };
    }

    /*删除*/
    deleteData(storeName: string, key: any) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = function (event:any) {
            console.log('success: form deleteData');
        };
        request.onerror = function (event:any) {
            console.log('error: form deleteData');
        }

    }

    /*查询*/
    queryData(storeName: string, key: any) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = function (event:any) {
            console.log('success: form getData',event.target.result);
        };
        request.onerror = function (event:any) {
            console.log('error: form getData');
        }
    }


}