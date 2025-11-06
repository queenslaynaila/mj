[
    {
      "id": "string",
      "cartId": "string",
      "status": "processing",
      "total": {
        "amount": 0,
        "currency": "string"
      },
      "customer": {
        "name": "string",
        "email": "user@example.com",
        "phone": "string"
      },
      "pickupTime": "2025-11-06T21:33:18.510Z",
      "createdAt": "2025-11-06T21:33:18.510Z",
      "updatedAt": "2025-11-06T21:33:18.510Z",
      "cart": {
        "id": "string",
        "status": "string",
        "createdAt": "2025-11-06T21:33:18.510Z",
        "updatedAt": "2025-11-06T21:33:18.510Z",
        "items": [
          {
            "id": "string",
            "cartId": "string",
            "menuItemId": "string",
            "variantId": "string",
            "quantity": 0,
            "selectedOptions": [
              {
                "optionType": "string",
                "choiceId": "string"
              }
            ],
            "addonItems": [
              {
                "menuItemId": "string"
              }
            ],
            "createdAt": "2025-11-06T21:33:18.511Z",
            "updatedAt": "2025-11-06T21:33:18.511Z",
            "menuItem": {
              "id": "string",
              "categoryId": "string",
              "name": "string",
              "description": "string",
              "notes": "string",
              "image": "string",
              "price": 0,
              "currency": "string",
              "allergens": [
                {
                  "id": "string",
                  "code": 0,
                  "name": "string"
                }
              ],
              "variants": [
                {
                  "id": "string",
                  "label": "string",
                  "price": 0,
                  "priceDelta": 0
                }
              ],
              "customOptions": [
                {
                  "type": "string",
                  "label": "string",
                  "required": true,
                  "options": [
                    {
                      "id": "string",
                      "label": "string",
                      "priceDelta": 0
                    }
                  ]
                }
              ],
              "createdAt": "2025-11-06T21:33:18.511Z",
              "updatedAt": "2025-11-06T21:33:18.511Z"
            }
          }
        ]
      }
    }
  ]