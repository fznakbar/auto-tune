# Home

## GET /

Response(**200**)

```
"home"
```

# Register/Login

## POST /users/register

Request

```
{
    username: STRING,
    password: STRING
}
```

Response(**201**)

```
{
    token: STRING
}
```

## POST /users/login

Request

```
{
    username: STRING,
    password: STRING
}
```

Response(**200**)

```
{
    token: STRING
}
```

# Music

## POST /musics

Request

```
headers : {
    token: STRING
},
body: {
    title: STRING,
    musicData: STRING,
}
```

Response(**201**)

```
{
    title: STRING,
    musicData: STRING,
}

```

## GET /musics

##### Sorted descending based on Rating number

Response(**200**)

```
[
    {
        id: INTEGER,
        title: STRING,
        musicData: STRING,
        UserId: INTEGER,
        Username: STRING,
        rating: INTEGER,
    }
]
```

## GET /musics/:id

WIP (Work in Progress)

Pending further testing/development

## DELETE /musics/:id

Request

```
headers: {
    token: STRING
}
```

Response(**200**)

```
{
    id: INTEGER,
    title: STRING,
    musicData: STRING,
    UserId: INTEGER,
}
```

# User rating

## PUT /rates/like/:musicId

Request

```
headers: {
    token: STRING
}
```

Response(**204**)

## PUT /rates/dislike/:musicId

Request

```
headers: {
    token: STRING
}
```

Response(**204**)

## DELETE /rates/remove/:musicId

Request

```
headers: {
    token: STRING
}
```

Response(**204**)

# Users Comments

## POST /comments/add

Request

```
headers: {
    token: STRING
}
body: {
    comment: STRING,
    musicId: INTEGER
}
```

Response(**201**)

```
{
    comment: STRING,
    musicId: INTEGER
}
```

## GET /comments/:musicId

Response(**200**)

```
[
    {
        id: INTEGER,
        title: STRING,
        musicData: STRING,
        likes: INTEGER,
        dislikes: INTEGER,
    }
]
```

## PUT /comments/:commentId

Request

```
headers: {
    token: STRING
}
body: {
    comment: STRING
}
```

Response(**200**)

```
{
    id: INTEGER,
    comment: STRING
}
```

## DELETE /comments/:commentId

Request

```
headers: {
    token: STRING
}
```

Response(**200**)

```
{
    id: INTEGER,
    comment: STRING
}
```
