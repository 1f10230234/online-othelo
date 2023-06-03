import type { BoardArray, Possition } from '$/repository/boardRepository';

export type Methods = {
  get: {
    resBody: { board: BoardArray };
  };
  post: { reqBody: Possition; resBody: { board: BoardArray } };
};
curl 'http://localhost:31577/api/board' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: ja,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Cookie: _ga=GA1.1.734031696.1685769350; _gid=GA1.1.818450414.1685769350; _gat_gtag_UA_SOMENUMBER_X=1; session=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiT3JhbmdlIEFsZ2FlIiwicGljdHVyZSI6Imh0dHBzOi8vZ2l0aHViLmNvbS8xZjEwMjMwMjM0LnBuZyIsImVtYWlsIjoib3JhbmdlLmFsZ2FlLjg4MUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2ODU3NzYyNzQsInVzZXJfaWQiOiJVRkJ2WVpmaDNOSEc3ODdjRENZc2VSSXNaNjBnIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvcmFuZ2UuYWxnYWUuODgxQGV4YW1wbGUuY29tIl0sImdpdGh1Yi5jb20iOlsiNDc4MjAzMDQyODIyNDgyMzcwNzExNDA2NzIxMjc2NzcyMDYxNDQ3MCJdfSwic2lnbl9pbl9wcm92aWRlciI6ImdpdGh1Yi5jb20ifSwiaWF0IjoxNjg1NzkyNjU0LCJleHAiOjE2ODYyMjQ2NTQsImF1ZCI6ImVtdWxhdG9yIiwiaXNzIjoiaHR0cHM6Ly9zZXNzaW9uLmZpcmViYXNlLmdvb2dsZS5jb20vZW11bGF0b3IiLCJzdWIiOiJVRkJ2WVpmaDNOSEc3ODdjRENZc2VSSXNaNjBnIn0.' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"y":2,"x":2}' \
  --compressed
  curl 'http://localhost:31577/api/board' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: ja,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H 'Cookie: _ga=GA1.1.734031696.1685769350; _gid=GA1.1.818450414.1685769350; _gat_gtag_UA_SOMENUMBER_X=1; session=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiT3JhbmdlIEFsZ2FlIiwicGljdHVyZSI6Imh0dHBzOi8vZ2l0aHViLmNvbS8xZjEwMjMwMjM0LnBuZyIsImVtYWlsIjoib3JhbmdlLmFsZ2FlLjg4MUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2ODU3NzYyNzQsInVzZXJfaWQiOiJVRkJ2WVpmaDNOSEc3ODdjRENZc2VSSXNaNjBnIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvcmFuZ2UuYWxnYWUuODgxQGV4YW1wbGUuY29tIl0sImdpdGh1Yi5jb20iOlsiNDc4MjAzMDQyODIyNDgyMzcwNzExNDA2NzIxMjc2NzcyMDYxNDQ3MCJdfSwic2lnbl9pbl9wcm92aWRlciI6ImdpdGh1Yi5jb20ifSwiaWF0IjoxNjg1NzkyNjU0LCJleHAiOjE2ODYyMjQ2NTQsImF1ZCI6ImVtdWxhdG9yIiwiaXNzIjoiaHR0cHM6Ly9zZXNzaW9uLmZpcmViYXNlLmdvb2dsZS5jb20vZW11bGF0b3IiLCJzdWIiOiJVRkJ2WVpmaDNOSEc3ODdjRENZc2VSSXNaNjBnIn0.' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"y"=2,"x"=2}' \
  --compressed