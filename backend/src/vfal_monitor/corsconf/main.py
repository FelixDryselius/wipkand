CORS_URLS_REGEX = r'^/api/.*$'
CORS_ORIGIN_WHITELIST = (
    'localhost:8000',
    '127.0.0.1:9000',
    'localhost:4200'
)

from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = default_headers + (
    'X-CSRFTOKEN',
)