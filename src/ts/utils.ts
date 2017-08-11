class huUtils {
    static randomId(prefix = '', postfix = '') {
        return prefix + new Date().getTime() + Math.ceil(Math.random() * 1000) + postfix;
    }
}