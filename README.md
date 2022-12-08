# PollingAPI
## PollingAPI is an API to create question with answers and can add votest to option

# Demo Video:
Link to the Demo Video : 
# Key Features:

- Create question
- Add options to the created question
- Add votes to the options
- Delete a question →  A question cant be deleted if any one of the options is having atleast one vote
- Delete an option →  An option cant be deleted if that option is holding atlest single vote.
- able to view a question with options and their votes.

# Routes & URL :
##create question
- **/api/v1/question/create** : to create a question use the below url with post type and payload: 
  url:  15.206.165.96:3001/api/v1/question/create
## sample payload schema:
  {
    "question": "favourite sport"
}
## sample response schema
{
    "questionId": "639103538bef6908ae190979",
    "createdQuestion": "favourite sport",
    "status": "question Created"
}

## view question
- **/questions/:id**: To view a question and it’s options, hit the following URL with a get request:  
url:  15.206.165.96:3001/api/v1/question/:questionid
## sample payload schema
    url : localhost:8006/api/v1/question/:questionid

## sample response schema
  {
    "question": "favourite sport",
    "options": [
        {
            "optionValue": "javids",
            "votes": 1,
            "optionId": "6391042c8bef6908ae19097e",
            "votingLink": "http://localhost:8006/api/v1/option/6391042c8bef6908ae19097e/add_vote"
        }
    ],
    "questionId": "639103538bef6908ae190979"
}

## delete question
- **/questions/:id/delete** : To delete a question, hit the following URL with a delete request of get type:
url: 15.206.165.96:3001/api/v1/question/:questiond/delete  
## sample payload schema
  url: 15.206.165.96:3001/api/v1/question/:questiond/delete
## sample response schema
  {
    "questionId": "6391051f8bef6908ae19098d",
    "deletedQuestion": "favourite sport",
    "status": "question deleted"
}

## create option
- **/api/v1/question/:questionid** : To create a new option for a question hit the following URL with a post request: 15.206.165.96:3001/api/v1/option/:questionid/add

## sample payload schema
  url:  localhost:8006/api/v1/option/:questionid/add

  payload:
    {
    "optionValue": "chess"
    }
## sample response schema
   {
    "OptionId": "6391042c8bef6908ae19097e",
    "OptionValue": "javids",
    "votingLink": "http://localhost:8006/api/v1/option/6391042c8bef6908ae19097e/add_vote",
    "status": "option created"
    }   

## add vote
- **/options/:id/add_vote**: To increment the count of votes on an option, hit the following URL with a get url: 15.206.165.96:3001/api/v1/option/:optionid/add_vote 

## sample payload schema
  url:  15.206.165.96:3001/api/v1/option/:optionid/add_vote
## sample response schema
  {
    "optionId": "6391042c8bef6908ae19097e",
    "optionValue": "javids",
    "totalVotes": 1,
    "status": "vote added"
}

## delete option
- **/options/:id/delete**: To delete an option, hit the following URL with a delete request of get type:  
url:  15.206.165.96:3001/api/v1/option/:optonid/delete
## sample payload schema
  url:  localhost:8006/api/v1/option/:optonid/delete
## sample response schema
  {
    "error": "Option has votes not able to delete",
    "status": "option not deleted"
}

# To run the project on your local machine:
  clone or download the project
  give npm build
  once the build completed give npm start