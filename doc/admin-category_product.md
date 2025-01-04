# API SPEC Category Product (Admin)

> ### Endpoint: Get All Category

- **Method** : `GET`
- **URL** : `/api/v1/admin/category-product`

```json
{
  "success": true,
  "message": "Get category successfully!",
  "data": [
    {
      "name": "Name Category",
      "slug": "Slug Category",
      "Image": "URL Image",
      "status": "Status Category"
    },
    {
      "name": "Name Category",
      "slug": "Slug Category",
      "Image": "URL Image",
      "status": "Status Category"
    }
  ]
}
```

> ### Endpoint: Get Single Category

- **Method** : `GET`
- **URL** : `/api/v1/admin/category-product/{slug}`

```json
{
  "success": true,
  "message": "Get single category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```

> ### Endpoint: Create Category

- **Method** : `POST`
- **URL** : `/api/v1/admin/category-product`

```json
{
  "success": true,
  "message": "Create category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```

> ### Endpoint: Update Category

- **Method** : `PUT`
- **URL** : `/api/v1/admin/category-product/{slug}`

```json
{
  "success": true,
  "message": "Update category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```

> ### Endpoint: Inactivated Category

- **Method** : `PATCH`
- **URL** : `/api/v1/admin/category-product/{slug}/inactivated`

```json
{
  "success": true,
  "message": "Inactivated category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```

> ### Endpoint: Activated Category

- **Method** : `PATCH`
- **URL** : `/api/v1/admin/category-product/{slug}/activated`

```json
{
  "success": true,
  "message": "Activated category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```

> ### Endpoint: Delete Permenent Category

- **Method** : `DELETE`
- **URL** : `/api/v1/admin/category-product/{slug}`

```json
{
  "success": true,
  "message": "Delete category successfully!",
  "data": {
    "name": "Name Category",
    "slug": "Slug Category",
    "Image": "URL Image",
    "status": "Status Category"
  }
}
```