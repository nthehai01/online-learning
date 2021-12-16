class LocalStorageUtils {
    getItem(key, defaultValue = '""') {
        if (typeof localStorage !== 'undefined') {
            let item = localStorage.getItem(key);
            if (item && item === 'undefined') item = defaultValue;
            return JSON.parse(item);
        }
        return undefined;
    }

    getToken() {
        return this.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME);
    }

    getUser() {
        return this.getItem(process.env.REACT_APP_LOCAL_STORAGE_USER_NAME);
    }

    setItem(key, value = '') {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    setToken(value = '') {
        this.setItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME, value);
    }

    setUser(value = '') {
        this.setItem(process.env.REACT_APP_LOCAL_STORAGE_USER_NAME, value);
    }

    removeItem(key) {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    clear() {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
    }
    
 
};

export default new LocalStorageUtils();