const os = require('os');
const axios = require('axios');
const commonParams = {

}

function get(url, params) {
    return axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/',
            origin: 'https://y.qq.com/'
        },
        params: Object.assign({}, commonParams, params)
    })
}

// 注册需要代理的路由
function registerRouter(app){
    registerGetSongsByName(app)
}

// 获取ip
function getIP(){
    const interfaces = os.networkInterfaces();
    for(const key in interfaces){
        const interface = interfaces[key];
        for (let i = 0; i < interface.length; i++) {
            const alias = interface[i];
            if (
                alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
}

function registerGetSongsByName(app){
    // 获取请求的url
    let requestUrl = '';
    let requestType = process.env["VUE_APP_SERVE_REQUESTTYPE"];
    let port = `${process.env["VUE_APP_SERVE_REQUESTPORT"]}`;
    if(process.env.NODE_ENV == 'development'){
        let ip = getIP();
        ip = ip ? ip : `127.0.0.1`;
        requestUrl = `${ip}:${port}`;
    } else {
        requestUrl = `${process.env["VUE_APP_SERVE_REQUESTURL"]}:${port}`;
    }
    app.get('/api/cloudsearch', (request, response) => {
        const interfaceUrl = `${requestType}${requestUrl}/cloudsearch`;
        console.log(interfaceUrl);
        console.log(request.query);
        get(interfaceUrl, request.query).then(res => {
            console.log(res);
            const { result: { songs, songCount }, code } = res.data;
            console.log(code, songs, songCount)
            response.json({
                data: {
                    count: songCount
                },
                resCode: 0,
                resMsg: '成功!!'
            })
        }).catch(reason => {
            response.json({
                data: null,
                resCode: -1,
                resMsg: `接口异常${reason}`
            })
        })
    })
}
module.exports = registerRouter