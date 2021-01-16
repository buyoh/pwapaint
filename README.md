# pwa paint

## localhost

access `https://localhost:443/pwapaint`

```python
from http.server import SimpleHTTPRequestHandler
import ssl
import socketserver

httpd = socketserver.TCPServer(('localhost', 443), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(
    httpd.socket, certfile='/path/to/localhost.pem', keyfile='/path/to/localhost-key.pem', server_side=True)

httpd.serve_forever()
```

## codepen (not pwa)

https://codepen.io/buyoh/pen/NWRYyXQ

## ref

- https://www.iconfinder.com/icons/4177631/document_pen_sign_signature_write_icon
- https://www.iconfinder.com/icons/7263814/eraser_rubber_erase_correction_equipment_stationery_remove_icon
- https://www.iconfinder.com/icons/7263837/pencil_drawing_education_equipment_writing_stationery_creativity_icon
