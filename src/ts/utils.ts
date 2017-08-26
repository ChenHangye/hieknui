class huUtils {
    static randomId(prefix = '', postfix = '') {
        return prefix + new Date().getTime() + Math.ceil(Math.random() * 1000) + postfix;
    }

    static error(msg: string) {
        console.error(msg);
    }

    static clearNullData(data:any) {
        if (Array.isArray(data) || $.isPlainObject(data)) {
            for (const k in data) {
                if(data.hasOwnProperty(k)){
                    data[k] = huUtils.clearNullData(data[k]);
                }
            }
        } else {
            data = huUtils.changeNullData(data);
        }
        return data;
    }

    static changeNullData(data:any) {
        if (data !== 0 && data !== false) {
            return data || '';
        }
        return data;
    }
}