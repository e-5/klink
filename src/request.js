import axios from 'axios'
export default function (config) {
    return new Promise((res, rej) => {
        // 发送 POST 请求
        axios({
            method: 'get',
            ...config,
            headers: {
                'X-HB-RateLimit-Requests-Expire': '6000000',
                'Content-Type': 'Content-Type: application/x-www-form-urlencoded',
                'AccessKey': '1627058f-ht4tgq1e4t-0f100b56-383d4',
                'SecretKey': '4caf0de0-f3ff7aa9-2924977a-9d21d',
                ...config.header,
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