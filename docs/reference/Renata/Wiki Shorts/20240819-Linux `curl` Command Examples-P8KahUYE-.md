# Linux `curl` Command Examples

## HTTP GET Operation
- `curl http://abc.com`  
  Fetch a URL and display its content.

- `curl -o output.txt http://abc.com`  
  Save response to a file.

- `curl -A "Mozilla/5.0" http://abc.com`  
  Set user-agent.

- `curl -e http://referer.com http://abc.com`  
  Specify a referer.

- `curl -x http://proxy.com:port http://abc.com`  
  Use HTTP proxy.

- `curl -H "Authorization: bearer-token" http://abc.com`  
  Use custom headers.

- `curl -u username:password http://abc.com`  
  Use user authentication.

- `curl -L http://abc.com`  
  Follow any redirects until the final destination is reached.

- `curl -b /path/to/cookie http://abc.com`  
  Read a local cookie file.

- `curl -c /path/to/cookie http://abc.com`  
  Write a cookie file received.

- `curl --compressed http://abc.com`  
  Automatically decompress response.

## HTTP POST/PUT Operation
- `curl -X POST -d "key1=val1&key2=val2" http://abc.com`  
  Specify key-value pairs in POST.

- `curl -X POST -d '{"k1":"v1"}' -H "Content-Type: application/json" http://abc.com`  
  Use JSON data.

- `curl -X POST -F "name=dan" -F "file=@/path/to/file.txt" http://abc.com`  
  File upload.

- `curl -X POST --data-binary @/path/to/file.bin http://abc.com`  
  Binary file upload.

- `curl -X PUT -d "key1=val1&key2=val2" http://abc.com`  
  Specify key-value pairs in PUT.

## File Download Operation
- `curl -O http://abc.com/file.zip`  
  Download a file and save it as the same name.

- `curl -O -C - http://abc.com/file.zip`  
  Continue a partial download.

- `curl --limit-rate 1M -O http://abc.com/file.zip`  
  Rate-limit download to 1MB/s.

- `curl --remote-name-all http://abc.com/img[1-10].jpg`  
  Download multiple files.

- `curl http://{foo,bar}.com/index.htm --output "#1.htm"`  
  Download from multiple domains.
