import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'
import qs from 'qs'
axios.interceptors.request.use(config => {
    if (!['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
        config.params = config.data
        if ('data' in config) {
            delete config.data
        }
    }
    console.log(config.headers)
    console.log(config.header)
    // delete config.headers.origin
    return config
})

function sortObj(obj) {
    // var sortArry = new Array;
    var keysArr = Object.keys(obj).sort();
    var sortObj = {};
    for (var i in keysArr) { sortObj[keysArr[i]] = encodeURIComponent(obj[keysArr[i]]); }
    return sortObj;
}

export default function (config) {
    let x = 'https://'
    let baseUrl = config.baseUrl || 'api.hbdm.com'
    let data = {
        'AccessKeyId': '1627058f-ht4tgq1e4t-0f100b56-383d4',
        // 'SecretKey': '4caf0de0-f3ff7aa9-2924977a-9d21d',
        'SignatureVersion': '2',
        'SignatureMethod': 'HmacSHA256',
        'Timestamp': `${moment().format('YYYY-MM-DD')}T${moment().format('HH:mm:ss')}`,
        ...config.data
    }
    data = sortObj(data)
    let str = `${(config.method || 'GET').toLocaleUpperCase()}\n${baseUrl}\n${config.url}\n${qs.stringify(data)}`
    console.log(str)
    let SKEnc = CryptoJS.HmacSHA256(str, '4caf0de0-f3ff7aa9-2924977a-9d21d')
    let sign = CryptoJS.HmacSHA256(str, SKEnc).toString()

    data.Signature = sign
    config.url = x + baseUrl + config.url
    return new Promise((res, rej) => {
        // 发送 POST 请求
        axios({
            method: config.method || 'get',
            ...config,
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                ...config.header,
            },
            data: {
                ...data
            }
        }).then(_res => {
            if (_res.status === 200) {
                res(_res.data)
            } else {
                rej(_res.data)
            }
        }).catch(error => rej(error))

    })
}