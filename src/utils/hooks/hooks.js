import axios from "axios";

const baseUrl = "http://localhost:39510";


let config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
}
let imagesConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
}


export async function postData(url, data) {
    try {
        return await axios.post(`${baseUrl}/${url}`,
            JSON.stringify(data),
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                }
            }
            ,
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

export async function createOrder(url ,token) {
    try {
        return await axios.post(`${baseUrl}/${url}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        },).then(response => {
            if (response.status === 200) {
                localStorage.setItem("orderId", response.data.id);
                localStorage.setItem("userId", response.data.clientId);
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
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
            ,
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
    return await fetch(`${baseUrl}/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    },)
        .then(response => {
            return response.blob()
        })
        .catch(error => console.error(error));

}

export async function getData(url) {
    try {
        return await axios.get(`${baseUrl}/${url}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            },
        ).then(response => {
            if (response.status === 200) {
                return response.data;
            }

        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

export async function deleteData(url) {
    try {
        return await axios.delete(`${baseUrl}/${url}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
            ,
        ).then(response => {
            if (response.status === 204 || response.status === 200) {
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
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                }
            }
            ,
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


export const addItemToOrder = (product) => {
    postData(`orders/${localStorage.getItem('orderId')}/items`, {
        "productId": product.id,
        "qty": 1,
        "comment": product.description
    })
}











