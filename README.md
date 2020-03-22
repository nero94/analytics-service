# Analytics Service API


## Run the app

    npm run start

## Debug the app

    npm run debug

# REST API

The REST API to the app is described below.

## Create new page-view event

### Request

`POST /`

    curl --location --request GET 'localhost:3000/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    	"timestamp": "1584635940931",
    	"pageId": "page_2",
    	"userId": "user_1"
    }'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 97

    {
        "result": "https://analytics-service-83eb6.firebaseio.com/analytics-events/-M32SXWMGqkAW37WzEux"
    }

## Get page-view events by page ID

### Request

`Get /page/:pageId`

    curl --location --request GET 'localhost:3000/page/page_2' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu' \

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /page/page_2
    Content-Length: 152

    [
        {
            "id": "-M32SXWMGqkAW37WzEux",
            "userIp": "::1",
            "browserName": "PostmanRuntime",
            "userId": "user_1",
            "pageId": "page_2",
            "timestamp": "2020-03-19T16:39:00.931Z"
        }
    ]

## Get page-view events by browser name

### Request

`Get /browser/:browserName`

    curl --location --request GET 'localhost:3000/browser/PostmanRuntime' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu' \

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /browser/PostmanRuntime
    Content-Length: 152

    [
        {
            "id": "-M32SXWMGqkAW37WzEux",
            "userIp": "::1",
            "browserName": "PostmanRuntime",
            "userId": "user_1",
            "pageId": "page_2",
            "timestamp": "2020-03-19T16:39:00.931Z"
        }
    ]

## Get page-view events by country

### Request

`Get /country/:countryName`

    curl --location --request GET 'localhost:3000/country/Ukraine' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu' \

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /country/Ukraine
    Content-Length: 152

    [
        {
            "id": "-M32XeFoJFkf3xDrtNJU",
            "userIp": "::1",
            "browserName": "PostmanRuntime",
            "userId": "user_2",
            "pageId": "page_1",
            "countryName": "Ukraine",
            "timestamp": "1975-01-09T02:13:14.093Z"
        }
    ]


## Get page-view events by user's returning rates

### Request

`GET /returning-rates`

    curl --location --request GET 'localhost:3000/returning-rates' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: 6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu' \

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 536

    [
        {
            "userId": "user_2",
            "rate": 3,
            "events": [
                {
                    "id": "-M32UPYmREkU3k7D5Ui5",
                    "userIp": "::1",
                    "browserName": "PostmanRuntime",
                    "userId": "user_2",
                    "pageId": "page_1",
                    "countryName": "UNRECOGNIZED_COUNTRY",
                    "timestamp": "1975-01-09T02:13:14.093Z"
                },
                {
                    "id": "-M32Ug3fxhfzbSgQh9jJ",
                    "userIp": "::1",
                    "browserName": "PostmanRuntime",
                    "userId": "user_2",
                    "pageId": "page_1",
                    "countryName": "UNRECOGNIZED_COUNTRY",
                    "timestamp": "1975-01-09T02:13:14.093Z"
                },
                {
                    "id": "-M32XeFoJFkf3xDrtNJU",
                    "userIp": "::1",
                    "browserName": "PostmanRuntime",
                    "userId": "user_2",
                    "pageId": "page_1",
                    "countryName": "Ukraine",
                    "timestamp": "1975-01-09T02:13:14.093Z"
                }
            ]
        },
        {
            "userId": "user_1",
            "rate": 1,
            "events": [
                {
                    "id": "-M32SXWMGqkAW37WzEux",
                    "userIp": "::1",
                    "browserName": "PostmanRuntime",
                    "userId": "user_1",
                    "pageId": "page_2",
                    "countryName": "UNRECOGNIZED_COUNTRY",
                    "timestamp": "2020-03-19T16:39:00.931Z"
                }
            ]
        }
    ]