import axios from "axios";

const baseUrl = "http://localhost:39510";

let config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
}
let postImagesConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data',
    }
}
export async function postData(url, data) {
    try {
        return await axios.post(`${baseUrl}/${url}`,
            JSON.stringify(data),
            config,
        ).then(response => {
            if (response.status === 200) {
                return response.status;
            }
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}
export async function postImages(url, data) {
    try {
        return await axios.post(`${baseUrl}/${url}`,
            data,
            postImagesConfig,
        ).then(response => {
            if (response.status === 200) {
                return response.status;
            }
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

export async function getData(url) {
    try {
        return await axios.get(`${baseUrl}/${url}`,
            config,
        ).then(response => {
            return response.data;
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

export async function deleteData(url) {
    try {
        return await axios.delete(`${baseUrl}/${url}`,
            config,
        ).then(response => {
            if (response.status === 204) {
                return response.status
            }
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

export async function putData(url,data) {
    try {
        return await axios.put(`${baseUrl}/${url}`,
            JSON.stringify(data),
            config,
        ).then(response => {
            if (response.status === 200 || response.status === 204) {
                return response.status;
            }
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}




