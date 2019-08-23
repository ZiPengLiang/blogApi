let base = "http://localhost:3011"
import axios from "axios";
export const gl_ajax = requestData => {
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
            requestData.success ? requestData.success(res) : "";
            if (res.data.status == 500) {
                this.$router.push({
                    name: 'login'
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
};