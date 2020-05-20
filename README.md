# maler
Unsubscribe link to SQLITE database list nodejs
```npm install```
```node . ``` 

#unsubscribe link
to add an unsubscribe link, put this on your server and it will unsubscribe from a list stored in a sqlite database. 
run with ```node .```
unsubscribe with a GET http://localhost:3000/unsubscribe?email=rob2@gmail.com

# add user to list : 
to add an email use the ``` node addGetUser.js ``` and follow the prompts :
```  node addGetUser.js add '{ "email":"rob3@mailinator.com", "first_name":"Robert","last_name":"", "disabled":0, "last_contacted": "0"}'```

#get list of emails not unsubscribed
``` node addGetUser.js get ```
```
[
  {
    email: 'rob4@mailinator.com',
    disabled: 0,
    first_name: 'Robert',
    last_name: '',
    last_contacted: '2020-05-20T04:39:49.122Z'
  }
]
```
