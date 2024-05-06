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

export const fetchGet = async ({url}) => {
    const data = await fetch(`${baseUrl}${url}`);
    const jsonData = await data.json();
    return jsonData;
}

export const downloadCsv = function({url,name}) {

    fetch(baseUrl + url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            console.log(url)
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });

}