import axios from "axios";

const baseUrl = "http://localhost:39510";

let config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
}
let configtext = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
}
let imagesConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
}
export async function postDataWithoutPar(url) {
    console.log(configtext);
        return await axios.post(`${baseUrl}/${url}`,
            configtext
        ).then(response => {
            if (response.status === 200) {
                return response.status;
            }
            if (response.status === 401) {
                return "Не авторезаваний";
            }
        });
 
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
            imagesConfig,
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


export async function getFileDataProduct(url) {
    return await fetch(`${baseUrl}/${url}`, imagesConfig)
        .then(response => {
            return response.blob()
        })
        .catch(error => console.error(error));

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

export async function putData(url, data) {
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

export async function postLoginData(url, data) {
    try {
        return await axios.post(`${baseUrl}/${url}`,
            JSON.stringify(data),
            config,
        ).then(response => {
            if (response.status === 200) {
                return response;
            }
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}




