#here will curl tests for api
# ATTENTION!!!!
# all token YOU MUST REPLACE WITH ACTUAL ONE
# actual token you can get with `good auth` request


#getting one book, that exists
curl 'localhost:8085/books/1'

#getting one book, that doesnt exist
curl 'localhost:8085/books/2'

#good auth
curl -X POST localhost:8085/auth -d 'login=Ilnur&password=5f4dcc3b5aa765d61d8327deb882cf99'

#bad auth
curl -X POST localhost:8085/auth -d 'login=Ilnur&password=5f4dcc3b5aa765d61d8327deb882cf98'

#create new book
curl -X POST localhost:8085/books -d 'name=Node&author=ShellyPowers&year=2016&token=0bb07b3a-1385-472b-b820-ae5f049d6a4e'

#update existing book
curl -X PUT localhost:8085/books/1 -d 'name=Learning Node&author=Shelly Powers&year=2016&token=0bb07b3a-1385-472b-b820-ae5f049d6a4e'

#update non-existing book
curl -X PUT localhost:8085/books/1000 -d 'name=Learning Node&author=Shelly Powers&year=2016&token=0bb07b3a-1385-472b-b820-ae5f049d6a4e'

#delete existing book
curl -X DELETE 'localhost:8085/books/1?token=0bb07b3a-1385-472b-b820-ae5f049d6a4e'

#delete non-existing book
curl -X DELETE 'localhost:8085/books/1000?token=0bb07b3a-1385-472b-b820-ae5f049d6a4e'


#delete non-existing book
curl -X GET 'localhost:8085/books?name=Node'
