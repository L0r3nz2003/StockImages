# Stockimages

## 1. Generell

### Beschreibung

- Diese APi Liefert Daten über Benutzer und macht sie über die WebApp änderbar. 

&nbsp;

----
## 2. Delete Info
### 2.1 User mit Id löschen
### URL
```javaScript
    DELETE: {HOST}/users/deletebyid/{SUCH_ID}
```
### Parameter
```javaScript
    SUCH_ID       
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
### 2.2 User mit Namen löschen
### URL
```javaScript
    DELETE: {HOST}/users/deletebyid/{SUCH_NAME}
```
### Parameter
```javaScript
    SUCH_NAME       
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
