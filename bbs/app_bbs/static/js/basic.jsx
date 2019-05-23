
var bindURL = "http://192.168.1.7:5000";

function getCookieItem(sKey) {
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + sKey.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
}

function isLogin() {
    return getCookieItem('isLogin') == 'true';
}

function isAdmin() {
    return getCookieItem('isAdmin') == 1;
}

function isSelf(uid) {
    return getCookieItem('uid') == uid;
}

function canDelete(uid) {
    return isSelf(uid) | isAdmin();
}

module.exports = {
    bindURL: bindURL,
    getCookieItem: getCookieItem,
    isLogin: isLogin,
    isAdmin: isAdmin, 
    isSelf: isSelf,
    canDelete: canDelete,
}