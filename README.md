# Save_The_Animals Backend

- All Endpoints details: https://docs.google.com/document/d/1hGYGoh-QnEGzYZZxQoZmuO7RdAv9Sgd0Asnx9cJClZA/edit?usp=sharing 

### Organizations Endpoints

| Endpoints                                                      | Request   |
|----------------------------------------------------------------|-----------|
| https://saving-the-animals.herokuapp.com/api/organizations     | GET, POST |
| https://saving-the-animals.herokuapp.com/api/organizations/:id | GET       |

### Auth Endpoints
 
| Endpoints                                                  | Request |
|------------------------------------------------------------|---------|
| https://saving-the-animals.herokuapp.com/api/auth          | GET     |
| https://saving-the-animals.herokuapp.com/api/auth/register | POST    |
| https://saving-the-animals.herokuapp.com/api/auth/login    | POST    |

### Campaigns Endpoints

| Endpoints                                                            | Request    |
|----------------------------------------------------------------------|------------|
| https://saving-the-animals.herokuapp.com/api/campaigns/supporters    | GET        |
| https://saving-the-animals.herokuapp.com/api/campaigns/organizations | GET        |
| https://saving-the-animals.herokuapp.com/api/campaigns               | POST       |
| https://saving-the-animals.herokuapp.com/api/campaigns/:id           | PUT,DELETE |

### Funding Endpoints

| Endpoints                                                         | Request     |
|-------------------------------------------------------------------|-------------|
| https://saving-the-animals.herokuapp.com/api/campaigns/:id/fundings | GET, POST   |
| https://saving-the-animals.herokuapp.com/api/fundings/:id         | PUT, DELETE |