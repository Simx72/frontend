export interface XHROptions {
  to: string;
  method?: string;
  body?: Document | XMLHttpRequestBodyInit | null;
}

function XHR(options: XHROptions, callback: (xhr: XMLHttpRequest, ready: boolean, res?: any) => void) {
  console.log(options);
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    callback(xhr,
      xhr.status === 200 && xhr.readyState === 4,
      JSON.parse(xhr.responseText)
    );
  }
  xhr.open(options.method || "GET", process.env.REACT_APP_SERVER_URL + options.to);
  if (options.method === 'POST')
    xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(options.body);
}


export { XHR };
export default XHR;