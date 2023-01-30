# Backend Assessment

### Assumptions

I've assumed the following few facts while working on this project

- It has been asumed that we will be dealing with vanity plates. Hence the number of chacter the api accepts for License Plate are between 6-8 [United States License Plates](https://en.wikipedia.org/wiki/United_States_license_plate_designs_and_serial_formats).
- I've also assumed that front-end implementation of state and color selection will be a dropdown. Hence, I've added a `{value: label}` to represent the options at the backend".

## Endpoint


```http
GET /registrations
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `none` | `none` | **none** |

### Response

return the JSON representation of the registrations in the system

```javascript
[
 {
        "id": 13,
        "license_plate_number": "AAA1234",
        "registration_number": "BBBB4567",
        "name_on_registration": "John doe",
        "car_on_registration": {
            "id": 9,
            "vin_number": "4V4NC9JH21N322086",
            "value_of_vehicle": 20000,
            "milage_of_vehicle": 3000,
            "description": "Volvo truck is fast and reliable",
            "vehicle_make": "VOLVO TRUCK",
            "vehicle_model": "VNL",
            "vehicle_year": "2001"
        },
        "state_of_registration": {
            "id": 21,
            "value": "LA",
            "label": "Louisiana"
        }
    }
]
```
## Endpoint
```http
GET /registrations/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | **Required** |

### Response

return the JSON representation of the registrations in the system

```javascript
 {
        "id": 13,
        "license_plate_number": "AAA1234",
        "registration_number": "BBBB4567",
        "name_on_registration": "John doe",
        "car_on_registration": {
            "id": 9,
            "vin_number": "4V4NC9JH21N322086",
            "value_of_vehicle": 20000,
            "milage_of_vehicle": 3000,
            "description": "Volvo truck is fast and reliable",
            "vehicle_make": "VOLVO TRUCK",
            "vehicle_model": "VNL",
            "vehicle_year": "2001"
        },
        "state_of_registration": {
            "id": 21,
            "value": "LA",
            "label": "Louisiana"
        }
    }
```
## Endpoint
```http
Post /registrations/
```
### Request Body

The body of request is given as

```javascript
 {
     "license_plate_number" : "KKB3457",
     "registration_number" : "AQWE1234",
     "name_on_registration" : "Some Random Name",
     "state_of_registration": "CA",

     "car_details" : {
         "vin_number" : "4V4NC9JH21N322086",
         "value_of_vehicle" : 20000,
         "milage_of_vehicle": 3000,
         "description": "Awesome Fast Car",
         "color_of_vehicle": "red"
     }

 }
```

### Response

The body of request is given as

```javascript
 {
    "license_plate_number": "KKB3457",
    "registration_number": "12345678",
    "name_on_registration": "Temp 3",
    "state_of_registration": {
        "id": 21,
        "value": "LA",
        "label": "Louisiana"
    },
    "car_on_registration": {
        "vin_number": "4V4NC9JH21N322086",
        "value_of_vehicle": 20000,
        "milage_of_vehicle": 3000,
        "description": "Awesome Fast Car",
        "vehicle_make": "VOLVO TRUCK",
        "vehicle_model": "VNL",
        "vehicle_year": "2001",
        "color_of_vehicle": {
            "value": "red",
            "label": "Red",
            "id": 18
        },
        "id": 9
    },
    "id": 13
}
```

## Endpoint
```http
DELETE /registrations/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | **Required** |

### Response

return the JSON representation of the registrations in the system

```javascript
{
    "raw": [],
    "affected": 1
}
```

## Status Codes


| Status Code | Description |
| :--- | :--- |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


### Prerequisites

- yarn
  - [General install](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
  - [homebrew](https://formulae.brew.sh/formula/yarn)

- Docker
  - [General install](https://docs.docker.com/get-docker/)
  - [homebrew](https://formulae.brew.sh/cask/docker)

`Note` If you only want to run this locally you can skip the docker process entirely. However, you will need to have mySql with the correct `db` and `user` setup/

### Getting Started

To bring up the environment, perform the following steps:

1. Bring up the MySQL database

    ```bash
    # In the project root directory
    docker compose up
    # Exposes database on port 3306
    ```

2. Bring up express server in development mode

    ```bash
    # In a separate terminal session
    yarn dev
    # Exposes express app on port 8889
    ```