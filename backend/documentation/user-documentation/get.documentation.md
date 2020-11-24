# Stockimages

## 1. Generell

### Beschreibung

- Diese APi Liefert Daten über Benutzer und macht sie über die WebApp änderbar. 

&nbsp;

----
## 2. Get Info
### 2.1 Alle User
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
### 2.2 User mit ID
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
### 2.3 User mit name
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
### 2.4 Prüfen ob es diesen User mit diesem passwort gibt
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