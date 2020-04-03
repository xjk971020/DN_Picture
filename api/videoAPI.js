import request from '../util/request';
export let getVideo = async ({url, data}) => {
    console.log(url, data);
    return await request({
        url,
        data
    })
};