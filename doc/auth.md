# API SPEC Authentication

> ### Endpoint: Login Admin 
- **Method** : `POST`
- **URL** : `/api/v1/admin/login`

```json
{
    "success": true,
    "message": "Login successfully!",
    "data" : {
        "name" : "Name",
        "email" : "Email",
        "role" : "Role"
    }
}
```

> ### Endpoint: Login Seller and Customer 
- **Method** : `POST`
- **URL** : `/api/v1/login`

```json
{
    "success": true,
    "message": "Login successfully!",
    "data" : {
        "name" : "Name",
        "email" : "Email",
        "role" : "Role"
    }
}
```

> ### Endpoint: Register Seller and Customer 
- **Method** : `POST`
- **URL** : `/api/v1/register`

```json
{
    "success": true,
    "message": "Register successfully!",
    "data" : {
        "name" : "Name",
        "email" : "Email",
        "role" : "Role"
    }
}
```