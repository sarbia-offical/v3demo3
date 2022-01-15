/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2022-01-13 10:36:29
 * @LastEditors: zouwenqin
 * @LastEditTime: 2022-01-13 11:58:37
 */
const DEFAULT_TIME_OUT = 1000 * 60 * 60 * 24 * 7
export default class storage {
    private static storageFactory: any = null;
    private static localstorage = localStorage;
    public static initial() {
        storage.storageFactory = !storage.storageFactory ? new storage() : storage.storageFactory;
    }
    public static getStorageFactory: any = () => storage.storageFactory;
    /**
     * @name: 
     * @msg: 
     * @param {string} key
     * @param {any} value
     * @return {*}
     */
    set(key: string, value: any, expire: number = DEFAULT_TIME_OUT) {
        const storageStr = JSON.stringify({
            value: value,
            expire: new Date().getTime() + expire
        });
        storage.localstorage.setItem(key, storageStr)
    }

    /**
     * @name: 
     * @msg: 
     * @param {string} key
     * @return {*}
     */
    get(key: string) {
        try {
            let storageStr = JSON.parse(storage.localstorage.getItem(key) as string);
            if (storageStr) {
                const { value, expire } = storageStr;
                // 大于7天清理缓存
                if (!!expire && Date.now() > expire) {
                    this.del(key);
                    return null;
                } else {
                    return value;
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * @name: 
     * @msg: 
     * @param {string} key
     * @return {*}
     */
    del(key: string) {
        storage.localstorage.removeItem(key);
    }
}