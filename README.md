# Node Express Server

## Website Parts
- Client:
    - UI
    - search
    - **languages:** html, js, css, react, angular, vue
- Server:
    - DB
    - mail
    - complex logic
    - permissions
    - **languages:** .NET, Java, C, Python, C++, NodeJS
- DB:
    - **SQL:** SQL, MySQL
    - **NoSQL:** MongoDB

## HTTP RESTful API
### HTTP Request
|                   | url                                                                        | method | body (object)             | headers | url optional parameters |
| ----------------- | -------------------------------------------------------------------------- | ------ | ------------------------- | ------- | ----------- |
| קבלת כל המוצרים   | http://localhost:5000/products?sort=name&page=1&limit=10          | GET    |                           |         | sort, page, limit |
| הוספת מוצר        | http://localhost:5000/products           | POST   | new product               | הרשאה   |
| עדכון מוצר        | [http://localhost:5000/products/1212](http://localhost:5000/products/1212) | PUT    | updated product           | הרשאה   |
| מחיקת מוצר        | [http://localhost:5000/products/1212](http://localhost:5000/products/1212) | DELETE |                           | הרשאה   |
| קבלת מוצר לפי קוד | [http://localhost:5000/products/1212](http://localhost:5000/products/1212) | GET    |                           |         |
| קבלת כל המשתמשים  | [http://localhost:5000/users](http://localhost:5000/products)              | GET    |                           | הרשאה   |
| הרשמה (חדש)       | [http://localhost:5000/users](http://localhost:5000/users)                 | POST   | new user                  |         |
| התחברות (קיים)    | [http://localhost:5000/users](http://localhost:5000/users)                 | POST   | { username, password }    |         |
| עדכון סיסמא       | [http://localhost:5000/users](http://localhost:5000/products)              | PATCH  | { password, repeat_pass } | הרשאה   |
| מחיקת משתמש       | [http://localhost:5000/users/1212](http://localhost:5000/users/1212)       | DELETE |                           | הרשאה   |

### Comments
- `url` is length limited & not secure:
    - `params`
    - `query`
- `body` is unlimited & secure (in https)
- always use RESTful conventions for urls, methods, and status codes


## HTTP Response
- body - only *JSON*s
- headers (permissions etc.)
- status codes (success/failed)

## 