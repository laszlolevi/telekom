# Telekom Nodejs feladat

## Feladat leírása: 
Hozz létre egy nodejs(nestjs) alkalmazást amely a következő szolgáltatásokat nyújtja:

``GET test?filter=&rows=&page=``

``GET test/{key}``

``GET test/reader``

``POST test``

``PUT test/{key}`` 

key: tetszőleges egyedi kulcs

filter: szöveg

rows: numerikus

page: numerikus

 

Minden endpoint json-t adjon vissza a readert kivéve, amelyben legyenek benne a kapott input paraméterek és az alkalmazás neve, amit környezeti változóból olvas fel a program.

Ha a rows, page valahol nem numerikus, hibát adjon vissza.

A test/reader endpoint egy file-ból olvas fel egy sort és azt adja vissza text/plain formában.

POST és PUT szolgáltatásoknál a body-t küldje vissza a válaszban a kulcs értékével kiegészítve, ahol nincs kulcs, ott generálja.

## Alkalmazás indítása:
### Docker compose fájllal:
``cd telekom``
``docker-compose -f dc-server.yml up``
Ha a user nem 1000-es akkor a ``docker/dc-server.yml``-ben tudja átállítani
### vagy
### Alkalmazás könyvtár:
``cd telekom/backend``
### Első indítás előtt:
``npm install``
### Indítás:
``node .``

