// let base = "http://localhost:3011"
let base = "http://101.132.180.67:3020"
import axios from "axios";
const gl_ajax = requestData => {
    !requestData.catchStatus ? requestData.catchStatus = [] : "";
    requestData.senderr === undefined ? requestData.senderr = true : ""
    return axios({
            method: requestData.method,
            url: base + requestData.url,
            // url: requestData.url,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            data: requestData.method != "get" ? requestData.data : "",
            params: requestData.method == "get" ? requestData.data : ""
        })
        .then(res => {

            if (res.data.status == 500) {
                this.$router.push({
                    name: 'login'
                })
            } else {
                requestData.success ? requestData.success(res) : "";
            }
        })
        .catch(err => {
            console.log(err)
        });
};
export {
    gl_ajax,
    base
}