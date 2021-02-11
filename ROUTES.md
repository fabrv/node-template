# Routes
Description of routes available in this project
## `/auxes`
### **GET**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| limit     | number | (optional) Max. amount of rows to return. Default is 25         |
| offset    | number | (optional) Skip `n` amount of rows before return. Default is 0 |
  
Request examples:
```
/auxes?limit=25&offset=0
```
```
/auxes
```
Response example:
```json
[
  {
    "id": "26e0f3db-4eae-4b7a-9d4f-0314a1dba8be",
    "name": "Calls",
    "active": true
  },
  {
    "id": "18804791-bb92-4ce4-9fdc-affad44fd23f",
    "name": "Break",
    "active": true
  }
]
```

### **POST**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| name      | string | Aux name to be inserted |

Request examples:
```
/auxes?name=Mails
```
Response example:
```json
{
  "id": "a8483877-8fb6-431c-bef7-b2653e9a1f93",
  "name": "Mails",
  "active": true
}
```

## `/auxes/<aux id>`
### **GET**
Request examples:
```
/auxes/a8483877-8fb6-431c-bef7-b2653e9a1f93
```
Response example:
```json
{
  "id": "a8483877-8fb6-431c-bef7-b2653e9a1f93",
  "name": "Mails",
  "active": true
}
```

## `/instances`
### **GET**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| limit     | number | (optional) Max. amount of rows to return. Default is 25         |
| offset    | number | (optional) Skip `n` amount of rows before return. Default is 0 |
  
Request examples:
```
/instances?limit=25&offset=0
```
```
/instances
```
Response example:
```json
[
  {
    "id": "da25a22f-013e-4b73-aa06-ed92e68149c0",
    "name": "Pradera",
    "active": true
  }
]
```

### **POST**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| name      | string | Instance name to be inserted |

Request examples:
```
/instances?name=Merliot
```
Response example:
```json
{
  "id": "018c23a8-9321-4c10-84a6-907d4a0d6b3b",
  "name": "Merliot",
  "active": true
}
```

## `/instances/<instance id>`
### **GET**
Request examples:
```
/instances/018c23a8-9321-4c10-84a6-907d4a0d6b3b
```
Response example:
```json
{
  "id": "018c23a8-9321-4c10-84a6-907d4a0d6b3b",
  "name": "Merliot",
  "active": true
}
```

## `/subgroups`
### **GET**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| limit     | number | (optional) Max. amount of rows to return. Default is 25         |
| offset    | number | (optional) Skip `n` amount of rows before return. Default is 0 |
  
Request examples:
```
/subgroups?limit=25&offset=0
```
```
/subgroups
```
Response example:
```json
[
  {
    "id": "11a3662f-e47f-41a0-9a98-bfe6eaa46da8",
    "name": "IS GT",
    "active": true
  },
  {
    "id": "fe37f553-db37-45b2-b1fd-ae3b10d6d04a",
    "name": "Fossil",
    "active": true
  }
]
```

### **POST**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| name      | string | Subgroup name to be inserted |

Request examples:
```
/subgroups?name=Fossil
```
Response example:
```json
{
  "id": "fe37f553-db37-45b2-b1fd-ae3b10d6d04a",
  "name": "Fossil",
  "active": true
}
```

## `/subgroups/<subgroup id>`
### **GET**
Request examples:
```
/subgroups/fe37f553-db37-45b2-b1fd-ae3b10d6d04a
```
Response example:
```json
{
  "id": "fe37f553-db37-45b2-b1fd-ae3b10d6d04a",
  "name": "Fossil",
  "active": true
}
```

## `/users`
### **GET**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| limit     | number | (optional) Max. amount of rows to return. Default is 25         |
| offset    | number | (optional) Skip `n` amount of rows before return. Default is 0 |
  
Request examples:
```
/users?limit=25&offset=0
```
```
/users
```
Response example:
```json
[
  {
    "id": "68d38821-dca5-4f2e-bc8f-4d2b789e65c5",
    "username": "name.lastname",
    "active": true
  }
]
```

### **POST**
Query parameters:
| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| name      | string | Subgroup name to be inserted |

Request examples:
```
/users?username=lastname.name&password=1234
```
Response example:
```json
{
  "id": "a1f0a5e5-c1da-450c-b350-2219766c9189",
  "username": "lastname.name"
}
```

## `/users/<user id>`
### **GET**
Request examples:
```
/users/a1f0a5e5-c1da-450c-b350-2219766c9189
```
Response example:
```json
{
  "id": "a1f0a5e5-c1da-450c-b350-2219766c9189",
  "username": "lastname.name",
  "active": true
}
```