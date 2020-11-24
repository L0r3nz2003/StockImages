# Stockimages

## 1. Generell

### Beschreibung

- Diese APi Liefert Daten über Benutzer und macht sie über die WebApp änderbar. 

&nbsp;

----
## 2. API Info
&nbsp;
## 2.1 Daten anzeigen
&nbsp;

### 2.1.1 Alle User
### URL
```javaScript
    GET: {HOST}/users/show
```

### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
    Response type     : JSON
```
```javascript
    [
            { 
                "UserId"                  : Number,
                "UserName"                : String,
                "Password"                : String,
                "AnzahlBilder"            : Number
            },
            ...
    ]
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```

### Beispiel
```javascript
    //Anfrage
    GET: {HOST}/users/show
    //Ergebnis
    [
            { 
                "UserId"                  : "1",
                "UserName"                : "Tester",
                "Password"                : "Test123",
                "AnzahlBilder"            : 1
            },
            { 
                "UserId"                  : "2",
                "UserName"                : "Beispiel",
                "Password"                : "Passwort1234",
                "AnzahlBilder"            : 5
            },
            ...
    ]
```
&nbsp;
### 2.1.2 User mit ID
### URL
```javaScript
    GET: {HOST}/users/show/{SUCH_ID}
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
    Response type     : JSON
```
```javascript
    [
            { 
                "UserId"                  : Number,
                "UserName"                : String,
                "Password"                : String,
                "AnzahlBilder"            : Number
            }
    ]
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```

### Beispiel
```javascript
    //Anfrage
    GET: {HOST}/users/show/1
    //Ergebnis
    [
            { 
                "UserId"                  : "1",
                "UserName"                : "Tester",
                "Password"                : "Test123",
                "AnzahlBilder"            : 1
            }
    ]
```
&nbsp;
### 2.1.3 User mit name
### URL
```javaScript
    GET: {HOST}/users/showbyname/{SUCH_NAME}
```
### Parameter
```javaScript
    SUCH_NAME   : String [1] 
```
```javaScript
    [1] Values:
        - "name"              : "Genau der User mit diesem Name"  
```
### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
    Response type     : JSON
```
```javascript
    [
            { 
                "UserId"                  : Number,
                "UserName"                : String,
                "Password"                : String,
                "AnzahlBilder"            : Number
            }
    ]
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    GET: {HOST}/users/showbyname/Beispiel
    //Ergebnis
    [
            { 
                "UserId"                  : "2",
                "UserName"                : "Beispiel",
                "Password"                : "Passwort1234",
                "AnzahlBilder"            : 5
            }
    ]
```
&nbsp;
### 2.1.4 Prüfen ob es diesen User mit diesem passwort gibt
### URL
```javaScript
    GET: {HOST}/users/exists/{SUCH_NAME}/{SUCH_PASSWORT}
```
### Parameter
```javaScript
    SUCH_NAME       : String [1]
    SUCH_PASSWORT   : String [2]
```
```javaScript
    [1] Values:
        - "name"              : "Name des Users"  
    [2] Values:
        - "passwort"          : "Passwort des Users"
```
### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
    Response type     : JSON
```
```javascript
    [
            { 
                "UserId"                  : Number,
                "UserName"                : String,
                "Password"                : String,
                "AnzahlBilder"            : Number
            }
    ]
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : Not Found
```
### Beispiel
```javascript
    //Anfrage
    GET: {HOST}/users/exists/Beispiel/Passwort1234
    //Ergebnis
    [
            { 
                "UserId"                  : "2",
                "UserName"                : "Beispiel",
                "Password"                : "Passwort1234",
                "AnzahlBilder"            : 5
            }
    ]
```
&nbsp;
## 2.2 Daten einfügen
&nbsp;
### 2.2.1 Neuer User
### URL
```javaScript
     POST: {HOST}/users/create
```
### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
```javascript
    HTTP code       : 404
    HTTP message    : User already exists
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/create
    //Ergebnis
    INSERT Successfull
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : User already exists
```
&nbsp;
## 2.3 Daten ändern
&nbsp;
### 2.3.1 User ändern
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
### 2.3.2 Passwort eines Users ändern
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
### 2.3.3 Name eines Users ändern
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
### 2.3.4 Anzahl der Bilder eines Users ändern
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
&nbsp;
## 2.4 Daten löschen
&nbsp;
### 2.4.1 User mit Id löschen
### URL
```javaScript
    DELETE: {HOST}/users/deletebyid/{SUCH_ID}
```
### Parameter
```javaScript
    SUCH_ID       : String [1]
```
```javaScript
    [1] Values:
        - "id"                  : "Genau der User mit dieser id"  
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
    POST: {HOST}/users/deletebyid/1
    //Ergebnis
    DELETE Successfull
```
### 2.4.2 User mit Namen löschen
### URL
```javaScript
    DELETE: {HOST}/users/deletebyid/{SUCH_NAME}
```
### Parameter
```javaScript
    SUCH_NAME       : String [1]
```
```javaScript
    [1] Values:
        - "name"                  : "Genau der User mit diesem Namen"  
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
    POST: {HOST}/users/deletebyname/hans
    //Ergebnis
    DELETE Successfull
```
&nbsp;

