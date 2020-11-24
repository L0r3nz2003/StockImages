# Stockimages

## 1. Generell

### Beschreibung

- Diese APi Liefert Daten über Benutzer und macht sie über die WebApp änderbar. 

&nbsp;

----
## 2. Put Info
### 2.1 User ändern
### URL
```javaScript
    PUT: {HOST}/users/update/{SUCH_ID}
```
### Parameter
```javaScript
    SUCH_ID   : String [1] 
```
```javaScript
    [1] Values:
        - "id"              : "Genau der User mit dieser id"  
```
### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/create
    //Ergebnis
    UPDATE Successfull
```
&nbsp;
### 2.2 Passwort eines Users ändern
### URL
```javaScript
    PUT: {HOST}/users/updatePassword/{SUCH_NAME}/{NEUES_PASSWORT}
```
### Parameter
```javaScript
    SUCH_NAME       : String [1] 
    NEUES_PASSWORT  : String [2] 
```
```javaScript
    [1] Values:
        - "name"                  : "Genau der User mit diesem name"  
    [2] Values:
        - "passwort"              : "das neue Passwort"  
```
### Rückgabe
### Erfolg
```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/create
    //Ergebnis
    UPDATE Successfull
```
&nbsp;
### 2.3 Name eines Users ändern
### URL
```javaScript
    PUT: {HOST}/users/updatepassword/{SUCH_OLDNAME}/{SUCH_NEWNAME}
```
### Parameter
```javaScript
    SUCH_OLDNAME       : String [1] 
    SUCH_NEWNAME       : String [2] 
```
```javaScript
    [1] Values:
        - "oldname"                  : "Genau der User mit diesem name"  
    [2] Values:
        - "newname"                  : "der neue Username des Users"  
```
### Rückgabe
### Erfolg
```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/updatename/Hans/Hans-Peter
    //Ergebnis
    UPDATE Successfull
```
&nbsp;
### 2.4 Anzahl der Bilder eines Users ändern
### URL
```javaScript
    PUT: {HOST}/users/updatebilder/{SUCH_NAME}/{SUCH_ANZBILDER}
```
### Parameter
```javaScript
    SUCH_NAME            : String [1] 
    SUCH_ANZBILDER       : String [2] 
```
```javaScript
    [1] Values:
        - "name"                          : "Genau der User mit diesem name"  
    [2] Values:
        - "neue anzahl Bilder"            : "die neue anzahl der Bilder des betsimmten Users"  
```
### Rückgabe
### Erfolg
```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/updatename/Beispiel/111
    //Ergebnis
    UPDATE Successfull
```