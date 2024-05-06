export const baseUrl = 'http://localhost:8080';

// used to post data 
export const fetchPost = async ({body,url}) => {
    const data = await fetch(`${baseUrl}${url}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const jsonData = await data.json();
    console.log("Fetch data  is ",jsonData);
    return jsonData;
}
