const API_URL = process.env.NEXT_PUBLIC_API_URL

const apiConstants = {
    listStories: '/stories',
    storyBySlug: '/stories/by-slug',
    
    verifyUser: '/users/verify-token',
    createStory: '/stories',
    createCategory: '/categories',
    listCategories: '/categories'
}

const getApi = async ({ url }) => {
    const URL = API_URL + url;
    try {
        const result = await fetch(URL);
        const data = await result.json();
        return data;
    }
    catch (error) {
        console.log("Error in get api service: ")
        console.log(error)
    }
}

const postApi = async ({ url, payload }) => {
    const URL = API_URL + url

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ ...payload }),
        });

        const data = await response.json()

        return data
    }
    catch (error) {
        console.log("Error in post api service: ")
        console.log(error)
    }
}

const verifyUser = async () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage?.getItem('user'))

    return userData

    try {
        const data = await postApi({
            url: apiConstants.verifyUser,
            payload: { token },
        });

        if (!data?.valid) {
            window.location.href = '/login';
        }

        return userData
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    apiConstants,
    getApi,
    postApi,
    verifyUser,
}