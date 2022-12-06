# PollingAPI
## PollingAPI is an API to create question with answers and can add votest to option

# Demo Video:
Link to the Demo Video : https://youtu.be/t0zlFOzYcpc
# Key Features:

- Create question
- Add options to the created question
- Add votes to the options
- Delete a question →  A question cant be deleted if any one of the options is having atleast one vote
- Delete an option →  An option cant be deleted if that option is holding atlest single vote.
- able to view a question with options and their votes.

# Routes & URL :
- **/questions/create** : To create a new question hit the following URL with a post request: https://pollingapi.live/api/v1/questions/create
- **/options/:id/create** : To create a new option for a question hit the following URL with a post request: https://pollingapi.live/api/v1/options/:idOfQuestion/create
- **/options/:id/add_vote**: To increment the count of votes on an option, hit the following URL with a get request: https://pollingapi.live/api/v1/options/:idOfOption/add_vote
- **/questions/:id**: To view a question and it’s options, hit the following URL with a get request:  https://pollingapi.live/api/v1/questions/:idOfQuestion
- **/options/:id/delete**: To delete an option, hit the following URL with a delete request:  https://pollingapi.live/api/v1/options/:idOfOption/delete
- **/questions/:id/delete** : To delete a question, hit the following URL with a delete request:  https://pollingapi.live/api/v1/questions/:idOfQuestion/delete

# To run the project on your local machine:
  clone or download the project
  give npm build
  once the build completed git npm start

